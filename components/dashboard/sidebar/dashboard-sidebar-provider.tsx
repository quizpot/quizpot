"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { setCookie } from "cookies-next";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  isContentVisible: boolean;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function DashboardSidebarProvider({ children, initialOpen = true }: { children: React.ReactNode; initialOpen?: boolean }) {
  const [open, setOpenState] = useState(initialOpen);
  const [isContentVisible, setIsContentVisible] = useState(initialOpen);

  const setOpen = useCallback((value: boolean) => {
    setOpenState(value);
    setCookie('dashboard_sidebar_state', value, { maxAge: 60 * 60 * 24 * 365, path: '/' });
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setIsContentVisible(true), 100);
      return () => clearTimeout(t);
    } else {
      setIsContentVisible(false);
    }
  }, [open]);

  const contextValue = useMemo(() => ({ open, setOpen, isContentVisible }), [open, setOpen, isContentVisible]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within DashboardSidebarProvider");
  return ctx;
}