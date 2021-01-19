import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './css/app.css';

import HomeScreen from './components/Home.js';
import Login from './components/Login.js';

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
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}