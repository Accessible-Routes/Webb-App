import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

import TopBar from './topBar.component';
import SearchBar from './searchbar.component';

const Header = () => {
  return <View style={styles.header}>
    <TopBar/>
    <SearchBar/>
    <SearchBar/>
  </View>
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      width: '100%',
      height: '25%',
    },

  });
  
export default Header;