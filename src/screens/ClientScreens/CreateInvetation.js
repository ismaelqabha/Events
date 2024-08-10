import { StyleSheet, Text, View, Pressable, TextInput, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../../assets/AppColors';
import { images } from '../../assets/photos/images';
import InvetationCard from '../../components/InvetationCard'

const CreateInvetation = (props) => {
    const { eventTitle } = props.route?.params || {}

    //  const eventTitle = 'تخرج'

   
    const onPressBack = () => {
        props.navigation.goBack();
    }

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressBack}>
                    <Ionicons
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.title}>اِنشاء بطاقة دعوة</Text>
            </View>
        )
    }
    const renderEventType = () => {
        return (
            <View style={styles.eventTypeView}>
                <Text style={styles.text}>{'بطاقة دعوة لمناسبة' + ' ' + eventTitle}</Text>
            </View>
        )
    }

    const renderInvetationCard = () => {
        return (
            <View style={{  }}>
                <InvetationCard eventTitle={eventTitle} />
            </View>

        )
    }

    return (

        <View style={styles.container}>
           
            {renderHeader()}
            <ScrollView style={{height: '100%', }}>
            {renderEventType()}

            <ImageBackground style={styles.card} source={images.invetationCard()}>
                {renderInvetationCard()}
            </ImageBackground>
            </ScrollView>
        </View>

    )
}

export default CreateInvetation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 50
    },
    card: {
        marginTop: 20,
        width: '95%',
        height: 700,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: colors.darkGold,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
    },

    eventTypeView: {
        width: '90%',
        height: 80,
        backgroundColor: 'white',
        elevation: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 20
    },
    text: {
        fontSize: 20,
        color: colors.puprble
    },
  
})