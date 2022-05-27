import React from "react";
import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { useContext } from "react";
import { QuizData } from "../context/store";
import { getDataFromQuizIds, getUserQuizIds } from "../helpers/getData";

const Home = () => {
  const data = useContext(QuizData);
  const userName = localStorage.getItem("userName");

  //? getting list of all quizIDs that user has created from from firebase
  const quizIdArray = getUserQuizIds(data.allUsers);
  console.log(quizIdArray);

  //? getting list of all data of all quizes 
  const quizIdArrayData = getDataFromQuizIds(data.allQuizIds, quizIdArray);
  console.log(quizIdArrayData);



  return (
    <>
      <div className="mainWrapper">
        <section className="main">
          <h2>Welcome Back {userName} </h2>
          <Link to="/create" target="_blank" className="btn createBtn">
            Create Quiz
          </Link>
        </section>

        <section className="allQuizes">
          <div className="allQuizesHeading">
            <h2>All QUIZZEZ</h2>
          </div>
          <section className="allQuizesList">
            {quizIdArrayData.map(
              (quiz, idx) =>
                quiz && <QuizCard key={idx} title={quiz.title} id={quiz.id} />
            )}
          </section>
        </section>
      </div>
    </>
  );
};

export default Home;
