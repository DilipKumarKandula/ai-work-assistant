"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface LayoutContextValue {
  mobileSidebarOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  toggleMobileSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextValue | undefined>(
  undefined
);

interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider({
  children,
}: LayoutProviderProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const openMobileSidebar = () => {
    setMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((value) => !value);
  };

  return (
    <LayoutContext.Provider
      value={{
        mobileSidebarOpen,
        openMobileSidebar,
        closeMobileSidebar,
        toggleMobileSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error(
      "useLayout must be used inside LayoutProvider"
    );
  }

  return context;
}