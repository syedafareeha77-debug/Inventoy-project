import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    supplier: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddOrEditProduct = () => {
    if (!newProduct.name) return; // simple validation

    if (editingIndex !== null) {
      const updated = [...products];
      updated[editingIndex] = newProduct;
      setProducts(updated);
      setEditingIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setNewProduct({
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
    setNewProduct(products[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#4f46e5] text-white px-4 py-2 rounded hover:bg-indigo-600 flex items-center gap-1"
            >
              <FiPlus size={18} /> Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full bg-white shadow rounded-md overflow-hidden text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Supplier</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Stock</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No products added yet.
                </td>
              </tr>
            ) : (
              products.map((prod, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{prod.name}</td>
                  <td className="px-6 py-4">{prod.category}</td>
                  <td className="px-6 py-4">{prod.supplier}</td>
                  <td className="px-6 py-4">{prod.price}</td>
                  <td className="px-6 py-4">{prod.stock}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(idx)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-96 p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingIndex !== null ? "Edit Product" : "Add New Product"}
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newProduct.name}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                className="w-full mb-2 px-3 py-2 border rounded"
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
              </select>
              <select
                name="supplier"
                value={newProduct.supplier}
                onChange={handleChange}
                className="w-full mb-4 px-3 py-2 border rounded"
              >
                <option value="">Select Supplier</option>
                <option value="Supplier A">Supplier A</option>
                <option value="Supplier B">Supplier B</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingIndex(null);
                  }}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOrEditProduct}
                  className="px-4 py-2 bg-[#4f46e5] text-white rounded hover:bg-indigo-600"
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
