import Sidebar from "../components/Sidebar";
import {
  FaBoxOpen,
  FaLayerGroup,
  FaExclamationTriangle,
  FaChartLine,
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const lowStockItems = [
    { name: "Smartphone", quantity: 3 },
    { name: "Laptop", quantity: 2 },
    { name: "Headphones", quantity: 5 },
  ];

  const recentSales = [
    { product: "Smartphone", price: "$500" },
    { product: "Laptop", price: "$1200" },
    { product: "Headphones", price: "$150" },
  ];

  const topSellingProducts = [
    { name: "Smartphone", icon: <FaMobileAlt />, price: "$500" },
    { name: "Laptop", icon: <FaLaptop />, price: "$1200" },
    { name: "Headphones", icon: <FaHeadphones />, price: "$150" },
  ];

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 8, 17, 14, 22],
        borderColor: "#10b981", // Emerald 500
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Monthly Sales Trend",
        color: "#ffffff",
        font: { size: 16, family: "'Plus Jakarta Sans'" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex min-h-screen font-['Plus_Jakarta_Sans']">
      {/* Sidebar - Already contains its own background */}
      <Sidebar />

      <main className="flex-1 p-8 text-white overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-emerald-400/80 text-lg">
            Welcome back! Here is what's happening today.
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Products", value: "150", icon: <FaBoxOpen />, color: "text-blue-400" },
            { title: "Total Stock", value: "320", icon: <FaLayerGroup />, color: "text-emerald-400" },
            { title: "Low Stock", value: "10", icon: <FaExclamationTriangle />, color: "text-red-400" },
            { title: "Total Sales", value: "75", icon: <FaChartLine />, color: "text-purple-400" },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${card.color} text-2xl`}>
                  {card.icon}
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                  +12.5%
                </span>
              </div>
              <div>
                <p className="text-gray-400 font-medium">{card.title}</p>
                <p className="text-3xl font-bold mt-1">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Section: Chart & Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 h-96 shadow-xl">
            <Line data={salesData} options={salesOptions} />
          </div>

          {/* Low Stock Items */}
          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 h-96 flex flex-col shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Low Stock Items
            </h3>

            <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-200 font-medium">{item.name}</span>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 font-bold text-sm">
                    {item.quantity} left
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full py-3 rounded-xl bg-emerald-500 text-[#1a2223] font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
              Restock All
            </button>
          </div>
        </div>

        {/* Bottom Section: Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Sales */}
          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Recent Sales</h3>
            <div className="space-y-3">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg border-b border-white/5 hover:bg-white/5 transition">
                  <span className="text-gray-300">{sale.product}</span>
                  <span className="font-bold text-emerald-400">{sale.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling */}
          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Top Selling Products</h3>
            <div className="space-y-3">
              {topSellingProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg border-b border-white/5 hover:bg-white/5 transition">
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-blue-400 bg-blue-400/10 p-2 rounded-lg">{product.icon}</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <span className="font-bold text-white">{product.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;