import React, { useMemo } from 'react'
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import Pin from '../components/mapbox/pin'
import { mapboxToken } from '../helpers/environment'
import styled from 'styled-components'

const MapShow = ({ long, lat, label }) => {
  const pin = useMemo(
    () => (
      <Marker
        longitude={long}
        latitude={lat}
        anchor="bottom"
        onClick={(e) => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation()
        }}
      >
        <Pin label={label} />
      </Marker>
    ),
    [long, lat, label]
  )

  return (
    <Wrapper>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: long,
          zoom: 15,
          bearing: 0,
          pitch: 0,
        }}
        scrollZoom={false}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={mapboxToken}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" showZoom={false} />
        <ScaleControl />

        {pin}
      </Map>
    </Wrapper>
  )
}

export default MapShow

const Wrapper = styled.div`
  height: 70vh;
`
