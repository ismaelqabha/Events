import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import moment from "moment";
import { colors } from "../../assets/AppColors.js"
import { ScreenNames } from "../../../route/ScreenNames.js"





const RequestDuePaymentsShow = (props) => {
    const { requestCost, paymentDetail, serviceName } = props.route?.params || {}
    
console.log(">>>", serviceName);
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
                <Text style={styles.headerTxt}>المبلغ المستحق</Text>
            </View>
        )
    }

    const calculateRestPrice = () => {
        var paymentSum = 0
        paymentDetail.forEach(element => {
            paymentSum = paymentSum + element.PaymentAmount
        });
        const totalPay = paymentSum
        const restPrice = requestCost - totalPay
        return restPrice
    }

    const renderPayments = () => {
        return paymentDetail.map(item => {
            return (
                <Pressable style={styles.paymentView} onPress={() => props.navigation.navigate(ScreenNames.PaymentDetail , { paymentDetail:paymentDetail , serviceName:serviceName})}>
                    <Text style={styles.paymentTxt}>{moment(item.PaymentDate).format('L')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={styles.paymentTxt}>{item.PaymentAmount}</Text>
                        <View style={styles.IconView}>
                            <MaterialIcons
                                name={"payments"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                </Pressable>
            )
        })
    }

    const renderPaymentButton = () => {
        return (
            <Pressable style={styles.buttonView}>
                <Text style={styles.paymentTxt}>دفع</Text>
            </Pressable>
        )
    }

    useEffect(() => {

    }, [])

    const renderRestPrice = () => {
        const result = calculateRestPrice()
        return (
            <View style={styles.priceView}>
                <Text style={styles.priceTxt}>{'₪' + result}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {header()}
            {/* <ScrollView> */}
            {renderRestPrice()}
            <View style={{ height: '60%' }}>
                <Text style={styles.paymentTxt}>الدفعات السابقة</Text>
                {renderPayments()}
                {renderPaymentButton()}
            </View>

            {/* </ScrollView> */}
        </View>
    )
}

export default RequestDuePaymentsShow

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    headerTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    priceView: {
        alignSelf: 'center',
        width: '70%',
        height: 200,
        backgroundColor: colors.silver,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        borderWidth: 1,
        borderColor: colors.darkGold,
    },
    priceTxt: {
        fontSize: 45,
        color: colors.darkGold
    },
    paymentView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        marginVertical: 10,
        borderWidth: 0.7,
        borderRadius: 10,
        padding: 10,
        borderColor: colors.silver
    },
    paymentTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
        marginRight: 10
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
    buttonView: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        height: 60,
        borderWidth: 1,
        borderColor: colors.puprble,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0
    }
})