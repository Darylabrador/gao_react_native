import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import for database
import * as SQLite from 'expo-sqlite';
import Sequelize from "rn-sequelize";
const Op = Sequelize.Op;
const Model = Sequelize.Model;

// Initialisation for database configuration
const sequelize = new Sequelize({
    dialectModule: SQLite,
    database: "mydb",
    dialectOptions: {
        version: "1.0",
        description: "Test DB"
        //size: 2 * 1024 * 1024
    }
});

class User extends Model { }
User.init(
    {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        modelName: "user"
    }
);

export default Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const check = async () => {
            const token = await AsyncStorage.getItem('gaoReactToken');
            if (token == 'connected'){
                await navigation.navigate({ name: "Accueil"})
            }
        }
        check()
    })

    const onChangeEmail = (value) => {
        setEmail(value)
    }

    const onChangePassword = (value) => {
        setPassword(value)
    }

    const loginHandler = async () => {
        const userExist = await User.findOne({ where: { email } });
        if (!userExist) {
            showMessage({
                message: "Identifiants invalide",
                type: "danger",
            });
        }

        const isEqual = password == userExist.password ? true : false;
        if (!isEqual) {
            showMessage({
                message: "Identifiants invalide",
                type: "danger",
            });
        } else {
            await setEmail("")
            await setPassword("")
            await AsyncStorage.setItem('gaoReactToken', "connected")
            await navigation.navigate('Accueil')
        }
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginInput}>
                <Input placeholder="email@address.com" type="email" value={email} onChangeText={onChangeEmail} />
            </View>
            <View style={styles.loginInput}>
                <Input placeholder="Mot de passe" secureTextEntry={true} value={password} onChangeText={onChangePassword} />
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