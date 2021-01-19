import * as React from 'react';
import { Button, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('gao.db');
import { Input, Overlay } from 'react-native-elements';
import AddOrdinateur from './addOrdinateur.js';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            data: null,
            dataClients: null,
            ordinateurName : "",
            isVisible: false
        }
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS ordinateurs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'
            )
        })

        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT)'
            )
        })

        // db.transaction(tx => {
        //     tx.executeSql(
        //         'DROP TABLE users'
        //     )
        // })
    }

    componentDidMount() {
        console.log('monted')
        this.fetchDataOrdi();
        this.fetchDataClients();
    }


    fetchDataOrdi() {
        var arrayData = [];
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM ordinateurs', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (_, resultat ) => {
                    for(let i = 0; i < resultat.rows.length; i++){
                        arrayData.push(resultat.rows.item(i))
                    }
                    this.setState({ data: arrayData })
                },
                // failure callback which sends two things Transaction object and Error
                (_, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }

    fetchDataClients() {
        var arrayData = [];
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM clients', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (_, resultat) => {
                    for (let i = 0; i < resultat.rows.length; i++) {
                        arrayData.push(resultat.rows.item(i))
                    }
                    this.setState({ dataClients: arrayData })
                },
                // failure callback which sends two things Transaction object and Error
                (_, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }

    render() {
        this.fetchDataOrdi();
        this.fetchDataClients();

        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
                <h3> Ordinateurs </h3>
                { this.state.data && this.state.data.map((_data, index) => (
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