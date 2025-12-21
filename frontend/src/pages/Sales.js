import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
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
    date: "",
  });

  /* 🔹 Load from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("sales");
    if (saved) setSales(JSON.parse(saved));
  }, []);

  /* 🔹 Save to localStorage */
  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* 🔹 Add / Update Sale */
  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...sales];
      updated[editingIndex] = formData;
      setSales(updated);
      setEditingIndex(null);
    } else {
      setSales([...sales, formData]);
    }

    setFormData({
      product: "",
      customer: "",
      quantity: "",
      price: "",
      total: "",
      date: "",
    });

    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(sales[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    setSales(sales.filter((_, i) => i !== index));
  };

  const filteredSales = sales.filter((s) =>
    s.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Sales Management</h1>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search sales..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3 px-4 py-2 border rounded-md text-lg"
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#4f46e5] text-white text-lg rounded hover:bg-indigo-600"
            >
              <FiPlus size={22} /> Add Sale
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-lg">ID</th>
                <th className="px-6 py-4 text-lg">Product</th>
                <th className="px-6 py-4 text-lg">Customer</th>
                <th className="px-6 py-4 text-lg">Quantity</th>
                <th className="px-6 py-4 text-lg">Price</th>
                <th className="px-6 py-4 text-lg">Total</th>
                <th className="px-6 py-4 text-lg">Date</th>
                <th className="px-6 py-4 text-lg">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSales.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-6 text-gray-500 text-lg"
                  >
                    No sales records found.
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4">{sale.product}</td>
                    <td className="px-6 py-4">{sale.customer}</td>
                    <td className="px-6 py-4">{sale.quantity}</td>
                    <td className="px-6 py-4">{sale.price}</td>
                    <td className="px-6 py-4">{sale.total}</td>
                    <td className="px-6 py-4">{sale.date}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        <FiEdit size={22} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(idx)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FiTrash2 size={22} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MODAL ================= */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">
                {editingIndex !== null ? "Update Sale" : "Add Sale"}
              </h2>

              <input
                name="product"
                placeholder="Product Name"
                value={formData.product}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="customer"
                placeholder="Customer Name"
                value={formData.customer}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="total"
                type="number"
                placeholder="Total"
                value={formData.total}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 border rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingIndex(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddOrUpdate}
                  className="px-4 py-2 bg-[#4f46e5] text-white rounded"
                >
                  {editingIndex !== null ? "Update Sale" : "Add Sale"}
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

