import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    /**
     * Set email value in state
     * @param {*} event 
     */
    async handleChangeEmail(event) {
        await this.setState({ email: event.target.value });
    }


    /**
     * Set password value in state
     * @param {*} event 
     */
    async handleChangePassword(event) {
        await this.setState({ password: event.target.value });
    }

    /**
     * handle the submit form and log the user
     * @param {*} event 
     */
    async handleSubmit(event) {
        event.preventDefault();
        console.log('submit login')
    }

    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Input placeholder="email@address.com" type="email" value={this.state.email} onChange={this.handleChangeEmail} />
                <Input placeholder="Password" secureTextEntry={true} value={this.state.password} onChange={this.handleChangePassword} />
                <Button title="Se connecter" onPress={() => this.props.navigation.navigate('Home')}/>   
            </View>
        )
    }
}