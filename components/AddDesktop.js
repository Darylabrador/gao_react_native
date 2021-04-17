import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay, Input, Icon } from 'react-native-elements';

export default addDesktop = () => {
    const [visible, setVisible]           = useState(false);
    const [addedDesktop, setAddedDesktop] = useState("");
    const [isEnabled, setIsEnabled]       = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const onChangeAddedDesktop = (text) => {
        setAddedDesktop(text)
        if (text.length > 0) {
            setIsEnabled(true)
        } else {
            setIsEnabled(false)
        }
    }

    const addDesktopHandler = () => {
        setAddedDesktop("")
        setVisible(!visible);
    }

    return (
        <View>
            <View style={styles.buttonAddIcon}>
                <Button title="+" onPress={toggleOverlay} />
            </View>
            <Overlay isVisible={visible} overlayStyle={styles.modal}>
                <View style={styles.headerCard}>
                    <Text style={{ fontWeight: 'bold' }}> Ajouter un ordinateur</Text>
                    <View style={{ width: 50 }}>
                        <Button
                            title="X"
                            titleStyle={styles.titleClose}
                            buttonStyle={styles.buttonClose }
                            onPress={toggleOverlay}
                        />
                    </View>
                </View>
                
                <Input 
                    placeholder="Saisir le nom du poste" 
                    type="text" value={addedDesktop} 
                    onChangeText={onChangeAddedDesktop} 
                    containerStyle={styles.inputContainer}
                />

                <View style={styles.buttonContainer}>
                    <Button title="Annuler" onPress={toggleOverlay} buttonStyle={styles.buttonLeft} />
                    <Button title="Valider" onPress={addDesktopHandler} disabled={!isEnabled} />
                </View>
            </Overlay>
        </View>
    );
};

const styles = StyleSheet.create({
    headerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    buttonAddIcon: {
        width: 30
    },
    modal: { 
        marginLeft: 10, 
        marginRight: 10 
    },
    buttonClose: {
        marginLeft: 10,
        backgroundColor: 'transparent'
    },
    titleClose: {
        color: 'black'
    },
    inputContainer:{
        width: 250,
        marginBottom: 5,
        marginTop: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLeft: {
        marginRight: 10,
        backgroundColor: 'grey'
    }
});