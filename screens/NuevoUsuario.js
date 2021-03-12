import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Alert, TextInput } from 'react-native';
import Boton from '../components/Boton';
import Error from '../components/Error';
import clienteAxios from '../config/axios';
import Colors from '../constants/colors';
import * as Animatable from 'react-native-animatable';

const NuevoUsuario = props => {

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        status: true,
        observaciones: ''
    });

    const [error, guardarError] = useState(false);

    const {nombre, apellido, correo, observaciones} = usuario;

    const {setNuevo, guardarConsultar} = props;

    const nombreOnChange = nombreIngresado => {
        guardarUsuario({
            ...usuario,
            nombre: nombreIngresado
        })
    }
    const apellidoOnChange = apellidoIngresado => {
        guardarUsuario({
            ...usuario,
            apellido: apellidoIngresado
        })
    }
    const correoOnChange = correoIngresado => {
        guardarUsuario({
            ...usuario,
            correo: correoIngresado
        })
    }
    const observacionesOnChange = observacionesIngresadas => {
        guardarUsuario({
            ...usuario,
            observaciones: observacionesIngresadas
        })
    }

    const handleSubmit = async () => {
        if(nombre.trim() === '' || apellido.trim() === '' || correo.trim() === '' || observaciones.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        try {
            await clienteAxios.post('/crear', usuario);
            Alert.alert('Usuario Agregado!', 'El usuario ha sido agregado correctamente', 
            [{text: 'Okay', style: 'destructive'}]);
            guardarConsultar(true);
            setNuevo(false);
        } catch (error) {
            
        }
        
    }

    return (  
        <ScrollView> 
            <Animatable.View 
                style={styles.screen}
                animation="bounceInDown"
                duration={1000}
                easing="ease-in-out-cubic"
            >
                <Boton
                    titulo="Volver"
                    onPress={() => setNuevo(false)}
                ></Boton>
                <View style={styles.appContainer}>
                    <View style={styles.container}>
                        {error ? <Error /> : null }
                        <Text style={styles.texto}>Nombre</Text>
                        <TextInput style={styles.input} placeholder="Nombre Usuario" onChangeText={nombreOnChange}/>
                        <Text style={styles.texto}>Apellido</Text>
                        <TextInput style={styles.input} placeholder="Apellido Usuario" onChangeText={apellidoOnChange}/>
                        <Text style={styles.texto}>Correo</Text>
                        <TextInput style={styles.input} placeholder="Correo Usuario" onChangeText={correoOnChange}/>
                        <Text style={styles.texto}>Observaciones</Text>
                        <TextInput style={styles.inputArea} onChangeText={observacionesOnChange}/>
                        
                        <Animatable.View 
                            style={styles.boton}
                            animation="swing"
                            delay={15000}
                        >
                            <Button title="Crear Nuevo Usuario" color={Colors.secundario} onPress={handleSubmit}/>
                        </Animatable.View>
                    </View>
                </View>
            </Animatable.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    appContainer: {
        alignItems: 'center'
    },
    container: {
        padding: 20,
        width: '80%',
        marginTop: 20,
        backgroundColor: Colors.gris,
        shadowColor: 'black',
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 12,
        alignItems: 'center'
    },
    texto: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15
    },
    input: {
        borderRadius: 5,
        borderColor: Colors.gris,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingVertical: 2,
        width: '90%',
        maxWidth: '90%',
        borderWidth: 1,
        marginTop: 10
    },
    inputArea: {
        borderRadius: 5,
        borderColor: Colors.gris,
        backgroundColor: 'white',
        paddingLeft: 10,
        width: '90%',
        maxWidth: '90%',
        height: 110,
        borderWidth: 1,
        marginTop: 10,
        alignItems: 'flex-start'
    },
    boton: {
        width: '90%',
        marginTop: 20
    }
});

export default NuevoUsuario;