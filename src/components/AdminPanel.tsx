import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface PendingLink {
  id: string;
  url: string;
}

export function AdminPanel() {
  const pendingLinks: PendingLink[] = []; // TODO: Fetch from backend

  const handleApprove = (id: string) => {
    // TODO: Implement approval logic
    toast.success("Link approved!");
  };

  const handleReject = (id: string) => {
    // TODO: Implement rejection logic
    toast.success("Link rejected!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-[#c0c0c0] border-b-2 border-gray-800">
        <CardTitle className="text-black">Admin Panel</CardTitle>
      </CardHeader>
      <CardContent className="bg-[#c0c0c0] p-4">
        {pendingLinks.length === 0 ? (
          <p className="text-center text-gray-600">No pending links to review</p>
        ) : (
          <div className="space-y-4">
            {pendingLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-2 bg-white border-2 border-gray-800">
                <span className="truncate flex-1 mr-4">{link.url}</span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(link.id)}
                    className="bg-[#c0c0c0] border-2 border-gray-800 hover:bg-[#d4d4d4] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(link.id)}
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