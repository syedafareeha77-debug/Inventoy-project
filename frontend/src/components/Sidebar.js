import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaThList, FaTruck, FaLayerGroup, FaChartLine, FaFileAlt, FaUsers, FaCog, FaSignOutAlt, FaWarehouse } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt className="inline mr-3" style={{ fontSize: "24px", color: "#FF5733" }} /> },
    { name: "Products", path: "/products", icon: <FaBoxOpen className="inline mr-3" style={{ fontSize: "24px", color: "#33C1FF" }} /> },
    { name: "Categories", path: "/categories", icon: <FaThList className="inline mr-3" style={{ fontSize: "24px", color: "#FF33A8" }} /> },
    { name: "Suppliers", path: "/suppliers", icon: <FaTruck className="inline mr-3" style={{ fontSize: "24px", color: "#33FF57" }} /> },
    { name: "Stock", path: "/stock", icon: <FaLayerGroup className="inline mr-3" style={{ fontSize: "24px", color: "#FFC733" }} /> },
    { name: "Sales", path: "/sales", icon: <FaChartLine className="inline mr-3" style={{ fontSize: "24px", color: "#8E33FF" }} /> },
    { name: "Reports", path: "/reports", icon: <FaFileAlt className="inline mr-3" style={{ fontSize: "24px", color: "#FF8E33" }} /> },
    { name: "Users", path: "/users", icon: <FaUsers className="inline mr-3" style={{ fontSize: "24px", color: "#33FFD5" }} /> },
    { name: "Settings", path: "/settings", icon: <FaCog className="inline mr-3" style={{ fontSize: "24px", color: "#FF335E" }} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-[#151936] text-gray-300 flex flex-col justify-between p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-10 flex items-center">
          <FaWarehouse className="mr-3 text-2xl" /> Inventory System
        </h1>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-3 text-2xl font-semibold flex items-center transition-colors no-underline ${isActive
                  ? "bg-[#544de8] text-white rounded-lg"
                  : "text-gray-300 hover:bg-[#3d356c] hover:text-white hover:rounded-lg"
                }`
              }
            >
              {link.icon} {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Section */}
      <div className="mt-6 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full py-2 border border-white text-white bg-transparent hover:bg-white hover:text-[#151936] rounded-md transition font-md text-2xl"
        >
          <FaSignOutAlt className="mr-2" style={{ fontSize: "18px" }} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
