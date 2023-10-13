import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

import TopBar from './topBar.component';

const Header = () => {
  return <View style={styles.header}>
    <TopBar/>
    <Text style={styles.titleText}>Accessible Routes</Text>
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

    titleText: {
      fontSize: 20,
      padding: 120,
      fontWeight: 'bold',
    },
  });
  
export default Header;