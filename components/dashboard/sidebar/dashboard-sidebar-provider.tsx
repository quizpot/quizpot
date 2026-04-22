"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  isContentVisible: boolean;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function DashboardSidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setIsContentVisible(true), 100);
      return () => clearTimeout(t);
    } else {
      setIsContentVisible(false);
    }
  }, [open]);

  return (
    <SidebarContext.Provider value={{ open, setOpen, isContentVisible }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within DashboardSidebarProvider");
  return ctx;
}