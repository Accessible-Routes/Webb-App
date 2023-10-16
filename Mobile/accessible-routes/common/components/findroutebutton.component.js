import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';



const FindRouteButton = () => {
    return <View style={{ justifyContent: 'center', flex: 1, alignItems: "center", }}>
        <TouchableOpacity style={styles.btnContainer}>
            <Text style={{ padding: 10 }}> Find Route</Text>
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    btnContainer: {
        height: 40,
        width: 100,
        backgroundColor: "#9b9ceb",
        borderRadius: 12 / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },


});


export default FindRouteButton;