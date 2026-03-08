import { useEffect, useRef, useState } from "react";

const ESP32_IP = window.location.hostname;

export function useESP32() {
  const ws = useRef(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    connect();
    return () => ws.current?.close();
  }, []);

  function connect() {
    ws.current = new WebSocket(`ws://${ESP32_IP}:81`);

    ws.current.onopen = () => {
      console.log("✅ Connected to ESP32");
      setConnected(true);
      setError(null);
    };

    ws.current.onclose = () => {
      console.log("❌ Disconnected from ESP32");
      setConnected(false);
      // Auto reconnect after 3 seconds
      setTimeout(connect, 3000);
    };

    ws.current.onerror = () => {
      setError("Cannot reach ESP32. Check IP & WiFi.");
      setConnected(false);
    };

    ws.current.onmessage = (msg) => {
      console.log("ESP32 says:", msg.data);
    };
  }

  function sendToESP32(scoreData) {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(scoreData));
      console.log("📤 Sent to ESP32:", scoreData);
    } else {
      console.warn("WebSocket not open yet");
    }
  }

  return { connected, error, sendToESP32 , reconnect : connect };
}