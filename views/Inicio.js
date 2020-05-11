import React, { useEffect, useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import axios from 'axios';
import { List, Headline, Button, FAB, StyleSheet } from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = ({navigation}) => {

const [ clientes, guardarClientes ] = useState([]);
const [ consultarAPI, guardarConsultasAPI ] = useState(true)


    useEffect(() => {
        const obtenerClientesApi = async () => {
            try{
                const resultado = await axios.get('http://10.0.2.2:3000/clientes');
                guardarClientes(resultado.data)
                guardarConsultasAPI(false)
            } catch (error) {
                console.log(error)
            }
        }

        if(consultarAPI) {
            obtenerClientesApi()
        }

    },[consultarAPI])

    return (
        <View style={globalStyles.contenedor}>

            <Button icon="plus-circle" onPress = {() => navigation.navigate('NuevoCliente', {guardarConsultasAPI}) }>
                Nuevo Cliente
            </Button>

            <Headline style={globalStyles.titulo}>{ clientes.length > 0 ? 'Clientes' : 'Aún no hay clientes'}</Headline>

            <FlatList 
                data={clientes}
                keyExractor={ cliente => (cliente.id).toString() }
                renderItem={ ({item}) => (
                    <List.Item
                    title={item.nombre}
                    description={item.empresa}
                    onPress={ () => navigation.navigate("DetallesCliente", {item, guardarConsultasAPI})}
                    />
                )}
            />

            <FAB
            icon="plus"
            style={styles.fab}
            onPress = {() => navigation.navigate('NuevoCliente', {guardarConsultasAPI}) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})

export default Inicio;