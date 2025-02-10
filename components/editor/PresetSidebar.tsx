// components/editor/PresetSidebar.tsx
import React from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PresetSidebarProps {
  activeTheme: any;
  activePreset: string;
  setActivePreset: (preset: string) => void;
  setText: (text: string) => void;
  presets: Array<{
    id: string;
    name: string;
    icon: any;
    prompt: string;
  }>;
}

export const PresetSidebar: React.FC<PresetSidebarProps> = ({
  activeTheme,
  activePreset,
  setActivePreset,
  setText,
  presets,
}) => {
  return (
    <div
      className={`p-6 rounded-2xl ${activeTheme.card} border ${activeTheme.border} shadow-lg`}
    >
      <h3
        className={`text-lg font-semibold mb-6 ${activeTheme.text} flex items-center gap-2`}
      >
        <Palette className="w-5 h-5 text-violet-500" />
        Presets
      </h3>
      <div className="space-y-3">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <Button
              key={preset.id}
              variant="ghost"
              onClick={() => {
                setActivePreset(preset.id);
                setText(preset.prompt);
              }}
              className={`w-full justify-start gap-3 rounded-xl 
                ${
                  activePreset === preset.id
                    ? "bg-violet-500/20 text-violet-500"
                    : `${activeTheme.text} hover:bg-violet-500/10 hover:text-violet-500 ${activeTheme.text}`
                }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  activePreset === preset.id
                    ? "text-violet-500"
                    : "text-violet-400"
                }`}
              />
              {preset.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
