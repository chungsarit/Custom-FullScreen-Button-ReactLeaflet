import './App.css'
import React from 'react'
import FullscreenButton from './FullscreenButton'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
function App() {

  const position = [12.565679, 104.990967]
  const zoomlevel = 7
  const [position_button, setp_position_button] = React.useState('');
  const handleChange = (event) => {
    setp_position_button(event.target.value);
  };

  return (
    <>
      <MapContainer center={position} zoom={zoomlevel} scrollWheelZoom={true} style={{ height: '100vh', width: '100%' }} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FullscreenButton position='topright' />
        <ZoomControl position="topright" />
        <FullscreenButton position='topleft' />
        <ZoomControl position="topleft" />
        <FullscreenButton position='bottomright' />
        <ZoomControl position="bottomright" />
        <FullscreenButton position='bottomleft' />
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </>
  )
}

export default App