import React from "react";
import LogInButton from "./UI/LogInButton";
import LogOutButton from "./UI/LogOutButton";

const Header = () => {
  const userState = localStorage.getItem("userState");
  return (
    <div className="navWrapper">
      <div className="nav">
        <div className="logo">
          <h2>QUIZZEZ</h2>
        </div>
        <div className="activity">
          {userState === "LOGGED_IN" ? <LogOutButton /> : <LogInButton />}
        </div>
      </div>
    </div>
  );
};

export default Header;
