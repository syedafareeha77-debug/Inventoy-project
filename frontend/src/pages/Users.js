import { useState, useEffect } from "react";
import { FiUserPlus, FiTrash2, FiSearch, FiShield, FiUser, FiMapPin, FiMail } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Users = () => {
  // Load users from localStorage or use defaults
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users_list");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", address: "New York, USA" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", address: "London, UK" },
    ];
  });

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "User",
  });

  useEffect(() => {
    localStorage.setItem("users_list", JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email) return alert("Please fill basic details");
    
    const newUser = {
      id: Date.now(), // Unique ID using timestamp
      ...formData
    };
    setUsers([...users, newUser]);
    setFormData({ name: "", email: "", password: "", address: "", role: "User" });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-emerald-400/80">Control access levels and manage your team members.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ================= LEFT SIDE: ADD USER FORM ================= */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
                <FiUserPlus /> Add New Member
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <FiUser className="absolute left-3 top-4 text-gray-500" />
                  <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                </div>

                <div className="relative">
                  <FiMail className="absolute left-3 top-4 text-gray-500" />
                  <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                </div>

                <input name="password" type="password" placeholder="Temporary Password" value={formData.password} onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />

                <div className="relative">
                  <FiMapPin className="absolute left-3 top-4 text-gray-500" />
                  <input name="address" placeholder="Physical Address" value={formData.address} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                </div>

                <div className="relative">
                  <FiShield className="absolute left-3 top-4 text-gray-500" />
                  <select name="role" value={formData.role} onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-[#1a2223] border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all appearance-none">
                    <option value="User">Standard User</option>
                    <option value="Admin">Administrator</option>
                  </select>
                </div>

                <button onClick={handleAddUser}
                  className="w-full bg-emerald-500 text-[#1a2223] font-bold py-3 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 mt-4">
                  Create Account
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: USERS TABLE ================= */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="mb-6 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-emerald-500 transition-all backdrop-blur-md" />
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/10 text-emerald-400 uppercase text-xs font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-5">Member</th>
                    <th className="px-6 py-5">Role</th>
                    <th className="px-6 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-20 text-gray-500 italic">No members found matching your search.</td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center font-bold text-[#1a2223]">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-lg text-white">{user.name}</div>
                              <div className="text-xs text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                            user.role === "Admin" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button onClick={() => handleDeleteUser(user.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100">
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;