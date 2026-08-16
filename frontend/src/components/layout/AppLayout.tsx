"use client";

import { LayoutProvider } from "../../context/LayoutContext";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import type { LayoutConfig } from "../../types";
import { appConfig } from "../../config";

interface AppLayoutProps {
  children: React.ReactNode;
  layout: LayoutConfig;
}

export default function AppLayout({
  children,
  layout,
}: AppLayoutProps) {
  const themeColors =
    appConfig.theme.mode === "dark"
      ? appConfig.theme.darkColors
      : appConfig.theme.colors;

  const contentMaxWidth =
    layout.content.maxWidth === "full"
      ? "100%"
      : layout.content.maxWidth;

  const contentAlignment =
    layout.content.alignment === "center"
      ? "center"
      : "flex-start";

  return (
    <LayoutProvider>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {layout.header.enabled && (
          <Header
            branding={appConfig.branding}
            layout={layout.header}
            colors={themeColors}
            navigation={appConfig.navigation.header.items}
          />
        )}

        <div
          style={{
            flex: 1,
            display: "flex",
            width: "100%",
            flexDirection:
              layout.sidebar.position === "right"
                ? "row-reverse"
                : "row",
          }}
        >
          {layout.sidebar.enabled && (
            <Sidebar
              layout={layout.sidebar}
              colors={themeColors}
              navigation={appConfig.navigation.sidebar.items}
            />
          )}

          <main
            className="app-main"
            style={{
              flex: 1,
              minWidth: 0,
              padding: layout.content.padding,
              display: "flex",
              justifyContent: contentAlignment,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: contentMaxWidth,
              }}
            >
              {children}
            </div>
          </main>
        </div>

        {layout.footer.enabled && (
          <Footer
            layout={layout.footer}
            colors={themeColors}
          />
        )}
      </div>
    </LayoutProvider>
  );
}