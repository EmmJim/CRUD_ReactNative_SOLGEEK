import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import Boton from '../components/Boton';
import clienteAxios from '../config/axios';
import Colors from '../constants/colors';
import * as Animatable from 'react-native-animatable';

const Usuarios = (props) => {
    const {usuarios, setNuevo, setEdicion, guardarConsultar, guardarUsuarioEdicion} = props;


    const eliminarUsuario = async id => {
        try {
            await clienteAxios.delete(`/eliminar/${id}`);
            Alert.alert('Usuario Eliminado!', 'El usuario ha sido eliminado correctamente', 
            [{text: 'Okay', style: 'destructive'}]);
            guardarConsultar(true);
            setNuevo(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdicion = usuario => {
        guardarUsuarioEdicion(usuario);
        setEdicion(true);
        console.log()
    }

    return (
        <ScrollView> 
            <Animatable.View 
                style={styles.screen}
                animation="bounceInDown"
            >
                <Boton
                    titulo="Nuevo Usuario"
                    onPress={() => setNuevo(true)}
                ></Boton>
                <View style={styles.tablaContainer}>
                    {usuarios.map(usuario => (
                        <View key={usuario._id}>
                            <View style={styles.row}>
                                <Text style={styles.text}>{usuario.nombre}</Text>
                                <Text style={styles.text}>{usuario.apellido}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.text}>{usuario.correo}</Text>
                                <Text style={styles.text}>{usuario.status ? 'Activo' : 'Inactivo'}</Text>
                                <Text style={styles.botonEditar} onPress={() => handleEdicion(usuario)}>/</Text>
                                <Text style={styles.botonEliminar} onPress={() => eliminarUsuario(usuario._id)}>X</Text>
                            </View>
                            <View style={styles.separador}></View>
                        </View>
                    ))}
                    
                </View>
            </Animatable.View>
        </ScrollView> 
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }, 
    tablaContainer: {
        borderRadius: 10,
        maxWidth: '100%',
        marginTop: 40,
        backgroundColor: Colors.gris,
        padding: 10,
        paddingTop: 15,
        shadowColor: 'black',
        shadowOffset: {width: 4, height: 4},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    text: {
        color: 'white',
        marginRight: 10,
        fontSize: 12
    },
    botonEditar: {
        backgroundColor: '#2fc457',
        paddingHorizontal:8,
        paddingVertical: 5,
        marginRight: 10,
        color: 'white',
        borderRadius: 3
    },
    botonEliminar: {
        backgroundColor: 'red',
        paddingHorizontal:8,
        paddingVertical: 5,
        color: 'white',
        borderRadius: 3
    },
    separador: {
        backgroundColor: '#9c9c9c',
        height: 1,
        marginVertical: 10
    }
});

export default Usuarios;