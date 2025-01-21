import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import Password from "./Password";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1698399571308-eb24469d6320?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Blog"
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Account</h1>
          <p className="text-lg text-center mb-4">
            Manage your orders, track deliveries, and update your details all in
            one place.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex bg-gray-50 shadow-md rounded-lg">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 dark:bg-gray-800 p-6 rounded-l-lg">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">My Account</h2>
            <p className="text-gray-600 mt-2">
              Hello{" "}
              <span className="font-bold">{user.fullName || "User"}</span>,
              this is your account dashboard. See your previous orders, delivery
              locations, and contact information.
            </p>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Tasks
          </h2>
          <div className="space-y-4">
            {[{ id: "profile", label: "Edit My Profile" }, { id: "change-password", label: "Change Password" }]
              .map((tab) => (
                <button
                  key={tab.id}
                  className={`w-full text-left px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="w-3/4 p-6 bg-white rounded-r-lg">
          {activeTab === "profile" && <EditProfile />}
          {activeTab === 'change-password' && <Password />}  {/* Correct usage of ChangePassword */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
