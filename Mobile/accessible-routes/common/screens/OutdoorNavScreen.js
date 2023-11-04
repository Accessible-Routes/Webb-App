import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import OutdoorHeader from '../components/OutdoorHeader.component';
import MyMap from '../components/myMap.component';



const OutdoorNavScreen = ({ navigation, route }) => {
    const [routeCordList, SetRouteCordList] = useState([]);
    const [buildingLocations, setBuildingLocations] = useState([]);
    const [routeFound, setRouteFound] = useState(true);

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <OutdoorHeader 
                    navigation={navigation} 
                    route={route}
                    buildingLocations={buildingLocations} 
                    setBuildingLocations={setBuildingLocations} 
                    setRouteCordList={SetRouteCordList} 
                    setRouteFound={setRouteFound} />
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


export default OutdoorNavScreen;