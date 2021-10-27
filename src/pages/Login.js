import React, { useEffect, useState } from "react";
import logo from "images/logo.svg";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { loginAction } from "actions/auth";
import { loadingAction } from "actions/shared";
import { userLogin } from "services/auth";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCache, getCache, clearCache } from "services/storage";
import * as yup from "yup";
import {
  ErrorMessage,
  FormGroup,
  Input,
  Label,
  CheckBox,
  Button,
  ToggleButton,
  Container,
} from "components";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  remember: yup.bool(),
});

const Login = (props) => {
  const { dispatch } = props;
  const { push } = useHistory();
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // get the stored user creds to repopulate
    const cache = getCache();
    if (cache) {
      setValue("email", cache.email, {
        shouldValidate: true,
      });
      setValue("password", cache.password, {
        shouldValidate: true,
      });
    }
    clearCache();
  }, [setValue]);

  const handleLogin = (data) => {
    dispatch(loadingAction(true));
    // cache details
    setCache(data);
    userLogin(data)
      .then((response) => {
        toast.success("Login Successful");
        dispatch(loginAction(response.data));
        dispatch(loadingAction(false));
        clearCache();
        push("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error("An error occured. Please contact support");
              break;
            case 401:
              toast.error(
                "Sorry you are not authorized to use this service. Please contact support"
              );
              break;
            case 409:
              toast.error(
                "There is a possible duplicate of this account please contact support"
              );
              break;

            case 429:
              toast.error(
                "Too many failed attempts please wait a while and try again"
              );
              break;
            case 500:
              toast.error("A critical error occured. Please contact support");
              break;
            default:
              toast.error("An error occured, please try again");
          }
        } else if (error.request) {
          toast.error("An error occured, please check your network try again");
        } else {
          toast.error("An error occured");
        }
        dispatch(loadingAction(false));
      });
  };

  return (
    <Container
      className="grid h-screen place-items-center"
      imageSrc="https://images2.alphacoders.com/830/830832.png"
    >
      <div className="container flex flex-wrap items-center mx-auto">
        <div className="flex flex-col w-full p-8 m-4 mt-10 bg-white shadow-lg lg:w-2/6 md:w-1/2 rounded-xl md:mx-auto md:mt-0">
          <div className="mb-4">
            <img src={logo} alt="logo" className="mx-auto h-36" />
            <h1 className="text-3xl text-center">Developer Console</h1>
          </div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                {...register("email")}
                error={errors.email}
              />
              {errors.email && (
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={toggle ? "text" : "password"}
                  name="password"
                  {...register("password")}
                  error={errors.password}
                />
                <ToggleButton toggleFunc={setToggle} value={toggle} />
              </div>
              {errors.password && (
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { value, onChange } }) => (
                  <Label className="inline-flex items-center">
                    <CheckBox value={value} onChange={onChange} />
                    <span className="ml-2">remember me</span>
                  </Label>
                )}
              />
            </FormGroup>
            <Button>login</Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default connect()(Login);
