import React from "react";
import logo from "images/logo.svg";

const Login = () => {
  return (
    <div className="grid h-screen bg-gradient-to-br from-indigo-800 via-blue-500 to-blue-900 place-items-center">
      <div class="container mx-auto flex flex-wrap items-center">
        <div class="lg:w-2/6 md:w-1/2 bg-white rounded-xl p-8 flex flex-col m-4 md:mx-auto w-full mt-10 md:mt-0">
          <div className="mb-4">
            <img src={logo} alt="logo" className="mx-auto h-36" />
            <h1 className="text-3xl text-center">Developer Console</h1>
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7  text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-800 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="full-name" class="leading-7  text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="full-name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-800 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button class="text-white bg-gradient-to-br from-indigo-800 via-blue-500 to-blue-900 hover:from-blue-500 hover:via-indigo-800 hover:to-blue-500 border-0 py-2 px-8 focus:outline-none rounded text-lg">
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
