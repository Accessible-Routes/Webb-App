import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ParseLocationsAndRoute from './helpers';

import TopBar from './topBar.component';
import SearchBar from './searchbar.component';


const Header = ({ setBuildingLocations, setRouteCordList }) => {
  const [startLocationString, setStartLocationString] = useState('');
  const [endLocationString, setEndLocationString] = useState('');

  const requestRoute = () => {
    const { buildings, route, error } = ParseLocationsAndRoute(startLocationString, endLocationString)
    if (!error) {
      console.log(buildings)
      setBuildingLocations(buildings)
      setRouteCordList(route)
    } else {
      console.log('route parsing error')
      console.log(error)
    }
  }

  return <View style={styles.header}>
    <TopBar />
    <SearchBar title={"Start"} setLocationText={setStartLocationString} />
    <SearchBar title={"End"} setLocationText={setEndLocationString} />
    <View style={{ justifyContent: 'center', flex: 1, alignItems: "center", }}>
      <TouchableOpacity style={styles.btnContainer} onPressIn={requestRoute} >
        <Text style={{ padding: 10 }}> Find Route</Text>
      </TouchableOpacity>
    </View>
  </View>
};


const styles = StyleSheet.create({
  container: {

    flexDirection: "column",
  },
  header: {
    width: '100%',
    height: '25%',
    flex: 1,
    flexDirection: "column",
  },
  btnContainer: {
    height: 40,
    width: 100,
    backgroundColor: "#9b9ceb",
    borderRadius: 12 / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default Header;