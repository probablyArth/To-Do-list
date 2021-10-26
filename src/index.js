import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
