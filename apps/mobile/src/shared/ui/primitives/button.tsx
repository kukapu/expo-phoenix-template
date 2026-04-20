import type { PropsWithChildren } from "react";
import type { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Pressable, StyleSheet, Text as RNText } from "react-native";

import { useTheme } from "../providers/theme-provider";
import { createInteractiveState } from "./shared";

interface ButtonProps extends PropsWithChildren<PressableProps> {
  tone?: "primary" | "destructive";
  disabled?: boolean;
  onPress?(): void;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({ children, className, disabled, onPress, style, textClassName, textStyle, tone = "primary", ...props }: ButtonProps) {
  const theme = useTheme();
  const backgroundColor = disabled
    ? theme.semantic.action.disabledBackground
    : tone === "destructive"
      ? theme.semantic.action.destructiveBackground
      : theme.semantic.action.primaryBackground;
  const color = disabled
    ? theme.semantic.action.disabledForeground
    : tone === "destructive"
      ? theme.semantic.action.destructiveForeground
      : theme.semantic.action.primaryForeground;

  const interactive = createInteractiveState(theme, disabled);

  const styles = StyleSheet.create({
    button: {
      ...interactive,
      backgroundColor,
      borderRadius: theme.primitives.radius.pill,
      minHeight: theme.semantic.layout.touchTargetMinHeight,
      paddingHorizontal: theme.primitives.spacing.md,
      paddingVertical: theme.primitives.spacing.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      color,
      fontSize: theme.primitives.typography.body.fontSize,
      fontWeight: theme.primitives.typography.body.fontWeight as any,
    },
  });

  return (
    <Pressable
      className={className}
      data-tone={tone}
      disabled={disabled}
      onPress={() => onPress?.()}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled ? { opacity: 0.8 } : undefined,
        style,
      ]}
      {...props}
    >
      <RNText className={textClassName} style={[styles.label, textStyle]}>{children}</RNText>
    </Pressable>
  );
}
