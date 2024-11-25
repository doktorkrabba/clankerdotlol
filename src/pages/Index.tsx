import { SubmitLinkForm } from "@/components/SubmitLinkForm";
import { ContentDisplay } from "@/components/ContentDisplay";

const Index = () => {
  const approvedContent = []; // TODO: Fetch from backend

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Content Curator</h1>
        
        <SubmitLinkForm />
        
        <div className="space-y-4">
          {approvedContent.map((content, index) => (
            <ContentDisplay
              key={index}
              url={content.url}
              type={content.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;