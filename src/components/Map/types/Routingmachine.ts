export interface RoutingMachineProps {
    coords: [number, number];
    updateExternalState: (newCords: [number, number]) => void;
  }