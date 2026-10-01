import { useEffect, useRef, useState } from "react";

// ⚙️ TOGGLE WEBSOCKET ON/OFF FOR LOCAL TESTING:
// Set to `false` to disable WebSocket connection (for offline UI dev testing)
// Set to `true` to connect to hardware ESP32 WebSocket
const ENABLE_WEBSOCKET = true;

const ESP32_IP = import.meta.env.VITE_ESP32_IP || window.location.hostname;

export function useESP32() {
  const ws = useRef(null);
  const lastDataRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ENABLE_WEBSOCKET) {
      console.log("ℹ️ WebSocket is temporarily OFF for offline local dev mode.");
      setError("Dev Mode: WebSocket is turned OFF for local testing.");
      return;
    }
    connect();
    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      ws.current?.close();
    };
  }, []);

  function connect() {
    if (!ENABLE_WEBSOCKET) return;

    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }

    try {
      ws.current = new WebSocket(`ws://${ESP32_IP}:81`);

      ws.current.onopen = () => {
        console.log("✅ Connected to ESP32 at", ESP32_IP);
        setConnected(true);
        setError(null);
        if (lastDataRef.current) {
          ws.current.send(JSON.stringify(lastDataRef.current));
          console.log("📤 Sent queued data to ESP32 on connect:", lastDataRef.current);
        }
      };

      ws.current.onclose = () => {
        console.log("❌ Disconnected from ESP32");
        setConnected(false);
        // Auto reconnect after 3 seconds without duplicate timers
        if (!reconnectTimerRef.current) {
          reconnectTimerRef.current = setTimeout(connect, 3000);
        }
      };

      ws.current.onerror = () => {
        setError(`Cannot reach ESP32 (${ESP32_IP}). Check IP & WiFi.`);
        setConnected(false);
      };

      ws.current.onmessage = (msg) => {
        console.log("ESP32 says:", msg.data);
      };
    } catch (e) {
      console.warn("WebSocket init error:", e);
      setConnected(false);
    }
  }

  function sendToESP32(scoreData) {
    lastDataRef.current = scoreData;
    if (!ENABLE_WEBSOCKET) {
      console.log("📤 [Dev Mode - Offline WS] Score Data:", scoreData);
      return;
    }

    if (ws.current?.readyState === WebSocket.OPEN) {
      try {
        ws.current.send(JSON.stringify(scoreData));
        console.log("📤 Sent to ESP32:", scoreData);
      } catch (e) {
        console.warn("Error sending to ESP32:", e);
      }
    } else {
      console.warn("WebSocket not open yet; data queued for connection open");
    }
  }

  return { connected, error, sendToESP32, reconnect: connect };
}