# Mobile Styling Guide

## Architecture: Hybrid NativeWind + Semantic Theme

This project uses a **hybrid styling approach** for maximum maintainability when implemented by AI agents.

### NativeWind (`className`) — For Layout & Composition

Use Tailwind utility classes via `className` for:

- **Flexbox & Grid**: `flex-1`, `flex-row`, `flex-wrap`, `flex-col`
- **Gap & Spacing**: `gap-2`, `gap-3`, `gap-4`, `gap-5` (maps to theme spacing)
- **Dimensions**: `w-full`, `max-w-xl`, `min-w-24`, `h-full`
- **Alignment**: `items-center`, `justify-center`, `self-start`
- **Typography utilities**: `text-base`, `text-sm`, `text-lg`, `text-center`, `font-bold`
- **Responsive**: `md:flex-row`, `lg:max-w-2xl`

### Semantic Theme (`useTheme`) — For Color, Typography & Dark Mode

Use the theme system for visual identity:

- **Colors**: `theme.semantic.color.screenBackground`, `theme.semantic.text.default`, `theme.semantic.action.primaryBackground`
- **Typography**: `theme.primitives.typography.body.fontSize`, `theme.primitives.typography.title.fontWeight`
- **Borders**: `theme.primitives.border.thin`, `theme.primitives.radius.md`
- **Dark mode**: Handled automatically by `ThemeProvider`, no `dark:` classes needed

### When to Use Each

| Use case | Use | Example |
|---|---|---|
| Layout direction | `className` | `<View className="flex-row flex-wrap gap-3">` |
| Spacing between sibling components | `className` | `<Stack className="gap-4">` |
| Full-width button | `className` | `<Button className="w-full">` |
| Text color | `useTheme` | `color: theme.semantic.text.default` |
| Button background | `useTheme` | Already handled by `Button` component with `tone` prop |
| Screen background | `useTheme` | Already handled by `Screen` component |
| Font size | `useTheme` | `fontSize: theme.primitives.typography.body.fontSize` |
| Border radius | `useTheme` | `borderRadius: theme.primitives.radius.md` |
| Dark mode switch | `useTheme` | `useThemePreference()` to set "light" / "dark" / "system" |

### DO NOT

- Do NOT use Tailwind color classes like `bg-blue-500`, `text-red-600` — they bypass the semantic theme
- Do NOT use `dark:` prefix — dark mode is managed by `ThemeProvider`
- Do NOT create new `StyleSheet.create` blocks for layout that can be expressed with `className`

### Tech Stack

- **NativeWind v5** (preview) — Tailwind CSS classes on React Native
- **Tailwind CSS v4** — Processed via `@tailwindcss/postcss`
- **react-native-css 3.x** — Runtime CSS interop
- **lightningcss 1.27.0** — Pinned (1.32 has a deserialization bug)

### Key Files

- `apps/mobile/global.css` — Tailwind imports + NativeWind theme
- `apps/mobile/metro.config.cjs` — `withNativewind` Metro integration
- `apps/mobile/babel.config.js` — Only `babel-preset-expo` (no NativeWind babel plugin)
- `apps/mobile/postcss.config.mjs` — `@tailwindcss/postcss` plugin
- `apps/mobile/nativewind-env.d.ts` — TypeScript types for `className`
- `apps/mobile/src/shared/ui/themes/` — Semantic theme definitions

### Example: Migrating a Screen

Before (StyleSheet only):
```tsx
const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.primitives.spacing.sm,
  },
  optionButton: {
    flexGrow: 1,
    minWidth: 96,
  },
});

<View style={styles.optionRow}>
  <Pressable style={styles.optionButton}>
```

After (Hybrid):
```tsx
<View className="flex-row flex-wrap gap-2">
  <Pressable className="min-w-24 flex-1">
```

### Primitives with `className` Support

All UI primitives accept `className`:

- `Text`, `Heading` — also accept `StyleProp<TextStyle>` via `style`
- `View`-based: `Stack`, `Inline`, `Surface`, `Screen` — also accept `StyleProp<ViewStyle>`
- `Button` — `className` for the button, `textClassName` for the label
- `Card` — `className` for the surface, `contentClassName` for the inner stack
- `EmptyState` — `className`, `titleClassName`, `descriptionClassName`
- `FormMessage` — `className`