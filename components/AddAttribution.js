import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Overlay, Input, Icon } from 'react-native-elements';
import ProgressiveInput from 'react-native-progressive-input';

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


// client table
class Client extends Model { }
Client.init({
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "client"
});

// attribution table
class Attribution extends Model { }
Attribution.init(
    {
        clientId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ordinateurId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        hours: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "attribution",
        timestamps: true
    }
);

export default AddAttribution = props => {
    const [visible, setVisible] = useState(false);
    const [clientSearch, setClientSearch] = useState("");
    const [clientInfo, setClientInfo] = useState([]);
    const [selectedValue, setSelectedValue] = useState({});
    const [find, setFind] = useState(true);

    const [clientSurname, setClientSurname] = useState("");
    const [clientName, setClientName] = useState("");

    const toggleOverlay = () => {
        setVisible(!visible);
        setFind(true);
    };

    const searchClientHandler = async (text) => {
        try {
            await setIsLoading(true);
            await setClientSearch(text)
            await searchClient()
        } catch (error) {
            console.log(error)
        }
    }

    const searchClient = async () => {
        try {
            const clientList = await Client.findAll({
                attributes: ['id', 'surname', 'name'],
                where: {
                    [Op.or]: [
                        {
                            surname: {
                                [Op.substring]: clientSearch
                            }
                        },
                        {
                            name: {
                                [Op.substring]: clientSearch
                            }
                        }
                    ]
                }
            });

            await console.log(clientList);
            await setClientInfo([]);

            if(clientList.length == 0) {
                await setFind(false)
                await setClientInfo([])
            } else {
                await setFind(true)
                await setClientInfo(currentData => [...currentData, clientList])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addinghandler = async () => {
        try {
            if (find) {
                const clientExist = await Client.findByPk(selectedValue.id);
                if(clientExist) {
                    const attribution = new Attribution({
                        clientId: clientExist.id,
                        ordinateurId: props.ordinateurId,
                        date: props.date,
                        hours: props.hours
                    });
                    await attribution.save();
                }
                await setVisible(!visible);
                await props.refresh();
            } else {
                const client = new Client({ surname: clientSurname, name: clientName });
                const createdClient = await client.save();
                const attribution = new Attribution({
                    clientId: createdClient.id,
                    ordinateurId: props.ordinateurId,
                    date: props.date, 
                    hours: props.hours
                });
                await attribution.save();
                await setVisible(!visible);
                await props.refresh();
            }

        } catch (error) {
            console.log(error)
        }
    }

    const nameHandler = (text) => {
        setClientName(text)
    }

    const surnameHandler = (text) => {
        setClientSurname(text)
    }

    return (
        <View>
            <Button title="+" color="green" onPress={toggleOverlay} />
            <Overlay isVisible={visible} overlayStyle={styles.modal} >
                <View>
                    <View style={styles.headerCard}>
                        <Text style={{ fontWeight: 'bold' }}> Ajouter une attribution </Text>
                        <View style={{ width: 50 }}>
                            <Button
                                title="X"
                                titleStyle={styles.titleClose}
                                buttonStyle={styles.buttonClose}
                                onPress={toggleOverlay}
                            />
                        </View>
                    </View>
               
                    {(find 
                        ? <View style={styles.autocompleteContainer}>
                            <Input
                                    placeholder="Nom du client"
                                    type="text"
                                    value={clientSearch}
                                    onChangeText={searchClientHandler}
                                />
                              <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                    data={clientInfo}
                                    renderItem={itemData => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedValue(item);
                                                setClientInfo([]);
                                            }}>
                                            <Text style={styles.itemText}>
                                                {itemData.name} {itemData.surname}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                        </View>
            
                        : <View>
                            <Input
                                placeholder="Nom du client"
                                type="text"
                                value={clientName}
                                onChangeText={nameHandler}
                            />
                            <Input
                                placeholder="Prénom du client"
                                type="text"
                                value={clientSurname}
                                onChangeText={surnameHandler}
                            />
                        </View>
                    )}
                  
                    
                    <View style={styles.buttonContainer}>
                        <Button title="Annuler" onPress={toggleOverlay} buttonStyle={styles.buttonLeft} />
                        <Button title="Valider" onPress={addinghandler} />
                    </View>
                </View>
            </Overlay>
        </View>
    );
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50
    },
    buttonLeft: {
        backgroundColor: 'grey'
    },
    autocompleteContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        marginTop: 25,
        marginBottom: 25,
        width: 200,
        top: 15,
        bottom: 15,
        left: 2,
        position: 'absolute'
    },
    descriptionContainer: {
        justifyContent: 'center',
    },
    itemText: {
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
    },
});