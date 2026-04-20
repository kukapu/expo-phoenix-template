import * as SecureStore from "expo-secure-store";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useColorScheme } from "react-native";

import { darkTheme } from "../themes/dark-theme";
import { lightTheme } from "../themes/light-theme";
import type { AppTheme } from "../themes/theme-types";

const THEME_PREFERENCE_KEY = "app-theme-preference";

export type ThemePreference = "system" | "light" | "dark";

const ThemeContext = createContext<AppTheme>(lightTheme);
const ThemePreferenceContext = createContext<{
  preference: ThemePreference;
  setPreference(preference: ThemePreference): void;
}>({
  preference: "system",
  setPreference() {}
});

export function ThemeProvider({ children, theme }: PropsWithChildren<{ theme?: AppTheme }>) {
  if (theme) {
    return (
      <ThemePreferenceContext.Provider
        value={{ preference: theme.name === "dark" ? "dark" : "light", setPreference() {} }}
      >
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
      </ThemePreferenceContext.Provider>
    );
  }

  return <ManagedThemeProvider>{children}</ManagedThemeProvider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemePreference() {
  return useContext(ThemePreferenceContext);
}

function ManagedThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    let cancelled = false;

    void SecureStore.getItemAsync(THEME_PREFERENCE_KEY).then((value) => {
      if (cancelled) {
        return;
      }

      if (value === "system" || value === "light" || value === "dark") {
        setPreference(value);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    void SecureStore.setItemAsync(THEME_PREFERENCE_KEY, preference);
  }, [preference]);

  const resolvedTheme = useMemo(() => {
    if (preference === "dark") {
      return darkTheme;
    }

    if (preference === "light") {
      return lightTheme;
    }

    return colorScheme === "dark" ? darkTheme : lightTheme;
  }, [colorScheme, preference]);

  const preferenceValue = useMemo(
    () => ({
      preference,
      setPreference
    }),
    [preference]
  );

  return (
    <ThemePreferenceContext.Provider value={preferenceValue}>
      <ThemeContext.Provider value={resolvedTheme}>{children}</ThemeContext.Provider>
    </ThemePreferenceContext.Provider>
  );
}
