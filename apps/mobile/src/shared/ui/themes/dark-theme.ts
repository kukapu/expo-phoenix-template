import { primitiveColorTokens } from "../tokens/primitives/color";
import { createTheme } from "./create-theme";

export const darkTheme = createTheme({
  name: "dark",
  semantic: {
    color: {
      screenBackground: "#020617",
      surfaceBackground: primitiveColorTokens.slate900,
      surfaceElevatedBackground: "#111827"
    },
    text: {
      default: primitiveColorTokens.slate50,
      muted: primitiveColorTokens.slate300,
      inverse: primitiveColorTokens.slate900,
      accent: "#93c5fd"
    },
    icon: {
      default: primitiveColorTokens.slate300,
      accent: "#93c5fd",
      muted: primitiveColorTokens.slate500
    },
    surface: {
      base: primitiveColorTokens.slate900,
      elevated: "#111827",
      selected: "#1e3a8a"
    },
    border: {
      subtle: primitiveColorTokens.slate700,
      strong: primitiveColorTokens.slate300,
      accent: "#60a5fa"
    },
    action: {
      primaryBackground: "#60a5fa",
      primaryForeground: primitiveColorTokens.slate900,
      destructiveBackground: "#ef4444",
      destructiveForeground: primitiveColorTokens.white,
      disabledBackground: primitiveColorTokens.slate700,
      disabledForeground: primitiveColorTokens.slate300
    },
    state: {
      info: "#60a5fa",
      success: "#10b981",
      danger: "#ef4444"
    }
  }
});
