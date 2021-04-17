import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

export default OverlayExample = () => {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <View>
            <Button title="Open Overlay" onPress={toggleOverlay} />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text>Hello from Overlay!</Text>
            </Overlay>
        </View>
    );
};