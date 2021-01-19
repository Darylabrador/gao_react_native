import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('gao.db');

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

    addData() {
        if(this.state.ordinateurName != ""){

            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO ordinateurs (name) values (?)', [this.state.ordinateurName],
                    (txObj, resultSet) => console.log(resultSet),
                    (txObj, error) => console.log('Error', error))
            })
            this.props.navigation.navigate('Home')
            this.setState({ ordinateurName: "" })
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