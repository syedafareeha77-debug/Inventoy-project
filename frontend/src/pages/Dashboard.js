import Sidebar from "../components/Sidebar";
import { FaBoxOpen, FaLayerGroup, FaExclamationTriangle, FaChartLine, FaMobileAlt, FaLaptop, FaHeadphones } from "react-icons/fa";
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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
    { name: "Smartphone", icon: <FaMobileAlt className="inline mr-2" />, price: "$500" },
    { name: "Laptop", icon: <FaLaptop className="inline mr-2" />, price: "$1200" },
    { name: "Headphones", icon: <FaHeadphones className="inline mr-2" />, price: "$150" },
  ];

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 8, 17, 14, 22],
        borderColor: "#544de8",
        backgroundColor: "rgba(84,77,232,0.2)",
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Sales Overview', font: { size: 20 } },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <h1 className="text-[20px] font-bold mb-2">Dashboard</h1>
        <p className="text-[18px] mb-6 text-gray-600">Welcome to Inventory Management System</p>

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 text-[18px]">
          <div className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-lg flex items-center gap-4 transform transition-transform hover:scale-105">
            <div className="p-3 bg-white rounded-full flex items-center justify-center">
              <FaBoxOpen className="text-[18px] text-blue-600" />
            </div>
            <div>
              <p className="text-[18px] text-gray-200">Total Products</p>
              <p className="text-[18px] font-bold">150</p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl shadow-lg flex items-center gap-4 transform transition-transform hover:scale-105">
            <div className="p-3 bg-white rounded-full flex items-center justify-center">
              <FaLayerGroup className="text-[18px] text-green-600" />
            </div>
            <div>
              <p className="text-[18px] text-gray-200">Total Stock</p>
              <p className="text-[18px] font-bold">320</p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-xl shadow-lg flex items-center gap-4 transform transition-transform hover:scale-105">
            <div className="p-3 bg-white rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-[18px] text-red-600" />
            </div>
            <div>
              <p className="text-[18px] text-gray-200">Low Stock Alerts</p>
              <p className="text-[18px] font-bold">10</p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl shadow-lg flex items-center gap-4 transform transition-transform hover:scale-105">
            <div className="p-3 bg-white rounded-full flex items-center justify-center">
              <FaChartLine className="text-[18px] text-purple-600" />
            </div>
            <div>
              <p className="text-[18px] text-gray-200">Total Sales</p>
              <p className="text-[18px] font-bold">75</p>
            </div>
          </div>
        </div>

        {/* Charts & Low Stock Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Overview Chart */}
          <div className="p-4 bg-white rounded-lg shadow h-80">
            <Line data={salesData} options={salesOptions} />
          </div>

          {/* Low Stock Items */}
          <div className="p-4 bg-white rounded-lg shadow h-80 flex flex-col">
            <p className="text-[20px] font-semibold mb-4">Low Stock Items</p>
            <ul className="flex-1 overflow-y-auto text-[18px]">
              {lowStockItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span>{item.name}</span>
                  <span className="font-semibold">{item.quantity}</span>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-semibold text-[18px]">Restock All</button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Sales */}
          <div className="p-4 bg-white rounded-lg shadow h-60 text-[18px]">
            <p className="text-[20px] font-semibold mb-3">Recent Sales</p>
            <ul>
              {recentSales.map((sale, index) => (
                <li key={index} className="flex justify-between py-1 border-b border-gray-200">
                  <span>{sale.product}</span>
                  <span className="font-semibold">{sale.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Selling Products */}
          <div className="p-4 bg-white rounded-lg shadow h-60 text-[18px]">
            <p className="text-[20px] font-semibold mb-3">Top Selling Products</p>
            <ul>
              {topSellingProducts.map((product, index) => (
                <li key={index} className="flex items-center justify-between py-1 border-b border-gray-200">
                  <span className="flex items-center">{product.icon}{product.name}</span>
                  <span className="font-semibold">{product.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
