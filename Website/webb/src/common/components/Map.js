import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import React from 'react';

const Map = ({ allBuildings, buildingLocations, routeCordList, stairCordList, displayStairCords }) => {
    const campus_center = [42.7294, -73.6797];

    // populate visible_stairs only if displayStairCords is true
    let visible_stairs = [];
    if(displayStairCords) {
        visible_stairs = stairCordList.map((stair_location) =>
            <Marker
                key={stair_location.latitude}
                position={[stair_location.latitude, stair_location.longitude]}
            />
        );
    }

    // Assuming you have a list of positions named 'positionList'
    const positionList = allBuildings.map(building => [building.latitude, building.longitude]);

    return (
        <MapContainer center={campus_center} zoom={17} style={{ width: "100%", height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
            />

            {/* Draw buildings */}
            {buildingLocations.map((marker) =>
                <Marker
                    key={marker.latitude}
                    position={[marker.latitude, marker.longitude]}
                >
                    <Popup>
                        <div>
                            <h2>{marker.name}</h2>
                            {/* Additional building information can be displayed here */}
                        </div>
                    </Popup>
                </Marker>
            )}

            {/* Draw stairs */}
            {visible_stairs}

            {/* Draw route */}
            <Polyline positions={routeCordList} color={'red'} />

            {/* Draw popups for each position */}
            {positionList.map((position, index) => (
                <Marker key={index} position={position}>
                    <Popup>
                        <div>
                            <h2>Position {index + 1}</h2>
                            {/* Additional information about the position can be displayed here */}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
