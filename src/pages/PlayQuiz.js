import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateAnswers } from "../helpers/getData";

const PlayQuiz = () => {
  const [quiz, setQuiz] = useState(JSON.parse(localStorage.getItem("quiz")));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userChosenOption, setUserChosenOption] = useState([]);
  const [score, setScore] = useState(0);

  const userChoiceOptionHandler = (event) => {
    setUserChosenOption([...userChosenOption, event.target.value]);
    !quiz[questionIndex].isMultipleChoice && playQuizNexButtonHandler();
  };

  //! handling the validation of answers when next button is clicked
  const playQuizNexButtonHandler = () => {
    if (quiz[questionIndex].isMultipleChoice) {
      var actualCorrectAnswers = [];
      quiz[questionIndex].answer.split(" ").map((value) => {
        actualCorrectAnswers.push(quiz[questionIndex].options[parseInt(value) - 1]);
      });


      if (validateAnswers(actualCorrectAnswers, userChosenOption))
        setScore((previouscore) => previouscore + 1);
      }
    setQuestionIndex((previousQuizIndex) => previousQuizIndex + 1);
  };

  const length = quiz.length;
  console.log(quiz);
  return (
    <>
      <div className="playQuizWrapper">
        <div className="questions">
          {questionIndex === length ? (
            <div>
              <h1>Your Score {score} </h1>
              <Link className="btn nextBtn" to="/">
                Home
              </Link>
            </div>
          ) : (
            <>
              <div className="displayQuestion">
                <div className="questionLabel">
                  <label>Q{questionIndex + 1}.</label>
                </div>
                <textarea
                  className="playQuizDisplayQuestion"
                  readOnly
                  value={quiz[questionIndex].question}
                ></textarea>
              </div>
              {quiz[questionIndex].isMultipleChoice && (
                <small className="information">
                  This Question is a multiple choice question
                </small>
              )}
              <div className="playQuizAllOptions">
                <div className="playQuizAllOptions">
                  {quiz[questionIndex].options.map((option) => (
                    <input
                      key={Math.random()}
                      readOnly
                      onClick={userChoiceOptionHandler}
                      onChange={() => {}}
                      className="btn optionBtn "
                      value={`${option}`}
                    />
                  ))}
                </div>
              </div>

              {quiz[questionIndex].isMultipleChoice && (
                <button
                  onClick={playQuizNexButtonHandler}
                  className="btn nextBtn"
                >
                  NEXT
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayQuiz;
