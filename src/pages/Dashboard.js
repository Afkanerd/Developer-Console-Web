import React from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { logoutAction } from "actions/auth";
import { loadingAction } from "actions/shared";
import { useHistory } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs"
import {
  Button,
} from "components";


const Dashboard = (props) => {
  const { dispatch } = props;
  const { push } = useHistory();

  const handleLogOut = () => {
    dispatch(loadingAction(true));
    setTimeout(() => {
      dispatch(logoutAction());
      toast.success("Logout successfull")
      dispatch(loadingAction(false));
      push("/login");
    }, 3000);
  };
  
  return (
    <div className="grid h-screen bg-gradient-to-br from-indigo-800 via-blue-500 to-blue-900 place-items-center">
      <div className="container flex flex-wrap items-center mx-auto">
        <div className="flex flex-col w-full p-8 m-4 mt-10 bg-white lg:w-2/6 md:w-1/2 rounded-xl md:mx-auto md:mt-0">
          <div className="mb-4">
            <BsPersonCircle size={100} className="mx-auto" />
            <h1 className="text-3xl text-center">Developer Account</h1>
          </div>

          <Button onClick={() => handleLogOut()}>logout</Button>
        </div>
      </div>
    </div>
  );
};


export default connect((state) => ({
  loading: state.loading,
  user: state.auth.userId
}))(Dashboard)
