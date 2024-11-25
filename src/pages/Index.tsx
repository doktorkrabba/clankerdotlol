import { SubmitLinkForm } from "@/components/SubmitLinkForm";
import { ContentDisplay } from "@/components/ContentDisplay";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: links, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Content Curator</h1>
        
        <SubmitLinkForm />
        
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-white">Loading...</p>
          ) : (
            links?.map((content) => (
              <div key={content.id} className="space-y-2">
                <h2 className="text-xl font-semibold text-white">{content.title}</h2>
                <ContentDisplay
                  url={content.url}
                  type={content.url.includes('youtube.com') ? 'youtube' : 
                        content.url.match(/\.(gif|jpe?g|png)$/i) ? 'image' : 'link'}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;