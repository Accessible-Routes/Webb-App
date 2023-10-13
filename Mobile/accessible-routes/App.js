import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MyMap from './common/components/myMap.component';
import Header from './common/components/header.component';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <MyMap/>
    </SafeAreaView>
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