import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../assets/AppColors'
import Fontisto from "react-native-vector-icons/Fontisto"

const ProviderReservationCard = (props) => {

    const renderClientInfo = () => {
        return (
            <View style={styles.info}>
                <Image style={styles.profilImg} source={require('../../assets/photos/user.png')} />
                <Text style={styles.userName}>اسماعيل كبها</Text>
            </View>
        )
    }

    const renderRequestDate = () => {
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>5/1/2024</Text>
                    <Text style={styles.labelDateTxt}>تاريخ الطلب</Text>
                </View>
                <View style={styles.IconView}>
                    <Fontisto
                        name={"date"}
                        color={colors.puprble}
                        size={15} />
                </View>
            </View>
        )
    }
    const renderBookingDate = () => {
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>10/8/2024</Text>
                    <Text style={styles.labelDateTxt}>تاريخ الحجز</Text>
                </View>
                <View style={styles.IconView}>
                    <Fontisto
                        name={"date"}
                        color={colors.puprble}
                        size={15} />
                </View>
            </View>
        )
    }
    const renderPrice = () => {
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>{props.Cost}</Text>
                </View>
                <Image style={styles.shekeImg} source={require('../../assets/photos/shekelSign.png')} />
            </View>
        )
    }

    const renderPayRemain = () => {
        return (
            <View style={styles.dateview}>
                <Text style={styles.Txt}>{'الباقي  ' + '5000'}</Text>
                <Text style={styles.Txt}>{'المدفوع  ' + '5000'}</Text>
            </View>
        )
    }
    const renderRequestInfo = () => {
        return (
            <View style={styles.reqInfo}>
                {/* {renderRequestDate()}
                {renderBookingDate()} */}
                {renderPrice()}
                {renderPayRemain()}
                {/* <View style={styles.buttonView}>
                    <Pressable><Text style={styles.buttonTxt}>اٍلغاء الطلب</Text></Pressable>
                    <Pressable><Text style={styles.buttonTxt}>التفاصيل</Text></Pressable>
                </View> */}
            </View>
        )
    }



    return (
        <View style={styles.card}>
            {renderRequestInfo()}
            {renderClientInfo()}
        </View>
    )
}

export default ProviderReservationCard

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '90%',
        height: 100,
        alignSelf: 'center',
        margin: 10,
        // borderWidth: 1
    },
    info: {
        width: '35%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: colors.darkGold,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reqInfo: {
        width: '65%',
        height: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 5,
        padding: 5
        //alignItems: 'center',
    },
    profilImg: {
        width: 70,
        height: 60,
        borderRadius: 10,
        backgroundColor: colors.BGScereen,
        marginBottom: 10,
    },
    userName: {
        fontSize: 15,
        color: 'white'
    },
    // buttonView: {
    //     flexDirection: 'row',
    //     width: '100%',
    //     height: 30,
    //     justifyContent: 'space-around',
    //     alignItems: 'center',
    //     position: 'absolute',
    //     bottom: 0
    // },
    // infoTxt: {
    //     marginVertical: 5,
    //     marginRight: 10,
    //     color: colors.puprble,
    //     fontSize: 15
    // },
    // buttonTxt: {
    //     fontSize: 17
    // },
    dateview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    shekeImg: {
        width: 40,
        height: 40,
    },
    dateTxt: {
        color: colors.puprble,
        fontSize: 20
    },
    Txt:{
        fontSize: 15,
        marginLeft: 20, 
        color: colors.puprble
    }
    // labelDateTxt: {
    //     fontSize: 15
    // },
    // IconView: {
    //     width: 30,
    //     height: 30,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'lightgray',
    //     borderRadius: 30,
    //     marginLeft: 15
    // },
})