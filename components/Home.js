import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import Sequelize from "rn-sequelize";
import sequelize from '../config/database.js';

import Client from '../models/Client.js';
import Ordinateur from '../models/Ordinateur.js';

export default HomeScreen = ({ navigation }) => {
    const [dataOrdi, setDataOrdi]             = useState(null);
    const [dataClients, setDataClient]        = useState(null);
    const [mounted, setMounted] = useState(false);

    const init = async () => {
        try {
            Client.init(
                {
                    id: {
                        type: Sequelize.INTEGER,
                        autoIncrement: true,
                        allowNull: false,
                        primaryKey: true
                    },
                    surname: {
                        type: Sequelize.STRING,
                        allowNull: false
                    },
                    name: {
                        type: Sequelize.STRING,
                        allowNull: false
                    }
                },
                {
                    sequelize,
                    modelName: "client"
                }
            );

            Ordinateur.init(
                {
                    id: {
                        type: Sequelize.INTEGER,
                        autoIncrement: true,
                        allowNull: false,
                        primaryKey: true
                    },
                    name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        unique: true
                    }
                },
                {
                    sequelize,
                    paranoid: true,
                    modelName: "ordinateur"
                }
            );

            await sequelize.sync({
                // force: true
            });

            const clientExist = await Client.findOne({where: {
                name: 'DOE',
                surname: 'John',
            }});

            if (!clientExist) {
                await Client.create({
                    name: 'DOE',
                    surname: 'John'
                });

                await Client.create({
                    name: 'ABRADOR',
                    surname: 'Daryl'
                });
            }

            const ordinateurExist = await Ordinateur.findOne({
                where: {
                    name: 'Ordinateur 1'
                }
            });

            if(!ordinateurExist) {
                await Ordinateur.create({
                    name: 'Ordinateur 1'
                });
                await Ordinateur.create({
                    name: 'Ordinateur 2'
                });
            }

        } catch (error) {
            console.log(error);
        }
        
    }


    const fetchDataOrdi = async () => {
        try {
            var arrayData = [];
            const ordinateurData = await Ordinateur.findAll({});
            ordinateurData.forEach(data => {
                let infoData = data.dataValues;
                arrayData.push(infoData)
            })
            await setDataOrdi(arrayData)
        } catch (error) {
            console.log(error)
        }
    }


    const fetchDataClients = async () => {
        try {
            var arrayData = [];
            const clientData = await Client.findAll({});
            clientData.forEach(data => {
                let infoData = data.dataValues;
                arrayData.push(infoData)
            })
            await setDataClient(arrayData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(!mounted){
            init();
            fetchDataOrdi();
            fetchDataClients();
            setMounted(true);
        }
    }, [mounted])


    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text> --- Liste des ordinateurs --- </Text>
            { dataOrdi && dataOrdi.map((_data, index) => (
                    <Text key={index}> {_data.name} </Text>
                    )
                )
            }

            <Text> --- Listes des clients --- </Text>
            { dataClients && dataClients.map((_data, index) => (
                    <Text key={index}> {_data.name}  {_data.surname}</Text>
                    )
                )
            }

            <Text> --- Les actions --- </Text>
            <Button
                title="Se connecter"
                onPress={() => navigation.navigate('Login')}
            />


            <Button
                title="Ajouter un ordinateur"
                onPress={() => navigation.navigate('AddOrdi')}
            />


            <Button
                title="Ajouter un client"
                onPress={() => navigation.navigate('AddClient')}
            />
        </View>
    )
}