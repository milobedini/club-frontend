import React from 'react'
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Popup,
} from 'react-map-gl'
import { mapboxToken } from '../helpers/environment'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'

const MapShow = (props) => {
  useEffect(() => {}, [props])

  const [showPopup, setShowPopup] = useState(null)

  return (
    <>
      <Map
        initialViewState={{
          latitude: props.lat,
          longitude: props.long,
          zoom: props.zoom,
          bearing: 0,
          pitch: 0,
        }}
        viewState={
          props.search && {
            latitude: props.lat,
            longitude: props.long,
            zoom: props.zoom,
            bearing: 0,
            pitch: 0,
          }
        }
        scrollZoom={false}
        touchPitch={false}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={mapboxToken}
        // attributionControl={false}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <Marker
          longitude={props.long}
          latitude={props.lat}
          color="red"
          onClick={() => setShowPopup(props)}
        />
        {showPopup && (
          <Popup
            longitude={showPopup.long}
            latitude={showPopup.lat}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => setShowPopup(null)}
          >
            <PopupLabel>{showPopup.label}</PopupLabel>
          </Popup>
        )}
      </Map>
    </>
  )
}

export default MapShow

// const Wrapper = styled.div`
//   height: 70vh;
// `

const PopupLabel = styled.h2`
  color: #e63946;
  text-align: center;
`
