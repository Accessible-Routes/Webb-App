import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MyMap from './common/components/myMap.component';
import Header from './common/components/header.component';


export default function App() {
  const [routeCordList, SetRouteCordList] = useState([]);
  const [buildingLocations, setBuildingLocations] = useState([]);
  const [routeFound, setRouteFound] = useState(true);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header buildingLocations={buildingLocations} setBuildingLocations={setBuildingLocations} setRouteCordList={SetRouteCordList} setRouteFound={setRouteFound}/>
      </SafeAreaView>
      <MyMap
        routeCordList={routeCordList}
        buildingLocations={buildingLocations}
        routeFound={routeFound}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});