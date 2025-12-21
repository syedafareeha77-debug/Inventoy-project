import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaShoppingCart, FaUsers, FaMoneyBill, FaUndo } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Reports = () => {
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales ($)",
        data: [12000, 15000, 18000, 20000, 22000, 21000, 24000, 26000, 28000, 30000, 32000, 34000],
        borderColor: "#544de8",
        backgroundColor: "rgba(84,77,232,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#333" } },
    },
    scales: {
      x: { ticks: { color: "#555" } },
      y: { ticks: { color: "#555" } },
    },
  };

  const reportData = [
    { month: "Jan", sales: 12000, orders: 120, status: "Completed" },
    { month: "Feb", sales: 15000, orders: 150, status: "Pending" },
    { month: "Mar", sales: 18000, orders: 200, status: "Completed" },
    { month: "Apr", sales: 20000, orders: 180, status: "Pending" },
    { month: "May", sales: 22000, orders: 210, status: "Completed" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Reports</h1>

        {/* Compact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-indigo-500 text-white rounded-lg p-4 flex items-center gap-3 shadow-md">
            <FaMoneyBill size={28} />
            <div>
              <p className="text-sm font-medium">Total Sales</p>
              <h2 className="text-lg font-bold">$1,200,000</h2>
            </div>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-4 flex items-center gap-3 shadow-md">
            <FaUsers size={28} />
            <div>
              <p className="text-sm font-medium">New Users</p>
              <h2 className="text-lg font-bold">3,450</h2>
            </div>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg p-4 flex items-center gap-3 shadow-md">
            <FaShoppingCart size={28} />
            <div>
              <p className="text-sm font-medium">Orders</p>
              <h2 className="text-lg font-bold">8,730</h2>
            </div>
          </div>
          <div className="bg-red-500 text-white rounded-lg p-4 flex items-center gap-3 shadow-md">
            <FaUndo size={28} />
            <div>
              <p className="text-sm font-medium">Returns</p>
              <h2 className="text-lg font-bold">430</h2>
            </div>
          </div>
        </div>

        {/* Full-Width Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8 h-96">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview (Monthly)</h2>
          <Line data={salesData} options={chartOptions} />
        </div>

        {/* Compact Monthly Report Table */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Report Summary</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-3 py-2 text-left">Month</th>
                <th className="px-3 py-2 text-left">Sales</th>
                <th className="px-3 py-2 text-left">Orders</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.month} className="hover:bg-gray-50 transition">
                  <td className="px-3 py-2">{item.month}</td>
                  <td className="px-3 py-2">${item.sales}</td>
                  <td className="px-3 py-2">{item.orders}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Reports;
