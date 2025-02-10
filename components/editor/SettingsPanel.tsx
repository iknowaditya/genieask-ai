import React from "react";
import { Settings, Save } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface SettingsPanelProps {
  activeTheme: any;
  temperature: number;
  setTemperature: (value: number) => void;
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  activeTheme,
  temperature,
  setTemperature,
  autoSave,
  setAutoSave,
}) => {
  return (
    <div
      className={`mt-6 p-6 ${activeTheme.card} rounded-2xl border ${activeTheme.border}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-12">
            <div className="space-y-3 flex-1">
              <label
                className={`text-sm ${activeTheme.textMuted} flex items-center gap-2 mb-2`}
              >
                <Settings className="w-4 h-4" />
                Temperature: {temperature.toFixed(1)}
              </label>
              <Slider
                defaultValue={[temperature]}
                value={[temperature]}
                onValueChange={(values) => setTemperature(values[0])}
                max={1}
                step={0.1}
                className="w-full  border-muted-foreground/50 solid transparent transparent rounded-full border-2 solid cursor-pointer"
              />
            </div>
            <div className="space-y-3">
              <label
                className={`text-sm ${activeTheme.textMuted} flex items-center gap-2 ${activeTheme.text} mb-2`}
              >
                <Save className="w-4 h-4" />
                Auto-save
              </label>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
