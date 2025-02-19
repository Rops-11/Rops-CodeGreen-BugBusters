import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { Spinner } from "react-activity";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LandingPageHeader from "../components/LandingPageHeader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, submitLogin } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLogin({ email, password });
  };

  const handleSignUpButton = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center bg-login-bg bg-cover bg-center sm:bg-cover md:bg-contain lg:bg-cover h-screen">
      <div className="mb-24">
        <LandingPageHeader />
      </div>

      <div className="flex bg-transparent p-6 rounded-lg w-full max-w-3xl mx-auto space-x-5">
        <div className="w-1/2">
          <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg text-textgreen font-syke-regular">
            Access
          </h2>
          <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg mb-2 text-textgreen font-syke-regular">
            your account
          </h2>
          <h1 className="lg:text-sm md:text-xs text-xxs font-syke-regular mb-1 text-white">
            Don't have an account?{" "}
            <button
              className="text-buttongreen font-syke-medium"
              type="button"
              data-testid="signup-button"
              onClick={handleSignUpButton}
            >
              Sign Up
            </button>
          </h1>

          <form onSubmit={handleLogin} className="space-y-2">
            <div>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    setEmail(e.target.value);
                  }
                }}
                className="bg-secondgrey font-syke-regular w-full mt-1 px-4 py-2 focus:shadow-inner border-none focus:outline-none focus:ring-1 focus:ring-textgreen text-white placeholder-white rounded-sm lg:text-sm md:text-xs text-xxs"
                placeholder="Email address"
                pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?"
                required
              />
            </div>

            <div className="flex items-center bg-secondgrey font-syke-regular w-full mt-1 px-4 py-2 focus:shadow-inner border-none focus:outline-none focus:ring-1 focus:ring-textgreen rounded-sm text-white placeholder-white lg:text-sm md:text-xs text-xxs">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  if (e.target.value.length <= 20) {
                    setPassword(e.target.value);
                  }
                }}
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Enter your password"
                required
              />

              <span
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
                className="cursor-pointer text-textgreen ml-2"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            <div>
              <h1 className="mt-2 mb-2 text-buttongreen font-syke-medium lg:text-sm md:text-xs text-xxs">
                Please remember your password!
                <br />
                Store it somewhere safe.
              </h1>
            </div>

            <button
              type="submit"
              name="login"
              data-testid="login-button"
              className="flex w-auto bg-buttongreen text-white py-2 px-5 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm justify-center items-center lg:text-sm text-xs"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>

        <div className="w-1/2 flex flex-col font-syke-medium justify-center items-start text-textgreen lg:text-4xl md:text-3xl sm:text-2xl text-xl gap-2">
          <h1>Welcome.</h1>
          <h1>Log in to monitor your vehicle's violation records.</h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
