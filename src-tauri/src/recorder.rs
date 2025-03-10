use std::sync::Arc;
use tauri::State;
use tokio::sync::Mutex;
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::process::{Command as TokioCommand, Child};
use std::process::Stdio;

#[derive(Default)]
pub struct RecorderState { // Made `RecorderState` public
    pub device: String,
    pub recording_process: Option<Child>,
    pub recorded_steps: Arc<Mutex<Vec<String>>>, // Ensured thread safety
}

#[tauri::command]
pub async fn start_recording(state: State<'_, Arc<Mutex<RecorderState>>>) -> Result<(), String> {
    let mut state = state.lock().await;
    
    if state.device.is_empty() {
        return Err("No ADB device selected!".to_string());
    }

    println!("🎬 Starting recording on: {}", state.device);

    let mut child = TokioCommand::new("adb")
        .arg("-s")
        .arg(&state.device)
        .arg("shell")
        .arg("getevent")
        .stdout(Stdio::piped())
        .spawn()
        .map_err(|e| format!("❌ Failed to start recording: {}", e))?;

    let stdout = child.stdout.take().ok_or("Failed to capture output")?;
    let reader = BufReader::new(stdout);
    let mut lines = reader.lines();

    let recorded_steps = Arc::clone(&state.recorded_steps);
    tokio::spawn(async move {
        let mut recorded_steps = recorded_steps.lock().await; // Added `mut`
        while let Ok(Some(line)) = lines.next_line().await {
            println!("📌 Event: {}", line);
            recorded_steps.push(line); // Now properly mutable
        }
    });

    state.recording_process = Some(child);
    Ok(())
}

#[tauri::command]
pub async fn stop_recording(state: State<'_, Arc<Mutex<RecorderState>>>) -> Result<Vec<String>, String> {
    let mut state = state.lock().await;

    if state.device.is_empty() {
        return Err("No ADB device selected!".to_string());
    }

    println!("🛑 Stopping recording on: {}", state.device);

    if let Some(mut process) = state.recording_process.take() {
        process.kill().await.map_err(|e| format!("❌ Failed to stop recording: {}", e))?;
    }

    let mut recorded_steps = state.recorded_steps.lock().await; // Declared as `mut`
    let steps = recorded_steps.clone(); // Cloned before clearing
    recorded_steps.clear();
    
    Ok(steps)
}
