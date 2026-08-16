"use client";

import { useEffect, useState } from "react";

import Navigation from "../navigation/Navigation";
import { useLayout } from "../../context/LayoutContext";

import type {
  NavigationItem,
  SidebarLayoutConfig,
  ThemeColors,
} from "../../types";

interface SidebarProps {
  layout: SidebarLayoutConfig;
  colors: ThemeColors;
  navigation: NavigationItem[];
}

export default function Sidebar({
  layout,
  colors,
  navigation,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(
    layout.defaultCollapsed
  );

  const [isMobile, setIsMobile] = useState(false);

  const {
    mobileSidebarOpen,
    closeMobileSidebar,
  } = useLayout();

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 768px)"
    );

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  /*
   * Desktop:
   * collapsed state controls the sidebar.
   *
   * Mobile:
   * sidebar is always expanded because it is a drawer.
   */
  const isCollapsed =
    !isMobile &&
    layout.collapsible &&
    collapsed;

  return (
    <>
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="mobile-sidebar-overlay"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`app-sidebar ${
          mobileSidebarOpen
            ? "mobile-sidebar-open"
            : ""
        }`}
        style={{
          width: isCollapsed
            ? `${layout.collapsedWidth}px`
            : `${layout.width}px`,
          flexShrink: 0,
          minHeight: "100%",
          backgroundColor: colors.sidebar,
          color: colors.sidebarText,
          borderRight: `1px solid ${colors.border}`,
          padding: "16px 12px",
          transition: "width 200ms ease",
        }}
      >
        {/* Mobile close button */}
        <button
          type="button"
          className="mobile-sidebar-close"
          onClick={closeMobileSidebar}
          aria-label="Close navigation"
        >
          ✕
        </button>

        {/* Desktop collapse button */}
        {layout.collapsible && (
          <button
            type="button"
            className="sidebar-collapse-button"
            onClick={() =>
              setCollapsed((value) => !value)
            }
            aria-label={
              isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {isCollapsed ? "→" : "←"}
          </button>
        )}

        <Navigation
          items={navigation}
          orientation="vertical"
          collapsed={isCollapsed}
        />
      </aside>
    </>
  );
}