export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  disabled?: boolean;
  external?: boolean;
  children?: NavigationItem[];
}

export type HeaderNavigationPosition = "left" | "center" | "right";

export interface HeaderNavigationConfig {
  items: NavigationItem[];
  position: HeaderNavigationPosition;
}

export interface SidebarNavigationConfig {
  items: NavigationItem[];
}

export interface NavigationConfig {
  header: HeaderNavigationConfig;
  sidebar: SidebarNavigationConfig;
}