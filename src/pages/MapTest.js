import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { Marker } from 'react-map-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoibTFsb2J1ZyIsImEiOiJjbDUyaGFmbncwYjRwM2NuNXduNWVndHdtIn0.nsfqxuNEVvQ2OqvmFMXRDQ'

const MapTest = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(1.24)
  const [lat, setLat] = useState(52.53)
  const [zoom, setZoom] = useState(13)

  useEffect(() => {
    if (map.current) return //iniitalize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      label: 'Hello',
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      // getCenter determines long/lat from center of map.
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <div>
      <div className="map-sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <Marker longitude={1.24} latitude={52.53} anchor="bottom"></Marker>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  )
}

export default MapTest
