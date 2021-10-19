import React from "react";
import logo from "images/logo.svg";
import {
  ErrorMessage,
  FormGroup,
  Input,
  Label,
  CheckBox,
  Button,
} from "components";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  remember: yup.bool()
});

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => console.log(data);

  return (
    <div className="grid h-screen bg-gradient-to-br from-indigo-800 via-blue-500 to-blue-900 place-items-center">
      <div className="container flex flex-wrap items-center mx-auto">
        <div className="flex flex-col w-full p-8 m-4 mt-10 bg-white lg:w-2/6 md:w-1/2 rounded-xl md:mx-auto md:mt-0">
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
              {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                {...register("password")}
                error={errors.password}
              />
              {errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
            </FormGroup>

            <FormGroup>


              <Controller
                control={control}
                name="rememberMe"
                render={({ field: { value, onChange } }) => (
                  <Label className="inline-flex items-center">
                    <CheckBox
                      value={value}
                      onChange={onChange}
                    />
                    <span className="ml-2">remember me</span>
                  </Label>
                )}
              />
            </FormGroup>
            <Button>login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
