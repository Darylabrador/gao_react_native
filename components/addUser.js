import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('gao.db');

export default class AddClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            name: "",
            surname: "",
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.addData = this.addData.bind(this);
    }

    async handleChangeName(event) {
        await this.setState({ name: event.target.value });
    }

    async handleChangeSurname(event) {
        await this.setState({ surname: event.target.value });
    }

    addData() {
        if (this.state.ordinateurName != "") {

            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO clients (name, surname) values (?, ?)', [this.state.name, this.state.surname],
                    (txObj, resultSet) => console.log(resultSet),
                    (txObj, error) => console.log('Error', error))
            })
            this.props.navigation.navigate('Home')
            this.setState({ name: "", surname: ""})
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Input placeholder="Nom du client" type="text" value={this.state.name} onChange={this.handleChangeName} />
                <Input placeholder="Prénom du client" type="text" value={this.state.surname} onChange={this.handleChangeSurname} />
                <Button
                    title="ajouter un client"
                    onPress={this.addData}
                />

            </View>
        )
    }
}