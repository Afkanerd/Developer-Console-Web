import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "components";
import { Toaster } from "react-hot-toast";

import Login from "./Login";
import Dashboard from "./Dashboard";

const App = ({ loading, user }) => {
  if (loading) return <Loader />
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            {user ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route exact path="/dashboard">
            {user ? <Dashboard /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </BrowserRouter>

      <Toaster
        position="top-center"
      />

    </Fragment>
  );
};

export default connect((state) => ({
  loading: state.loading,
  user: state.auth.userId
}))(App)
