import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';

const CalenderServiceCard = (props) => {
    const navigation = useNavigation();

    const onCardPress = () => {
        navigation.navigate(ScreenNames.ProviderCalender, { data: { ...props } })
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.card} onPress={onCardPress}>
                <Text style={styles.txt}>{props.title}</Text>

            </Pressable>
        </View>
    )
}

export default CalenderServiceCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    card: {
        width: '90%',
        height: 80,
        backgroundColor: 'snow',
        borderRadius: 8,
        elevation: 5,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {

        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    }
})