import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';

export default Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (value) => {
        setEmail(value)
    }

    const onChangePassword = (value) => {
        setPassword(value)
    }

    const loginHandler = () => {
        setEmail("")
        setPassword("")
        navigation.navigate('Accueil')
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginInput}>
                <Input placeholder="email@address.com" type="email" value={email} onChangeText={onChangeEmail} />
            </View>
            <View style={styles.loginInput}>
                <Input placeholder="Password" secureTextEntry={true} value={password} onChangeText={onChangePassword} />
            </View>
            <View style={styles.loginButton}>
                <Button title="Se connecter" onPress={loginHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginInput: {
        marginBottom: 5,
        width: "80%"
    },
    loginButton:{
      
    }
});