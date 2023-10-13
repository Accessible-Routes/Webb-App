import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';



const FindRouteButton = () => {
    return <View>
        <TouchableOpacity style={styles.btnContainer}>
            <Text style={{ padding: 10 }}> Switch View</Text>
        </TouchableOpacity>
    </View>
};


const styles = StyleSheet.create({
    btnContainer: {

        height: 40,
        backgroundColor: "#97dbf0",
        borderRadius: 12 / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },


});


export default FindRouteButton;