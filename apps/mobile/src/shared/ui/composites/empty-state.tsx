import type { ReactNode } from "react";

import { Heading } from "../primitives/heading";
import { Stack } from "../primitives/stack";
import { Text } from "../primitives/text";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function EmptyState({ action, className, description, descriptionClassName, title, titleClassName }: EmptyStateProps) {
  return (
    <Stack className={className}>
      <Heading className={titleClassName}>{title}</Heading>
      <Text className={descriptionClassName}>{description}</Text>
      {action}
    </Stack>
  );
}
