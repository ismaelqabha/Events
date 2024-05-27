import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import moment from "moment";
import { colors } from '../../assets/AppColors';

const PaymentDetail = (props) => {
    const { payments, serviceTitle } = props.route?.params || {}

    const onBackHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onBackHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>تفاصيل الدفعة</Text>
            </View>
        )
    }

    const renderServiceName = () => {
        return (
            <View style={styles.itemRow}>
                <View style={styles.item}>
                    <Text style={styles.text}>{serviceTitle}</Text>
                </View>
                <View style={styles.largeLabelView}>
                    <Text style={{ fontSize: 18 }}>دُفع لأمر</Text>
                </View>

            </View>
        )
    }
    const renderPaymentInfo = () => {
        return (
            <View>
                <View style={styles.itemRow}>
                    <View style={styles.item}>
                        <Text style={styles.text}>{payments[0].PaymentAmount}</Text>
                    </View>
                    <View style={styles.smallLabelView}>
                        <Text style={{ fontSize: 18 }}>المبلغ</Text>
                    </View>

                </View>
                <View style={styles.itemRow}>
                    <View style={styles.item}>
                        <Text style={styles.text}>{payments[0].PaymentDate}</Text>
                    </View>
                    <View style={styles.smallLabelView}>
                        <Text style={{ fontSize: 18 }}>التاريخ</Text>
                    </View>

                </View>

                <View style={styles.itemRow}>
                    <View style={styles.item}>
                        <Text style={styles.text}>{payments[0].PaymentMethod}</Text>
                    </View>
                    <View style={styles.largeLabelView}>
                        <Text style={{ fontSize: 18 }}>طريقه الدفع </Text>
                    </View>

                </View>

            </View>
        )
    }



    return (
        <View style={styles.container}>
            {header()}
            {renderServiceName()}
            {renderPaymentInfo()}
        </View>
    )
}


export default PaymentDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingRight: 20
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingVertical: 10
    },
    headerTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    item: {
        borderWidth: 1.5,
        borderColor: colors.silver,
        width: '90%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemRow: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 20
    },
    smallLabelView: {
        position: 'absolute',
        right: 30, top: -14,
        backgroundColor: 'white',
        width: 50,
        alignItems: 'center'
    },
    largeLabelView: {
        position: 'absolute',
        right: 30, top: -14,
        backgroundColor: 'white',
        width: 85,
        alignItems: 'center'
    },
    text:{
        fontSize: 18 ,
        color: colors.puprble
    }
})