import { SubmitLinkForm } from "@/components/SubmitLinkForm";
import { ContentDisplay } from "@/components/ContentDisplay";

const Index = () => {
  // This would typically fetch from a backend
  const approvedContent = [
    {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      type: "youtube" as const,
    },
    {
      url: "https://picsum.photos/400/300",
      type: "image" as const,
    },
  ];

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