import { useState } from "react";
import { FiUser, FiMail, FiLock, FiBell, FiMoon, FiSun, FiSave, FiSettings, FiCamera } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [formData, setFormData] = useState({
    username: "JohnDoe",
    email: "john@example.com",
    password: "",
    theme: "dark",
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
    // Show a sleek success notification (mock)
    alert("Settings updated successfully! ✨");
  };

  return (
    <div className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">System Settings</h1>
          <p className="text-emerald-400/80">Manage your profile, preferences, and account security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ================= LEFT: PROFILE CARD ================= */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center text-4xl font-black text-[#1a2223]">
                  {formData.username.charAt(0)}
                </div>
                <button className="absolute bottom-1 right-1 p-2 bg-emerald-500 rounded-full text-[#1a2223] border-4 border-[#1a2223] hover:scale-110 transition-transform">
                  <FiCamera size={16} />
                </button>
              </div>
              <h2 className="text-xl font-bold">{formData.username}</h2>
              <p className="text-gray-400 text-sm mb-6">{formData.email}</p>
              <div className="pt-6 border-t border-white/10 text-left space-y-3">
                <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Account Status</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Verified Administrator
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: SETTINGS FORMS ================= */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Profile Settings */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
                <FiUser /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Username</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-4 text-gray-500" />
                    <input name="username" value={formData.username} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-4 text-gray-500" />
                    <input name="email" value={formData.email} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">New Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-4 text-gray-500" />
                    <input name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
                <FiSettings /> Preferences
              </h2>
              <div className="space-y-6">
                {/* Theme Selector */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      {formData.theme === "dark" ? <FiMoon size={20}/> : <FiSun size={20}/>}
                    </div>
                    <div>
                      <p className="font-bold">System Theme</p>
                      <p className="text-xs text-gray-500">Choose your preferred visual mode.</p>
                    </div>
                  </div>
                  <select name="theme" value={formData.theme} onChange={handleChange}
                    className="bg-[#1a2223] border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-emerald-500">
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </select>
                </div>

                {/* Notifications Switch */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                      <FiBell size={20} />
                    </div>
                    <div>
                      <p className="font-bold">Email Notifications</p>
                      <p className="text-xs text-gray-500">Get alerts for low stock and new orders.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="notifications" checked={formData.notifications} onChange={handleChange} className="sr-only peer" />
                    <div className="w-12 h-6 bg-white/10 rounded-full peer peer-checked:bg-emerald-500 transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6"></div>
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <button onClick={handleSave}
                className="w-full md:w-auto mt-8 flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-[#1a2223] font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                <FiSave size={20} /> Save All Changes
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;