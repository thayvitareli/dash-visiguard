"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface SidebarProps {
  children: ReactNode;
}

type contextData = {
  isOpen: boolean;
  togglePanel: () => void;
};

const SidebarContext = createContext({} as contextData);

export function SidebarProvider({ children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ togglePanel, isOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => useContext(SidebarContext);
