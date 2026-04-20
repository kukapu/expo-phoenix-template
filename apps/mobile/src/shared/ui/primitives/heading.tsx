import type { PropsWithChildren } from "react";
import type { StyleProp, TextProps, TextStyle } from "react-native";
import { StyleSheet, Text as RNText } from "react-native";

import { useTheme } from "../providers/theme-provider";

interface HeadingProps extends PropsWithChildren<TextProps> {
  level?: 1 | 2 | 3 | 4;
  className?: string;
  style?: StyleProp<TextStyle>;
}

export function Heading({ children, className, level = 2, style, ...props }: HeadingProps) {
  const theme = useTheme();

  const styles = StyleSheet.create({
    heading: {
      color: theme.semantic.text.default,
      fontSize: level === 1 ? theme.primitives.typography.title.fontSize : theme.primitives.typography.subtitle.fontSize,
      fontWeight: (level === 1 ? theme.primitives.typography.title.fontWeight : theme.primitives.typography.subtitle.fontWeight) as any,
    },
  });

  return (
    <RNText className={className} role="heading" aria-level={level} style={[styles.heading, style]} {...props}>
      {children}
    </RNText>
  );
}
