import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Overlay, Input, Icon } from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';

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

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const searchClient = (text) => {
        setClientSearch(text)
    }

    const addinghandler = () => {
        props.refresh()
    }

    return (
        <View>
            <Button title="+" color="green" onPress={toggleOverlay} />
            <Overlay isVisible={visible} overlayStyle={styles.modal}>
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

                    
                    <View style={styles.buttonContainer}>
                        <Button title="Annuler" onPress={toggleOverlay} buttonStyle={styles.buttonLeft} />
                        <Button title="Valider" />
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