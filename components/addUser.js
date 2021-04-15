import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import Client from '../models/Client.js';

export default AddClient = ({ navigation }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const onChangeName = (value) => {
        setName(value)
    }

    const onChangeSurname = (value) => {
        setSurname(value)
    }

    const addData = async () => {
        try {
            if (name != "" && surname != "") {
                await Client.create({ name,surname });
                navigation.navigate('Home')
                setName('')
                setSurname('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Input placeholder="Nom du client" type="text" value={name} onChangeText={text => onChangeName(text)} />
            <Input placeholder="Prénom du client" type="text" value={surname} onChangeText={text => onChangeSurname(text)} />
            <Button title="ajouter un client" onPress={() => addData()} />
        </View>
    )
}
