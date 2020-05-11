import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ({ navigation, route}) => {
const {guardarConsultasAPI} = route.params;
const { nombre, telefono, correo, empresa, id } = route.params.item

const mostrarConfirmacion = () => {
 Alert.alert(
     '¿Deseas eliminar a este cliente?',
     'Un contacto eliminado no se puede recuperar',
     [
         {text:'Eliminar', onPress: () => eliminarContacto()},
         {text: 'Cnacelar', style: 'cancel'}
     ]
 )
}

const eliminarContacto = async () => {
    const url = `http://10.0.2.2:3000/clientes/${id}`
try {
await axios.delete(url)
} catch (error) {
    console.log(error)
}

navigation.navigate('Inicio')

guardarConsultarAPI(true)

}

    return (
        <View style={globalStyles.contenedor}>
           <Headline style={globalStyles.titulo}>{nombre}</Headline>
           <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
           <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading></Text>
           <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
           <Button
            mode="contained" 
            icon="cancel"
            onPress={ () => mostrarConfirmacion()}
            >
               Eliminar Cliente
           </Button>

           <FAB 
           icon="pencil"
           style={globalStyles.fab}
           onPress={() => navigation.navigate("NuevoCliente", { cliente: route.params.item, guardarconsultasAPI })}
           />
        </View>

    )
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
})

export default DetallesCliente;