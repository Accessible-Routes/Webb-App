import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MyMap from './common/components/myMap.component';
import Header from './common/components/header.component';

export default function App() {
  return (
    <View style={styles.container}>
    <SafeAreaView style={{flex:1}}>
      <Header/>
    </SafeAreaView>
      <MyMap/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});