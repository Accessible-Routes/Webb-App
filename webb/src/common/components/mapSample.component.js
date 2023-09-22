import { useMap, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from 'react';
import "./mapSample.module.css";
//import { Marker } from 'leaflet';
//import L from 'leaflet';

// Try out OSM API calls
// Call the version

function MyMap() 
{
    //Marker positions on map
    const Troy = [42.73101, -73.68051]
    const Ricketts = [42.73089, -73.6797]
    const SageLab = [42.73089, -73.68168]
    const JRowl = [42.72861, -73.68044]
    const AEaton = [42.73019, -73.6826]
    const Carnegie = [42.73042, -73.6832]
    const DCC = [42.72964, -73.67924]
    const Union = [42.72999, -73.67664]
    const JEC = [42.72955, -73.68039]
    const Lally = [42.73004, -73.68189]
    const Greene = [42.72999, -73.68118]
    const Folsom = [42.72932, -73.68267]
    const VCC = [42.72922, -73.68182]
    const gym = [42.73077, -73.67885]
    const campus_center = [42.7294, -73.6797]
    return (
        <MapContainer center={campus_center} zoom={17} style={{width:"100%",height:"100vh"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={Troy}
            eventHandlers={{
                click: () => {
                    MyMap.flyTo([Troy], 12)
                },
            }}
            > <Popup> Troy Building </Popup> </Marker>
            <Marker position={Ricketts}> <Popup> Ricketts Building </Popup> </Marker>
            <Marker position={SageLab}> <Popup> Russell Sage Laboratory  </Popup> </Marker>
            <Marker position={JRowl}> <Popup> Johnsson Rowland Science Center</Popup></Marker>
            <Marker position={AEaton}> <Popup> Amos Eaton </Popup></Marker>
            <Marker position={Carnegie}> <Popup> Carnegie Hall </Popup> </Marker>
            <Marker position={DCC}> <Popup> Darin Communications Center </Popup> </Marker>
            <Marker position={Union}> <Popup> Rensselaer Student Union </Popup> </Marker>
            <Marker position={JEC}> <Popup> Johnsson Engineering Center </Popup> </Marker>
            <Marker position={Lally}> <Popup> Lally Hall </Popup> </Marker>
            <Marker position={Greene}> <Popup> Greene Building </Popup> </Marker>
            <Marker position={Folsom}> <Popup> Folsom Library </Popup> </Marker>
            <Marker position={VCC}> <Popup> Vorhees Computing Center </Popup> </Marker>
            <Marker position={gym}> <Popup> '87 Gymnasium </Popup> </Marker>
        </MapContainer>

    );
}
export default MyMap;

            
