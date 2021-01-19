import * as React from 'react';
import { Button, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import sequelize from '../config/database.js';

import Client from '../models/Client.js';
import Ordinateur from '../models/Ordinateur.js';

// const db = SQLite.openDatabase('gao.db');


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            dataOrdi: null,
            dataClients: null,
            ordinateurName : "",
            isVisible: false
        }

        async function init() {
            try {
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

        init();
    }

    componentDidMount() {
        this.fetchDataOrdi();
        this.fetchDataClients();
    }


    async fetchDataOrdi() {
        try {
            var arrayData = [];
            const ordinateurData = await Ordinateur.findAll({});
            ordinateurData.forEach(data => {
                let infoData = data.dataValues;
                arrayData.push(infoData)
            })
            await this.setState({ dataOrdi: arrayData})
        } catch (error) {
            console.log(error)
        }
    }
    
    
    async fetchDataClients() {
        try {
            var arrayData = [];
            const clientData = await Client.findAll({});
            clientData.forEach(data => {
                let infoData = data.dataValues;
                arrayData.push(infoData)
            })
            await this.setState({ dataClients: arrayData })
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        this.fetchDataOrdi();
        this.fetchDataClients();
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
                <h3> Ordinateurs </h3>
                { this.state.dataOrdi && this.state.dataOrdi.map((_data, index) => (
                        <Text key={index}> {_data.name} </Text>
                        )
                    )
                }
        
                <h3> Clients </h3>
                { this.state.dataClients && this.state.dataClients.map((_data, index) => (
                        <Text key={index}> {_data.name}  {_data.surname}</Text>
                        )
                    )
                }


                <h3> Actions </h3>

                <Button
                    title="Se connecter"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            

                <Button
                    title="Ajouter un ordinateur"
                    onPress={() => this.props.navigation.navigate('AddOrdi')}
                />


                <Button
                    title="Ajouter un client"
                    onPress={() => this.props.navigation.navigate('AddClient')}
                />
            </View>
        )
    }
}