// components/editor/ResponseHistory.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Trash2, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: "Content copied to clipboard",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy content",
        variant: "destructive",
      });
    }
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

          {/* Reset Button with Alert Dialog */}
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
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete all generated responses. This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onReset}
                  className="bg-red-500 hover:bg-red-600"
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
              } rounded-lg transition-all duration-300`}
            >
              {/* Preview Card */}
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
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
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

              {/* Expanded Content */}
              {expandedIndex === index && (
                <div className="p-4 ai-response">
                  <p
                    className={`${activeTheme.text} whitespace-pre-wrap font-['JetBrains_Mono']`}
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
