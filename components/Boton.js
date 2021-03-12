import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Colors from '../constants/colors';

const Boton = props => {
    return (  
        <View style={styles.boton}>
            <Button {...props} title={props.titulo} color={Colors.secundario} />
        </View>
    );
}

const styles = StyleSheet.create({
    boton: {
        marginTop: 30,
        width: 150,
        maxWidth: '40%',
        alignItems: 'center'
    }
});

export default Boton;