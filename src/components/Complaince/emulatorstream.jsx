import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export default function EmulatorStream() {
  const [activeTab, setActiveTab] = useState("connect");
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [ws, setWs] = useState(null);
  const [recording, setRecording] = useState(false);
  const [testSteps, setTestSteps] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    invoke("get_adb_devices").then(setDevices).catch(console.error);
  }, []);

  const connectDevice = async () => {
    if (!selectedDevice) {
      alert("Please select an ADB device first!");
      return;
    }

    await invoke("set_selected_device", { device: selectedDevice });
    alert(`Connected to: ${selectedDevice}`);
  };

  const startStreaming = async () => {
    if (!selectedDevice) {
      alert("No device selected!");
      return;
    }

    const websocket = new WebSocket("ws://127.0.0.1:3030");
    setWs(websocket);

    websocket.onmessage = (event) => {
      const img = new Image();
      img.src = URL.createObjectURL(new Blob([event.data], { type: "image/png" }));
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      };
    };
  };

  const startRecording = async () => {
    if (!selectedDevice) {
      alert("Please connect to a device first!");
      return;
    }

    setRecording(true);
    setTestSteps([]);

    await invoke("start_recording", { device: selectedDevice });

    alert("Recording started!");
  };

  const stopRecording = async () => {
    if (!recording) return;

    const steps = await invoke("stop_recording");
    setTestSteps(steps);
    setRecording(false);

    alert("Recording stopped!");
  };

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b mb-4">
        {["connect", "test-steps", "execute"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "connect" ? "Connect" : tab === "test-steps" ? "Test Steps" : "Execute"}
          </button>
        ))}
      </div>

      {/* Connect Tab */}
      {activeTab === "connect" && (
        <div>
          <h2 className="text-xl font-bold mb-2">Select ADB Device</h2>
          <select
            className="p-2 border rounded w-full"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
          >
            <option value="">-- Select Device --</option>
            {devices.map((device) => (
              <option key={device} value={device}>
                {device}
              </option>
            ))}
          </select>

          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow"
            onClick={connectDevice}
          >
            Connect
          </button>
        </div>
      )}

      {/* Test Steps Tab */}
      {activeTab === "test-steps" && (
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Test Steps Recorder</h2>

          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded shadow ${
                recording ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 text-white"
              }`}
              onClick={startRecording}
              disabled={recording}
            >
              Start Recording
            </button>

            <button
              className={`px-4 py-2 rounded shadow ${
                !recording ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 text-white"
              }`}
              onClick={stopRecording}
              disabled={!recording}
            >
              Stop Recording
            </button>
          </div>

          {/* Display Recorded Steps */}
          <ul className="mt-4 border p-2 rounded bg-gray-100">
            {testSteps.length === 0 ? (
              <p className="text-gray-500">No interactions recorded.</p>
            ) : (
              testSteps.map((step, index) => (
                <li key={index} className="py-1 border-b last:border-0">
                  {step}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Execute Tab */}
      {activeTab === "execute" && (
        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded shadow"
            onClick={startStreaming}
          >
            Start Streaming
          </button>

          <canvas
            ref={canvasRef}
            width="800"
            height="600"
            className="border border-gray-300 shadow-lg mt-4"
          ></canvas>
        </div>
      )}
    </div>
  );
}
