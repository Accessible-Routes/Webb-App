import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from '../components/searchbar.component';
import axios from 'axios';

const buildingData = [{ "Name": "Rensselaer Union", "UUID": "995cea2f-7de3-41aa-8eec-b74e7fcc094f" },
{ "Name": "CBIS", "UUID": "c6f532b0-396a-4000-a5d3-1bcc623ce2c5" },
{ "Name": "RPI Playhouse", "UUID": "667572d9-86d5-43b5-9088-31752bf117bf" },
{ "Name": "Academy Hall", "UUID": "51cad0a8-2f97-425e-81c3-c54417191d93" },
{ "Name": "Sage dining Hall", "UUID": "ba323896-819a-4f38-9637-ae593ccf5434" },
{ "Name": "87 Gym", "UUID": "cb6ef8ce-e2c0-4d3f-a60d-6925b7a64b27" },
{ "Name": "Ricketts", "UUID": "41dd10a3-b636-48f0-ac1d-a1f9834fa6fd" },
{ "Name": "Troy Building", "UUID": "47faa34b-f42f-4068-93ec-e4d0bbb5d9be" },
{ "Name": "Sage Labs", "UUID": "0807846a-4beb-433b-9222-bbdd0aa3b219" },
{ "Name": "DCC", "UUID": "0dfb1a60-069c-44c7-afce-99d7aa646aa5" },
{ "Name": "Low", "UUID": "def2bb14-aad7-449a-aa13-fcb887b44c33" },
{ "Name": "JEC", "UUID": "66d603b8-a48f-443e-946a-f964a4b18c4b" },
{ "Name": "JROWL", "UUID": "75daa40f-caf7-4048-93c7-8fa82d617a09" },
{ "Name": "VCC", "UUID": "c3e60d69-e0f7-4d0f-a99f-97a93ca9c63c" },
{ "Name": "Folsom Library", "UUID": "d05fbf1c-35df-4ea0-9557-4e72771a54d6" },
{ "Name": "Greene Building", "UUID": "167dbdec-5758-462f-b933-ac4a8cc6b187" },
{ "Name": "Amos Eaton", "UUID": "21f731e5-08ae-404c-9732-217346ce952a" },
{ "Name": "Lally", "UUID": "b2c8e581-98e6-483f-8999-5de6d0c3ca66" }]



const SearchBuildingScreen = () => {
    const [data, setData] = useState([]);
    const [buildingText, SetBuildingText] = useState('c');
    const [filteredData, setFilteredData] = useState([]);
    const [buildingNames, setBuildingNames] = useState(buildingData);

    // {console.log(buildingNames)}


    useEffect(() => { requestAllBuildings() }, []);
    const requestAllBuildings = async () => {
        const allBuildingsURL = `http://54.219.173.249:8000/api/all-buildings`
        const response = await axios.get(allBuildingsURL).catch((err) => {
            console.log('error during retrieval of when getting response (requesting all ): ', err);
            // report error
        });
        // console.log(response.data)
        setBuildingNames(response.data) // commented for testing setBuildingNames(response.data)
        // setBuildingNames(response)
    }

    const renderBuildingDetails = (buildingName) => {
        console.log(buildingName)
        if (buildingName === '' || buildingName.toLowerCase().includes(buildingText.toLowerCase())) {
            console.log('rendering: ' + buildingName)
            return (<View style={styles.itemContainer}>
                <Text>
                    {buildingName}
                </Text>
            </View>)
        }
    }

    return (
        <SafeAreaView>
            <View style={{ height: 60 }}>
                <TextInput style={styles.input}>

                </TextInput>
            </View>
            <View style={{ paddingTop: '10%'}}>
                <FlatList
                    data={buildingNames}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        renderBuildingDetails(item.Name)
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
        width: 80,
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