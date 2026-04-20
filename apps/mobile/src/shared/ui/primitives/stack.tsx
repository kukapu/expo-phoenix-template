import type { PropsWithChildren } from "react";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { useTheme } from "../providers/theme-provider";

type StackProps = PropsWithChildren<ViewProps & { className?: string; style?: StyleProp<ViewStyle> }>;

export function Stack({ children, className, style, ...props }: StackProps) {
  const theme = useTheme();

  const stackStyle = StyleSheet.create({
    stack: {
      gap: theme.primitives.spacing.md,
    },
  });

  return (
    <View className={className} style={[stackStyle.stack, style]} {...props}>
      {children}
    </View>
  );
}
