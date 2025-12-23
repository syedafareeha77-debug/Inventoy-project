import { useState, useEffect } from "react";
import { FiAlertTriangle, FiSearch, FiCheckCircle, FiBox } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Stock = () => {
  const [stockItems, setStockItems] = useState([]);
  const [search, setSearch] = useState("");

  /* 🔹 Load stock from localStorage */
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      const products = JSON.parse(savedProducts);
      const stockData = products.map((p, index) => ({
        id: index + 1,
        name: p.name || "N/A",
        category: p.category || "N/A",
        stock: parseInt(p.stock) || 0,
      }));
      setStockItems(stockData);
    }
  }, []);

  const filteredStock = stockItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen text-white font-['Plus_Jakarta_Sans']">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Stock Inventory</h1>
          <p className="text-emerald-400/80">Real-time monitoring of your product availability.</p>
        </div>

        {/* Search & Stats Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search product stock..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-all backdrop-blur-md"
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <FiAlertTriangle /> Low Stock Threshold: 5
            </div>
          </div>
        </div>

        {/* ================= TABLE SECTION ================= */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-white/10 text-emerald-400 uppercase text-xs tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-5">ID</th>
                  <th className="px-6 py-5">Product Details</th>
                  <th className="px-6 py-5 text-center">Current Stock</th>
                  <th className="px-6 py-5 text-center">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredStock.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-gray-400 text-lg italic">
                      No stock data available.
                    </td>
                  </tr>
                ) : (
                  filteredStock.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 text-gray-500 font-mono">#{item.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-lg">{item.name}</span>
                          <span className="text-xs text-emerald-500/60 uppercase tracking-widest">{item.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center">
                           <span className={`text-2xl font-black ${item.stock <= 5 ? 'text-red-400' : 'text-white'}`}>
                             {item.stock}
                           </span>
                           <span className="text-[10px] text-gray-500 uppercase">Units</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {item.stock <= 5 ? (
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold animate-pulse">
                              <FiAlertTriangle /> LOW STOCK
                            </span>
                          ) : (
                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold">
                              <FiCheckCircle /> STABLE
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= FOOTER NOTE ================= */}
        <div className="mt-6 flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl w-fit">
          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
            <FiBox size={20} />
          </div>
          <p className="text-sm text-gray-400">
            <span className="text-emerald-400 font-bold">Inventory Sync:</span> All stock levels are automatically updated based on your <span className="underline italic">Product Management</span> settings.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Stock;