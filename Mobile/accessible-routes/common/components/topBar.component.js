import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';



const TopBar = ({ navigation }) => {
    return <View style={styles.container}>
        <Image
            source={{ uri: 'https://raw.githubusercontent.com/json-mp3/Accessible-Routes/main/Logo.png' }}
            resizeMode="contain"
            style={styles.logoImg("100%")}/>
        <TouchableOpacity style={styles.btnContainer}
            onPress={() => navigation.navigate('IndoorNavigation')}>
            <Text style={{ padding: 10 }}>Switch View</Text>
        </TouchableOpacity>
    </View>
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        gap: 90
    },

    logoImg: (dimension) => ({

        width: dimension,
        height: dimension,
        alignItems: 'center',
        flex: 1
    }),

    btnContainer: {

        height: 40,
        backgroundColor: "#97dbf0",
        borderRadius: 12 / 1.25,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },


});


export default TopBar;