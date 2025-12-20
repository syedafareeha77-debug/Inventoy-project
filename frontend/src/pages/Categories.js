import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [search, setSearch] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("categories");
    if (saved) setCategories(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateCategory = () => {
    if (!newCategory.name) return;

    if (editingIndex !== null) {
      // Update existing category
      const updated = [...categories];
      updated[editingIndex] = newCategory;
      setCategories(updated);
      setEditingIndex(null);
    } else {
      // Add new category
      setCategories([...categories, newCategory]);
    }

    setNewCategory({ name: "", description: "" });
  };

  const handleEdit = (index) => {
    setNewCategory(categories[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>

        <div className="flex gap-6">
          {/* Left Form */}
          <div className="w-1/3 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Edit Category" : "Add New Category"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              value={newCategory.name}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded text-lg"
            />
            <textarea
              name="description"
              placeholder="Category description (optional)"
              value={newCategory.description}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded text-lg"
              rows={4}
            ></textarea>
            <button
              onClick={handleAddOrUpdateCategory}
              className="w-full px-4 py-2 bg-[#4f46e5] text-white rounded hover:bg-indigo-600 text-lg flex items-center justify-center gap-2"
            >
              <FiPlus size={18} />
              {editingIndex !== null ? "Update Category" : "Add Category"}
            </button>
          </div>

          {/* Right Table */}
          <div className="w-2/3 bg-white p-6 rounded shadow flex flex-col">
            <label className="mb-2 text-lg font-medium">Category Name</label>
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 px-4 py-2 border rounded text-lg"
            />
            <table className="min-w-full border rounded text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-lg">ID</th>
                  <th className="px-6 py-4 font-medium text-lg">Name</th>
                  <th className="px-6 py-4 font-medium text-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500 text-lg">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-lg">{idx + 1}</td>
                      <td className="px-6 py-4 text-lg">{cat.name}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-lg"
                        >
                          <FiEdit size={20} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-lg"
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
        </div>
      </main>
    </div>
  );
};

export default Categories;





