import { useState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Stock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [search, setSearch] = useState("");

  /* 🔹 Load stock from localStorage (products se) */
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      const products = JSON.parse(savedProducts);

      // Stock view banane ke liye products ko map kar rahe hain
      const stockData = products.map((p, index) => ({
        id: index + 1,
        name: p.name || "N/A",
        category: p.category || "N/A",
        stock: p.stock || 0,
      }));

      setStockItems(stockData);
    }
  }, []);

  const filteredStock = stockItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Stock Management</h1>

          <input
            type="text"
            placeholder="Search product stock..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 px-4 py-2 border rounded-md text-lg"
          />
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-lg">ID</th>
                <th className="px-6 py-4 text-lg">Product Name</th>
                <th className="px-6 py-4 text-lg">Category</th>
                <th className="px-6 py-4 text-lg">Stock Qty</th>
                <th className="px-6 py-4 text-lg">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredStock.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 text-lg"
                  >
                    No stock data found.
                  </td>
                </tr>
              ) : (
                filteredStock.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.stock}</td>
                    <td className="px-6 py-4">
                      {item.stock <= 5 ? (
                        <span className="flex items-center gap-2 text-red-600 font-semibold">
                          <FiAlertTriangle size={20} />
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= INFO NOTE ================= */}
        <div className="mt-4 text-gray-600">
          <p>
            🔔 Products with stock quantity ≤ 5 are marked as <b>Low Stock</b>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Stock;


