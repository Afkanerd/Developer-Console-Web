import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "components";
import toast, { Toaster } from "react-hot-toast";
import { clearCache, getCache } from "services/storage";
import { loginAction, logoutAction, statustAction } from "actions/auth";
import { removeProfileAction } from "actions/profile";
import { loadingAction } from "actions/shared";
import { useIdleTimer } from 'react-idle-timer'

import Login from "./Login";
import Dashboard from "./Dashboard";

const App = ({ loading, user, dispatch, status }) => {

  const handleOnIdle = () => {
    dispatch(statustAction('idle'));
    const time = getRemainingTime();
    if (time < 30000) {
      toast('You will be logged out soon for inactivity')
    }
    setTimeout(() => {
      if (time === 0) {
        dispatch(logoutAction());
        dispatch(removeProfileAction());
        clearCache();
        pause();
      }
    }, 30000);
  }

  const handleOnActive = () => {
    dispatch(statustAction('active'));
  }

  const handleOnAction = () => {
    const time = getRemainingTime();
    if (time < 30000 && status === 'idle') {
      toast('You will be logged out in soon for inactivity')
    }
    setTimeout(() => {
      if (time === 0) {
        dispatch(logoutAction());
        dispatch(removeProfileAction());
        clearCache();
        pause();
      }
    }, 30000);
  }

  const {
    start,
    pause,
    getRemainingTime,
  } = useIdleTimer({
    timeout: 1000 * 10 * 15,
    onAction: handleOnAction,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
    startManually: true,
    startOnMount: false
  })

  //if user is present start timer
  if (user) start();

  useEffect(() => {
    // get the stored user creds to repopulate state
    dispatch(loadingAction(true));
    const cache = getCache();
    if (cache && cache.sessionId) {
      // start session counter
      dispatch(loginAction(cache));
    }
    dispatch(loadingAction(false));
  }, [dispatch]);

  if (loading) return <Loader />;
  return (
    <Fragment>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000
        }}
      />
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
  status: state.auth.status
}))(App);
