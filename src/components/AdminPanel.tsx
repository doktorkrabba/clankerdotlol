import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

interface Link {
  id: string;
  url: string;
  title: string;
  approved: boolean;
}

export function AdminPanel() {
  const queryClient = useQueryClient();
  
  const { data: links, isLoading } = useQuery({
    queryKey: ['pending-links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('approved', false)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Link[];
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data: existingLink } = await supabase
        .from('links')
        .select()
        .eq('id', id)
        .single();

      if (!existingLink) {
        throw new Error('Link not found');
      }

      if (existingLink.approved) {
        throw new Error('Link is already approved');
      }

      const { data, error } = await supabase
        .from('links')
        .update({ approved: true })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pending-links'] });
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success(`Successfully approved "${data.title}"`);
    },
    onError: (error: Error) => {
      console.error('Approval error:', error);
      toast.error(`Failed to approve link: ${error.message}`);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-links'] });
      toast.success("Link rejected!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to reject link: ${error.message}`);
    }
  });

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="bg-[#c0c0c0] p-4">
          <p className="text-center text-gray-600">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-[#c0c0c0] border-b-2 border-gray-800">
        <CardTitle className="text-black">Admin Panel</CardTitle>
      </CardHeader>
      <CardContent className="bg-[#c0c0c0] p-4">
        {!links || links.length === 0 ? (
          <p className="text-center text-gray-600">No pending links to review</p>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-2 bg-white border-2 border-gray-800">
                <div className="flex-1 mr-4 space-y-1">
                  <h3 className="font-medium">{link.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{link.url}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => approveMutation.mutate(link.id)}
                    disabled={approveMutation.isPending}
                    className="bg-[#c0c0c0] border-2 border-gray-800 hover:bg-[#d4d4d4] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => rejectMutation.mutate(link.id)}
                    disabled={rejectMutation.isPending}
                    variant="destructive"
                    className="border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}