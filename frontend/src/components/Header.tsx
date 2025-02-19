import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/context-hooks/useAuth";
import { AuthContextType } from "../types/user.types";

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpenPolicies, setDropdownOpenPolicies] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768); // Track if the screen is wide

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRefPolicies = useRef<HTMLDivElement>(null);

  const { logout } = useLogout();
  const { auth }: AuthContextType = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHomePage = () => {
    navigate("/homepage");
  };

  const handleProtocols = () => {
    navigate("/protocols");
  };

  const handleRules = () => {
    navigate("/rules");
  };

  const handleProfile = () => {
    navigate(`/view-profile/${auth!.id}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const toggleDropdownPolicies = () => {
    setDropdownOpenPolicies((prevState) => !prevState);
  };

  const handleLogOut = async () => {
    logout();
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        dropdownRefPolicies.current &&
        !dropdownRefPolicies.current.contains(event.target as Node)
      ) {
        setDropdownOpenPolicies(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-screen">
      <header className="flex relative items-center md:justify-evenly font-syke-medium w-full p-4 z-50">
        <div className="flex items-center md:w-auto w-full">
          <img
            onClick={handleHomePage}
            src="../assets/5.png"
            alt="Logo"
            className="z-50 object-contain md:w-16 md:h-16 w-12 h-12 transition-transform duration-300 hover:scale-105"
          />
          <h1
            onClick={handleHomePage}
            className="text-md z-50 text-left md:text-xl hover:text-textgreen text-white">
            CodeGreen Gateway
          </h1>
        </div>

        {isWideScreen ? (
          <nav className="flex flex-row space-x-20 text-white font-syke-medium z-50">
            <Link
              to="/about"
              className="hover:text-textgreen transition-colors">
              About
            </Link>

            <div
              className="relative"
              ref={dropdownRefPolicies}>
              <button
                onClick={toggleDropdownPolicies}
                className="hover:text-textgreen transition-colors z-50">
                Policies
              </button>
              {isDropdownOpenPolicies && (
                <div className="absolute mt-2 w-48 bg-hoverbutton text-white rounded-md shadow-lg">
                  <span
                    onClick={handleProtocols}
                    className="z-50 block px-4 py-2 hover:bg-buttongreen rounded-t-md cursor-pointer">
                    Protocols
                  </span>
                  <span
                    onClick={handleRules}
                    className="z-50 block px-4 py-2 hover:bg-buttongreen rounded-b-md cursor-pointer">
                    Rules and Regulations
                  </span>
                </div>
              )}
            </div>

            <div
              className="relative z-50"
              ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="hover:text-textgreen transition-colors">
                Account
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-hoverbutton text-white rounded-md shadow-lg">
                  <span
                    onClick={handleProfile}
                    className="block px-4 py-2 hover:bg-buttongreen rounded-t-md cursor-pointer transition-colors">
                    Profile
                  </span>
                  <span
                    onClick={handleChangePassword}
                    className="block px-4 py-2 hover:bg-buttongreen cursor-pointer transition-colors">
                    Change Password
                  </span>
                  <span
                    onClick={handleLogOut}
                    className="block px-4 py-2 hover:bg-buttongreen rounded-b-md cursor-pointer transition-colors">
                    Log Out
                  </span>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <button
            title="menu"
            onClick={toggleMobileMenu}
            className="text-white md:hidden focus:outline-none block z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        )}
      </header>

      {!isWideScreen && isMobileMenuOpen && (
        <nav className="flex flex-col absolute font-syke-medium items-center space-y-5 text-white bg-hoverbutton p-4 rounded right-2 top-16 z-50">
          <Link
            to="/about"
            className="hover:text-textgreen transition-colors">
            About
          </Link>
          <button
            onClick={toggleDropdownPolicies}
            className="hover:text-textgreen transition-colors">
            Policies
          </button>
          {isDropdownOpenPolicies && (
            <div className="w-full bg-hoverbutton text-white rounded-md shadow-lg">
              <span
                onClick={handleProtocols}
                className="block px-4 py-2 hover:bg-buttongreen cursor-pointer transition-colors">
                Protocols
              </span>
              <span
                onClick={handleRules}
                className="block px-4 py-2 hover:bg-buttongreen cursor-pointer transition-colors">
                Rules and Regulations
              </span>
            </div>
          )}
          <button
            onClick={toggleDropdown}
            className="hover:text-textgreen">
            Account
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-hoverbutton text-white rounded-md shadow-lg z-10">
              <span
                onClick={handleProfile}
                className="block px-4 py-2 hover:bg-buttongreen cursor-pointer transition-colors">
                Profile
              </span>
              <span
                onClick={handleChangePassword}
                className="block px-4 py-2 hover:bg-buttongreen cursor-pointer transition-colors">
                Change Password
              </span>
              <span
                onClick={handleLogOut}
                className="block px-4 py-2 hover:bg-buttongreen cursor-pointer">
                Log Out
              </span>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

export default Header;
