// components/editor/ShareMenu.tsx
import React from "react";
import { Share2, Copy, FileText, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareMenuProps {
  text: string;
  aiResponses: string[];
  onShare: (type: "copy" | "pdf" | "twitter") => Promise<void>;
}

export const ShareMenu: React.FC<ShareMenuProps> = ({ onShare }) => {
  const { toast } = useToast();

  const handleShare = async (type: "copy" | "pdf" | "twitter") => {
    try {
      await onShare(type);
      if (type === "copy") {
        toast({
          title: "Copied",
          description: "Content copied to clipboard",
          variant: "default",
        });
      } else if (type === "pdf") {
        toast({
          title: "PDF",
          description: "PDF file generated and opened",
          variant: "default",
        });
      } else if (type === "twitter") {
        toast({
          title: "Twitter",
          description: "Opening Twitter share window",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${type} content`,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl hover:bg-violet-500/10 hover:text-violet-500 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Share options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleShare("copy")}
          className="cursor-pointer hover:bg-violet-500/10 focus:bg-violet-500/10"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy to clipboard
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("pdf")}
          className="cursor-pointer hover:bg-violet-500/10 focus:bg-violet-500/10"
        >
          <FileText className="w-4 h-4 mr-2" />
          Save as PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("twitter")}
          className="cursor-pointer hover:bg-violet-500/10 focus:bg-violet-500/10"
        >
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
