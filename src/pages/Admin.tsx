import { AdminPanel } from "@/components/AdminPanel";

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
        <AdminPanel />
      </div>
    </div>
  );
};

export default Admin;