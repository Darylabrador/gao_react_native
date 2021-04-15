import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import Ordinateur from '../models/Ordinateur.js';

export default AddOrdinateur = ({ navigation }) => {
    const [ordinateurName, setOrdinateurName] = useState("");

    const onChangeOrdinateurName = (value) => {
        setOrdinateurName(value)
    }

    const addData = async () => {
        try {
            if (ordinateurName != "") {
                let newOrdi = new Ordinateur()
                newOrdi.name = ordinateurName;
                await newOrdi.save()
                await setOrdinateurName("")
                navigation.navigate('Home')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Input placeholder="Nom de l'ordinateur" type="text" value={ordinateurName} onChangeText={text => onChangeOrdinateurName(text)} />
            <Button title="ajouter un ordinateur" onPress={() => addData()} />
        </View>
    )
}