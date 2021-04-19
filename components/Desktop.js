import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Overlay, Input, Icon, Card} from 'react-native-elements';

export default Desktop = props => {

    useEffect(() => {
        const showData = () => {
            console.log(props.attributions)
        }
        showData()
    })

    return(
        <View>
            <Card>
                <View style={ styles.headerCard }> 
                    <Text> {props.attributions.item.name} </Text>
                    <View style={styles.buttonHeader}>
                        <View>
                            <Button title="edit" />
                        </View>
                        <View>
                            <Button title="delete" color="red" />
                        </View>
                    </View>
                </View>
                <Card.Divider />
                <View>

                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    headerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonHeader: {
        flexDirection: 'row',
    }
});