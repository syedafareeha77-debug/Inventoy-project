import Sidebar from "../components/Sidebar";

const Users = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Users</h1>
        <p>Users page working</p>
      </main>
    </div>
  );
};

export default Users;

