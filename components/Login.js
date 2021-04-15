import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';

export default Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (value) => {
        setEmail(value)
    }

    const onChangePassword = (value) => {
        setPassword(value)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Input placeholder="email@address.com" type="email" value={email} onChangeText={text => onChangeEmail(text)} />
            <Input placeholder="Password" secureTextEntry={true} value={password} onChangeText={text => onChangePassword(text)} />
            <Button title="Se connecter" onPress={() => navigation.navigate('Home')}/>   
        </View>
    )
}