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
    <div 
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: 'url(/lovable-uploads/3d1a1c8d-e818-4eb5-8906-8a822885c0a2.png)' }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[#c0c0c0] p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-800">
          <h1 className="text-4xl font-bold text-black text-center mb-8">Clanker feed</h1>
        </div>
        
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-[#c0c0c0] p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-800">
              <p className="text-center text-black">Loading...</p>
            </div>
          ) : (
            links?.map((content) => (
              <div key={content.id} className="space-y-2">
                <div className="bg-[#c0c0c0] p-4 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-800">
                  <h2 className="text-xl font-semibold text-black mb-4">{content.title}</h2>
                  <ContentDisplay
                    url={content.url}
                    type={content.url.includes('youtube.com') ? 'youtube' : 
                          content.url.match(/\.(gif|jpe?g|png)$/i) ? 'image' : 'link'}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;