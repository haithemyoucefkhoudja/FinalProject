"use client";
import { LineChartIcon,  UsersIcon } from 'lucide-react';
import { createContext, useState, useContext, ReactNode, ReactElement } from 'react';

interface SidebarItem {
  label: string;
  icon: ReactElement;
  href: string;
}

interface SidebarContextType {
  sidebarItems: Record<string, SidebarItem[]>;
  
}
const SidebarContext = createContext<SidebarContextType>({
  sidebarItems: {}
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  
  const sidebarItems: Record<string, SidebarItem[]> = {
    '/Dashboard/Stats': [
      { label: 'Company', icon: <LineChartIcon className="h-4 w-4"/>, href: '/Dashboard/Stats/Company' },
      // ... other items for /Dashboard/Stats
    ],
    '/Dashboard/Management': [
      { label: 'Drivers', icon: <UsersIcon className="h-4 w-4"/>, href: '/Dashboard/Management/Drivers' },
      // ... other items for /Dashboard/Management
    ],
    // ... add items for other routes
  };
  return (
    <SidebarContext.Provider value={{
        sidebarItems,   
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextType {
  return useContext(SidebarContext);
}