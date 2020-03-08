import React from "react";
import ReactDOM from "react-dom";
import "./style/styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import components
import Home from "./components/Home";
import * as serviceWorker from "./serviceWorker";

//Router
// =============================================================
ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);
// =============================================================

serviceWorker.register();
