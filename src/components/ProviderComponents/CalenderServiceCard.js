import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';
import { colors } from '../../assets/AppColors';
import SearchContext from '../../../store/SearchContext';


const CalenderServiceCard = (props) => {
    const { isFirst, setIsfirst } = useContext(SearchContext);
    const navigation = useNavigation();
     //console.log("props ", props.logoArray);
    const onCardPress = () => {
        setIsfirst(props.service_id)
        // navigation.navigate(ScreenNames.ProviderCalender, { data: { ...props } })
    }

    const index = props.logoArray?.findIndex((val) => val === true)
    const image = props?.serviceImages[index]


    return (
        <View style={styles.container}>
            <Pressable style={styles.item}
            onPress={() => onCardPress()}
            >
                <View style={[styles.imgView, isFirst == props.service_id ? styles.imgViewforFirst : styles.imgView]}>
                   <View style={{width: '70%', alignItems: 'center'}}><Text style={styles.basicInfo}>{props.title}</Text></View> 
                   <View style={{width: '30%' , alignItems: 'center'}}><Image style={styles.profilImg} source={ {uri:image} ||require('../../assets/photos/ameer.png')} /></View> 
                </View>
            </Pressable>
        </View>
    )
}

export default CalenderServiceCard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,

    },
    basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    profilImg: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: colors.BGScereen,
        borderWidth: 3,
        borderColor: colors.puprble,
    },
    imgView: {
        width: "95%",
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 5,
        shadowColor: colors.puprble,
        backgroundColor: 'white',
        alignSelf: 'center',
        margin: 5,
        borderRadius: 20,
    },
    imgViewforFirst: {
        width: "95%",
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 5,
        shadowColor: colors.puprble,
        backgroundColor: 'white',
        alignSelf: 'center',
        margin: 5,
        borderRadius: 20,
        borderColor: colors.puprble,
        borderWidth: 3
    },

})