import {
  DarkTheme as ReactNavigationDarkTheme,
  DefaultTheme as ReactNavigationDefaultTheme,
  type Theme as NavigationTheme
} from "@react-navigation/native";

import type { AppTheme } from "./theme-types";

export function createNavigationTheme(theme: AppTheme): NavigationTheme {
  const baseTheme = theme.name === "dark" ? ReactNavigationDarkTheme : ReactNavigationDefaultTheme;

  return {
    ...baseTheme,
    dark: theme.name === "dark",
    colors: {
      ...baseTheme.colors,
      primary: theme.semantic.action.primaryBackground,
      background: theme.semantic.color.screenBackground,
      card: theme.semantic.surface.elevated,
      text: theme.semantic.text.default,
      border: theme.semantic.border.subtle,
      notification: theme.semantic.state.danger
    }
  };
}
