import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import './css/app.css';

import HomeScreen from './components/Home.js';
import Login from './components/Login.js';
import AddOrdinateur from './components/addOrdinateur.js';
import AddClient from './components/addUser.js';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddOrdi" component={AddOrdinateur} />
          <Stack.Screen name="AddClient" component={AddClient} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}