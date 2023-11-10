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
  const [startLocationUID, setStartLocationUID] = useState('');
  const [endLocationUID, setEndLocationUID] = useState('');

  // update search fields from building search screen
  useEffect(() => {
    if (route.params?.endLocationName) {
      setEndLocationString(route.params?.endLocationName)
      setEndLocationUID(route.params?.buildingUID)
    }
  }, [route.params?.endLocationName]);

  useEffect(() => {
    if (route.params?.startLocationName) {
      setStartLocationString(route.params?.startLocationName)
      setStartLocationUID(route.params?.buildingUID)
    }
  }, [route.params?.startLocationName]);

  // request route data:
  useEffect(() => {}, [buildingLocations]);
  const requestRoute = async () => {
    const { buildings, route_details, route_found, error } = await ParseLocationsAndRoute(startLocationUID, endLocationUID)
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
    <TopBar navigation={navigation} />
    <SearchBarButton title={"Start"} 
      displayText={startLocationString} 
      onPress={() => navigation.navigate('SearchStartingBuilding')}/>
    <SearchBarButton title={"End"} 
    displayText={endLocationString}
    onPress={() => navigation.navigate('SearchEndingBuilding')}/>
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
    backgroundColor: '#fed99b',
    borderRadius: 12 / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default OutdoorHeader;