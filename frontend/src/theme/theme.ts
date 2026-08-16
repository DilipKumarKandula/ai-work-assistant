import type {
  ThemeColors,
  TypographyConfig,
  SpacingConfig,
   RadiusConfig,
} from "../types";

export function getThemeVariables(
  colors: ThemeColors,
  typography: TypographyConfig,
  spacing: SpacingConfig,
   radius: RadiusConfig
) {
  return {
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,

    "--color-background": colors.background,
    "--color-surface": colors.surface,

    "--color-text": colors.text,
    "--color-muted-text": colors.mutedText,

    "--color-border": colors.border,

    "--color-header": colors.header,
    "--color-header-text": colors.headerText,

    "--color-sidebar": colors.sidebar,
    "--color-sidebar-text": colors.sidebarText,
    "--color-sidebar-active": colors.sidebarActive,
    "--color-sidebar-hover": colors.sidebarHover,

    "--color-footer": colors.footer,
    "--color-footer-text": colors.footerText,

    "--font-family": typography.fontFamily,
    "--font-size-base": typography.baseFontSize,

    "--spacing-page": spacing.pagePadding,
    "--spacing-section": spacing.sectionGap,
    "--spacing-navigation": spacing.navigationGap,
    
    "--radius-sm": radius.sm,
    "--radius-md": radius.md,
    "--radius-lg": radius.lg,
  };
}

