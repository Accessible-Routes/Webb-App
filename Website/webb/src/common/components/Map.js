import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import React from 'react';


const Map = ({buildingLocations, routeCordList}) => {
    const campus_center = [42.7294, -73.6797];

    console.log('has route in map', routeCordList)
    console.log(routeCordList)

    console.log('has buildings in map', buildingLocations)
    console.log(buildingLocations)

    // console.log(buildingLocations)
    // console.log(routeCordList)
    return (
        <MapContainer center={campus_center} zoom={17} style={{ width: "100%", height: "100vh" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Draw buildings */
                buildingLocations.map((marker) =>
                (<Marker
                    // key={marker.location_type}
                    position={[Number(marker.latitude), Number(marker.longitude) ]}
                    // title={'temp'}
                />)
                )
                }

            {/* Draw route */
            // console.log('aaa');
            
            <Polyline positions={routeCordList} color={'red'} />
                // <Polyline
                //     coordinates={routeCordList.map((line) => ({ latitude: line.latitude, longitude: line.longitude }))}
                //     strokeColor={"#FFFF00"}
                //     strokeWidth={3}
                //     lineJoin={"round"}
                // />
                }

        </MapContainer>
    );
}

export default Map;


