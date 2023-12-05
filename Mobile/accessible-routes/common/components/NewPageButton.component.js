import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


const NewPageButton = ({ navigation }) => {
    return <View style={styles.container}>
        <TouchableOpacity style={styles.btnContainer}
            // replace with help screen
            onPress={() => navigation.navigate('IndoorNavigation')}> 
            <Text style={{ padding: 10 }}>New Page</Text>
        </TouchableOpacity>
    </View>
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },

    logoImg: (dimension) => ({

        width: dimension,
        height: dimension,
        alignItems: 'center',
        flex: 1
    }),

    btnContainer: {

        height: 40,
        backgroundColor: "#dba7c3",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});


export default NewPageButton;