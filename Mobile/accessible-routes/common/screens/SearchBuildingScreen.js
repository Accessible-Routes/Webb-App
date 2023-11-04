import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, TextInput } from "react-native";
import axios from 'axios';


const SearchBuildingScreen = ({ route, navigation }) => { 

    const [buildingSearchField, SetBuildingSearchField] = useState('');
    useEffect(() => {
        // determines what search field the data should update
        if (route.params?.buildingSearchField !== null &&
            route.params?.buildingSearchField !== '') {
          SetBuildingSearchField(route.params?.buildingSearchField)
        }
      }, [route.params?.buildingSearchField]);
    const [buildingText, SetBuildingText] = useState('');
    const [buildingNames, setBuildingNames] = useState([]);

    useEffect(() => { requestAllBuildings() }, []);
    const requestAllBuildings = async () => {
        const allBuildingsURL = `http://54.219.173.249:8000/api/all-buildings`
        const response = await axios.get(allBuildingsURL).catch((err) => {
            console.log('error during retrieval of when getting response (requesting all ): ', err);
            // report error
        });
        setBuildingNames(response.data)
    }

    const renderBuildingDetails = (buildingName, buildingUID) => {
        console.log(buildingName)
        if (buildingName === '' || buildingName.toLowerCase().includes(buildingText.toLowerCase())) {
            return (
            <View >
                <TouchableOpacity
                    onPress={() => { 
                        if(buildingSearchField == 'start'){
                            navigation.navigate('Home', 
                            {startLocationName: buildingName,
                                buildingUID: buildingUID
                                })
                        }else if(buildingSearchField == 'end'){
                            navigation.navigate('Home', {endLocationName: buildingName, 
                                buildingUID: buildingUID
                            })
                        }
                        }}
                    delayPressIn={100}
                    style={styles.itemContainer}>
                    <Text>
                        {buildingName}
                    </Text>
                </TouchableOpacity>
            </View>)
        }
    }

    return (
        <SafeAreaView>
            <View style={{ height: '8%', width:'100%' }}>
                <TextInput 
                    style={styles.input}
                    placeholder="search building"
                    onChangeText={newText => SetBuildingText(newText)}/>
            </View>
            <View style={{ height: '92%', width:'100%' }}>
                <FlatList
                    data={buildingNames}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        renderBuildingDetails(item.Name, item.UUID)
                    )}>
                </FlatList>
            </View>
        </SafeAreaView>
    );
};

export default SearchBuildingScreen;



const styles = StyleSheet.create({
    input: {
        flex: 1,
        margin: 12,
        borderWidth: 1,
        borderRadius: 12 / 1.25,
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '90%',
        margin: 10,
        marginHorizontal: 16,
        backgroundColor: '#ebebeb',
        paddingHorizontal: 36,
        paddingVertical: 16,
        borderRadius: 6,
    },
});