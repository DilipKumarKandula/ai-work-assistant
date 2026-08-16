import type {
  FooterLayoutConfig,
  ThemeColors,
} from "../../types";

interface FooterProps {
  layout: FooterLayoutConfig;
  colors: ThemeColors;
}

export default function Footer({
  layout,
  colors,
}: FooterProps) {
  return (
    <footer
      style={{
        height: `${layout.height}px`,
        backgroundColor: colors.footer,
        color: colors.footerText,
        borderTop: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        flexShrink: 0,
      }}
    >
      <span>Footer</span>
    </footer>
  );
}