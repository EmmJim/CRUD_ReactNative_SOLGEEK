import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Alert, TextInput } from 'react-native';
import Boton from '../components/Boton';
import Error from '../components/Error';
import Colors from '../constants/colors';
import clienteAxios from '../config/axios';
import * as Animatable from 'react-native-animatable';

const EditarUsuario = props => {

    const  {setEdicion, guardarConsultar} = props;

    const [usuarioact, guardarUsuarioAct] = useState({
        id: props.usuarioedicion._id,
        nombre: props.usuarioedicion.nombre,
        apellido: props.usuarioedicion.apellido,
        correo: props.usuarioedicion.correo,
        status: props.usuarioedicion.status,
        observaciones: props.usuarioedicion.observaciones
    });

    const [error, guardarError] = useState(false);

    const {id, nombre, apellido, correo, status, observaciones} = usuarioact;

    const nombreOnChange = nombreIngresado => {
        guardarUsuarioAct({
            ...usuarioact,
            nombre: nombreIngresado
        })
    }
    const apellidoOnChange = apellidoIngresado => {
        guardarUsuarioAct({
            ...usuarioact,
            apellido: apellidoIngresado
        })
    }
    const correoOnChange = correoIngresado => {
        guardarUsuarioAct({
            ...usuarioact,
            correo: correoIngresado
        })
    }
    const observacionesOnChange = observacionesIngresadas => {
        guardarUsuarioAct({
            ...usuarioact,
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
            await clienteAxios.put(`/editar/${id}`, usuarioact);
            Alert.alert('Usuario Editado!', 'El usuario ha sido editado correctamente', 
            [{text: 'Okay', style: 'destructive'}]);
            guardarConsultar(true);
            setEdicion(false);
        } catch (error) {
            console.log(error);
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
                    onPress={() => setEdicion(false)}
                ></Boton>
                <View style={styles.appContainer}>
                    <View style={styles.container}>
                        {error ? <Error /> : null }
                        <Text style={styles.texto}>Nombre</Text>
                        <TextInput style={styles.input} placeholder="Nombre Usuario" value={nombre} onChangeText={nombreOnChange}/>
                        <Text style={styles.texto}>Apellido</Text>
                        <TextInput style={styles.input} placeholder="Apellido Usuario" value={apellido} onChangeText={apellidoOnChange}/>
                        <Text style={styles.texto}>Correo</Text>
                        <TextInput style={styles.input} placeholder="Correo Usuario" value={correo} onChangeText={correoOnChange}/>
                        <Text style={styles.texto}>Observaciones</Text>
                        <TextInput style={styles.inputArea} value={observaciones} onChangeText={observacionesOnChange}/>
                        
                        <Animatable.View 
                            style={styles.boton}
                            animation="swing"
                            delay={15000}
                        >
                            <Button title="Editar Usuario" color={Colors.secundario} onPress={handleSubmit}/>
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
        paddingVertical: 2,
        width: '90%',
        maxWidth: '90%',
        height: 110,
        borderWidth: 1,
        marginTop: 10
    },
    boton: {
        width: '90%',
        marginTop: 20
    }
});

export default EditarUsuario;