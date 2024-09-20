import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import moment from "moment";
import { colors } from "../../assets/AppColors.js"
import { ScreenNames } from "../../../route/ScreenNames.js"

const RequestDuePaymentsShow = (props) => {
    const { reqInfo, providerSide, clientSide } = props.route?.params || {}
    const [fromReqDuePaymentShow, setFromReqDuePaymentShow] = useState(true)
console.log(">>",reqInfo);

    const [ReqPrice, setReqPrice] = useState()
    const [ReqPaymentInfo, setReqPaymentInfo] = useState([])
    const [paymentOwner, setPaymentOwner] = useState([])
    const [payments, setPayments] = useState([])

    const serviceRequest = reqInfo.serviceRequest[0]
    const requestPayment = reqInfo.requestPayment
    const requestCost = serviceRequest.Cost

    //console.log("reqInfo", serviceRequest.paymentInfo);

    const filterPaymentInfo = () => {
        return ReqPaymentInfo?.filter(item => {
            return item.paymentStutes === 'not paid'
        })
    }

    const paymentNotPaid = filterPaymentInfo()
    // console.log("paymentNotPaid",paymentNotPaid);

    useEffect(() => {
        checkSourse()
    }, [])

    const checkSourse = () => {
        if (clientSide) {
            const services = reqInfo.services[0]
            setReqPrice(requestCost)
            setReqPaymentInfo(serviceRequest.paymentInfo)
            setPaymentOwner(services.title)
            setPayments(requestPayment)
        }

        if (providerSide) {
            setReqPrice(reqInfo.requestInfo.Cost)
            setReqPaymentInfo(reqInfo.requestInfo.paymentInfo)
            setPaymentOwner(reqInfo.userInfo)
            setPayments(reqInfo.userPayments)
        }
        if (reqInfo.isFromClientRequest) {
            setReqPaymentInfo(serviceRequest.paymentInfo)
            setPayments(reqInfo.requestPayment)
        }
    }

    // console.log(payments);

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
                <Text style={styles.headerTxt}>تفاصيل الدفعات</Text>
            </View>
        )
    }



    const renderPaymentInfo = () => {
        return paymentNotPaid.map(item => {
            const amount = calculatePersentage(item.pers)
            const ID = item.id
            return (
                <Pressable style={styles.paymentView} onPress={() => props.navigation.navigate(ScreenNames.MakePayment, { amount: amount, reqInfo: reqInfo, clientSide: clientSide, ID: ID, providerSide: providerSide })}
                >
                    <Text style={styles.paymentTxt}>{moment(item.PayDate).format('L')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={styles.paymentTxt}>{amount}</Text>
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

    const calculatePersentage = (persentage) => {
        const fact = ReqPrice * persentage
        const realAmount = fact / 100

        return realAmount
    }

    const renderPayments = () => {
        return payments.map(item => {
            return (
                <Pressable style={styles.paymentView} onPress={() => props.navigation.navigate(ScreenNames.PaymentDetail, { payments: payments, paymentOwner: paymentOwner })}
                >
                    <Text style={styles.paymentTxt}>{item.PaymentDate}</Text>
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


    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            {header()}

            <ScrollView>
                {paymentNotPaid.length > 0 && <View style={{ height: 300 }}>
                    <Text style={styles.paymentTxt}>الدفعات الغير مدفوعة</Text>
                    {renderPaymentInfo()}
                </View>}

                {payments.length > 0 && <View style={{ height: 200 }}>
                    <Text style={styles.paymentTxt}>الدفعات المدفوعة</Text>
                    {renderPayments()}
                </View>}


            </ScrollView>
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