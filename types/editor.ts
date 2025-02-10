// types/editor.ts
export interface ThemeColors {
  background: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  button: string;
  buttonOutline: string;
  tabBackground: string;
  tabText: string;
  tabActiveText: string;
  inputBg: string;
  inputText: string;
  inputPlaceholder: string;
}

export interface Model {
  id: string;
  name: string;
  speed: string;
  icon: any;
}

export interface Preset {
  id: string;
  name: string;
  icon: any;
  prompt: string;
}
