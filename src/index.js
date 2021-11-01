import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState();

  return (
    <div>
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
