export interface RoutingMachineProps {
    tocoords:[number, number];
    fromcoords: [number, number];
    updateExternalState: (newCords: [number, number]) => void;
  }