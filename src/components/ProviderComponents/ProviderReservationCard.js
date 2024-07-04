import { StyleSheet, Text, View, Image, Pressable, Alert, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import { colors } from '../../assets/AppColors'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import SearchContext from '../../../store/SearchContext'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames'
import moment from "moment";


const ProviderReservationCard = (props) => {
    const { fromWaitingScreen, fromReservationScreen, fromWaitingPayScreen, fromProviderPartallyPaid, resDate } = props
    const { eventTypeInfo } = useContext(SearchContext);
    const [fromRequestCard, setFromRequestCard] = useState(true)
    const navigation = useNavigation();
    const reqInfo = { ...props }

    var filteredRes = reqInfo.requestInfo.reservationDetail.filter((detail) => detail.reservationDate.slice(0, 10) == resDate)
    const [providerSide, setProviderSide] = useState(true)

    const renderEventType = () => {
        const eventTypeIndex = eventTypeInfo.findIndex(item => item.Id === props.requestInfo.ReqEventTypeId)
        const eventTitle = eventTypeInfo[eventTypeIndex].eventTitle
        const eventPhoto = eventTypeInfo[eventTypeIndex].eventImg

        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>{eventTitle}</Text>
                </View>
                <View style={styles.IconView}>
                    <Image style={{ width: 30, height: 30 }} source={{ uri: eventPhoto }} />
                </View>
            </View>
        )
    }
    const renderClientInfo = () => {
        const data = props.userInfo[0]
        return (
            <Pressable style={styles.info} onPress={() => navigation.navigate(ScreenNames.UserProfile, { data })}>
                <Image style={styles.profilImg} source={{ uri: props.userInfo[0].UserPhoto }} />
                <Text style={styles.userName}>{props.userInfo[0].User_name}</Text>
            </Pressable>
        )
    }
    const renderRequestDate = () => {
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>{props.requestInfo.ReqDate}</Text>
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
    const renderPrice = () => {
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>{props.requestInfo.Cost}</Text>
                </View>
                <Image style={styles.shekeImg} source={require('../../assets/photos/shekelSign.png')} />
            </View>
        )
    }
    const time = () => {
        return (
            <View style={styles.dateview}>
                <Text style={styles.dateTxt}>{'  الى  ' + props.requestInfo.reservationDetail[0].EndTime}</Text>
                <Text style={styles.dateTxt}>{'  من   ' + props.requestInfo.reservationDetail[0].startingTime}</Text>
            </View>
        )


    }

    const renderSingleReq = () => {
        return (<View>
            {renderPrice()}
            {time()}
        </View>
        )
    }
    const filterPAyments = () => {
        return props.requestInfo.paymentInfo.filter(item => {
            return item.paymentStutes === 'paid'
        })
    }
    const calculatePersentage = () => {
        const filteredPayment = filterPAyments()
        var persentageSum = 0
        filteredPayment.forEach(element => {
            persentageSum += element.pers
        });

        const allAmount = props.requestInfo.Cost
        const fact = allAmount * persentageSum
        const realAmount = fact / 100

        return realAmount
    }
    const renderPayRemain = () => {
        const paidAmount = calculatePersentage()
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>{paidAmount}</Text>
                    <Text style={styles.labelDateTxt}>المدفوع</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        name={"payments"}
                        color={colors.puprble}
                        size={15} />
                </View>
            </View>
        )
    }
    const renderReservationPaidStatus = () => {
        return (
            <View style={styles.dateview}>
                {props.requestInfo.ReqStatus === 'partially paid' ?
                    <Text style={styles.Txt}>مدفوع جزئي</Text> :
                    <Text style={styles.Txt}>مدفوع كامل</Text>}
            </View>
        )
    }
    const renderPaymentDetButton = () => {
        return (
            <Pressable style={{ width: '50%', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 5 }}
                onPress={() => navigation.navigate(ScreenNames.RequestDuePaymentsShow, { reqInfo, providerSide })}>
                <Text style={styles.payDetTxt}>تفاصيل الدفعات</Text>
            </Pressable>
        )
    }


    const requestWaitingReplyCard = () => {
        return (
            <View style={styles.card}>
                <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo, fromRequestCard })}>
                    {renderRequestDate()}
                    {renderEventType()}
                    {renderSingleReq()}
                </Pressable>
                {renderClientInfo()}
            </View>
        )
    }
    const multiRequestWaitingReplyCard = () => {
        return filteredRes.map(item => {
            return (
                <View style={styles.card}>
                    <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo, fromRequestCard })}>
                        <Text style={styles.dateTxt}>حجز متعدد الايام</Text>
                        {renderRequestDate()}
                        {renderEventType()}
                        <View style={styles.dateview}>
                            <View>
                                <Text style={styles.dateTxt}>{item.datePrice}</Text>
                            </View>
                            <Image style={styles.shekeImg} source={require('../../assets/photos/shekelSign.png')} />
                        </View>

                        <View style={styles.dateview}>
                            <Text style={styles.dateTxt}>{'  الى  ' + item.EndTime}</Text>
                            <Text style={styles.dateTxt}>{'  من   ' + item.startingTime}</Text>
                        </View>
                    </Pressable>
                    {renderClientInfo()}
                </View>
            )
        })
    }
    const requestWaitingPayCard = () => {
        return (
            <View style={styles.card}>
                <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>
                    {renderRequestDate()}
                    {renderEventType()}
                    {renderPrice()}
                </Pressable>
                {renderClientInfo()}
            </View>
        )
    }
    const multiRequestWaitingPayCard = () => {
        return filteredRes.map(item => {
            return (
                <View style={styles.card}>
                    <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>
                        <Text style={styles.dateTxt}>حجز متعدد الايام</Text>
                        {renderRequestDate()}
                        {renderEventType()}
                        <View style={styles.dateview}>
                            <View>
                                <Text style={styles.dateTxt}>{item.datePrice}</Text>
                            </View>
                            <Image style={styles.shekeImg} source={require('../../assets/photos/shekelSign.png')} />
                        </View>

                        <View style={styles.dateview}>
                            <Text style={styles.dateTxt}>{'  الى  ' + item.EndTime}</Text>
                            <Text style={styles.dateTxt}>{'  من   ' + item.startingTime}</Text>
                        </View>
                    </Pressable>
                    {renderClientInfo()}
                </View>
            )
        })
    }

    const renderPaidReservatins = () => {
        const paymentData = props.requestInfo.paymentInfo
        const actualPayments = props.userPayments

        if (actualPayments.length >= 1 && paymentData.length >= 1) {  /// if the client pay one time at the least for this request

            if (actualPayments.length === paymentData.length) {  /// if the client pay all payments
                return (
                    <View>
                        {reservationPaidAllCard()}
                    </View>
                )
            } else {
                return (
                    <View>
                        {reservationPartiallyPaidCard()}
                    </View>
                )

            }
        }
    }
    const reservationPartiallyPaidCard = () => {
        return (
            <View style={styles.card1}>
                <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>
                    {renderPrice()}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {renderReservationPaidStatus()}
                        {renderPayRemain()}
                    </View>
                    {renderPaymentDetButton()}
                </Pressable>
                {renderClientInfo()}
            </View>
        )
    }
    const reservationPaidAllCard = () => {
        return (
            <View style={styles.card1}>
                <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>
                    {renderPrice()}
                    <View style={{ alignItems: 'center', }}>
                        {renderReservationPaidStatus()}
                    </View>
                    {renderPaymentDetButton()}
                </Pressable>
                {renderClientInfo()}
            </View>
        )
    }

    const renderCard = () => {
        if (fromWaitingScreen) {
            return (
                <View>
                    {reqInfo.requestInfo.reservationDetail.length > 1 ?
                        multiRequestWaitingReplyCard()
                        :
                        requestWaitingReplyCard()
                    }
                </View>
            )
        }
        if (fromWaitingPayScreen) {
            return (
                <View style={styles.card}>
                    {reqInfo.requestInfo.reservationDetail.length > 1 ?
                        multiRequestWaitingPayCard()
                        :
                        requestWaitingPayCard()
                    }

                </View>
            )
        }
        if (fromReservationScreen) {
            return (
                <View >
                    {renderPaidReservatins()}

                </View>
            )
        }
        // if (fromProviderPartallyPaid) {
        //     return (
        //         <View style={styles.dueCard1}>
        //             {renderRequestAmounts()}
        //             {renderClientInfo()}
        //         </View>
        //     )
        // }
    }



    return (
        <View>
            {renderCard()}
        </View>
    )
}

export default ProviderReservationCard

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '90%',
        height: 190,
        alignSelf: 'center',
        margin: 10,
        // borderWidth: 1
    },
    card1: {
        flexDirection: 'row',
        width: '90%',
        height: 150,
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
        padding: 5,

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
    infoTxt: {
        marginVertical: 5,
        marginRight: 10,
        color: colors.puprble,
        fontSize: 15
    },

    dateview: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5
    },
    shekeImg: {
        width: 35,
        height: 35,
        marginLeft: 15
    },
    dateTxt: {
        color: colors.puprble,
        fontSize: 15
    },
    Txt: {
        fontSize: 15,
        color: colors.puprble,
        width: 50
    },
    payDetTxt: {
        fontSize: 15,
        color: colors.puprble,
    },
    labelDateTxt: {
        fontSize: 15
    },
    IconView: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
})