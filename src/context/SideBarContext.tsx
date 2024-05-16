"use client";
import { CheckCircleIcon, ClockIcon, Copyright, CurlyBraces, HomeIcon, LineChartIcon,  MapPinIcon,  Package,  TabletsIcon,  TextIcon,  TruckIcon,  UserIcon,  UsersIcon, XCircleIcon } from 'lucide-react';
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
    '/Dashboard/Map': [
      { label: 'Inventories', icon: <MapPinIcon className="h-4 w-4" />, href: '/Dashboard/Map/Inventories' },
      { label: 'Shipments', icon: <TruckIcon className="h-4 w-4" />, href: '/Dashboard/Map/Shipments' },
    ],
    '/Dashboard/Tables': [
      { label: 'Company', icon: <Copyright className="h-4 w-4" />, href: '/Dashboard/Tables/Company' },
      { label: 'Warehouses', icon: <HomeIcon className="h-4 w-4" />, href: '/Dashboard/Tables/Warehouses' },
    ],
    '/Dashboard/Shipments': [
      { label: 'Current', icon: <ClockIcon className="h-4 w-4" />, href: '/Dashboard/Shipments/Current' },
      { label: 'Done', icon: <CheckCircleIcon className="h-4 w-4" />, href: '/Dashboard/Shipments/Done' },
      { label: 'Canceled', icon: <XCircleIcon className="h-4 w-4" />, href: '/Dashboard/Shipments/Canceled' }, 
    ],
    '/Dashboard/Stats': [
      { label: 'Company', icon: <Copyright className="h-4 w-4" />, href: '/Dashboard/Stats/Company' },
      { label: 'Products', icon: <Package className="h-4 w-4" />, href: '/Dashboard/Stats/Products' }, 
      { label: 'Reports', icon: <TextIcon className="h-4 w-4" />, href: '/Dashboard/Reports' }
    ],
    '/Dashboard/Management': [
      { label: 'Company', icon: <TabletsIcon className="h-4 w-4" />, href: '/Dashboard/Management/Company' },
      { label: 'Warehouses', icon: <HomeIcon className="h-4 w-4" />, href: '/Dashboard/Management/Warehouses' },
      { label: 'Accounts', icon: <UserIcon className="h-4 w-4" />, href: '/Dashboard/Management/Accounts' },
      { label: 'Vehicles', icon: <TruckIcon className="h-4 w-4" />, href: '/Dashboard/Management/Vehicles' },
      { label: 'Products', icon: <CurlyBraces className="h-4 w-4" />, href: '/Dashboard/Management/Products' }, 
    ],
    // Add more routes as needed...
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