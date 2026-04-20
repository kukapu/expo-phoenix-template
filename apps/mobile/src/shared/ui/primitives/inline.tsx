import type { PropsWithChildren } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../providers/theme-provider";

type InlineProps = PropsWithChildren<ViewProps & { className?: string; style?: StyleProp<ViewStyle> }>;

export function Inline({ children, className, style, ...props }: InlineProps) {
  const theme = useTheme();

  const inlineStyle = StyleSheet.create({
    inline: {
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.primitives.spacing.sm,
    },
  });

  return (
    <View className={className} style={[inlineStyle.inline, style]} {...props}>
      {children}
    </View>
  );
}
