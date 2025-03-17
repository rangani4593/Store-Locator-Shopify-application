import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const mapId = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID;

const MapShow = () => {
  const [pinsArray, setPinsArray] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [zoom, setZoom] = useState(10)
  const [center, setCenter] = useState({lat: 23.0225, lng: 72.5714})

  function handleClick(e) {
      const obj = {
        lat: e.detail.latLng.lat,
        lng: e.detail.latLng.lng,
      };
      setPinsArray([...pinsArray, obj]);
    
    }

  return (
    <div>
      <APIProvider apiKey={apiKey}>
        <div style={{ height: "80vh" }}>
          <Map
            zoom={zoom}
            center={center}
            mapId={mapId}
            onClick={handleClick}
            onZoomChanged={(e) => setZoom(e.detail.zoom)}
            onCenterChanged={(e) => setCenter(e.detail.center)}
            gestureHandling="greedy"
            zoomControl={true}
          >
            {pinsArray.map((pin, index) => (
              <AdvancedMarker
                key={index}
                position={pin}
                onClick={() => setSelectedPin(pin)}
              >
                <Pin />
              </AdvancedMarker>
            ))}
            {selectedPin && (
                <InfoWindow 

                position={selectedPin}              
                onCloseClick={() => setSelectedPin(null)}
              >
                <div>
                  <p>Latitude: {selectedPin.lat.toFixed(4)}</p>
                  <p>Longitude: {selectedPin.lng.toFixed(4)}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default MapShow;
