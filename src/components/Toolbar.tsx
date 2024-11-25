import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Toolbar() {
  return (
    <div className="w-full bg-[#c0c0c0] border-b-2 border-gray-800 p-2">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-black font-bold text-xl">
          CLANKER.LOL
        </Link>
        <Link to="/submit">
          <Button 
            className="bg-[#c0c0c0] border-2 border-gray-800 hover:bg-[#d4d4d4] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Submit Content
          </Button>
        </Link>
      </div>
    </div>
  );
}