import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../assets/AppColors'



const ProviderEventTypesComp = (props) => {
    
    return (
        <View style={styles.container}>
            <Pressable style={styles.eventCard}>
                <Image style={styles.eventImg} source={{ uri: props.eventImg }} />
                <Text style={styles.txt}>{props.eventTitle}</Text>
            </Pressable>
        </View>
    )
}

export default ProviderEventTypesComp

const styles = StyleSheet.create({
    container: {

    },
    eventCard: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    eventCardPress: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.puprble
    },
    eventImg: {
        width: 120,
        height: 120,
    },
    txt: {
        fontSize: 18,
        color: colors.puprble
    }
})