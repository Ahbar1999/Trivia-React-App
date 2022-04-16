import React from "react";
import Button from "./Button";

export default function Question(props) {
  return (
    <div className="question">
      <h3 className="question-text">{props.questionText}</h3>
      <div className="button-section">
        {props.choices.map((choiceObj) => (
          <Button
            key={choiceObj.key}
            text={choiceObj.text}
            isHeld={choiceObj.isHeld}
            onClick={() =>
              props.handleChoiceClick(props.questionText, choiceObj.text)
            }
            correct={choiceObj.correct}
            showResult={props.showResult}
          />
        ))}
      </div>
    </div>
  );
}
