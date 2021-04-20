import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Platform, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

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
        allowNull: false
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
    const [dataOrdi, setDataOrdi]    = useState([]);
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
        getComputers(currentDate, page);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const getComputers = async( date, chosenPage = null ) =>{
        try {
            // Define totalPage based on totalItem
            const totalItem  = await Ordinateur.findAndCountAll();
            const totalPage  = Math.ceil(totalItem.count / ITEM_PER_PAGE);
            const selectPage = chosenPage == null ? page : chosenPage;

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
                offset: (selectPage - 1) * ITEM_PER_PAGE,
                limit: ITEM_PER_PAGE
            });

            await setDataOrdi(desktopInfo);

            await setPagination({
                hasNextPage: ITEM_PER_PAGE * selectPage < totalItem.count,
                hasPreviousPage: selectPage > 1,
                nextPage: selectPage + 1,
                previousPage: selectPage - 1,
                totalPage
            })
        } catch (error) {
            console.log(error)
        }
    }

    const refreshHome = async () => {
        try {
            await getComputers(date, page);
        } catch (error) {
            console.log(error)
        }
    }

    const addDesktopHandler = async (name) => {
        try {
            const desktop = new Ordinateur({ name });
            await desktop.save();
            await getComputers(date, page);
        } catch (error) {
            console.log(error)
        }
    }

    const editDesktopHandler = async (ordiId, name) => {
        try {
            const desktopInfo = await Ordinateur.findByPk(ordiId);
            desktopInfo.name = name;
            await desktopInfo.save();
            await getComputers(date, page);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteDesktopHandler = async (ordiId) => {
        try {
            const desktopInfo = await Ordinateur.findByPk(ordiId);
            await desktopInfo.destroy();
            await getComputers(date, page);
        } catch (error) {
            console.log(error)
        }
    }

    const next = async () => {
        if (pagination.hasNextPage) {
            await setPage(pagination.nextPage);
            await getComputers(date, pagination.nextPage);

        }
    }

    const previous = async () => {
        if (pagination.hasPreviousPage) {
            await setPage(pagination.previousPage);
            await getComputers(date, pagination.previousPage);
        }
    }

    useEffect(() => {
        if(!mounted){
            setDataOrdi([]);
            getComputers(date, page);
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

            <View style={{ marginLeft: 20, flexDirection: 'row' }}>
                <View style={{ marginLeft: 2, marginRight: 4 }}> 
                    <Button title="<" onPress={previous} />
                </View>
                <View style={{ marginLeft: 2, marginRight: 2 }}> 
                    <Button title=">" onPress={next} />
                </View>
            </View>
               

            </View>
            <FlatList 
                data={dataOrdi}
                renderItem={itemData => (<Desktop attributions={itemData} onDelete={deleteDesktopHandler} onEdit={editDesktopHandler} refresh={refreshHome} date={date} />)}
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