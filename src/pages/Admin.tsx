import { AdminPanel } from "@/components/AdminPanel";

const Admin = () => {
  return (
    <div 
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: 'url(/lovable-uploads/3d1a1c8d-e818-4eb5-8906-8a822885c0a2.png)' }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[#c0c0c0] p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-800">
          <h1 className="text-4xl font-bold text-black">Admin Panel</h1>
        </div>
        <AdminPanel />
      </div>
    </div>
  );
};

export default Admin;