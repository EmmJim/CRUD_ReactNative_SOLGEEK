import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import Colors from './constants/colors';
import Spinner from './components/Spinner';
import Usuarios from './screens/Usuarios';
import NuevoUsuario from './screens/NuevoUsuario';
import EditarUsuario from './screens/EditarUsuario';
import clienteAxios from './config/axios';

export default function App() {

  const [nuevo, setNuevo] = useState(false);
  const [edicion, setEdicion] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [consultar, guardarConsultar] = useState(true);
  const [cargando, guardarCargando] = useState(true);
  const [usuarioedicion, guardarUsuarioEdicion] = useState({});

  useEffect(() => {
    if(consultar){
      const consultarAPI = async () => {
        try {
          const resultado = await clienteAxios.get('/usuarios');
          setUsuarios(resultado.data);
          guardarCargando(false);
          guardarConsultar(false);
        } catch (error) {
          console.log(error);
        }
      }
      consultarAPI();
  }
  }, [consultar])

  let titulo = 'Administrador de Usuarios';
  let componente = 
    <Usuarios 
      usuarios={usuarios} 
      setNuevo={setNuevo} 
      setEdicion={setEdicion} 
      guardarConsultar={guardarConsultar}
      guardarUsuarioEdicion={guardarUsuarioEdicion}
    />

  if(nuevo){
    componente = <NuevoUsuario setNuevo={setNuevo} guardarConsultar={guardarConsultar}/>;
    titulo = 'Crear Usuario';
  }else if(edicion){
    componente = <EditarUsuario usuarioedicion={usuarioedicion} setEdicion={setEdicion} guardarConsultar={guardarConsultar}/>;
    titulo = 'Editar Usuario';
  }

  return (
    <View style={styles.container}>
      <Header titulo={titulo}/>
      {cargando ? <Spinner /> : componente}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primario
  }
});
