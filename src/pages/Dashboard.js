import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import PasswordStrengthBar from "react-password-strength-bar";
import { connect } from "react-redux";
import { loadingAction } from "actions/shared";
import { saveProfileAction } from "actions/profile";
import { logoutAction } from "actions/auth";
import { getUserProfile } from "services/profile";
import { changePassword } from "services/auth";
import { useHistory } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs"
import { Navbar, Label, FormGroup, Button, ErrorMessage, Input, ToggleButton } from "components";
import { Dialog } from "@headlessui/react";
import { FiXCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ChangePasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  newPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Please enter password'),
  confirmPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Please confirm your password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords do not match')
});

const Dashboard = (props) => {
  const { dispatch, auth, profile } = props;
  const { push } = useHistory();
  const [modal, showModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const closeButtonRef = useRef(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(ChangePasswordSchema)
  });


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

  const handleChangePassword = (data) => {
    dispatch(loadingAction(true));
    changePassword(auth, data)
      .then(response => {
        toast.success("Password Changed successfully please login");
        setTimeout(() => {
          dispatch(loadingAction(false));
          dispatch(logoutAction());
        }, 1000);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response)
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occured');
        }
        dispatch(loadingAction(false));
      })
  }

  return (
    <>
      <Navbar />
      <div className="h-screen px-4 py-10 md:p-10 bg-gradient-to-br from-indigo-800 via-blue-500 to-blue-900">
        <div className="w-full p-8 bg-white md:w-1/2 rounded-xl md:mx-auto">
          <div className="mb-4">
            <BsPersonCircle size={100} className="mx-auto mb-2" />
            <h1 className="my-4 text-3xl text-center">Developer Account</h1>
            <button
              onClick={() => showModal(true)}
              className="block px-4 py-2 mx-auto my-2 text-white bg-blue-500 rounded-md outline-none appearance-none"
            >
              change password
            </button>
          </div>

          {profile.id ? (
            <div className="overflow-ellipsis">
              <h3 className="text-xl">User ID</h3>
              <p className="mb-2 break-words">{profile?.id}</p>
              <h3 className="text-xl">Auth ID</h3>
              <p className="mb-2 break-words">{profile?.auth_id}</p>
              <h3 className="text-xl">Email</h3>
              <p className="mb-2 break-words">{profile?.email}</p>
              <h3 className="text-xl">Created On</h3>
              <p className="mb-2 break-words">{new Date(profile?.createdAt).toLocaleString()}</p>
              <h3 className="text-xl">Last Update</h3>
              <p className="mb-2 break-words">{new Date(profile?.updatedAt).toLocaleString()}</p>
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

      <Dialog as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-white bg-opacity-95"
        initialFocus={closeButtonRef}
        open={modal}
        onClose={() => showModal(false)}
      >
        <FiXCircle
          size={28}
          className="fixed cursor-pointer top-4 right-6"
          onClick={() => showModal(false)}
        />

        <div className="absolute lg:p-8 inset-4 md:inset-20">
          <div className="w-full p-8 bg-white md:w-1/2 rounded-xl md:mx-auto">
            <h1 className="my-4 text-3xl text-center">Change Password</h1>

            <form onSubmit={handleSubmit(handleChangePassword)}>
              <FormGroup>
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    className="mb-2"
                    type={toggle ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    error={errors.password}
                  />
                  <ToggleButton
                    toggleFunc={setToggle}
                    value={toggle}
                  />
                </div>
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              </FormGroup>


              <FormGroup>
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    className="mb-2"
                    type={toggle2 ? "text" : "password"}
                    placeholder="New Password"
                    {...register("newPassword")}
                    error={errors.newPassword}
                  />
                  <ToggleButton
                    toggleFunc={setToggle2}
                    value={toggle2}
                  />
                </div>
                {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}
                <PasswordStrengthBar password={watch('newPassword')} />
              </FormGroup>

              <FormGroup>
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Input
                    className="mb-2"
                    type={toggle3 ? "text" : "password"}
                    placeholder="retype password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword}
                  />
                  <ToggleButton
                    toggleFunc={setToggle3}
                    value={toggle3}
                  />
                </div>
                {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                <PasswordStrengthBar password={watch("confirmPassword")} />
              </FormGroup>

              <Button type="submit">
                Change Password
              </Button>
            </form>
            <button ref={closeButtonRef} hidden ></button>
          </div>
        </div>
      </Dialog>
    </>
  );
};


export default connect((state) => ({
  auth: state.auth,
  profile: state.profile
}))(Dashboard)
