import React from 'react';
import { StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';


const Error = () => {
    return (  
        <Animatable.Text 
            style={styles.alerta}
            animation='wobble'
        >Todos los campos son Obligatorios</Animatable.Text>
    );
}

const styles = StyleSheet.create({
    alerta: {
        backgroundColor: 'red',
        color: 'white',
        padding: 3,
        width: '90%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default Error;