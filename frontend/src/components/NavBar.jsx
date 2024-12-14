import React from "react";

import LOGO from "../assets/images/logo.png";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./input/SearchBar";

const NavBar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      {/* Logo */}
      <img src={LOGO} alt="globify" className="h-11" />

      {isToken && (
        <>
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

          {/* User Info and Logout */}
          <div className="flex items-center gap-6">
            <ProfileInfo userInfo={userInfo} />

            {/* Logout Button */}
            <button
              className="bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
