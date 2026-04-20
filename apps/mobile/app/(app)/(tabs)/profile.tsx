import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { useLogoutAction, useSessionShell } from "../../../src/features/auth/presentation";
import {
  Button,
  PlaceholderScreen,
  Stack,
  Surface,
  Text,
  UserSummaryCard,
  useTheme,
  useThemePreference
} from "../../../src/shared/ui";

export default function ProfileRoute() {
  const { state } = useSessionShell();
  const logout = useLogoutAction();
  const theme = useTheme();
  const { preference, setPreference } = useThemePreference();

  if (state.status !== "signed-in") {
    return null;
  }

  const styles = StyleSheet.create({
    helperText: {
      color: theme.semantic.text.muted
    },
    optionLabel: {
      color: theme.semantic.text.default,
      fontWeight: theme.primitives.typography.body.fontWeight as any,
      textAlign: "center"
    }
  });

  return (
    <PlaceholderScreen
      description="Account details for the current signed-in user."
      testId="profile-screen"
      title="Profile"
    >
      <UserSummaryCard user={state.session.user} />
      <Surface tone="elevated">
        <Stack>
          <Text>Theme</Text>
          <Text style={styles.helperText}>Choose how the app should resolve light and dark colors.</Text>
          <View className="flex-row flex-wrap gap-2">
            <ThemeOption
              label="System"
              onPress={() => setPreference("system")}
              selected={preference === "system"}
              textStyle={styles.optionLabel}
            />
            <ThemeOption
              label="Light"
              onPress={() => setPreference("light")}
              selected={preference === "light"}
              textStyle={styles.optionLabel}
            />
            <ThemeOption
              label="Dark"
              onPress={() => setPreference("dark")}
              selected={preference === "dark"}
              textStyle={styles.optionLabel}
            />
          </View>
        </Stack>
      </Surface>
      <Button onPress={() => void logout()} tone="destructive">
        Logout
      </Button>
    </PlaceholderScreen>
  );
}

function ThemeOption({
  label,
  onPress,
  selected,
  textStyle
}: {
  label: string;
  onPress(): void;
  selected: boolean;
  textStyle: StyleProp<TextStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className="min-w-24 flex-1"
      onPress={onPress}
    >
      <Surface tone={selected ? "selected" : "base"}>
        <Text style={textStyle}>{label}</Text>
      </Surface>
    </Pressable>
  );
}
