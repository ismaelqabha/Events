import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CalenderServiceCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
               <Text style={styles.txt}>{props.title}</Text>
            </View>
        </View>
    )
}

export default CalenderServiceCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: 60,
        margin: 10,
        backgroundColor: 'gary',
        borderRadius: 8,
        elevation: 5,
    },
    txt:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    }
})