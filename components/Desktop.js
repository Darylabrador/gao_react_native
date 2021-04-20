import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import { Overlay, Input, Icon, Card} from 'react-native-elements';
import AddAttribution from "../components/AddAttribution";
import RemoveAttribution from "../components/RemoveAttribution";

export default Desktop = props => {
    const [visible, setVisible] = useState(false);
    const [editedDesktop, setEditedDesktop] = useState(props.attributions.item.name);
    const [timeslots, setTimeslot] = useState([]);
    const [attributions, setAttributions] = useState([]);
    const [mounted, setMounted] = useState(false);

    const editHandler = (text) => {
        setEditedDesktop(text)
    }

    const refreshUp = () => {
        props.refresh()
    }

    const deleteDesktop = async () => {
        await setMounted(false);
        await props.onDelete(props.attributions.item.id)
    }

    const editDesktopHandler = async () => {
        await setMounted(false);
        await props.onEdit(props.attributions.item.id, editedDesktop);
        await setVisible(!visible);
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(()=> {
        if(!mounted) {
            const runFunctions = async () => {
                try {
                    await setTimeslot([]);
                    var attributionInfo = props.attributions.item.attributions;
                    var attributionObject = {};

                    if (attributionInfo.length != 0) {
                        attributionInfo.forEach(element => {
                            attributionObject[element.hours] = {
                                id: element.client.id,
                                surname: element.client.surname,
                                name: element.client.name,
                                idAssign: element.id
                            }
                        })
                    }

                    var timeslotInfo = [];

                    for (let i = 0; i < 10; i++) {
                        let hour = 8 + i;
                        if (attributionObject[hour]) {
                            timeslotInfo.push({
                                hours: hour,
                                client: `${attributionObject[hour].surname} ${attributionObject[hour].name}`,
                                idAssign: attributionObject[hour].idAssign
                            })
                        } else {
                            timeslotInfo.push({
                                hours: hour,
                                client: "",
                            })
                        }
                    }

                    await setTimeslot(timeslotInfo);
                    await setMounted(true)
                } catch (error) {
                    console.log(error)
                }
            }

            runFunctions()
        
        }
    }, [mounted])

    return(
        <View style={{ marginBottom: 20 }}>
            <Card>
                <View style={ styles.headerCard }> 
                    <Text style={{ fontWeight: 'bold' }}> {props.attributions.item.name} </Text>
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
                    {timeslots.map((item, i) => 
                        (
                            <View key={i} style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 5, paddingTop: 5, alignItems: 'center' }}>
                                <View style={{ width: "90%", flexDirection: 'row', alignItems: 'center' }}>
                                    <Text> {item.hours}h </Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <Text> {item.client} </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', jusifyContent: 'flex-end' }}>
                                    {(
                                        item.client == "" 
                                        ? <AddAttribution refresh={refreshUp} date={props.date} hours={item.hours} ordinateurId={props.attributions.item.id} />
                                        : <RemoveAttribution refresh={refreshUp} attributionId={item.idAssign} />
                                    )}
                                   
                                </View>
                            </View>
                        )
                    )}
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