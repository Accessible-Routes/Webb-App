import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MyMap from './common/components/myMap.component';
import Header from './common/components/header.component';


export default function App() {
  const [routeCordList, SetRouteCordList] = useState([]);
  const [buildingLocations, setBuildingLocations] = useState([]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header setBuildingLocations={setBuildingLocations} setRouteCordList={SetRouteCordList} />
      </SafeAreaView>
      <MyMap
        routeCordList={routeCordList}
        buildingLocations={buildingLocations}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});