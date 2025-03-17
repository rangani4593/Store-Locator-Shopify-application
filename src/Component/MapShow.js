import React, { useState } from "react";
import '../Component/Component Css/MapShow.css'
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
  const [center, setCenter] = useState({ lat: 23.0225, lng: 72.5714 })

  function handleRemovePin(pin) {
    setPinsArray((prevPins) => prevPins.filter(e => e.lat !== pin.lat || e.lng !== pin.lng) )
    if (selectedPin && selectedPin.lat === pin.lat && selectedPin.lng === pin.lng) {
      setSelectedPin(null);
    }
  }
  function handleClick(e) {
    const obj = {
      lat: e.detail.latLng.lat,
      lng: e.detail.latLng.lng,
    };
    setPinsArray([...pinsArray, obj]);

  }

  return (
    <div className="map">
      <APIProvider apiKey={apiKey}>
        <div className="map-scale">
          <Map
            zoom={zoom}
            center={center}
            mapId={mapId}
            onClick={handleClick}
            onZoomChanged={(e) => setZoom(e.detail.zoom)}
            onCenterChanged={(e) => setCenter(e.detail.center)}
            gestureHandling="greedy"
            zoomControl={true}
            mapTypeId="roadmap"
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
                  <p>Latitude: {selectedPin.lat}</p>
                  <p>Longitude: {selectedPin.lng}</p>
                  <button className="remove-btn" onClick={() => handleRemovePin(selectedPin)}>Remove</button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
        <div>

        </div>
      </APIProvider>
    </div>
  );
};

export default MapShow;
