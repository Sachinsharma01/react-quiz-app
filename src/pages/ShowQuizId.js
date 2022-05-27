import React from "react";
import { Link } from "react-router-dom";

const ShowQuizId = () => {
  //? getting the quiz id of newly created quiz
  console.log(localStorage.getItem("quizId"));
  const quizId = localStorage.getItem("quizId").replaceAll('"', "");
  return (
    <div className="showQuizId">
      <div>
        <div>Your Generated Quiz ID : {quizId}</div>
        <p>
          Quiz Link :
          <Link to={"/playQuiz/" + { quizId }} state={quizId} target="_blank">
          https://quiz-j878qqcyi-sachinsharma01.vercel.app/login{quizId}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ShowQuizId;
