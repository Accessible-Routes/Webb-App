import React from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';


const SearchBar = ({title, setLocationText}) => {
    return (<View style={styles.container}>
        <Text style={styles.inputTitle}>{title}:</Text>
        <TextInput 
            style={styles.input}
            placeholder= {title + " location"} 
            onChangeText={newText => setLocationText(newText)}/>
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

export default SearchBar;