import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import Login from './screens/Login';

export default App = props => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Espace culturel" component={Login} />
        <Stack.Screen name="Accueil" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}