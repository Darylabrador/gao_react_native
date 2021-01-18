import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export const HomeScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello world !</Text>
            <Text>From home page</Text>
            <Button
                title="Se connecter"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}