import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [formData, setFormData] = useState({
    username: "JohnDoe",
    email: "john@example.com",
    password: "",
    theme: "light",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("Settings saved!");
    // Yahan aap API call karke save kar sakte hain
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-700">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Settings Card */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Settings</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Preferences & Notifications Card */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Theme</span>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-500 transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"></div>
              </label>
            </div>

            <button
              onClick={handleSave}
              className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;


