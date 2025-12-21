import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    supplier: "",
  });

  /* 🔹 Load products on refresh */
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  /* 🔹 Save products */
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* 🔹 Add / Update product (NO compulsory fields) */
  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = formData;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, formData]);
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      supplier: "",
    });

    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setFormData(products[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Product Management</h1>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3 px-4 py-2 border rounded-md text-lg"
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#4f46e5] text-white text-lg rounded hover:bg-indigo-600"
            >
              <FiPlus size={22} />
              Add Product
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
                <th className="px-6 py-4 text-lg">Category</th>
                <th className="px-6 py-4 text-lg">Supplier</th>
                <th className="px-6 py-4 text-lg">Price</th>
                <th className="px-6 py-4 text-lg">Stock</th>
                <th className="px-6 py-4 text-lg">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 text-lg"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4">{prod.name}</td>
                    <td className="px-6 py-4">{prod.category}</td>
                    <td className="px-6 py-4">{prod.supplier}</td>
                    <td className="px-6 py-4">{prod.price}</td>
                    <td className="px-6 py-4">{prod.stock}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        <FiEdit size={22} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(idx)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FiTrash2 size={22} />
                        Delete
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
                {editingIndex !== null ? "Edit Product" : "Add New Product"}
              </h2>

              <input
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />

              <input
                name="description"
                placeholder="Description"
                value={formData.description}
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
                name="stock"
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />

              <input
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />

              <input
                name="supplier"
                placeholder="Supplier"
                value={formData.supplier}
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
                  {editingIndex !== null ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;


