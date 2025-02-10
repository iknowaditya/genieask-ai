// components/editor/ShareMenu.tsx
import React, { useState } from "react";
import { Share2, Copy, FileText, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toast } from "../ui/Toast";

interface ShareMenuProps {
  text: string;
  aiResponses: string[];
  onShare: (type: "copy" | "pdf" | "twitter") => Promise<void>;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ onShare }) => {
  const [showToast, setShowToast] = useState(false);

  const handleShare = async (type: "copy" | "pdf" | "twitter") => {
    await onShare(type);
    if (type === "copy") {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-xl">
            <Share2 className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Share options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleShare("copy")}
            className="cursor-pointer"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy to clipboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShare("pdf")}
            className="cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2" />
            Save as PDF
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleShare("twitter")}
            className="cursor-pointer"
          >
            <Twitter className="w-4 h-4 mr-2" />
            Share on Twitter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showToast && (
        <Toast message="Content copied to clipboard!" type="success" />
      )}
    </>
  );
};
