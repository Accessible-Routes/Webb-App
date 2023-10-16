import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

import TopBar from './topBar.component';
import SearchBar from './searchbar.component';
import FindRouteButton from './findroutebutton.component';

const Header = () => {
  return <View style={styles.header}>
    <TopBar/>
    <SearchBar title="start"/>
  </View>
};


const styles = StyleSheet.create({
    container: {
      
      flexDirection: "column"
    },
    header: {
      width: '100%',
      height: '25%',
      flex: 1,
    },

  });
  
export default Header;