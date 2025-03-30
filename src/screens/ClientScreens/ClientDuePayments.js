import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SearchContext from '../../../store/SearchContext'
import BookingCard from '../../components/BookingCard'
import { showMessage } from '../../resources/Functions'
import { ScreenNames } from '../../../route/ScreenNames'

const ClientDuePayments = (props) => {
    const { requestInfoAccUser } = useContext(SearchContext);
    const [fromclientDuePayment, setFromClientDuePayment] = useState(true)

    var paymentDate
    var todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

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
                <Text style={styles.headerTxt}>الدفعات المستحقة</Text>
            </View>
        )
    }

    const queryRequest = () => {
        if (requestInfoAccUser.message !== "no Request") {
            const clientReq = requestInfoAccUser?.filter(item => {
                return item.requestInfo.find(element => {
                    return element.serviceRequest[0].ReqStatus === 'partially paid'
                })
            })
            return clientReq

        } else {
            return []
        }
    }

    useEffect(() => {
        // const reqData = queryRequest()
        // //console.log("reqData", reqData);


        // const req = filterRequestAccordingPayment()
        // console.log("req", req);

    }, [])

    const filterRequestAccordingPayment = () => {
        const reqData = queryRequest()


        const filteredData = []

        for (let index = 0; index < reqData.length; index++) {
            const request = reqData[index].requestInfo
            for (let i = 0; i < request.length; i++) {
                const element = request[i]
                const serviceData = reqData[index].serviceData
                const serviceCamp = reqData[index].serviceCamp
                const allowed = []

                var newpaymentInfo = [...element.serviceRequest[0].paymentInfo]

                newpaymentInfo?.forEach((payment, index) => {
                    paymentDate = new Date(payment.payDate)
                    paymentDate.setHours(0, 0, 0, 0)

                    if (payment.paymentStutes === 'not paid' && paymentDate <= todayDate) {
                        allowed.push(payment)
                    }

                    if (index == element.serviceRequest[0].paymentInfo?.length - 1) {

                        const fakeElement = {
                            serviceData: serviceData,
                            serviceCamp: serviceCamp,
                            requestInfo: [
                                {
                                    serviceRequest: [
                                        {
                                            RequestId: element.serviceRequest[0].RequestId,
                                            Cost: element.serviceRequest[0].Cost,
                                            ReqDate: element.serviceRequest[0].ReqDate,
                                            paymentInfo: allowed,
                                            reservationDetail: [...element.serviceRequest[0].reservationDetail]
                                        }
                                    ],
                                    requestPayment: [element.requestPayment]
                                }
                            ]
                        }
                        filteredData.push(fakeElement)
                    }
                })
            }
        }

        return filteredData
    }


    const calculatePersentage = (ReqPrice, persentage) => {
        const fact = ReqPrice * persentage
        const realAmount = fact / 100

        return realAmount
    }

    const selectedRequestDataAccselectedPayment = (reqId) => {
        const reqData = queryRequest()

        return reqData.filter(item => {
            return item.requestInfo.find(element => {
                return element.serviceRequest[0].RequestId === reqId
            })
        })
    }

    const manageReqData = (reqId) => {
        const data = selectedRequestDataAccselectedPayment(reqId)
        var reqInfo = {}

        for (let i = 0; i < data.length; i++) {
            const req = data[i]

            const requestsinfo = req.requestInfo

            requestsinfo.forEach(element => {
                if (element.serviceRequest[0].RequestId === reqId) {
                    reqInfo = {
                        serviceRequest: element.serviceRequest,
                        requestPayment: element.requestPayment,
                        services: req.serviceData,
                        serviceImage: req.serviceImage,
                        serviceCamp: req.serviceCamp,
                        BookDates: req.BookDates
                    }
                }

            });
        }
        return reqInfo
    }

    const renderPayments = () => {
        const reqData = filterRequestAccordingPayment()

        return reqData?.map(item => {
            const selectedRequest = manageReqData(item.requestInfo[0].serviceRequest[0].RequestId)
            // console.log("selectedRequest", selectedRequest);
            return item.requestInfo[0].serviceRequest[0].paymentInfo.map(elem => {
                const amount = calculatePersentage(item.requestInfo[0].serviceRequest[0].Cost, elem.pers)
                const ID = elem.id

                return (
                    <View style={styles.paymentItem}>
                        <View style={styles.titleView}>
                            <Text style={{ fontSize: 20, color: colors.puprble }}>{item.serviceData[0].title}</Text>
                        </View>

                        <View style={styles.item}>
                            <View>
                                {item.requestInfo[0].serviceRequest[0].reservationDetail.map(resDate => {
                                    return (
                                        <Text style={styles.txtValue}>{resDate.reservationDate}</Text>
                                    )
                                })}
                                {item.requestInfo[0].serviceRequest[0].reservationDetail.length > 1 ? <Text>تواريخ الحجز</Text> : <Text>تاريخ الحجز</Text>}
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
                                <Text style={styles.txtValue}>{elem.payDate}</Text>
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

                        <View style={styles.bottomView}>
                            <Pressable style={styles.payButton} onPress={() => props.navigation.navigate(ScreenNames.ClientShowRequest, { reqInfo: selectedRequest, fromclientDuePayment: fromclientDuePayment })}
                            >
                                <Text style={styles.pressTxt}>تفاصيل الحجز</Text>
                            </Pressable>
                            <Pressable style={styles.payButton} onPress={() => props.navigation.navigate(ScreenNames.MakePayment, { reqInfo: selectedRequest, fromclientDuePayment: fromclientDuePayment, ID: ID, amount: amount })}>
                                <Text style={styles.pressTxt}>دفع</Text>
                            </Pressable>
                        </View>
                    </View>
                )
            })
        })
    }


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

export default ClientDuePayments

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
    img: {
        width: 50,
        height: 50
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
        marginTop: 30,
        backgroundColor: colors.silver,
        width: "90%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    payButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '40%',
        borderWidth: 0.5,
        borderColor: colors.puprble,
        borderRadius: 5
    },
    pressTxt: {
        fontSize: 18,
        color: colors.darkGold
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        width: '100%'
    }

})