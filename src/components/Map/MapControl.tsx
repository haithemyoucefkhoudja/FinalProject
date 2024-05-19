import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapControlProps {
    center:[number, number] | undefined
  }
export const MapControl: React.FC<MapControlProps> = ({center}) => {
    const mapRef  = useMap();

  useEffect(() => {
      if(center)
      mapRef.setView(center);
  }, [center]);
   return(<></>) 
  }