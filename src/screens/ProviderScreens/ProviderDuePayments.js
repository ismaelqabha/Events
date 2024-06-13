import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import SearchContext from '../../../store/SearchContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard'
import UsersContext from '../../../store/UsersContext'
import { showMessage } from '../../resources/Functions'
import { ScreenNames } from '../../../route/ScreenNames'


const ProviderDuePayments = (props) => {
    const { requestInfoByService } = useContext(SearchContext);
    // const [fromclientDuePayment, setFromClientDuePayment] = useState(true)

    const [fromProviderDuePay, setFromProviderDuePay] = useState(true)

    // const allRequestingDates = []


    var paymentDate
    var todayDate = new Date();

    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    todayDate.setMilliseconds(0);

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
                <Text style={styles.headerTxt}>دفعات الزبائن المستحقة</Text>
            </View>
        )
    }


    const queryRequest = () => {
        if (requestInfoByService.message !== "no Request") {
            const reqInfo = requestInfoByService.filter(item => {
                return item.requestInfo.ReqStatus === 'partially paid'
            })
            return reqInfo
        } else {
            return []
        }
    }
    const filterRequestAccordingPayment = () => {
        const reqData = queryRequest()
       
        const filteredData = []
       
        for (let index = 0; index < reqData.length; index++) {
            const element = reqData[index];
            const allowed = []
            var newpaymentInfo = [...element.requestInfo.paymentInfo]

            newpaymentInfo?.forEach((payment, index) => {
                paymentDate = new Date(payment.PayDate)
                paymentDate.setHours(0, 0, 0, 0)

                if (payment.paymentStutes === 'not paid' && paymentDate <= todayDate) {
                    allowed.push(payment)
                }

                if (index == element.requestInfo.paymentInfo?.length - 1) {
                    const fakeElement = {
                        userPayments: [...element.userPayments],
                        userInfo: [...element.userInfo],
                        requestInfo: {
                            RequestId: element.requestInfo.RequestId,
                            Cost: element.requestInfo.Cost,
                            ReqDate: element.requestInfo.ReqDate,
                            paymentInfo: allowed,
                            reservationDetail: [...element.requestInfo.reservationDetail]
                        }
                    }
                    filteredData.push(fakeElement)
                }
            })
        }

        return filteredData
    }

    const selectedRequestDataAccselectedPayment = (reqId) => {
        const reqData = queryRequest()
        return reqData.filter(item => {
            return item.requestInfo.RequestId === reqId
        })
    }

    const calculatePersentage = (ReqPrice, persentage) => {
        const fact = ReqPrice * persentage
        const realAmount = fact / 100
        return realAmount
    }

    const renderPayments = () => {
        const reqData = filterRequestAccordingPayment()

        return reqData.map(item => {
            const selectedRequest = selectedRequestDataAccselectedPayment(item.requestInfo.RequestId)
            //console.log("selectedRequest", selectedRequest);
            return item.requestInfo.paymentInfo.map(elem => {
                const amount = calculatePersentage(item.requestInfo.Cost, elem.pers)
                const ID = elem.id
                return (
                    <View style={styles.paymentItem}>
                        <View style={styles.titleView}>
                            <Text style={{ fontSize: 20, color: colors.puprble }}>{item.userInfo[0].User_name}</Text>
                        </View>

                        {item.requestInfo.reservationDetail > 1 ?
                            item.requestInfo.reservationDetail.map(bookinfo => {

                            }) :
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.txtValue}>{item.requestInfo.reservationDetail[0].reservationDate}</Text>
                                    <Text>تاريخ الحجز</Text>
                                </View>
                                <View style={styles.IconView}>
                                    <MaterialIcons
                                        style={styles.icon}
                                        name={'date-range'}
                                        color={colors.puprble}
                                        size={25}
                                    />
                                </View>
                            </View>
                        }


                        <View style={styles.item}>
                            <View>
                                <Text style={styles.txtValue}>{amount}</Text>
                                <Text>قيمة الدفعة</Text>
                            </View>
                            <View style={styles.IconView}>
                                <MaterialIcons
                                    style={styles.icon}
                                    name={'payment'}
                                    color={colors.puprble}
                                    size={25}
                                />
                            </View>
                        </View>
                        <View style={styles.item}>
                            <View>
                                <Text style={styles.txtValue}>{elem.PayDate}</Text>
                                <Text>تاريخ الدفعة</Text>
                            </View>
                            <View style={styles.IconView}>
                                <MaterialIcons
                                    style={styles.icon}
                                    name={'date-range'}
                                    color={colors.puprble}
                                    size={25}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10, alignItems: 'center', justifyContent: 'space-around', width: '100%', alignSelf: 'center' }}>

                            <Pressable style={styles.payButton} onPress={() => props.navigation.navigate(ScreenNames.MakePayment, { reqInfo: selectedRequest, ID: ID, amount: amount, fromProviderDuePay: fromProviderDuePay })}>
                                <Text style={styles.pressTxt}>دفع</Text>
                            </Pressable>
                            <Pressable style={styles.payButton} onPress={() => props.navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo: selectedRequest[0]  , fromProviderDuePay: fromProviderDuePay })}
                            >
                                <Text style={styles.pressTxt}>تفاصيل الحجز</Text>
                            </Pressable>
                        </View>
                    </View>
                )
            })
        })
    }

    // const getRequestsAccDates = () => {
    //     const data = getBookingInfo()
    //     const reqInfo = data.filter(item => {
    //         if (item.requestInfo.reservationDetail.length > 1) {
    //             //if reservation detail has more than one date
    //             let result = item.requestInfo.reservationDetail.find(multiItem => {
    //                 return multiItem.reservationDate < todayDate
    //             })
    //             return result

    //         } else {

    //             //if reservation detail has one date
    //             // console.log(item.requestInfo.reservationDetail[0].reservationDate, todayDate, item.requestInfo.reservationDetail[0].reservationDate < todayDate);
    //             return item.requestInfo.reservationDetail[0].reservationDate < todayDate
    //         }
    //     })
    //     return reqInfo
    // }
    // const getBookingInfoByDate = (resDate) => {
    //     const data = getRequestsAccDates()

    //     const reqInfo = data.filter(req => {
    //         if (req.requestInfo.reservationDetail.length > 1) {
    //             const multiReqInfo = req.requestInfo.reservationDetail.find(multiItem => {
    //                 return multiItem.reservationDate.slice(0, 10) == resDate
    //             })
    //             return multiReqInfo
    //         } else {
    //             return req.requestInfo.reservationDetail[0].reservationDate.slice(0, 10) == resDate
    //         }
    //     })
    //     return reqInfo

    // }
    // const collectAllRequestDates = () => {
    //     const data = getRequestsAccDates()

    //     return data.map(item => {
    //         if (item.requestInfo.reservationDetail.length > 1) {
    //             //if reservation detail has more than one date
    //             return item.requestInfo.reservationDetail.map(multiItem => {

    //                 if (!(allRequestingDates.includes(multiItem.reservationDate))) {
    //                     allRequestingDates.push(multiItem.reservationDate)
    //                 }
    //             })
    //         } else {
    //             //if reservation detail has one date

    //             requestBookingDate = item.requestInfo.reservationDetail[0].reservationDate
    //             if (!(allRequestingDates.includes(requestBookingDate))) {
    //                 allRequestingDates.push(requestBookingDate)
    //             }
    //         }
    //         allRequestingDates.sort();
    //     })
    // }
    // const renderBookingCard = (resDate) => {
    //     const data = getBookingInfoByDate(resDate)
    //     //console.log("data", data);
    //     return data.map(item => {
    //         return (
    //             <ProviderReservationCard fromProviderPartallyPaid={fromProviderPartallyPaid}  {...item} resDate={resDate} />
    //         )
    //     })
    // }
    // const renderBookingDates = () => {
    //     collectAllRequestDates()
    //     return allRequestingDates.map(item => {
    //         return (
    //             <View>
    //                 <View style={styles.dateView}>
    //                     <Text style={styles.dateTxt}>{moment(item).format('dddd')}</Text>
    //                     <Text style={styles.dateTxt}>{moment(item).format('L')}</Text>
    //                 </View>
    //                 {renderBookingCard(item)}
    //             </View>
    //         )
    //     })
    // }




    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderPayments()}

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default ProviderDuePayments

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
    dateView: {
        backgroundColor: colors.silver,
        width: '100%',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 5,
        marginVertical: 20,

    },
    dateTxt: {
        color: colors.puprble,
        fontSize: 18
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 10
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        marginLeft: 10,
    },
    txtValue: {
        textAlign: 'right',
        fontSize: 18,
        color: colors.puprble
    },
    paymentItem: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        padding: 5,
        borderColor: colors.silver,
        width: '95%',
        height: 350
    },
    titleView: {
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: colors.silver,
        width: "90%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    payButton: {
        // width: '50%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        // borderWidth: 1,
        // borderColor: colors.puprble,
        // borderRadius: 5,
        // alignItems: 'center',

    },
    pressTxt: {
        fontSize: 18,
        color: colors.darkGold
    }

})