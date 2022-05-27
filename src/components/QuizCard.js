import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { QuizData } from "../context/store";
import { db } from "../firebase/firebase";
import { getFilteredDataArray, getUserQuizIds } from "../helpers/getData";

const QuizCard = ({ title, id }) => {
  console.log(id);
  const userName = localStorage.getItem("userName");
  const allUsersArray = useContext(QuizData).allUsers;
  const quizArray = getUserQuizIds(allUsersArray);

  const deleteJobHandler = async () => {

    //! this take delete the specific quiz identified by the unique id and update the quizes list on the firebase

    await deleteDoc(doc(db, "quizes", id + ""));
    const dbRef = doc(db, "users", userName);
    const newUpdatedArray = await getFilteredDataArray(quizArray, id);
    console.log("type of array " + newUpdatedArray);

    await updateDoc(dbRef, {
      quizIDs: newUpdatedArray,
    });
    window.location.reload("/");
  };
  // console.log(title)
  return (
    <div className="card">
      <h2 className="quizTitle">{title}</h2>
      <div className="deleteQuiz">
        <button className="btn deleteBtn" onClick={deleteJobHandler}>
          Delete Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
