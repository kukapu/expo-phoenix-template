import type { PropsWithChildren, ReactNode } from "react";

import { Heading } from "../primitives/heading";
import { Stack } from "../primitives/stack";
import { Surface } from "../primitives/surface";
import { Text } from "../primitives/text";

interface CardProps extends PropsWithChildren {
  title: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Card({ children, className, contentClassName, description, footer, title }: CardProps) {
  return (
    <Surface className={className} tone="elevated">
      <Stack className={contentClassName}>
        <Heading>{title}</Heading>
        {description ? <Text>{description}</Text> : null}
        {children}
        {footer}
      </Stack>
    </Surface>
  );
}
