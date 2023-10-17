import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MyMap from './common/components/myMap.component';
import Header from './common/components/header.component';
import { useFetch } from './common/hooks/useFetch';


// mock response from back-end using points (models start and end locations)
let mockResponse = {

  "route": [
    {
      "index": "1",
      "lat": 42.73020035793919,
      "long": -73.68182322241921
    },
    {
      "index": "2",
      "lat": 42.730808708361856,
      "long": -73.67975985815578
    }
  ]
}


/*
This is a mock response from the back end to generate a route using polylines:

Notes:
The structure is an array of objects containing the latitude longitude for each point of a route.
The first item in the array should be the starting location, and the last location should be the
ending location for hte route.

*/
let mockResponse2 = {

  "route": [
    {
      "latitude": 42.73020035793919,
      "longitude": -73.68182322241921
    },
    {
      "latitude": 42.730443933307185,
      "longitude": -73.68061432268627
    },
    {
      "latitude": 42.730808708361856,
      "longitude": -73.67975985815578
    },
  ]
}



export default function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  { console.log('\n\n') }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header setStartLocation={setStartLocation} setEndLocation={setEndLocation} />
      </SafeAreaView>
      <MyMap buildingLocs={mockResponse} routePolyLines={mockResponse2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});