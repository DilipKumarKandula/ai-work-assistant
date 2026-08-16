import "./globals.css";

import type { CSSProperties } from "react";
import { appConfig } from "../config";
import { getThemeVariables } from "../theme/theme";
import AppLayout from "../components/layout/AppLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const themeVariables = getThemeVariables(
  appConfig.theme.mode === "dark"
    ? appConfig.theme.darkColors
    : appConfig.theme.colors,
  appConfig.theme.typography,
  appConfig.theme.spacing,
  appConfig.theme.radius
);

  return (
    <html lang="en">
      <body style={themeVariables as CSSProperties}>
        <AppLayout layout={appConfig.layout}>
          {children}
        </AppLayout>
      </body>
    </html>

  );
}