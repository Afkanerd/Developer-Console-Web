import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "components";
import { Toaster } from "react-hot-toast";
import { getCache } from "services/storage";
import { loginAction } from "actions/auth";
import { loadingAction } from "actions/shared";

import Login from "./Login";
import Dashboard from "./Dashboard";

const App = ({ loading, user, dispatch }) => {

  useEffect(() => {
    // get the stored user creds to repopulate state
    dispatch(loadingAction(true))
    const cache = getCache();
    if (cache && cache.sessionId) {
      dispatch(loginAction(cache));
    }
    dispatch(loadingAction(false));
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <Fragment>
      <Toaster position="top-center" />
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
    </Fragment>
  );
};

export default connect((state) => ({
  loading: state.loading,
  user: state.auth.userId,
}))(App);
