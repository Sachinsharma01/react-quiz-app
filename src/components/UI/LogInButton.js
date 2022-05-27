import React from "react";
import { Link } from "react-router-dom";

const LogInButton = () => {
  return (
      <Link to="/login" className="btn logInBtn">LOG IN</Link>
  );
};

export default LogInButton;
