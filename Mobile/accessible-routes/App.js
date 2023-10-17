import React, {useState} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MyMap from './common/components/myMap.component';
import Header from './common/components/header.component';
import { useFetch } from './common/hooks/useFetch';


// mock response from back-end
let mockResponse = {
  
  "route": [
    {
      "index": "1",
      "lat": 42.73020035793919,
      "long":  -73.68182322241921
    },
    {
      "index": "2",
      "lat": 42.730808708361856,
      "long": -73.67975985815578
    }
  ]
}



export default function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  return (
    <View style={styles.container}>
    <SafeAreaView style={{flex:1}}>
      <Header setStartLocation={setStartLocation} setEndLocation={setEndLocation} />
    </SafeAreaView>
      <MyMap routeData={mockResponse} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});