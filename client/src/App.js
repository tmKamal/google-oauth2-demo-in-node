import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/auth-context";

import "./App.css";

import NavBar from "./layouts/NavBar";
import HomeScreen from "./pages/HomeScreen";
import LoginAs from "./pages/auth/LoginAs";
import DashBoardFront from "./pages/dashboard/DashBoardFront";
import SendMail from "./pages/dashboard/SendMail";
import CreateDraftMail from "./pages/dashboard/CreateDraft";
import Cookies from "js-cookie";
import axios from "axios";

export default function App() {
  const [name, setName] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((name, user) => {
    setName(name);
    setUser(user);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        name: name,
        user: user,
      })
    );

    console.log("auto logged in" + user);

    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setName(null);
    setUser(null);

    localStorage.removeItem("userData");
    localStorage.clear();
    Cookies.remove("public_user_token");

    return <Redirect to={"/login"} />;
  }, []);

  // automatic login at start up (using local storage)
  const logUserAutomatically = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/auth/verify/user`,
        { withCredentials: true }
      );
      console.log(response.data);

      if (response && response.data) {
        login(response.data.name, response.data);
      }
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  useEffect(() => {
    const authCookie = Cookies.get("public_user_token");
    console.log(authCookie);

    if (authCookie) {
      console.log("we are in");
    }
    if (authCookie) {
      logUserAutomatically();
    }
    setIsLoading(false);
    console.log(user);
    // eslint-disable-next-line
  }, [login]);

  let reactRoutes;
  if (!isLoading && user) {
    reactRoutes = (
      <React.Fragment>
        <Route path="/">
          <NavBar></NavBar>
        </Route>
        <Switch>
          <Route path="/dashboard" exact>
            <DashBoardFront></DashBoardFront>
          </Route>
          <Route path="/send-email" exact>
            <SendMail></SendMail>
          </Route>
          <Route path="/create-draft" exact>
            <CreateDraftMail></CreateDraftMail>
          </Route>

          <Redirect to="/dashboard" />
        </Switch>
      </React.Fragment>
    );
  } else {
    reactRoutes = (
      <React.Fragment>
        <Route path="/">
          <NavBar></NavBar>
        </Route>
        <Switch>
          <Route path="/" exact>
            <HomeScreen></HomeScreen>
          </Route>
          <Route path="/login-as" exact>
            <LoginAs></LoginAs>
          </Route>

          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,

        name: name,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      {!isLoading && <Router>{reactRoutes}</Router>}
    </AuthContext.Provider>
  );
}
