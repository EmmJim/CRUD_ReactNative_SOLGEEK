import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
    return (  
        <View style={styles.header}>
            <Text style={styles.titulo}>{props.titulo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.secundario,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 36,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 0.80,
        shadowOpacity: 8,
        elevation: 12
    },
    titulo: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    }
});

export default Header;