import React from "react";
import { useHistory } from "react-router-dom";

const LogOutButton = () => {
  const history = useHistory();
  const logOut = () => {
    localStorage.setItem("userState", "LOGGED_OUT");
    // history.replace("/login");
    window.location.reload('/login')
  };
  return (
    <button onClick={logOut} className="btn logOutBtn">
      LOG OUT
    </button>
  );
};

export default LogOutButton;
