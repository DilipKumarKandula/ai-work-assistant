import type { BrandingConfig } from "./branding-config";
import type { LayoutConfig } from "./layout-config";
import type { NavigationConfig } from "./navigation-config";
import type { ThemeConfig } from "./theme-config";

export interface AppConfig {
  branding: BrandingConfig;
  theme: ThemeConfig;
  layout: LayoutConfig;
  navigation: NavigationConfig;
}