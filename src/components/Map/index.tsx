  import React from "react";
  import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
  import styles from './styles.module.scss';
  import { apiGoogleMaps } from "@/services/apiMaps";
  export interface MapPageProps {}
  
  const MapPage = () => {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: apiGoogleMaps
    });
  
    return (
      <div className={styles.mapContainer}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: -29.690371, lng: -51.136956 }}
            zoom={15}
          ></GoogleMap>
        ) : (
          <></>
        )}
      </div>
    );
  }
  
  export default MapPage;
  
