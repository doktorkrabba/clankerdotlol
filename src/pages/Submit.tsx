import { SubmitLinkForm } from "@/components/SubmitLinkForm";

const Submit = () => {
  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Submit Content</h1>
        <SubmitLinkForm />
      </div>
    </div>
  );
};

export default Submit;