// src/pages/Sales.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Truck,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const active = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-[#111730] text-white p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        📦 InventoryMS
      </h1>

      <nav className="space-y-2 flex-1">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/dashboard") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <LayoutDashboard size={24} /> Dashboard
        </Link>
        <Link
          to="/products"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/products") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <Package size={24} /> Products
        </Link>
        <Link
          to="/categories"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/categories") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <Layers size={24} /> Categories
        </Link>
        <Link
          to="/suppliers"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/suppliers") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <Truck size={24} /> Suppliers
        </Link>
        <Link
          to="/stock"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/stock") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <ShoppingCart size={24} /> Stock
        </Link>
        <Link
          to="/sales"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/sales") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <ShoppingCart size={24} /> Sales
        </Link>
        <Link
          to="/reports"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/reports") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <BarChart3 size={24} /> Reports
        </Link>
        <Link
          to="/users"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/users") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <Users size={24} /> Users
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
            active("/settings") ? "bg-[#5854ea] text-white" : "text-[#758199] hover:bg-[#292751] hover:text-white"
          }`}
        >
          <Settings size={24} /> Settings
        </Link>
      </nav>

      <div className="border-t border-[#292751] pt-4 mt-4">
        <button className="flex items-center gap-2 text-red-400 hover:text-red-500">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

const Sales = () => {
  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Sales</h1>
        <p className="text-gray-600 mb-6">View and manage all sales transactions.</p>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Recent Sales</h2>
            <ul className="text-gray-700">
              <li>INV-001 — Rs 2,500</li>
              <li>INV-002 — Rs 5,800</li>
              <li>INV-003 — Rs 1,200</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Top Selling Products</h2>
            <ul className="text-gray-700">
              <li>Pain Relief Cream — 320 sold</li>
              <li>Wireless Mouse — 245 sold</li>
              <li>Vitamin C Tablets — 180 sold</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sales;
