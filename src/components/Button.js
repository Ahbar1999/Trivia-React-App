import React from "react";

// props : {isHeld: , correct: , onClick}
export default function Button(props) {
  return (
    <div
      onClick={props.onClick}
      className={
        (props.showResult && props.correct ? "correct-btn" : "") ||
        (props.isHeld ? "held-btn" : "" || "btn")
      }
    >
      {props.text}
    </div>
  );
}
