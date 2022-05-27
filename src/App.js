import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateQuiz from "./pages/CreateQuiz";
import ShowQuizId from "./pages/ShowQuizId";
import PlayQuiz from "./pages/PlayQuiz";
import SignUp from "./pages/SignUp";
import "./App.css";

function App() {
  //* getting the current status of the user i.e., user is logged in of not
  const userState = localStorage.getItem("userState");

  return (
    <div className="App">
      <Header />
      {/*? Using react-router-dom library to navigate through different routes*/}
      <Switch>
        //! Preventing the user visit the routes that requires authentication
        <Route path="/login" exact>
          {userState === "LOGGED_IN" ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/" exact>
          {userState === "LOGGED_IN" ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/create" exact>
          {userState === "LOGGED_IN" ? (
            <CreateQuiz />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/createQuiz/showQuizId" exact>
          {userState === "LOGGED_IN" ? (
            <ShowQuizId />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/signup" exact>
          {userState === "LOGGED_IN" ? <Home /> : <SignUp />}
        </Route>
        <Route path="/playQuiz/:id">
          <PlayQuiz />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
