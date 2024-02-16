import { School } from "services/school";
import React from "react";
import styles from "./school_map.module.css";
import { autorun, IObservableValue } from "mobx";
import { SearchConfigState, setMapBounds } from "utils/search_config_presenter";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  // @ts-ignore
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

type MapState =
  | { state: "INIT" }
  | { state: "LOADING" }
  | {
      state: "LOADED";
      map: google.maps.Map;
      clusterer: MarkerClusterer;
      markersBuf: Map<number, google.maps.Marker>;
    };

type Props = {
  schoolsList: IObservableValue<School[]>;
  searchConfigRef: IObservableValue<SearchConfigState>;
};

type State = {
  mapElement: HTMLDivElement | null;
  mapState: MapState;
};

class SchoolMap extends React.Component<Props, State> {
  mapElement: HTMLDivElement | null;
  mapState: MapState;

  constructor(props: Props) {
    super(props);
    this.mapElement = null;
    this.mapState = { state: "INIT" };

    autorun(() => {
      const schoolsList = this.props.schoolsList.get();
      if (this.mapState.state === "LOADED") {
        const { map, clusterer, markersBuf } = this.mapState;
        const newMarkers = new Map();
        schoolsList.forEach((school) => {
          // New schools
          if (!markersBuf.has(school.internalId)) {
            const infowindow = new google.maps.InfoWindow({
              content:
                `<p>${school.name}</p>` +
                `<a href="${school.website}" target="_blank">site</a>`,
            });
            const marker = new google.maps.Marker({
              position: new google.maps.LatLng(
                parseFloat(school.latitude),
                parseFloat(school.longtitude)
              ),
              label: school.isGovernment ? "G" : "NG",
            });
            marker.addListener("click", () => {
              infowindow.open(map, marker);
            });
            newMarkers.set(school.internalId, marker);
            clusterer.addMarker(marker, true);
          } else {
            newMarkers.set(
              school.internalId,
              markersBuf.get(school.internalId)
            );
            markersBuf.delete(school.internalId);
          }
        });
        for (const marker of markersBuf.values()) {
          clusterer.removeMarker(marker, true);
        }
        clusterer.render();
        this.mapState = {
          ...this.mapState,
          markersBuf: newMarkers,
        };
      }
    });
  }

  reportMapBounds = () => {
    if (this.mapState.state === "LOADED") {
      const map = this.mapState.map;
      const bounds = map.getBounds();
      const ne = bounds && bounds.getNorthEast();
      const sw = bounds && bounds.getSouthWest();
      if (ne && sw) {
        setMapBounds(this.props.searchConfigRef, {
          ne: {
            lat: ne.lat(),
            lng: ne.lng(),
          },
          sw: {
            lat: sw.lat(),
            lng: sw.lng(),
          },
        });
      }
    }
  };

  setMapElementRef = (element: HTMLDivElement) => {
    this.mapElement = element;
    if (this.mapState.state == "INIT") {
      this.mapState = { state: "LOADING" };
      loader.load().then(async () => {
        const googleMapLib = (await google.maps.importLibrary(
          "maps"
        )) as google.maps.MapsLibrary;
        if (this.mapElement) {
          const map = new googleMapLib.Map(this.mapElement, {
            center: { lat: -33.8568, lng: 151.2153 },
            zoom: 13,
            mapTypeControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
          });
          map.addListener("idle", this.reportMapBounds);
          this.reportMapBounds();
          const clusterer = new MarkerClusterer({
            map,
            markers: [],
          });
          this.mapState = {
            state: "LOADED",
            map,
            clusterer,
            markersBuf: new Map(),
          };
        } else {
          throw new Error("Map element is null.");
        }
      });
    }
  };

  render() {
    return <div className={styles.map} ref={this.setMapElementRef} />;
  }
}

export { SchoolMap };
