import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import React from 'react';


const Map = ({ buildingLocations, routeCordList, stairCordList, displayStairCords }) => {
    const campus_center = [42.7294, -73.6797];

    // populate visible_stairs only if displayStairCords is true
    let visible_stairs = []
    if(displayStairCords){
        visible_stairs = stairCordList.map((stair_location) =>
        (<Marker
            key={stair_location.latitude}
            position={[stair_location.latitude, stair_location.longitude]}
        />))
    }

    return (
        <MapContainer center={campus_center} zoom={17} style={{ width: "100%", height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
            />

            {/* Draw buildings */
                buildingLocations.map((marker) =>
                (<Marker
                    key={marker.latitude}
                    position={[marker.latitude, marker.longitude]}
                />))
            }

            {/* Draw stairs */
                visible_stairs
            }

            {/* Draw route */
                <Polyline positions={routeCordList} color={'red'} />
            }
        </MapContainer>
    );
};

export default Map;


