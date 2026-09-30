import { LEDPreview } from "@/components/LEDPreview";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useESP32 } from "../hooks/useESP32";

function StartUpPage(props) {
  const { connected, sendToESP32 } = useESP32();

  const rowData = [
    { id: 1, content: "HELLO WELCOME TO RBU" },
    { id: 2, content: "SCORE-BOARD" },
    { id: 3, content: "" },
    { id: 4, content: "'Champions Are Made Where" },
    { id: 5, content: "The Comfort Zone Ends'" },
    { id: 6, content: "" },
  ];
  const navigate = useNavigate();

  function handleStart(event) {
    event.preventDefault();
    navigate("/Index");
  }

  useEffect(() => {
    sendToESP32({
      rows: rowData,
      brightness: 100,
      sport: "startup",
    });
  }, [connected]);

  return (
    <div>
      <LEDPreview
        rows={rowData}
        brightness={100}
        onLogout={props.onLogout}
      />
      <div className="flex justify-center mt-6">
        <Button
          onClick={handleStart}
          className="flex items-center justify-center cursor-pointer bg-red-500 hover:scale-105 transition-all duration-200 text-white gap-2 rounded-lg px-6 py-3 font-semibold"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}

export default StartUpPage;