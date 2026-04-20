import type { PropsWithChildren } from "react";
import { StyleSheet, Text as RNText } from "react-native";

import { useTheme } from "../providers/theme-provider";

interface FormMessageProps extends PropsWithChildren {
  tone: "info" | "success" | "error";
  className?: string;
}

export function FormMessage({ children, className, tone }: FormMessageProps) {
  const theme = useTheme();
  const color = tone === "error" ? theme.semantic.state.danger : tone === "success" ? theme.semantic.state.success : theme.semantic.state.info;

  const styles = StyleSheet.create({
    message: {
      color,
      fontSize: theme.primitives.typography.body.fontSize,
      fontWeight: theme.primitives.typography.body.fontWeight as any,
    },
  });

  return (
    <RNText
      className={className}
      role={tone === "error" ? "alert" : "status"}
      style={styles.message}
    >
      {children}
    </RNText>
  );
}
