import type { AppConfig } from "../types";

export const appConfig: AppConfig = {
  branding: {
    name: "Reusable Frontend Starter",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
  },

  theme: {
    mode: "light",

    colors: {
      primary: "#2563eb",
      secondary: "#64748b",

      background: "#ffffff",
      surface: "#f8fafc",

      text: "#0f172a",
      mutedText: "#64748b",

      border: "#e2e8f0",

      header: "#ffffff",
      headerText: "#0f172a",

      sidebar: "#ffffff",
      sidebarText: "#0f172a",
      sidebarActive: "#2563eb",
      sidebarHover: "#f1f5f9",

      footer: "#f8fafc",
      footerText: "#64748b",
    },

    
    darkColors: {
  primary: "#60a5fa",
  secondary: "#94a3b8",

  background: "#0f172a",
  surface: "#1e293b",

  text: "#f8fafc",
  mutedText: "#94a3b8",

  border: "#334155",

  header: "#0f172a",
  headerText: "#f8fafc",

  sidebar: "#111827",
  sidebarText: "#f8fafc",
  sidebarActive: "#60a5fa",
  sidebarHover: "#1e293b",

  footer: "#1e293b",
  footerText: "#94a3b8",
},

    typography: {
      fontFamily: "Inter, sans-serif",
      baseFontSize: "16px",
    },

    spacing: {
      pagePadding: "24px",
      sectionGap: "24px",
      navigationGap: "8px",
    },

    radius: {
      sm: "4px",
      md: "20px",
      lg: "120px",
    },

    shadows: {
      header: "0 1px 3px rgba(0, 0, 0, 0.1)",
      sidebar: "0 1px 3px rgba(0, 0, 0, 0.1)",
      card: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
  },

  layout: {
    header: {
      enabled: true,
      height: 80,
      alignment: "left",
      shadow: false,
    },

    sidebar: {
      enabled: true,
      position: "left",
      width: 240,
      collapsedWidth: 64,
      collapsible: true,
      defaultCollapsed: false,
    },

    content: {
      maxWidth: "full",
      padding: "24px",
      alignment: "left",
    },

    footer: {
      enabled: true,
      height: 48,
      alignment: "center",
    },
  },

 navigation: {
  header: {
    items: [
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Products",
        path: "/products",
      },
      {
        label: "Pricing",
        path: "/pricing",
      },
    ],
    position: "right",
  },

  sidebar: {
  items: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      label: "Users",
      path: "/users",
      icon: "👤",
    },
    {
      label: "Reports",
      path: "/reports",
      icon: "📊",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "⚙️",
    },
  ],
},
},
};

