// components/editor/editorConfig.ts
import { Binary, Zap, Sparkles, BookOpen, Code } from "lucide-react";

export const models = [
  { id: "groq", name: "Groq", speed: "Ultra Fast", icon: Binary },
  { id: "anthropic", name: "Claude", speed: "Balanced", icon: Zap },
  { id: "openai", name: "GPT-4", speed: "Powerful", icon: Sparkles },
];

export const presets = [
  {
    id: "creative",
    name: "Creative Writing",
    icon: BookOpen,
    prompt: "Write a creative story about",
  },
  {
    id: "academic",
    name: "Academic",
    icon: BookOpen,
    prompt: "Write an academic explanation of",
  },
  {
    id: "business",
    name: "Business",
    icon: Binary,
    prompt: "Write a professional business",
  },
  {
    id: "code",
    name: "Code",
    icon: Code,
    prompt: "Write code for",
  },
];

export const themeColors = {
  dark: {
    background: "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900",
    card: "bg-gray-800/30 backdrop-blur-xl",
    border: "border-gray-700/50",
    text: "text-white",
    textMuted: "text-gray-300",
    accent: "from-violet-500 to-fuchsia-500",
    button: "bg-violet-600 hover:bg-violet-500",
    buttonOutline: "border-gray-700 hover:border-violet-500",
    tabBackground: "bg-gray-800/50",
    tabText: "text-white",
    tabActiveText: "text-white",
    inputBg: "bg-gray-800/50",
    inputText: "text-white",
    inputPlaceholder: "placeholder:text-gray-400",
  },
  light: {
    background: "bg-gradient-to-br from-gray-50 via-white to-gray-100",
    card: "bg-white/80 backdrop-blur-xl",
    border: "border-gray-200",
    text: "text-gray-800",
    textMuted: "text-gray-600",
    accent: "from-violet-600 to-fuchsia-600",
    button: "bg-violet-500 hover:bg-violet-600",
    buttonOutline: "border-gray-200 hover:border-violet-500",
    tabBackground: "bg-white",
    tabText: "text-gray-600",
    tabActiveText: "text-gray-900",
    inputBg: "bg-white",
    inputText: "text-gray-800",
    inputPlaceholder: "placeholder:text-gray-500",
  },
} as const;
