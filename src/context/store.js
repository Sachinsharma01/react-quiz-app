import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const QuizData = createContext();

//* Used conetxt API to circulate the Data of users and quizes all over the app

const ContextProvider = ({ children }) => {
  const [allQuizIds, setAllQuizIds] = useState();
  const [allUsers, setAllUsers] = useState();
  useEffect(() => {
    //! Function below is used to fetch All QuizIDs stored in the firebase
    async function getAllQuizIdsFromFirebase() {
      const response = await getDocs(collection(db, "quizes"));

      var quizIds = {};
      response.forEach((doc) => {
        quizIds = {
          ...quizIds,
          [doc.id]: doc.data(),
        };
      });
      setAllQuizIds(quizIds);
    }

    //! Function below is used to fetch All usres along with the quizIDs of the quizes the user has created registered in the firebase
    async function getAllUsersFromFirebase() {
      const response = await getDocs(collection(db, "users"));

      var users = {};
      response.forEach((doc) => {
        users = {
          ...users,
          [doc.id]: doc.data(),
        };
      });
      setAllUsers(users);
    }
    getAllQuizIdsFromFirebase();
    getAllUsersFromFirebase();
  }, []);

  localStorage.setItem("allUsers", JSON.stringify(allUsers));


  return (
    <QuizData.Provider value={{ allQuizIds, allUsers }}>
      {children}
    </QuizData.Provider>
  );
};

export { ContextProvider, QuizData };
