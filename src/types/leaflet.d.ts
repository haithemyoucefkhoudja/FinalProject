import "leaflet";

declare module "leaflet" {
    namespace Routing {
        interface RoutingControlOptions extends RoutingControlOptions {
            createMarker?: (i: string | number, waypoint: { latLng: string | L.LatLngLiteral | L.LatLngTuple; }, n: any) => Marker
        }
    }
}