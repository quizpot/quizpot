"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { setCookie } from "cookies-next";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function StepEditorSidebarProvider({ 
  children, 
  initialOpen = false 
}: { 
  children: React.ReactNode; 
  initialOpen?: boolean 
}) {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    setCookie("editor-sidebar-opened", open, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }, [open]);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useStepEditorSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useStepEditorSidebar must be used within StepEditorSidebarProvider");
  return ctx;
}