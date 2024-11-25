import { SubmitLinkForm } from "@/components/SubmitLinkForm";

const Submit = () => {
  return (
    <div 
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: 'url(/lovable-uploads/3d1a1c8d-e818-4eb5-8906-8a822885c0a2.png)' }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[#c0c0c0] p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-800">
          <h1 className="text-4xl font-bold text-black text-center mb-8">Submit Content</h1>
          
          <p className="text-center text-black italic text-sm mb-4">
            Your link will be added to the Clanker feed if deemed humorous enough by the Clanker Master 🤖
          </p>
        </div>
        
        <SubmitLinkForm />
      </div>
    </div>
  );
};

export default Submit;