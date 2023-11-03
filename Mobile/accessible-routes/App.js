import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import OutdoorNavScreen from './common/screens/OutdoorNavScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen name="Home" component={OutdoorNavScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});