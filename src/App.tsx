import { CognitoUserSession } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetails from "./components/UserDetails";

function App() {
  // Store the session in state for now. This means the session will be cleared on refresh.
  // Ideally we would either have an auth state listener to keep this value in sync, or store the value in a cookie or something like that.
  const [session, setSession] = useState<CognitoUserSession | null>(null);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login setSession={setSession} />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/">
            {session ? (
              <UserDetails session={session} />
            ) : (
              <p>
                No user session. <Link to="/login">Login</Link> or{" "}
                <Link to="/register">register</Link> first.
              </p>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
