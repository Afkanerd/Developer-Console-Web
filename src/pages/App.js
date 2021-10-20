import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "components";

import Login from "./Login";

const App = ({ loading }) => {
  if (loading) return <Loader />
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

export default connect((state) => ({
  loading: state.loading
}))(App)
