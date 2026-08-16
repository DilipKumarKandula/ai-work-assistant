export type SidebarPosition = "left" | "right";

export type HeaderAlignment = "left" | "center" | "right";

export type ContentAlignment = "left" | "center";

export interface HeaderLayoutConfig {
  enabled: boolean;
  height: number;
  alignment: HeaderAlignment;
  shadow: boolean;
}

export interface SidebarLayoutConfig {
  enabled: boolean;
  position: SidebarPosition;
  width: number;
  collapsedWidth: number;
  collapsible: boolean;
  defaultCollapsed: boolean;
}

export interface ContentLayoutConfig {
  maxWidth: string;
  padding: string;
  alignment: ContentAlignment;
}

export interface FooterLayoutConfig {
  enabled: boolean;
  height: number;
  alignment: ContentAlignment;
}

export interface LayoutConfig {
  header: HeaderLayoutConfig;
  sidebar: SidebarLayoutConfig;
  content: ContentLayoutConfig;
  footer: FooterLayoutConfig;
}