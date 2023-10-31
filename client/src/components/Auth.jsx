import { useState } from "react";
import Cookies from "universal-cookie";
import loginImg from "../assets/login-img.jpg";
import axios from "axios";

import { FaUserCheck } from "react-icons/fa";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  avatarUrl: "",
  userName: "",
  password: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchLogin = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, avatarUrl, userName, password } =
      form;

    const PORT = 5200;
    const URL = `http://localhost:${PORT}/auth`;

    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
      userName,
      password,
      fullName,
      phoneNumber,
      avatarUrl,
      email,
    });

    cookies.set("token", token);
    cookies.set("userName", userName);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);
    cookies.set("email", email);

    if (isSignUp) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarUrl", avatarUrl);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  return (
    <section className="auth-section flex justify-center items-center p-4 h-screen w-full">
      <div className="bg-white rounded-md w-[500px] p-7 z-[2]">
        <div>
          <div className="flex justify-start items-center gap-3 mb-4 ml-2">
            <FaUserCheck className="w-[30px] h-[30px]" />
            <h2 className="text-[35px] font-bold">
              {isSignUp ? " Sign Up" : "Login"}
            </h2>
          </div>

          <form onSubmit={handleSumbit}>
            {isSignUp && (
              <>
                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="fullName"
                    className="text-[16px] text-gray-500"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter Your Full Name"
                    onChange={handleChange}
                    required
                    className="border-[1px] rounded-md p-2 border-gray-400"
                  />
                </div>

                <div className="flex flex-col mb-3">
                  <label htmlFor="email" className="text-[16px] text-gray-500">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter an Email"
                    onChange={handleChange}
                    required
                    className="border-[1px] rounded-md p-2 border-gray-400"
                  />
                </div>

                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="phoneNumber"
                    className="text-[16px] text-gray-500"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter a Phone Number"
                    onChange={handleChange}
                    required
                    className="border-[1px] rounded-md p-2 border-gray-400"
                  />
                </div>

                <div className="flex flex-col mb-3">
                  <label
                    htmlFor="avatarUrl"
                    className="text-[16px] text-gray-500"
                  >
                    Avatar Image
                  </label>
                  <input
                    type="text"
                    name="avatarUrl"
                    placeholder="Image URL"
                    onChange={handleChange}
                    required
                    className="border-[1px] rounded-md p-2 border-gray-400"
                  />
                </div>
              </>
            )}

            <div className="flex flex-col mb-3">
              <label htmlFor="userName" className="text-[16px] text-gray-500">
                Username
              </label>
              <input
                type="text"
                name="userName"
                placeholder="Enter an Username"
                onChange={handleChange}
                required
                className="border-[1px] rounded-md p-2 border-gray-400"
              />
            </div>

            <div className="flex flex-col mb-3">
              <label htmlFor="password" className="text-[16px] text-gray-500">
                Password
              </label>
              <input
                type="text"
                name="password"
                placeholder="Enter a Password"
                onChange={handleChange}
                required
                className="border-[1px] rounded-md p-2 border-gray-400"
              />
            </div>

            <button
              className={`${
                isSignUp
                  ? "bg-green-700 hover:bg-green-600"
                  : "bg-blue-800 hover:bg-blue-600"
              } mt-3 rounded-md text-white py-3 px-5 text-[18px] font-semibold`}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="mt-2">
            <p>
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                className="font-bold text-blue-600 underline hover:text-blue-400"
                onClick={switchLogin}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
