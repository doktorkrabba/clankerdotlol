import { SubmitLinkForm } from "@/components/SubmitLinkForm";

const Submit = () => {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Submit Content</h1>
        
        <p className="text-center text-white italic text-sm mb-4">
          Your link will be added to the Clanker feed if deemed humorous enough by the Clanker Master 🤖
        </p>
        
        <SubmitLinkForm />
      </div>
    </div>
  );
};

export default Submit;