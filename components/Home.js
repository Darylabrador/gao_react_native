import * as React from 'react';
import { Button, View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('gao.db');

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            data: null
        }
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
            )
        })

        // db.transaction(tx => {
        //     tx.executeSql(
        //         'DROP TABLE users'
        //     )
        // })

        this.addData = this.addData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        var arrayData = [];
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM users', null, // passing sql query and parameters:null
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

    addData() {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO users (text, count) values (?, ?)', ['nouvelle ligne', 1],
                (txObj, resultSet) => this.setState({
                    data: this.state.data.concat(
                        { id: resultSet.insertId, text: `ligne ${resultSet.insertId}`, count: 1 })
                }),
                (txObj, error) => console.log('Error', error))
        })
    }

    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
                { this.state.data && this.state.data.map((_data, index) => (
                        <Text key={index}> {_data.text} </Text>
                        )
                    )
                }

                <Button
                    title="Se connecter"
                    onPress={() => this.props.navigation.navigate('Login')}
                />

                
                <Button
                    title="ajouter une ligne"
                    onPress={this.addData}
                />
            </View>
        )
    }
}