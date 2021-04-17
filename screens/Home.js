import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';

import Modal from "../components/Modal";

export default HomeScreen = ({ navigation }) => {
    const [dataOrdi, setDataOrdi]  = useState([]);
    const [mounted, setMounted]    = useState(false);


    useEffect(() => {
        if(!mounted){
            console.log('mounted data')
            setMounted(true);
        }
    }, [mounted])


    return(
        <View style={styles.listItem}>

            <Modal />

        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});