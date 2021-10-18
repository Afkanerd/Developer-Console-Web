import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Login";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
