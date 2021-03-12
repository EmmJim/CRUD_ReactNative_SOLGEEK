import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Spinner = () => {
    return (  
        <View style={[styles.spinnerContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="white"/>
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerContainer:{
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10
    }
});

export default Spinner;