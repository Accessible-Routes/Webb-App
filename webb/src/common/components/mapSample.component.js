import { Map, MapContainer, TileLayer } from 'react-leaflet'
import React from 'react';
import "./mapSample.module.css";
//import L from 'leaflet';

// Try out OSM API calls
// Call the version

function MyMap() 
{
    const position = [42.7300, -73.6775]
    return (
        <MapContainer center={position} zoom={17} style={{width:"87%",height:"100vh"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />;
        </MapContainer>

    );
}
export default MyMap;

            /*, useMap<Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>*/