import * as React from 'react';
import { View, Text  } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

function DetailsScreen({navigation}) {

    const [visible, setVisible] = React.useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello world !</Text>
            <Text>From home details page</Text>
            <Button
                title="Go to Home page"
                onPress={() => navigation.navigate('Home')}
            />      
            
            <Button title="Open Overlay" onPress={toggleOverlay} />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text>Hello from Overlay!</Text>
            </Overlay>
        </View>
    );
}

module.exports = DetailsScreen;