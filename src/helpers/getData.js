import { db } from "../firebase/firebase";
import { updateDoc, doc, setDoc } from "firebase/firestore";

//! function below is used to get the quizIds of the quizes that the logged in user has created by taking the array of all registered user
export const getUserQuizIds = (allUsers) => {
  const userName = localStorage.getItem("userName");

  var response;

  if (allUsers !== null && allUsers !== undefined) {
    response = allUsers[userName].quizIDs;
  }
  return response;
};

/**
 * function below is used to get the data quiz associated with
 * the quizIds that the logged in user has created by taking the array of all registered user
 * @param {quizIds} - an array containig quizIds of all quizes stored on firebase
 */
export const getDataFromQuizIds = (quizIds, quizIdArray) => {
  var response = [];
  if (quizIdArray !== null && quizIdArray !== undefined) {
    quizIdArray.forEach((quizId) => {
      console.log(quizId);
      response.push(quizIds[quizId]);
    });
  }
  return response;
};

/**
 * function below used to deleted the specific id in the quizID array of user
 * @param {objearrayct} originalArray - an array containing all quizIds that user has created
 */
export const getFilteredDataArray = async (originalArray, id) => {
  const res = originalArray.filter((quizId) => {
    return quizId !== id;
  });
  console.log(res + " id : " + id);
  return res;
};

/**
 *
 *function below is used to create the array of inputs based on the
 *number of inputs (how many options are there to answer)
 * @param {Number} numberOfInputs - total number of inputs to be generated
 * @param {funciton} onChange - to set the value on value change
 * @param {function} onBlur - to save the value in an objet as the focus blur
 */
export const getAllInputs = (numberOfInputs, onChange, onBlur) => {
  var response = [];
  for (let i = 0; i < numberOfInputs; i++) {
    response.push(
      <input
        type="text"
        placeholder="OPTION"
        className="inputBox"
        required
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }
  // console.log(response);
  return response;
};

//*function below used to generate a six length alphanumeric string
export const generateSixCharacterAlphaNumericPermaLink = () => {
  const response = Math.random().toString(36).substr(2, 6);
  // console.log(response);
  return response;
};

/**
 * function below used to upload the quiz details to the firebase
 * @param {object} quiz - an object containing details of the quiz (eg - questions)
 */

export const uploadQuizDetailsInFirebase = async (quiz) => {
  const quizTitle = localStorage.getItem("quizTitle");
  const quizId = localStorage.getItem("quizId").replaceAll('"', "");

  //? adding quiz title and quiz id to the quiz object
  quiz = { ...quiz, id: quizId, title: quizTitle };
  // console.log(quiz);
  await setDoc(doc(db, "quizes", quizId), quiz);
  console.log("updated");
};

/**
 * function below used to upload the quizId array of the registered user to the firebase
 */
export const uploadQuizIdToUserDetailsInFirebase = async () => {
  const userName = localStorage.getItem("userName");
  const quizId = localStorage.getItem("quizId").replaceAll('"', "");

  const allUsersData = JSON.parse(localStorage.getItem("allUsers"));

  var newUpdatedArray = allUsersData[userName].quizIDs;
  newUpdatedArray.push(quizId);
  const dbRef = doc(db, "users", userName);
  console.log(newUpdatedArray);

  await updateDoc(dbRef, {
    quizIDs: newUpdatedArray,
  });
  console.log("uploaded");
};

/**
 * function below used to validate the given answer is correct ot not
 * @param {array} actualAnswers - an array containing all the possible answers of the particular question
 * @param {array} userAnswers - an array containing all the selected answers selected by the user
 */
export const validateAnswers = (actualAnswers, userAnswers) => {
  let flag = 0;
  console.log(actualAnswers);
  console.log(userAnswers);
  for (let i = 0; i < actualAnswers.length; i++) {
    if (userAnswers.indexOf(actualAnswers[i]) !== -1) {
      flag++;
    }
  }
  return flag === actualAnswers.length;
};
