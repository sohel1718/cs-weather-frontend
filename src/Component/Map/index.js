import { useRef, useCallback } from 'react';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

const accessToken = 'pk.eyJ1Ijoic29oZWxjaGhpcGEiLCJhIjoiY2txcTdjdHFoMTNybDJ1bnA1b2dtampjZSJ9.smr_OpwmSeUqW3592H0pQw';

const Map = ({ viewport, handleClick, setViewport, latLang }) => {
  const myMap = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => {
      setViewport(newViewport) 
    },
    [setViewport]
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      const event = { lngLat: [newViewport.longitude, newViewport.latitude] }
      handleClick(event); 
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  return (
    <ReactMapGL
      ref={myMap}
      {...viewport}
      onClick={e => handleClick(e)}
      mapboxApiAccessToken={accessToken}
      mapStyle="mapbox://styles/mapbox/outdoors-v10?optimize=true"
      onViewportChange={handleViewportChange}
      maxZoom={9}
      className="map"
    >
     <Marker latitude={latLang.lat} longitude={latLang.lng} offsetLeft={-20} zoom="9" offsetTop={-10}>
        <div className="loc-icon">
          <div className="icon"></div>
        </div>
      </Marker>
      <Geocoder
          mapRef={myMap}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={accessToken}
        />
      <GeolocateControl className="gps" />
    </ReactMapGL>
  );
}

export default Map