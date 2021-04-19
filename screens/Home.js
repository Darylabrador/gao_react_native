import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Platform, FlatList } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import AddDesktop from "../components/AddDesktop";
import Desktop  from "../components/Desktop";

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

// Define element per page
var ITEM_PER_PAGE = 3;

// client table
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

// ordinateur table
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

// attribution table
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

Client.hasMany(Attribution);
Ordinateur.hasMany(Attribution);
Attribution.belongsTo(Client);
Attribution.belongsTo(Ordinateur);

export default HomeScreen = ({ navigation }) => {
    const [dataOrdi, setDataOrdi]       = useState([]);
    const [pagination, setPagination] = useState({});
    const [date, setDate] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        getComputers(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const getComputers = async( date ) =>{
        try {
            // Define totalPage based on totalItem
            const totalItem = await Ordinateur.findAndCountAll();
            const totalPage = Math.ceil(totalItem.count / ITEM_PER_PAGE);

            const desktopInfo = await Ordinateur.findAll({
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Attribution,
                        attributes: ['id', 'date', 'hours'],
                        required: false,
                        where: {
                            date
                        },
                        include: [{
                            model: Client,
                            attributes: ['id', 'surname', 'name'],
                            required: false
                        }]
                    }
                ],

                // Paginations informations
                offset: (page - 1) * ITEM_PER_PAGE,
                limit: ITEM_PER_PAGE
            });

            await setDataOrdi(desktopInfo);

            await setPagination({
                hasNextPage: ITEM_PER_PAGE * page < totalItem.count,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                totalPage
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addDesktopHandler = async (name) => {
        try {
            const desktop = new Ordinateur({ name });
            await desktop.save();
            await getComputers(date);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(!mounted){
            getComputers(date);
            setMounted(true);
        }
    }, [mounted])

    return(
        <View style={styles.listItem}>
            <View style={styles.controlContainer}>
                <View style={{ marginRight: 10 }}>
                    <View>
                        <Button onPress={showDatepicker} title={date.toISOString().substr(0, 10)} />
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                </View>

                <AddDesktop addDesktop={addDesktopHandler} />
            </View>
            <FlatList 
                data={dataOrdi}
                renderItem={itemData =>(<Desktop attributions={itemData} />)}
                keyExtractor={(item, index) => item.id.toString()}
            />

        </View>
        
    )
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1, 
    },
    controlContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    }
});