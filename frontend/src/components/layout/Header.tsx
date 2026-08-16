"use client";

import Navigation from "../navigation/Navigation";
import { useLayout } from "../../context/LayoutContext";

import type {
  BrandingConfig,
  HeaderLayoutConfig,
  NavigationItem,
  ThemeColors,
} from "../../types";

interface HeaderProps {
  branding: BrandingConfig;
  layout: HeaderLayoutConfig;
  colors: ThemeColors;
  navigation: NavigationItem[];
}

export default function Header({
  branding,
  layout,
  colors,
  navigation,
}: HeaderProps) {
  const { toggleMobileSidebar } = useLayout();

  return (
    <header
      style={{
        height: `${layout.height}px`,
        backgroundColor: colors.header,
        color: colors.headerText,
        boxShadow: layout.shadow
          ? "0 1px 3px rgba(0, 0, 0, 0.1)"
          : "none",
        borderBottom: `1px solid ${colors.border}`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-button"
          onClick={toggleMobileSidebar}
          aria-label="Open navigation"
        >
          ☰
        </button>

        {/* Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,
          }}
        >
          <img
            src={branding.logo}
            alt={branding.name}
            style={{
              height: "32px",
              width: "auto",
              objectFit: "contain",
            }}
          />

          <strong>{branding.name}</strong>
        </div>

        {/* Header Navigation */}
        <div className="header-navigation">
          <Navigation items={navigation} />
        </div>
      </div>
    </header>
  );
}