import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { AppContext } from "../context/AppContext";

export const Header = () => {
  const { cart, user, logout } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null); // Ref for dropdown container

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AppContext
    setDropdownOpen(false); // Close dropdown after logout
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Default profile image if none exists
  const defaultProfileImage = "https://via.placeholder.com/150";

  return (
    <nav className="bg-gray-800 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-yellow-400">
            <NavLink to="/">MVS-Mart</NavLink>
          </div>

          {/* Search Bar (Hidden on smaller screens) */}
          <div className="hidden lg:block relative w-1/3">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 px-4 py-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <BiSearch className="absolute top-2 right-4 text-white text-xl" />
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Account Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center hover:text-yellow-400 transition text-lg"
                >
                  <img
                    src={user?.profileImage || defaultProfileImage}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  {user.name}
                </button>

                {/* Custom Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef} // Attach ref to the dropdown menu container
                    className="absolute right-0 mt-2 w-56 bg-gray-900 text-white rounded-lg shadow-2xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-600 text-sm text-gray-300">
                      {user?.email}
                    </div>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 hover:bg-yellow-400 hover:text-gray-800 transition-all duration-200 ease-in-out"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="block px-4 py-2 hover:bg-yellow-400 hover:text-gray-800 transition-all duration-200 ease-in-out"
                    >
                      Orders
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 hover:bg-yellow-400 hover:text-gray-800 transition-all duration-200 ease-in-out"
                    >
                      Settings
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 bg-gray-800 hover:bg-red-500 hover:text-white transition transform duration-200 ease-in-out hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center hover:text-yellow-400 transition text-lg"
                >
                  <FiLogIn className="mr-2" /> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center hover:text-yellow-400 transition text-lg"
                >
                  <FaUserPlus className="mr-2" /> Register
                </NavLink>
              </>
            )}
            <NavLink
              to="/cart"
              className="relative flex items-center hover:text-yellow-400 transition text-lg"
            >
              <IoCartSharp className="mr-2 text-2xl" /> Cart
              {/* Badge Counter */}
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart?.items?.length}
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-yellow-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`lg:hidden bg-gray-700 text-white overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        {/* Search Bar for Mobile */}
        <div className="p-4">
          <div className="relative">
            <form onSubmit={submitHandler}>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800 px-4 py-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <BiSearch className="absolute top-2 right-4 text-white text-xl" />
            </form>
          </div>
        </div>

        {/* Menu Links */}
        {user ? (
          <>
            <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-600 text-lg">
              Profile
            </NavLink>
            <NavLink to="/orders" className="block px-4 py-2 hover:bg-gray-600 text-lg">
              Orders
            </NavLink>
            <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-600 text-lg">
              Settings
            </NavLink>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-gray-600 text-lg text-red-600 transition transform duration-200 hover:scale-105"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="block px-4 py-2 hover:bg-gray-600 text-lg">
              Login
            </NavLink>
            <NavLink to="/register" className="block px-4 py-2 hover:bg-gray-600 text-lg">
              Register
            </NavLink>
          </>
        )}
        <NavLink
          to="/cart"
          className="relative block px-4 py-2 hover:bg-gray-600 text-lg"
        >
          <IoCartSharp className="inline mr-2 text-2xl" /> Cart
          <span className="absolute top-6 left-24 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cart?.items?.length}
          </span>
        </NavLink>
      </div>
    </nav>
  );
};
