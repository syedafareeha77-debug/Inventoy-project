// src/pages/Users.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Layers, Truck, Boxes, ShoppingCart, BarChart3, Users, Settings, LogOut, Bell } from "lucide-react";

const UsersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = (path) => location.pathname === path;
  const logoutHandler = () => { localStorage.removeItem("token"); navigate("/login"); };

  const users = [
    { name: "Alice", role: "Admin" },
    { name: "Bob", role: "Manager" },
    { name: "Charlie", role: "Staff" },
  ];

  return (
    <div className="flex min-h-screen font-sans">
      <aside className="w-64 bg-[#111730] text-white flex flex-col p-5">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">📦 InventoryMS</h1>
        <nav className="flex-1 space-y-3">
          <SidebarLink to="/" icon={<LayoutDashboard size={28} color="#4f46e5" />} label="Dashboard" active={active("/")} />
          <SidebarLink to="/products" icon={<Package size={28} color="#ff6b6b" />} label="Products" active={active("/products")} />
          <SidebarLink to="/categories" icon={<Layers size={28} color="#f59e0b" />} label="Categories" active={active("/categories")} />
          <SidebarLink to="/suppliers" icon={<Truck size={28} color="#10b981" />} label="Suppliers" active={active("/suppliers")} />
          <SidebarLink to="/stock" icon={<Boxes size={28} color="#8b5cf6" />} label="Stock" active={active("/stock")} />
          <SidebarLink to="/sales" icon={<ShoppingCart size={28} color="#f97316" />} label="Sales" active={active("/sales")} />
          <SidebarLink to="/reports" icon={<BarChart3 size={28} color="#3b82f6" />} label="Reports" active={active("/reports")} />
          <SidebarLink to="/users" icon={<Users size={28} color="#ec4899" />} label="Users" active={active("/users")} />
          <SidebarLink to="/settings" icon={<Settings size={28} color="#14b8a6" />} label="Settings" active={active("/settings")} />
        </nav>

        <button onClick={logoutHandler} className="mt-4 flex items-center gap-2 bg-[#5854ea] text-white py-2 px-3 rounded-lg text-lg">
          <LogOut size={24} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 bg-gray-200 px-4 py-2 rounded-lg w-full md:w-80">
            <Bell size={24} className="text-yellow-400" />
            <input placeholder="Search users..." className="bg-transparent outline-none w-full text-base md:text-lg font-medium" />
          </div>
          <div className="flex items-center gap-4">
            <img src="https://i.pravatar.cc/40" alt="admin" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Users</h1>
        <div className="bg-white p-6 rounded-xl shadow">
          <table className="w-full text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.name} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, active }) => (
  <Link to={to} className={`flex items-center gap-3 px-3 py-3 rounded-lg font-bold text-lg transition ${active ? "bg-[#5854ea] text-white" : "text-white hover:bg-[#292751] hover:text-white"}`}>{icon} {label}</Link>
);

export default UsersPage;
