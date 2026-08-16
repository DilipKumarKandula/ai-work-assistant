export type ThemeMode = "light" | "dark" | "system";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;

  header: string;
  headerText: string;

  sidebar: string;
  sidebarText: string;
  sidebarActive: string;
  sidebarHover: string;

  footer: string;
  footerText: string;
}

export interface TypographyConfig {
  fontFamily: string;
  baseFontSize: string;
}

export interface SpacingConfig {
  pagePadding: string;
  sectionGap: string;
  navigationGap: string;
}

export interface RadiusConfig {
  sm: string;
  md: string;
  lg: string;
}

export interface ShadowConfig {
  header: string;
  sidebar: string;
  card: string;
}

export interface ThemeConfig {
  mode: ThemeMode;

  colors: ThemeColors;
  darkColors: ThemeColors;

  typography: TypographyConfig;
  spacing: SpacingConfig;
  radius: RadiusConfig;
  shadows: ShadowConfig;
}