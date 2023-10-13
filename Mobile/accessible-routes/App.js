import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import MyMap from './common/components/myMap.component';
import Header from './common/components/header.component';

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <MyMap/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});