import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Overlay, Input, Icon, Card} from 'react-native-elements';

export default Desktop = props => {
    const [visible, setVisible] = useState(false);
    const [editedDesktop, setEditedDesktop] = useState(props.attributions.item.name);

    const editHandler = (text) => {
        setEditedDesktop(text)
    }

    const deleteDesktop = () => {
        props.onDelete(props.attributions.item.id)
    }

    const editDesktopHandler = async () => {
        await props.onEdit(props.attributions.item.id, editedDesktop);
        await setVisible(!visible);
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        const showData = () => {
            console.log(props.attributions)
        }
        showData()
    })

    return(
        <View>
            <Card>
                <View style={ styles.headerCard }> 
                    <Text> {props.attributions.item.name} </Text>
                    <View style={styles.buttonHeader}>
                        <View style={{ marginRight: 5 }}>
                            <Button title="edit" onPress={toggleOverlay} />
                        </View>
                        <View>
                            <Button title="delete" color="red" onPress={deleteDesktop} />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <View>

                </View>
            </Card>

            <Overlay isVisible={visible} overlayStyle={styles.modal}>
                <View>
                    <View style={styles.headerCard}>
                        <Text style={{ fontWeight: 'bold' }}> Modification </Text>
                        <View style={{ width: 50 }}>
                            <Button
                                title="X"
                                titleStyle={styles.titleClose}
                                buttonStyle={styles.buttonClose}
                                onPress={toggleOverlay}
                            />
                        </View>
                    </View>

                    <Input
                        placeholder="Saisir le nom du poste"
                        type="text" 
                        value={editedDesktop}
                        containerStyle={styles.inputContainer}
                        onChangeText={editHandler}
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Annuler" onPress={toggleOverlay} buttonStyle={styles.buttonLeft} />
                        <Button title="Valider" onPress={editDesktopHandler} />
                    </View>
                </View>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    headerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonHeader: {
        flexDirection: 'row',
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
    inputContainer: {
        width: 280,
        marginBottom: 5,
        marginTop: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttonLeft: {
        backgroundColor: 'grey'
    }
});