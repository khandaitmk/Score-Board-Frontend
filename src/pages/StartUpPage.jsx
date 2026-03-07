import { LEDPreview } from "@/components/LEDPreview";
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function StartUpPage(props) {
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
//   localStorage.setItem("scoreboard-state", JSON.stringify(state));
console.log("Start up page info :", {
    // sport:       state.sport,
    // displayName: state.displayName,
    // prefix:      state.prefix,
    // timer:       state.timer,
    brightness:  100,
    // [activeSportKey]: state[activeSportKey],  // only active sport
    rows:        rowData,
  });
}, []);
  return (
    <div>
        <LEDPreview
        rows={rowData}
        brightness={100}
        onLogout = {props.onLogout}
      />
      <div className=" flex justify-center">
        <Button
              onClick={handleStart}
              className="flex items-center justify-center cursor-pointer bg-red-500 hover:scale-105 transition-all duration-200 text-white gap-2 rounded-lg"
            >
                Start Game
        </Button>
      </div>
    </div>
  )
}

export default StartUpPage