import React, { useState } from "react";
import AddQuestionComponent from "../components/AddQuestionComponent";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");

  const [toggle, setToggle] = useState("");
  return (
    <div className="addQuestionsHolder">
      {!toggle && (
        <div className="quizTitle">
          <div>
            <label>ENTER QUIZ TITLE : </label>
            <input
              type="text"
              className="inputBox"
              placeholder="ENTER QUIZ TITLE"
              value={quizTitle}
              required
              onChange={(e) => {
                setQuizTitle(e.target.value);
                localStorage.setItem("quizTitle", e.target.value);
              }}
            />
          </div>
          <div>
            <label>TOTAL NUMBERS : </label>
            <input
              type="number"
              className="inputBox questionsInput"
              placeholder="NUMBER OF QUESTIONS"
              required
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
            />
          </div>
          <button
            className={
              numberOfQuestions && quizTitle ? "btn nextBtn" : "btn inactive"
            }
            onClick={() => setToggle(true)}
          >
            NEXT
          </button>
        </div>
      )}

      {toggle && (
        <div className="questions">
          <h1>{quizTitle}</h1>
          <AddQuestionComponent
            totalQuestions={numberOfQuestions}
          />
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
