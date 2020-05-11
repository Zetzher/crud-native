import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from "../styles/global";
import axios from 'axios';


const NuevoCliente = ({navigation, route}) => {

    const [nombre, guardarNombre] = useState('')
    const [telefono, guardarTelefono] = useState('')
    const [email, guardarEmail] = useState('')
    const [empresa, guardarEmpresa] = useState('')
    const [alerta, guardarAlerta] = useState(false)

    useEffect(() => {
        if(route.params.cliente) {
            const { nombre, telefono, correo, empresa } = route.params.cliente;

            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarEmail(email);
            guardarEmpresa(empresa);
        } 
    }, [])

    const guardarCliente = async () => {
        if(nombre === '' || telefono === '' || email === '' || empresa === ''){
            guardarAlerta(true)
        return;
        }

        //Generar cliente
        const cliente = { nombre, telefono, email, empresa }

        //Enviar nuevo cliente a json
        if(route.params.cliente){
            const { id } = route.params.cliente;
            cliente.id = id;
            const url = `http://10.0.2.2:3000/clientes/${id}`

            try{
                await axios.put(url, cliente)
            } catch(error){
                console.log(error)
            }


        } else {
                try {
                    if(Platform.OS === 'ios'){
                        await axios.post('http://localhost:3000/clientes')
                    } else {
                        await axios.post('http://10.0.2.2:3000/clientes')
                    }
                 
                } catch (error) {
                    console.log(error)
                }

            
        }
        
    }

    navigation.navigate('Inicio')

    guardarNombre('');
    guardarTelefono('');
    guardarEmail('');
    guardarEmpresa('');

    guardarConsultasAPI(true)


    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Añadir nuevo Cliente</Headline>

            <TextInput 
                label="Nombre"
                placeholder="Julian"
                onChangeText= {texto => guardarNombre(texto)}
                value={nombre}
                style={styles.input}
            />
            <TextInput 
                label="Teléfono"
                placeholder="659874659"
                onChangeText= {(texto) => guardarTelefono(texto)}
                value={telefono}
                style={styles.input}
            />
            <TextInput 
                label="Email"
                placeholder="email@email.com"
                onChangeText= {(texto) => guardarEmail(texto)}
                value={email}
                style={styles.input}
            />
            <TextInput 
                label="Empresa"
                placeholder="Empresa"
                onChangeText= {(texto) => guardarEmpresa(texto)}
                value={empresa}
                style={styles.input}
            />

            <Button icon="pencil-circle" mode="contained" onPress={() => guardarCliente()}>
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                visible={alerta}
                onDismiss={ () => guardarAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={ () => guardarAlerta(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;