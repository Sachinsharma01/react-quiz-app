import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  generateSixCharacterAlphaNumericPermaLink,
  getAllInputs,
  uploadQuizDetailsInFirebase,
  uploadQuizIdToUserDetailsInFirebase,
} from "../helpers/getData";

const AddQuestionComponent = ({ totalQuestions }) => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState();
  const [questionIsMultipleChoice, setQuestionIsMultipleChoice] =
    useState(false);
  const [options, setOptions] = useState(0);
  const [allOptions, setAllOptions] = useState([]);
  const [singleOption, setSingleOption] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [questionLimitReached, setQuestionLimitReached] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const history = useHistory();

  const nextClickHandler = () => {
    setQuestion("");
    setOptions("");
    setSingleOption("");
    setAllOptions([]);
    setCorrectOption("");
    setQuestionIsMultipleChoice(false);

    setQuestionNumber((previousValue) => previousValue + 1);

    console.log("totalQuestions " + typeof totalQuestions);
    console.log("question number " + typeof questionNumber);

    //? if the question number is equal to the total number of question in the quiz tehn show the save button to save the quiz
    if (questionNumber === parseInt(totalQuestions)) {
      setQuestionLimitReached(true);
      console.log(questionLimitReached);
    }
    setQuiz([
      ...quiz,
      {
        question: question,
        options: allOptions,
        answer: correctOption,
        isMultipleChoice: questionIsMultipleChoice,
      },
    ]);
  };
  // console.log(questions);
  console.log(quiz);

  const singleQuestionHandler = (event) => {
    setSingleOption(event.target.value);
  };

  const saveSingleOptionHandler = () => {
    //! setting all options to answer in an array
    setAllOptions([...allOptions, singleOption]);
  };

  const saveQuizHandler = () => {
    //! getting the uniques six length alphanumeric permalink
    const quizId = generateSixCharacterAlphaNumericPermaLink();
    console.log(quizId);

    localStorage.setItem("quiz", JSON.stringify(quiz));
    localStorage.setItem("quizId", JSON.stringify(quizId));
    console.log(quiz);

    //? uploading the quiz to the firebase and updatin the quizID array containing all the quizes that registered user has created
    uploadQuizDetailsInFirebase(quiz);
    uploadQuizIdToUserDetailsInFirebase();
    history.replace("/createQuiz/showQuizId");
  };

  const optionsArray = getAllInputs(
    options,
    singleQuestionHandler,
    saveSingleOptionHandler
  );

  return (
    <>
      <div>
        {!questionLimitReached ? (
          <>
            <div>
              <label>Question {questionNumber}</label>
              <textarea
                className="inputTextArea"
                required
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                placeholder={`ENTER QUESTION ${questionNumber}`}
              />
            </div>
            <div className="options">
              <label>
                Options
                <select
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  className="inputBox selectOptions"
                >
                  <option value="0" key="0">
                    select
                  </option>
                  <option value="2" key="2">
                    2
                  </option>
                  <option value="3" key="3">
                    3
                  </option>
                  <option value="4" key="4">
                    4
                  </option>
                  <option value="5" key="5">
                    5
                  </option>
                </select>
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    setQuestionIsMultipleChoice(!questionIsMultipleChoice)
                  }
                  className="inputBox quizIsMultipleChoice"
                  value="multiple"
                  name="multiple"
                />
                Multiple Choice
              </label>
            </div>
            <div className="allOptions">
              {optionsArray.map((option, idx) => (
                <div key={idx}>{option}</div>
              ))}
            </div>
            <div className="correctOption">
              <input
                type="text"
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
                required
                placeholder="CORRECT OPTION"
                className="inputBox"
              />
              <br />
              {!questionIsMultipleChoice && (
                <small className="information">
                  Please specify the option number eg, 1
                </small>
              )}
              {questionIsMultipleChoice && (
                <small className="information">
                  In case of multi choice please specify the option number
                  separated by space eg, 1 2
                </small>
              )}
            </div>
          </>
        ) : (
          <h3>Please Save the Quiz</h3>
        )}
        {questionLimitReached ? (
          <button
            type="submit"
            onClick={saveQuizHandler}
            className="btn saveBtn"
          >
            SAVE
          </button>
        ) : (
          <button className="btn nextBtn" onClick={nextClickHandler}>
            NEXT
          </button>
        )}
      </div>
    </>
  );
};

export default AddQuestionComponent;
