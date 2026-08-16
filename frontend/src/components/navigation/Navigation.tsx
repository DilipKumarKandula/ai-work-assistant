"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLayout } from "../../context/LayoutContext";

import type { NavigationItem } from "../../types";

interface NavigationProps {
  items: NavigationItem[];
  orientation?: "horizontal" | "vertical";
  collapsed?: boolean;
}

export default function Navigation({
  items,
  orientation = "horizontal",
  collapsed = false,
}: NavigationProps) {
  const pathname = usePathname();
  const { closeMobileSidebar } = useLayout();

  return (
    <nav
      style={{
        display: "flex",
        flexDirection:
          orientation === "vertical" ? "column" : "row",
        alignItems:
          orientation === "vertical" ? "stretch" : "center",
        gap: "var(--spacing-navigation)",
      }}
    >
      {items.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className="nav-item"
            aria-disabled={item.disabled}
            aria-current={isActive ? "page" : undefined}
            title={collapsed ? item.label : undefined}
            onClick={closeMobileSidebar}
            style={{
              pointerEvents: item.disabled ? "none" : "auto",
              opacity: item.disabled ? 0.5 : 1,
              textDecoration: "none",
              color: isActive
                ? "var(--color-primary)"
                : "inherit",
              fontWeight: isActive ? 600 : 400,
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent:
                orientation === "vertical" && collapsed
                  ? "center"
                  : "flex-start",
              gap: "8px",
              transition:
                "background-color 150ms ease, color 150ms ease",
            }}
          >
            {item.icon && <span>{item.icon}</span>}

            {!collapsed && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}