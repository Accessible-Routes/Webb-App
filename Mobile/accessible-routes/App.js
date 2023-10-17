import React, {useState} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MyMap from './common/components/myMap.component';
import Header from './common/components/header.component';
import { useFetch } from './common/hooks/useFetch';


export default function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');

  const { data, isPending, error } = useFetch(startLocation, endLocation);

  return (
    <View style={styles.container}>
    <SafeAreaView style={{flex:1}}>
      <Header setStartLocation={setStartLocation} setEndLocation={setEndLocation} />
    </SafeAreaView>
      <MyMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});