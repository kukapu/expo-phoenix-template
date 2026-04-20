import type { PropsWithChildren } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../providers/theme-provider";

type SurfaceTone = "base" | "elevated" | "selected";

type SurfaceProps = PropsWithChildren<ViewProps & { tone?: SurfaceTone; className?: string; style?: StyleProp<ViewStyle> }>;

export function Surface({ children, className, style, tone = "base", ...props }: SurfaceProps) {
  const theme = useTheme();

  const backgroundColor =
    tone === "elevated"
      ? theme.semantic.surface.elevated
      : tone === "selected"
        ? theme.semantic.surface.selected
        : theme.semantic.surface.base;

  const styles = StyleSheet.create({
    surface: {
      backgroundColor,
      borderWidth: theme.primitives.border.thin,
      borderColor: theme.semantic.border.subtle,
      borderRadius: theme.primitives.radius.md,
      padding: theme.primitives.spacing.md,
    },
  });

  return (
    <View className={className} style={[styles.surface, style]} {...props}>
      {children}
    </View>
  );
}
