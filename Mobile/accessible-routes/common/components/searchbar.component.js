import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';



const SearchBar = () => {
    return <View style={styles.container}>
        <Text> Start: </Text>
        <TouchableOpacity style={styles.searchBtnContainer}>
            <Text>Click here to search</Text>
        </TouchableOpacity>
    </View>
};



const styles = StyleSheet.create({
    container: {

        width: "100%",
        height: 20,
        flexDirection: "row"
    },
    searchBtnContainer: {
        
        backgroundColor: "#dedede",
        borderRadius: 5 / 1,
        justifyContent: "center",
        alignItems: "center",
    },

})

export default SearchBar;