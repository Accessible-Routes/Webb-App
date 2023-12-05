import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';


const SearchBarButton = ({ title, displayText, onPress }) => {
    
    return (<View style={styles.container}>
        <Text style={styles.inputTitle}>{title}:</Text>

        <TouchableOpacity 
            style={styles.input}
            onPressIn={onPress}
        >

            {displayText ? 
                <Text>{displayText}</Text>: 
                <Text style={{color:'grey'}}>select building</Text>}
        </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 30,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },

    input: {
        flex: 5,
        height: 40,
        width: 80,
        margin: 12,
        borderWidth: 1,
        borderRadius: 12 / 1.25,
        padding: 10,
    },

    inputTitle: {
        flex: 1,
        height: 40,
        width: 80,
        margin: 12,
        padding: 10,
        fontWeight: "bold",
        fontSize: 15,
    }

})

export default SearchBarButton;