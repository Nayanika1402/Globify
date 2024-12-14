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
        {/* Profile Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-medium">
          {getInitials(userInfo.fullName || "")}
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
