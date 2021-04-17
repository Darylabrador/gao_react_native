import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';

import DatePicker from 'react-native-datepicker'

import AddDesktop from "../components/AddDesktop";

export default HomeScreen = ({ navigation }) => {
    const [dataOrdi, setDataOrdi]   = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().substr(0, 10));
    const [mounted, setMounted]     = useState(false);

    const changeDateHandler = (date) => {
        setCurrentDate(date)
    }

    useEffect(() => {
        if(!mounted){
            console.log('mounted data')
            setMounted(true);
        }
    }, [mounted])


    return(
        <View style={styles.listItem}>
            <View style={styles.controlContainer}>
                <DatePicker
                style={{ width: '60%' }}
                    date={currentDate}
                    mode="date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    confirmBtnText="Valider"
                    cancelBtnText="Annuler"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            marginRight: 25
                        }
                    }}
                    onDateChange={changeDateHandler}
                />
                <AddDesktop />

            </View>
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