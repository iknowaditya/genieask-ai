// components/editor/TextEditor.tsx
import React from "react";
import { Wand2, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareMenu } from "./ShareMenu";

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  isGenerating: boolean;
  generateText: () => void;
  activeTheme: any;
  handleShare: (type: "copy" | "pdf" | "twitter") => Promise<void>;
  aiResponses: string[];
}

export const TextEditor: React.FC<TextEditorProps> = ({
  text,
  setText,
  isGenerating,
  generateText,
  activeTheme,
  handleShare,
  aiResponses,
}) => {
  return (
    <div
      className={`relative ${activeTheme.card} rounded-2xl border ${activeTheme.border} shadow-xl`}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full h-96 ${activeTheme.inputBg} p-6 ${activeTheme.inputText} focus:outline-none resize-none rounded-2xl ${activeTheme.inputPlaceholder} font-['JetBrains_Mono'] text-base leading-relaxed`}
        placeholder="Start typing or use AI to generate..."
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(147, 51, 234, 0.5) rgba(0, 0, 0, 0.1)",
        }}
      />

      {/* add a clear button to clear the text */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <button
          onClick={() => setText("")}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
        >
          <CircleX className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-4">
        <div className="flex gap-3">
          <ShareMenu
            text={text}
            aiResponses={aiResponses}
            onShare={handleShare}
          />
        </div>

        <Button
          onClick={generateText}
          disabled={isGenerating}
          className={`${
            activeTheme.button
          } text-white rounded-xl flex items-center gap-2 px-6 ${
            isGenerating ? "animate-pulse" : ""
          }`}
        >
          <Wand2 className="w-4 h-4" />
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </div>
    </div>
  );
};
