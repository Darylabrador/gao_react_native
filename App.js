import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import Login from './screens/Login';

// Import for database
import * as SQLite from 'expo-sqlite';
import Sequelize from "rn-sequelize";
const Op = Sequelize.Op;
const Model = Sequelize.Model;

// Initialisation for database configuration
const sequelize = new Sequelize({
  dialectModule: SQLite,
  database: "mydb",
  dialectOptions: {
    version: "1.0",
    description: "Test DB"
    //size: 2 * 1024 * 1024
  }
});


// Create user table
class User extends Model { }
User.init(
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: "user"
  }
);

// create client table
class Client extends Model { }
Client.init({
  surname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "client"
});

// create ordinateur table
class Ordinateur extends Model { }
Ordinateur.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  paranoid: true,
  sequelize,
  modelName: "ordinateur"
})

// create attribution table
class Attribution extends Model { }
Attribution.init(
  {
    clientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ordinateurId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    hours: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "attribution",
    timestamps: true
  }
);

export default App = props => {
  const Stack  = createStackNavigator();

    useEffect(() => {
      async function init() {
        try {
          await sequelize.sync({
            // force: true
          });

          const userExist = await User.findOne({
            where: {
              email: 'admin@gmail.com'
            }
          });

          if(userExist == null) {
            const email    = "admin@gmail.com";
            const password = "password";
            const newUser = new User();
            newUser.email = email;
            newUser.password = password;
            await newUser.save();
          }
  
        } catch (error) {
          console.log(error);
        }
      }
      init();
    }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Espace culturel" component={Login} />
        <Stack.Screen name="Accueil" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}