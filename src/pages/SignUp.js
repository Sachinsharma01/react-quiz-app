import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const signUp = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setUserName("");
    createUserWithEmailAndPassword(auth, email, password).then(async () => {
      console.log("User Created");

      //! settting the userState to logged in and userName to the registered user
      localStorage.setItem("userState", "LOGGED_IN");
      localStorage.setItem("userName", userName);
      await setDoc(doc(db, "users", userName), {
        quizIDs: [],
      });

      //? redirecting the user to the home page (only when authenticated)
      window.location.reload("/")
    }).catch((err) => {
      alert("User already exists")
    })
  };
  return (
    <div className="wrapper">
      <div className="formWrapper">
        <h2>SIGN UP</h2>
        <div className="inputGroup">
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="inputBox"
            type="text"
            placeholder="USERNAME"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="inputBox"
            type="email"
            placeholder="EMAIL"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="inputBox"
            type="password"
            placeholder="PASSWORD"
          />
          <button
            type="submit"
            onClick={signUp}
            className={
              userName && email && password
                ? "btn signUpBtn"
                : "btn signUpBtn inactive"
            }
          >
            SIGN UP
          </button>
          <span className="createInfo">
            If you already have an account then &nbsp;
            <Link to="/login" className="createNewBtn">
              login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
