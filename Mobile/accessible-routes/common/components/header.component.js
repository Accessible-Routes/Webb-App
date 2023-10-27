import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ParseLocationsAndRoute from './helpers';

import TopBar from './topBar.component';
import SearchBar from './searchbar.component';


const Header = ({ setBuildingLocations, setRouteCordList, setRouteFound }) => {
  const [startLocationString, setStartLocationString] = useState('');
  const [endLocationString, setEndLocationString] = useState('');

  const requestRoute = () => {
    const { buildings, route, route_found, error } = ParseLocationsAndRoute(startLocationString, endLocationString)
    setRouteFound(route_found);
    if (!error) {
      if(route_found){
        console.log(buildings)
        setBuildingLocations(buildings)
        setRouteCordList(route)
      }else{
        // if there is not path route available, clear all markers and routes on map
        setBuildingLocations([])
        setRouteCordList([])
      }
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