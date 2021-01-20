import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import Ordinateur from '../models/Ordinateur.js';

export default class AddOrdinateur extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            ordinateurName: "",
            isVisible: false
        }

        this.handleChangeOrdinateurName = this.handleChangeOrdinateurName.bind(this);
        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.addData = this.addData.bind(this);
    }

    async handleChangeOrdinateurName(event) {
        await this.setState({ ordinateurName: event.target.value });
    }

    async toggleOverlay(event) {
        await this.setState({ isVisible: !this.state.isVisible });
    }

    async addData() {
        try {
            if (this.state.ordinateurName != "") {
                await Ordinateur.create({
                    name: this.state.ordinateurName
                });
                this.props.navigation.navigate('Home')
                this.setState({ ordinateurName: "" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           
                <Input placeholder="Nom de l'ordinateur" type="text" value={this.state.ordinateurName} onChange={this.handleChangeOrdinateurName} />
                <Button
                    title="ajouter un ordinateur"
                    onPress={this.addData}
                />
               
            </View>
        )
    }
}