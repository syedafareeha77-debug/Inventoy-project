// src/pages/Products.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash } from "lucide-react";
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
  LogOut,
  Bell,
} from "lucide-react";

const categories = ["Electronics", "Medicine", "Grocery"];
const suppliers = ["Supplier A", "Supplier B", "Supplier C"];

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = (path) => location.pathname === path;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    supplier: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const resetForm = () => setForm({ id: null, name: "", description: "", price: "", stock: "", category: "", supplier: "" });

  const addProduct = () => {
    setProducts([...products, { ...form, id: Date.now() }]);
    setShowAdd(false);
    resetForm();
  };

  const openEdit = (p) => {
    setForm(p);
    setShowEdit(true);
  };

  const updateProduct = () => {
    setProducts(products.map((p) => (p.id === form.id ? form : p)));
    setShowEdit(false);
    resetForm();
  };

  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
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

        <button
          onClick={logoutHandler}
          className="mt-4 flex items-center gap-2 bg-[#5854ea] text-white py-2 px-3 rounded-lg text-lg"
        >
          <LogOut size={24} /> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3 bg-gray-200 px-4 py-2 rounded-lg w-full md:w-80">
            <Search size={24} className="text-gray-500" />
            <input
              placeholder="Search product..."
              className="bg-transparent outline-none w-full text-base md:text-lg font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={24} className="text-yellow-400" />
            <img src="https://i.pravatar.cc/40" alt="admin" className="w-10 h-10 rounded-full" />
          </div>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-4">Products</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#5854ea] text-white px-6 py-2 md:px-7 md:py-3 rounded-xl flex items-center gap-2 text-lg font-bold mb-6"
        >
          <Plus size={20} /> Add Product
        </button>

        {/* Products Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full min-w-[600px] text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Category</th>
                <th className="p-4 text-left font-semibold">Supplier</th>
                <th className="p-4 text-left font-semibold">Price</th>
                <th className="p-4 text-left font-semibold">Stock</th>
                <th className="p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-400">
                    No products added
                  </td>
                </tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4">{p.supplier}</td>
                  <td className="p-4">Rs {p.price}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => openEdit(p)} className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
                      <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
                      <Trash size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD / EDIT MODAL */}
        {showAdd && (
          <Modal form={form} setForm={setForm} categories={categories} suppliers={suppliers} onCancel={() => setShowAdd(false)} onSubmit={addProduct} title="Add Product" submitText="Add Product" />
        )}
        {showEdit && (
          <Modal form={form} setForm={setForm} categories={categories} suppliers={suppliers} onCancel={() => setShowEdit(false)} onSubmit={updateProduct} title="Edit Product" submitText="Update Product" />
        )}
      </main>
    </div>
  );
}

/* Modal Component */
const Modal = ({ title, form, setForm, categories, suppliers, onCancel, onSubmit, submitText }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 md:p-8 rounded-xl w-[95%] max-w-xl text-base">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input type="number" className="w-full border p-2 rounded" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input type="number" className="w-full border p-2 rounded" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <select className="w-full border p-2 rounded" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="w-full border p-2 rounded" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })}>
          <option value="">Select Supplier</option>
          {suppliers.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onCancel} className="px-4 py-2 border rounded-lg">Cancel</button>
        <button onClick={onSubmit} className="px-4 py-2 bg-[#5854ea] text-white rounded-lg">{submitText}</button>
      </div>
    </div>
  </div>
);

const SidebarLink = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-3 rounded-lg font-bold text-lg transition ${
      active ? "bg-[#5854ea] text-white" : "text-white hover:bg-[#292751] hover:text-white"
    }`}
  >
    {icon}
    {label}
  </Link>
);

export default Products;


