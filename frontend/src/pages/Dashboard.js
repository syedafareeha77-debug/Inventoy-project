import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Layers,
  Truck,
  Boxes,
  ShoppingCart,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 6000 },
];

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={24} />, color: "#4f46e5" },
    { to: "/products", label: "Products", icon: <Package size={24} />, color: "#16a34a" },
    { to: "/categories", label: "Categories", icon: <Layers size={24} />, color: "#f59e0b" },
    { to: "/suppliers", label: "Suppliers", icon: <Truck size={24} />, color: "#ef4444" },
    { to: "/stock", label: "Stock", icon: <Boxes size={24} />, color: "#0ea5e9" },
    { to: "/sales", label: "Sales", icon: <ShoppingCart size={24} />, color: "#14b8a6" },
    { to: "/reports", label: "Reports", icon: <BarChart3 size={24} />, color: "#8b5cf6" },
    { to: "/users", label: "Users", icon: <Users size={24} />, color: "#f472b6" },
    { to: "/settings", label: "Settings", icon: <Settings size={24} />, color: "#f97316" },
  ];

  return (
    <div
      className="flex min-h-screen font-sans"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-[#111730] text-[#667189] p-5 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2 text-white">
          📦 InventoryMS
        </h1>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-[18px] md:text-[20px] ${
                  isActive
                    ? "bg-[#5854ea] text-white"
                    : "hover:text-white hover:bg-[#282651]"
                }`}
              >
                {React.cloneElement(item.icon, {
                  color: isActive ? "white" : item.color,
                })}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-gray-700 pt-4">
          <button
            onClick={logoutHandler}
            className="w-full flex items-center justify-center gap-2 bg-[#5854ea] hover:bg-[#4f46e5] text-white py-2 rounded-lg"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#f4f7fb]">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow mb-6 gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg w-full md:w-96">
            <Search size={24} className="text-gray-400" />
            <input
              placeholder="Search"
              className="bg-transparent outline-none w-full text-base md:text-lg font-medium"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="text-yellow-400" size={24} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-1">Welcome, Admin!</h2>
        <p className="text-gray-500 mb-6">
          Here's an overview of your inventory.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard title="Total Products" value="120" color="blue" />
          <StatCard title="Total Stock" value="850" color="green" />
          <StatCard title="Low Stock Alerts" value="5" color="red" />
          <StatCard title="Total Sales Today" value="₹ 15,200" color="orange" />
        </div>

        {/* Lower Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Box title="Sales Overview">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#5854ea"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          <Box title="Low Stock Items">
            <table className="w-full text-sm">
              <tbody className="divide-y">
                <tr>
                  <td className="py-2">Laptop X200</td>
                  <td className="text-right">2</td>
                </tr>
                <tr>
                  <td className="py-2">Aspirin 50</td>
                  <td className="text-right">4</td>
                </tr>
                <tr>
                  <td className="py-2">Hand Sanitizer</td>
                  <td className="text-right">3</td>
                </tr>
              </tbody>
            </table>
            <button className="mt-4 w-full bg-[#5854ea] text-white py-2 rounded-lg hover:bg-[#4f46e5]">
              Restock
            </button>
          </Box>

          <Box title="Recent Sales">
            <p>INV-001 — Rs 2,500</p>
            <p>INV-002 — Rs 5,800</p>
            <p>INV-003 — Rs 1,200</p>
          </Box>

          <Box title="Top Selling Products">
            <p>Pain Relief Cream — 320 sold</p>
            <p>Wireless Mouse — 245 sold</p>
            <p>Vitamin C Tablets — 180 sold</p>
          </Box>
        </div>
      </main>
    </div>
  );
}

/* Components */

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-semibold">{value}</h3>
    </div>
    <div className={`text-${color}-500 text-3xl`}>⬤</div>
  </div>
);

const Box = ({ title, children }) => (
  <div className="bg-white rounded-xl p-4 shadow">
    <h4 className="font-semibold mb-3">{title}</h4>
    {children}
  </div>
);

export default Dashboard;




