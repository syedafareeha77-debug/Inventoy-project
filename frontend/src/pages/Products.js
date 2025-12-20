import Sidebar from "../components/Sidebar";

const Products = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p>Products page working</p>
      </main>
    </div>
  );
};

export default Products;

