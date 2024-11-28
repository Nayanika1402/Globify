import React from "react";

// Utility function to get initials
const getInitials = (name) => {
  if (!name) return "?";
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initials;
};

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    // Return null or a placeholder when userInfo is null
    return null;
  }

  return (
    userInfo && (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo.fullName || "")}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo.fullName || ""}</p>
        <button
          className="text-sm text-slate-700 underline"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
    )
  );
};

export default ProfileInfo;
