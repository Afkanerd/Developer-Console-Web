import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { logoutAction } from "actions/auth";
import { loadingAction } from "actions/shared";
import { saveProfileAction } from "actions/profile";
import { getUserProfile } from "services/profile";
import { useHistory } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs"
import { Button } from "components";


const Dashboard = (props) => {
  const { dispatch, auth, profile } = props;
  const { push } = useHistory();

  useEffect(() => {
    if (profile.id) return;
    else {
      getUserProfile(auth)
        .then(response => {
          toast.success('Profile Loaded');
          dispatch(saveProfileAction(response.data));
          dispatch(loadingAction(false));
        }
        )
        .catch(error => {
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error('An error occured');
          }
          dispatch(loadingAction(false));
        })
    }
  }, [profile, auth, dispatch])

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
        <div className="flex flex-col w-full p-8 m-4 mt-10 bg-white md:w-1/2 rounded-xl md:mx-auto md:mt-0">
          <div className="mb-4">
            <BsPersonCircle size={100} className="mx-auto mb-2" />
            <h1 className="text-3xl text-center">Developer Account</h1>
          </div>

          {profile.id ? (
            <div className="">
              <h3 className="text-xl">User ID</h3>
              <p className="mb-2">{profile?.id}</p>
              <h3 className="text-xl">Auth ID</h3>
              <p className="mb-2">{profile?.auth_id}</p>
              <h3 className="text-xl">Email</h3>
              <p className="mb-2">{profile?.email}</p>
              <h3 className="text-xl">Created On</h3>
              <p className="mb-2">{new Date(profile?.createdAt).toLocaleString()}</p>
              <h3 className="text-xl">Last Update</h3>
              <p className="mb-2">{new Date(profile?.updatedAt).toLocaleString()}</p>
              <Button onClick={() => handleLogOut()}>logout</Button>
            </div>
          ) : (
            <div className="my-4">
              <h3 className="text-xl text-center text-red-500">failed to  auto-load profile</h3>
              <button
                className="block py-2 mx-auto my-2 text-white bg-blue-500 rounded-lg appearance-none px-7"
                onClick={() => push("/login")}
              >
                reload
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


export default connect((state) => ({
  auth: state.auth,
  profile: state.profile
}))(Dashboard)
