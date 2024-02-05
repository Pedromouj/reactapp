import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import picod_logo_seule from "/icons/maccess-high-resolution-logo-black-transparent.png";
import useApp from "./hooks/useApp";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const history = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(userName);
    console.log(password);
    if (userName != "" && password != "") {
      setLoggedIn(true);
      setError("");

      const postData = {
        cin: userName,
        password: password,
      };

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL_USERS}/login`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (userName !== "" && password !== "") {
          localStorage.setItem("token", data.token);

          console.log(data);
          window.location.href = "/"; // Redirect using history.push
          // history("/");
        }
      } catch (error) {
        setError("An error occurred during login.");
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
      setError("Invalid username or password");
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl justify-center font-semibold text-gray-900 "
        >
          <img src={picod_logo_seule} className="w-72 h-16 mb-3 " />
        </a>
        <div className="w-full bg-white rounded-lg shadow-md  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="UserName" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your User Name
                </label>
                <input
                  type="email"
                  name="UserName"
                  id="UserName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={handleLogin}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
