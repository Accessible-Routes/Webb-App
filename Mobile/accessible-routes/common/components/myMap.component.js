import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';


const MyMap = ({ buildingLocations, routeCordList, routeFound }) => {
  const initialRegion = {
    latitude: 42.729268,
    longitude: -73.681227,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  return <View style={styles.container}>
    <MapView
      initialRegion={initialRegion}
      style={styles.map}>

      {/* Draw buildings */
        buildingLocations.map((marker) =>
        (<Marker
          key={marker.location_type}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
        />)
        )}

      {/* Draw route */
        <Polyline
          coordinates={routeCordList.map((line) => ({ latitude: line.latitude, longitude: line.longitude }))}
          strokeColor={"#6f03fc"}
          strokeWidth={3}
          lineJoin={"round"}
        />}

    </MapView>
    <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center', position:'absolute', paddingTop:40}}>

          {routeFound ? <Text></Text> : <Text style={{fontSize:30, textDecorationLine: 'underline'}}>No Route Found</Text>}

    </View>

  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MyMap;