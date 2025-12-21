import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  /* 🔹 Load suppliers on refresh */
  useEffect(() => {
    const saved = localStorage.getItem("suppliers");
    if (saved) {
      setSuppliers(JSON.parse(saved));
    }
  }, []);

  /* 🔹 Save suppliers */
  useEffect(() => {
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
  }, [suppliers]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* 🔹 Add / Update supplier (NO compulsory fields) */
  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...suppliers];
      updated[editingIndex] = formData;
      setSuppliers(updated);
      setEditingIndex(null);
    } else {
      setSuppliers([...suppliers, formData]);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(suppliers[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    setSuppliers(suppliers.filter((_, i) => i !== index));
  };

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Supplier Management</h1>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3 px-4 py-2 border rounded-md text-lg"
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#4f46e5] text-white text-lg rounded hover:bg-indigo-600"
            >
              <FiPlus size={20} /> Add Supplier
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-lg">ID</th>
                <th className="px-6 py-4 text-lg">Name</th>
                <th className="px-6 py-4 text-lg">Email</th>
                <th className="px-6 py-4 text-lg">Phone</th>
                <th className="px-6 py-4 text-lg">Address</th>
                <th className="px-6 py-4 text-lg">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSuppliers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-500 text-lg"
                  >
                    No suppliers found.
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map((sup, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4">{sup.name}</td>
                    <td className="px-6 py-4">{sup.email}</td>
                    <td className="px-6 py-4">{sup.phone}</td>
                    <td className="px-6 py-4">{sup.address}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        <FiEdit size={20} /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(idx)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FiTrash2 size={20} /> Delete
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
                {editingIndex !== null ? "Edit Supplier" : "Add Supplier"}
              </h2>

              <input
                name="name"
                placeholder="Supplier Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                name="address"
                placeholder="Address"
                value={formData.address}
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
                  {editingIndex !== null ? "Update Supplier" : "Add Supplier"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Suppliers;
