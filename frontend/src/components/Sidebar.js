import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, FaBoxOpen, FaThList, FaTruck, FaLayerGroup, 
  FaChartLine, FaFileAlt, FaUsers, FaCog, FaSignOutAlt, FaBoxes 
} from "react-icons/fa"; // FaBoxes icon import kiya hai

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt className="inline mr-4" style={{ fontSize: "28px", color: "#4ade80" }} /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen className="inline mr-4" style={{ fontSize: "28px", color: "#60a5fa" }} /> },
    { name: "Categories", path: "/categories", icon: <FaThList className="inline mr-4" style={{ fontSize: "28px", color: "#f472b6" }} /> },
    { name: "Suppliers", path: "/suppliers", icon: <FaTruck className="inline mr-4" style={{ fontSize: "28px", color: "#fbbf24" }} /> },
    { name: "Stock", path: "/stock", icon: <FaLayerGroup className="inline mr-4" style={{ fontSize: "28px", color: "#2dd4bf" }} /> },
    { name: "Sales", path: "/sales", icon: <FaChartLine className="inline mr-4" style={{ fontSize: "28px", color: "#a78bfa" }} /> },
    { name: "Reports", path: "/reports", icon: <FaFileAlt className="inline mr-4" style={{ fontSize: "28px", color: "#fb923c" }} /> },
    { name: "Users", path: "/users", icon: <FaUsers className="inline mr-4" style={{ fontSize: "28px", color: "#22d3ee" }} /> },
    { name: "Settings", path: "/settings", icon: <FaCog className="inline mr-4" style={{ fontSize: "28px", color: "#94a3b8" }} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className="w-72 min-h-screen text-white flex flex-col p-6 shadow-2xl"
      style={{ 
        backgroundColor: "#031612ff", 
        fontFamily: "'Plus Jakarta Sans', sans-serif" 
      }}
    >
      {/* Header - No Italic + New Icon */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold flex items-center tracking-tight text-white">
          <FaBoxes className="mr-3 text-3xl text-emerald-500" /> 
          Inventory
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1.5">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-3 text-lg font-medium flex items-center transition-all duration-200 no-underline rounded-lg ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500 shadow-sm"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {link.icon} {link.name}
          </NavLink>
        ))}

        {/* Separator Line */}
        <div className="mt-4 mb-2 border-t-2 border-gray-600/40"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-lg font-semibold text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200 group"
        >
          <FaSignOutAlt className="mr-4 group-hover:translate-x-1 transition-transform" style={{ fontSize: "28px" }} /> 
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;