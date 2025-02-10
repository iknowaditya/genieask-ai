import React from "react";
import { Share2, Copy, FileText, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
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
  theme?: "dark" | "light";
}

export const ShareMenu: React.FC<ShareMenuProps> = ({
  onShare,
  theme = "dark",
}) => {
  const handleShare = async (type: "copy" | "pdf" | "twitter") => {
    const toastStyle = {
      style: {
        background: theme === "dark" ? "#1F2937" : "#FFFFFF",
        color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        border: "1px solid",
        borderColor:
          theme === "dark"
            ? "rgba(75, 85, 99, 0.3)"
            : "rgba(229, 231, 235, 0.3)",
      },
    };

    try {
      await toast.promise(
        onShare(type),
        {
          loading: type === "pdf" ? "Generating PDF..." : "Processing...",
          success: () => {
            switch (type) {
              case "copy":
                return "📋 Copied to clipboard!";
              case "pdf":
                return "📄 PDF generated successfully!";
              case "twitter":
                return "🐦 Opening Twitter...";
              default:
                return "Success!";
            }
          },
          error: () => {
            switch (type) {
              case "copy":
                return "❌ Failed to copy content";
              case "pdf":
                return "❌ Failed to generate PDF";
              case "twitter":
                return "❌ Failed to open Twitter";
              default:
                return "An error occurred";
            }
          },
        },
        toastStyle
      );
    } catch (error) {
      toast.error(`Failed to ${type} content`, toastStyle);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl hover:bg-violet-500/10 hover:text-violet-500 transition-colors group"
        >
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 ${
          theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""
        }`}
      >
        <DropdownMenuLabel>Share options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleShare("copy")}
          className="cursor-pointer group"
        >
          <div className="flex items-center w-full gap-2 transition-colors">
            <Copy className="w-4 h-4 group-hover:text-violet-500 transition-colors" />
            <span className="group-hover:text-violet-500">
              Copy to clipboard
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("pdf")}
          className="cursor-pointer group"
        >
          <div className="flex items-center w-full gap-2 transition-colors">
            <FileText className="w-4 h-4 group-hover:text-violet-500 transition-colors" />
            <span className="group-hover:text-violet-500">Save as PDF</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("twitter")}
          className="cursor-pointer group"
        >
          <div className="flex items-center w-full gap-2 transition-colors">
            <Twitter className="w-4 h-4 group-hover:text-violet-500 transition-colors" />
            <span className="group-hover:text-violet-500">
              Share on Twitter
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
