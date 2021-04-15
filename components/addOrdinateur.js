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

    handleChangeOrdinateurName(event) {
        this.setState({ ordinateurName: event });
    }

    async toggleOverlay(event) {
        await this.setState({ isVisible: !this.state.isVisible });
    }

    async addData() {
        try {
            if (this.state.ordinateurName != "") {
                let newOrdi = new Ordinateur()
                newOrdi.name = this.state.ordinateurName;
                await newOrdi.save()
                await this.setState({ ordinateurName: "" })
                this.props.navigation.navigate('Home')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           
                <Input placeholder="Nom de l'ordinateur" type="text" value={this.state.ordinateurName} onChangeText={this.handleChangeOrdinateurName} />
                <Button
                    title="ajouter un ordinateur"
                    onPress={this.addData}
                />
               
            </View>
        )
    }
}