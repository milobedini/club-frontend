import React, { useMemo } from 'react'
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import Pin from '../components/pin'
import ControlPanel from '../components/controlPanel'
import { mapboxToken } from '../helpers/environment'

const MapTest = () => {
  const pin = useMemo(
    () => (
      <Marker
        longitude={1.24}
        latitude={52.53}
        anchor="bottom"
        onClick={(e) => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation()
        }}
      >
        <Pin />
      </Marker>
    ),
    []
  )

  return (
    <>
      <div style={{ height: '100vh' }}>
        <Map
          initialViewState={{
            latitude: 52.53,
            longitude: 1.24,
            zoom: 13,
            bearing: 0,
            pitch: 0,
          }}
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxAccessToken={mapboxToken}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

          {pin}
        </Map>

        <ControlPanel />
      </div>
    </>
  )
}

export default MapTest
