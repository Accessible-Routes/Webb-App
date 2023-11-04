import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ParseLocationsAndRoute from './helpers';
import SearchBarButton from './SearchBarButton.component';
import TopBar from './topBar.component';
import SearchBar from './searchbar.component';


const OutdoorHeader = ({ navigation, route, buildingLocations, setBuildingLocations, setRouteCordList, setRouteFound }) => {
  const [startLocationString, setStartLocationString] = useState('');
  const [endLocationString, setEndLocationString] = useState('');

  // update search fields from building search screen
  useEffect(() => {
    if (route.params?.endLocationUID) {
      setEndLocationString(route.params?.endLocationUID)
    }
  }, [route.params?.endLocationUID]);

  useEffect(() => {
    if (route.params?.startLocationUID) {
      setStartLocationString(route.params?.startLocationUID)
    }
  }, [route.params?.startLocationUID]);

  // request route data:
  useEffect(() => {}, [buildingLocations]);
  const requestRoute = async () => {
    const { buildings, route_details, route_found, error } = await ParseLocationsAndRoute(startLocationString, endLocationString)
    setRouteFound(route_found);
    if (!error) {
      if(route_found){
        setBuildingLocations(buildings)
        setRouteCordList(route_details)
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
    <SearchBarButton title={"Start"} 
      displayText={startLocationString} 
      onPress={() => navigation.navigate('SearchStartingBuilding')}/>
    <SearchBarButton title={"End"} 
    displayText={endLocationString}
    onPress={() => navigation.navigate('SearchEndingingBuilding')}/>
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

export default OutdoorHeader;