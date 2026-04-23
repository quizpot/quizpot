"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function StepEditorSidebarProvider({ children, initialOpen = false }: { children: React.ReactNode; initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);

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