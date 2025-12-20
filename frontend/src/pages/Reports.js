import Sidebar from "../components/Sidebar";

const Reports = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Reports</h1>
        <p>Reports page working</p>
      </main>
    </div>
  );
};

export default Reports;

