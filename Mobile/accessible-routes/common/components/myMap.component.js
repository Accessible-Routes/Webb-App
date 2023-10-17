import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

const MyMap = ({routeData}) => {
  const campus_center = [42.7294, -73.6797]
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

               {routeData.route.map((marker) => 
                (<Marker
                  key={marker.index}
                  coordinate={{latitude: marker.lat, longitude: marker.long}}
                  title={'loc'}
                />)
              )} 

              
            </MapView>

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