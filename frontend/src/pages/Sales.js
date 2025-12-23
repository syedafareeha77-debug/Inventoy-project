import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiDollarSign, FiCalendar, FiUser, FiShoppingCart } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    product: "",
    customer: "",
    quantity: "",
    price: "",
    total: "",
    date: new Date().toISOString().split('T')[0], // Default today's date
  });

  useEffect(() => {
    const saved = localStorage.getItem("sales");
    if (saved) setSales(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  // Auto-calculate total when quantity or price changes
  useEffect(() => {
    const q = parseFloat(formData.quantity) || 0;
    const p = parseFloat(formData.price) || 0;
    setFormData(prev => ({ ...prev, total: (q * p).toFixed(2) }));
  }, [formData.quantity, formData.price]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...sales];
      updated[editingIndex] = formData;
      setSales(updated);
      setEditingIndex(null);
    } else {
      setSales([...sales, formData]);
    }
    setFormData({ product: "", customer: "", quantity: "", price: "", total: "", date: new Date().toISOString().split('T')[0] });
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(sales[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this sales record?")) {
      setSales(sales.filter((_, i) => i !== index));
    }
  };

  const filteredSales = sales.filter((s) =>
    s.product.toLowerCase().includes(search.toLowerCase()) || 
    s.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sales Records</h1>
          <p className="text-emerald-400/80">Track every transaction and monitor revenue performance.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by product or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-all backdrop-blur-md"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-[#1a2223] font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 w-full md:w-auto justify-center"
          >
            <FiPlus size={22} /> Add New Sale
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-white/10 text-emerald-400 uppercase text-xs tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-5">Date</th>
                  <th className="px-6 py-5">Product & Customer</th>
                  <th className="px-6 py-5 text-center">Qty</th>
                  <th className="px-6 py-5">Total Amount</th>
                  <th className="px-6 py-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400 italic text-lg">
                      No sales records found.
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((sale, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
                          <FiCalendar className="text-emerald-500/50" /> {sale.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white flex items-center gap-2">
                            <FiShoppingCart className="text-blue-400" size={14}/> {sale.product}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-2">
                            <FiUser className="text-gray-600" size={12}/> {sale.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-300">
                        {sale.quantity}
                      </td>
                      <td className="px-6 py-4 font-black text-emerald-400 text-lg">
                        ${sale.total}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => handleEdit(idx)} className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-all">
                            <FiEdit size={18} />
                          </button>
                          <button onClick={() => handleDelete(idx)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MODAL ================= */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#1a2223]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a2223] border border-white/10 w-full max-w-md p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-emerald-400">
                {editingIndex !== null ? "Edit Transaction" : "New Sale Entry"}
              </h2>

              <div className="space-y-4">
                <input name="product" placeholder="Product Name" value={formData.product} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                
                <input name="customer" placeholder="Customer Name" value={formData.customer} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />

                <div className="grid grid-cols-2 gap-4">
                  <input name="quantity" type="number" placeholder="Qty" value={formData.quantity} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                  <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all" />
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex justify-between items-center">
                  <span className="text-emerald-500 font-bold uppercase text-xs tracking-widest">Calculated Total</span>
                  <span className="text-xl font-black text-white">${formData.total}</span>
                </div>

                <input name="date" type="date" value={formData.date} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition-all text-gray-400" />
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button onClick={() => { setIsModalOpen(false); setEditingIndex(null); }} className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={handleAddOrUpdate} className="px-6 py-3 bg-emerald-500 text-[#1a2223] font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                  {editingIndex !== null ? "Update Sale" : "Complete Sale"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Sales;