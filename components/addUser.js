import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import Client from '../models/Client.js';

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
        await this.setState({ name: event });
    }

    async handleChangeSurname(event) {
        await this.setState({ surname: event });
    }

    async addData() {
        try {
            if (this.state.name != "" && this.state.surname != "") {
                await Client.create({
                    name: this.state.name,
                    surname: this.state.surname
                });
                this.props.navigation.navigate('Home')
                this.setState({ name: "", surname: "" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Input placeholder="Nom du client" type="text" value={this.state.name} onChangeText={this.handleChangeName} />
                <Input placeholder="Prénom du client" type="text" value={this.state.surname} onChangeText={this.handleChangeSurname} />
                <Button
                    title="ajouter un client"
                    onPress={this.addData}
                />

            </View>
        )
    }
}