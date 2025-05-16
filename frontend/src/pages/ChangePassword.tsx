import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import useChangePassword from "../hooks/useChangePassword";
import { useState } from "react";
import { Spinner } from "react-activity";
import useAuth from "../hooks/context-hooks/useAuth";
import { AuthContextType } from "../types/user.types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface ShowPasswordState {
  currentPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const { loading, changePassword } = useChangePassword();
  const { auth }: AuthContextType = useAuth();

  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Explicitly define the type for showPassword state
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleCancelButton = () => {
    navigate(auth?.isAdmin ? "/admin" : "/homepage");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: keyof ShowPasswordState) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmitButton = async () => {
    await changePassword(data);
    navigate(auth?.isAdmin ? "/admin" : "/homepage");
  };

  return (
    <div className="flex flex-col items-center bg-policies-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left h-screen">
      <div>
        <Header />
      </div>
      <div className="h-auto w-[30rem] px-7 py-5 bg-zinc-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div className="space-y-5 w-full max-w-md">
          <div className="flex flex-col space-y-4">
            <div className="text-textgreen">
              <h1 className="text-4xl font-syke-bold">Change Password</h1>
              <div className="font-syke-light">
                Please enter your current and new password.
              </div>
            </div>

            {["currentPassword", "newPassword", "confirmNewPassword"].map(
              (field) => (
                <div className="flex-1" key={field}>
                  <h1 className="text-white font-syke-light text-xl">
                    {field === "currentPassword"
                      ? "Current Password"
                      : field === "newPassword"
                        ? "New Password"
                        : "Confirm Password"}
                  </h1>
                  <div className="flex items-center bg-secondgrey border-b font-syke-regular text-[1.2rem] w-full mt-1 px-2 py-2 h-10 border-none focus:outline-none focus:shadow-inner focus:ring-1 focus:ring-textgreen text-white placeholder-white placeholder-opacity-25 rounded-sm">
                    <input
                      title={field}
                      type={
                        showPassword[field as keyof ShowPasswordState]
                          ? "text"
                          : "password"
                      }
                      className="bg-secondgrey font-syke-regular w-full px-4 border-none focus:outline-none text-white placeholder-white"
                      name={field}
                      onChange={handleChange}
                      required
                    />
                    <span
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() =>
                        togglePasswordVisibility(
                          field as keyof ShowPasswordState,
                        )
                      }
                      className="cursor-pointer text-textgreen ml-2"
                    >
                      {showPassword[field as keyof ShowPasswordState] ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-sm p-5">
        <button
          type="button"
          onClick={handleCancelButton}
          className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmitButton}
          className="w-32 bg-buttongreen font-syke-medium text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <Spinner size={10} color="#008000" animating={loading} />
            </div>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
