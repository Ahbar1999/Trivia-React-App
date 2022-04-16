import { nanoid } from "nanoid";
import React from "react";
import Question from "./components/Question";
import "./App.css";
/*
  So the problem was that the data was not being updated properly in the setQuestionData method
  and hence when buggy/corrupt data was being passed to <Question /> it couldnt understand the props
*/
export default function App() {
  const [startGame, setStartGame] = React.useState(false);
  const [questionData, setQuestionData] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);
  const [restartGame, setRestartGame] = React.useState(false);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((result) => result.json())
      .then((data) =>
        setQuestionData(
          data.results.map((data) => {
            return {
              questionText: data.question,
              key: nanoid(),
              correctChoice: data.correct_answer,
              choices: [...data.incorrect_answers, data.correct_answer]
                .sort((a, b) => Math.random() * 2 - 1)
                .map((choice) => {
                  return {
                    text: choice,
                    isHeld: false,
                    key: nanoid(),
                    correct: choice === data.correct_answer,
                  };
                }),
            };
          })
        )
      );
  }, [restartGame]);

  function handleChoiceClick(question, choiceText) {
    setQuestionData((prevData) =>
      prevData.map((data) =>
        data.questionText === question
          ? {
              ...data,
              choices: data.choices.map((choice) =>
                choice.text === choiceText
                  ? { ...choice, isHeld: !choice.isHeld }
                  : choice
              ),
            }
          : data
      )
    );
    // console.log(questionData);
  }

  function handleShowResult() {
    setShowResult((prev) => !prev);
    let count = 0;
    questionData.forEach((data) => {
      let heldChoice = data.choices.filter((choice) => choice.isHeld === true);
      // console.log(heldChoice);
      // console.log(`held: ${heldChoice} correct: ${data.correctChoice}`);
      if (heldChoice[0].text === data.correctChoice) {
        count++;
      }
    });
    // console.log(count);
    setScore(count);
  }

  function handleReload() {
    setShowResult(false);
    setRestartGame((prev) => !prev);
  }

  const questionElements = questionData.map((data) => (
    <Question
      key={data.key}
      questionText={data.questionText}
      choices={data.choices}
      correctChoice={data.correctChoice}
      handleChoiceClick={handleChoiceClick}
      showResult={showResult}
    />
  ));

  return (
    <div>
      {!startGame ? (
        <div className="start-page">
          <h3 className="quizzicle">Quizzicle!</h3>
          <div className="start-btn" onClick={() => setStartGame(true)}>
            Start Game!
          </div>
        </div>
      ) : (
        <div className="main-content">
          {questionElements}
          <div className="footer">
            <div
              className="final-btn"
              onClick={!showResult ? handleShowResult : handleReload}
            >
              {!showResult ? "Show Result!" : "Restart Game"}
            </div>
            {showResult && <p className="score">You score is: {score}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
