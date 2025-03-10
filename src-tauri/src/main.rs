use tauri::{Manager, State};
use tokio::net::TcpListener;
use std::process::Command;
use tokio_tungstenite::accept_async;
use futures_util::{SinkExt, StreamExt};
use tokio::net::TcpStream;
use std::sync::Arc;
use tokio::sync::Mutex;
mod recorder;

#[tokio::main]
async fn main() {
    let selected_device = Arc::new(Mutex::new(String::new()));
    let recorder_state = Arc::new(Mutex::new(recorder::RecorderState::default()));

    let device_clone = Arc::clone(&selected_device);

    tauri::Builder::default()
        .manage(selected_device)
        .manage(recorder_state) // Ensure recorder state is managed
        .setup(move |_app| {
            let device_clone = Arc::clone(&device_clone);
            tauri::async_runtime::spawn(start_websocket_server(device_clone));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_adb_devices,
            set_selected_device,
            recorder::start_recording,
            recorder::stop_recording
        ])
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");
}

#[tauri::command]
fn get_adb_devices() -> Result<Vec<String>, String> {
    let output = Command::new("adb")
        .arg("devices")
        .output()
        .map_err(|e| format!("Failed to execute ADB: {}", e))?;

    let output_str = String::from_utf8_lossy(&output.stdout);
    
    let devices: Vec<String> = output_str
        .lines()
        .skip(1) // Skip "List of devices attached"
        .filter(|line| !line.trim().is_empty() && !line.contains("unauthorized")) // Filter out empty & unauthorized devices
        .filter_map(|line| line.split_whitespace().next().map(String::from))
        .collect();

    if devices.is_empty() {
        Err("No ADB devices found".to_string())
    } else {
        Ok(devices)
    }
}

#[tauri::command]
async fn set_selected_device(
    device: String, 
    selected_device: State<'_, Arc<Mutex<String>>>,
    recorder_state: State<'_, Arc<Mutex<recorder::RecorderState>>>
) -> Result<(), String> {
    let mut selected_device_lock = selected_device.lock().await;
    *selected_device_lock = device.clone();
    
    let mut recorder_state_lock = recorder_state.lock().await;
    recorder_state_lock.device = device.clone(); // Update the recorder's device

    println!("📱 Selected ADB device: {}", device);

    // Ensure scrcpy is not already running
    let output = Command::new("pgrep")
        .arg("scrcpy")
        .output();

    if let Ok(output) = output {
        if !output.stdout.is_empty() {
            println!("⚠️ Scrcpy is already running.");
            return Ok(());
        }
    }

    // Start scrcpy for screen mirroring
    println!("🚀 Starting scrcpy for: {}", device);
    Command::new("scrcpy")
        .arg("-s")
        .arg(&device)
        .spawn()
        .map_err(|e| format!("❌ Failed to start scrcpy: {}", e))?;
    
    Ok(())
}


async fn start_websocket_server(selected_device: Arc<Mutex<String>>) {
    let listener = TcpListener::bind("127.0.0.1:3030")
        .await
        .expect("❌ Cannot bind WebSocket server");

    println!("✅ WebSocket Server running on ws://127.0.0.1:3030");

    while let Ok((stream, _)) = listener.accept().await {
        let device_clone = Arc::clone(&selected_device);
        tokio::spawn(handle_connection(stream, device_clone));
    }
}

async fn handle_connection(stream: TcpStream, selected_device: Arc<Mutex<String>>) {
    let ws_stream = match accept_async(stream).await {
        Ok(ws) => ws,
        Err(e) => {
            eprintln!("❌ WebSocket connection error: {}", e);
            return;
        }
    };

    let (mut tx, _) = ws_stream.split();

    loop {
        let device = selected_device.lock().await.clone();
        
        if device.is_empty() {
            println!("⚠️ No ADB device selected! Stopping stream.");
            break;
        }

        let output = Command::new("adb")
            .arg("-s")
            .arg(&device)
            .arg("exec-out")
            .arg("screencap")
            .arg("-p")
            .output();

        match output {
            Ok(output) => {
                if tx.send(tokio_tungstenite::tungstenite::Message::Binary(output.stdout)).await.is_err() {
                    println!("❌ WebSocket client disconnected");
                    break;
                }
            }
            Err(e) => {
                eprintln!("❌ Failed to capture frame: {}", e);
                break;
            }
        }

        tokio::time::sleep(tokio::time::Duration::from_millis(50)).await; // ~20 FPS
    }
}
