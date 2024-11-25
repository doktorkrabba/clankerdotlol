import { Card, CardContent } from "@/components/ui/card";

interface ContentDisplayProps {
  url: string;
  type: 'youtube' | 'image' | 'gif' | 'link';
}

export function ContentDisplay({ url, type }: ContentDisplayProps) {
  const renderContent = () => {
    switch (type) {
      case 'youtube':
        const videoId = url.split('v=')[1];
        return (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
          />
        );
      case 'image':
      case 'gif':
        return (
          <img src={url} alt="Content" className="w-full h-auto" />
        );
      case 'link':
        return (
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {url}
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardContent className="bg-[#c0c0c0] p-4">
        {renderContent()}
      </CardContent>
    </Card>
  );
}