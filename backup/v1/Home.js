import * as React from 'react';
import { Button, View, Text } from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello world !</Text>
            <Text>From home page</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

module.exports = HomeScreen;