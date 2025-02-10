import React, { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Trash2, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ResponseHistoryProps {
  responses: string[];
  theme: "dark" | "light";
  activeTheme: any;
  onDelete: (index: number) => void;
  onReset: () => void;
}

export const ResponseHistory: React.FC<ResponseHistoryProps> = ({
  responses,
  theme,
  activeTheme,
  onDelete,
  onReset,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Content copied to clipboard", {
        icon: "📋",
        style: {
          background: theme === "dark" ? "#1F2937" : "#FFFFFF",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
          border: "1px solid",
          borderColor:
            theme === "dark"
              ? "rgba(75, 85, 99, 0.3)"
              : "rgba(229, 231, 235, 0.3)",
        },
      });
    } catch (error) {
      toast.error("Failed to copy content", {
        icon: "❌",
        style: {
          background: theme === "dark" ? "#1F2937" : "#FFFFFF",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        },
      });
    }
  };

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.promise(
      new Promise((resolve) => {
        onDelete(index);
        setTimeout(resolve, 300);
      }),
      {
        loading: "Deleting...",
        success: "Response deleted! 🗑️",
        error: "Failed to delete",
      },
      {
        style: {
          background: theme === "dark" ? "#1F2937" : "#FFFFFF",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        },
      }
    );
  };

  const handleReset = () => {
    toast.promise(
      new Promise((resolve) => {
        onReset();
        setTimeout(resolve, 300);
      }),
      {
        loading: "Resetting...",
        success: "All responses cleared! 🔄",
        error: "Failed to reset",
      },
      {
        style: {
          background: theme === "dark" ? "#1F2937" : "#FFFFFF",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        },
      }
    );
  };

  return (
    <div className="mt-6">
      <div
        className={`p-6 ${activeTheme.card} rounded-2xl border ${activeTheme.border}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${activeTheme.text}`}>
            Generated Responses
          </h3>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 rounded-xl hover:bg-red-500/10 hover:text-red-500"
              >
                <RefreshCw className="w-4 h-4" />
                Reset All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              className={
                theme === "dark" ? "bg-gray-800 text-white border-gray-700" : ""
              }
            >
              <AlertDialogHeader>
                <AlertDialogTitle
                  className={theme === "dark" ? "text-white" : ""}
                >
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription
                  className={theme === "dark" ? "text-gray-300" : ""}
                >
                  This will delete all generated responses. This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={
                    theme === "dark"
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : ""
                  }
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="space-y-4">
          {responses.map((response, index) => (
            <div
              key={index}
              className={`${
                theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"
              } rounded-lg transition-all duration-300 hover:shadow-lg`}
            >
              <div
                className={`p-4 cursor-pointer flex items-center justify-between ${
                  expandedIndex === index ? "border-b border-gray-700/50" : ""
                }`}
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                <p
                  className={`${activeTheme.text} font-['JetBrains_Mono'] truncate flex-1`}
                >
                  {response.split("\n")[0]}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(response);
                    }}
                    className="p-2 hover:bg-violet-500/10 hover:text-violet-500 rounded-lg transition-colors"
                    title="Copy response"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleDelete(index, e)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                    title="Delete response"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {expandedIndex === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>

              {expandedIndex === index && (
                <div className="p-4 ai-response animate-fadeIn">
                  <p
                    className={`${activeTheme.text} whitespace-pre-wrap font-['JetBrains_Mono'] leading-relaxed`}
                  >
                    {response}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
