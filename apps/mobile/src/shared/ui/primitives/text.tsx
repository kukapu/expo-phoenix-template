import type { PropsWithChildren } from "react";
import type { StyleProp, TextProps, TextStyle } from "react-native";
import { StyleSheet, Text as RNText } from "react-native";

import { useTheme } from "../providers/theme-provider";

type AppTextProps = PropsWithChildren<TextProps & { className?: string; style?: StyleProp<TextStyle> }>;

export function Text({ children, className, style, ...props }: AppTextProps) {
  const theme = useTheme();

  const textStyle = StyleSheet.create({
    text: {
      color: theme.semantic.text.default,
      fontSize: theme.primitives.typography.body.fontSize,
      fontWeight: theme.primitives.typography.body.fontWeight as any,
      margin: 0,
    },
  });

  return (
    <RNText className={className} style={[textStyle.text, style]} {...props}>
      {children}
    </RNText>
  );
}
