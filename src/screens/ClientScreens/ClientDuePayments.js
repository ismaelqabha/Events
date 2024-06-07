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
            const clientReq = requestInfoAccUser.filter(item => {
                return item.requestInfo.ReqStatus === 'partially paid'
            })
            return clientReq

        } else {
            return []
        }
    }

    const renderRequestData = () => {
        const reqData = queryRequest()
        return reqData.map(item => {
            return <BookingCard {...item.requestInfo}
                services={item?.serviceData}
                images={item?.serviceImage}
                reqPayments={item?.payments}
                // relatedCamp={item?.serviceCamp}
                fromclientDuePayment={fromclientDuePayment}
            />
        })
    }


    const filterRequestAccordingPayment = () => {
        const reqData = queryRequest()
        const filteredData = []
        

        for (let index = 0; index < reqData.length; index++) {
            const element = reqData[index];
            const allowed = []
            element.requestInfo.paymentInfo?.map((payment, index) => {
                paymentDate = new Date(payment.PayDate)
                paymentDate.setHours(0, 0, 0, 0)
                if (payment.paymentStutes === 'not paid' && paymentDate <= todayDate) {
                    allowed.push(payment)
                }
                if (index == element.requestInfo.paymentInfo?.length - 1) {
                    element.requestInfo.paymentInfo = allowed
                    filteredData.push(element)
                }
            })
        }
        return filteredData
    }


    const calculatePersentage = (ReqPrice, persentage) => {
        const fact = ReqPrice * persentage
        const realAmount = fact / 100

        return realAmount
    }

    const selectedRequestDataAccselectedPayment = (reqId) => {
        const reqData = filterRequestAccordingPayment()
        return reqData.filter(item => {
            return item.requestInfo.RequestId === reqId
        })
    }

    const renderPayments = () => {
        const reqData = filterRequestAccordingPayment()
    
        return reqData?.map(item => {
           const selectedRequest =  selectedRequestDataAccselectedPayment(item.requestInfo.RequestId)
           
            return item.requestInfo.paymentInfo.map(elem => {
                const amount = calculatePersentage(item.requestInfo.Cost, elem.pers)
                const ID = elem.id

                return (
                    <View style={styles.paymentItem}>
                        <View style={styles.titleView}>
                            <Text style={{ fontSize: 20, color: colors.puprble }}>{item.serviceData[0].title}</Text>
                        </View>

                        <View style={styles.item}>
                            <View>
                                {item.requestInfo.reservationDetail.map(resDate => {
                                    return (
                                        <Text style={styles.txtValue}>{resDate.reservationDate}</Text>
                                    )
                                })}
                                {item.requestInfo.reservationDetail.length > 1 ? <Text>تواريخ الحجز</Text> : <Text>تاريخ الحجز</Text>}
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

                        <View style={{ position: 'absolute', bottom: 10, width: '100%' }}>
                            {/* <Pressable style={styles.payButton} onPress={() => props.navigation.navigate(ScreenNames.ClientShowRequest, { reqData: { ...selectedRequest.requestInfo, relatedCamp: { ...selectedRequest.serviceCamp }, services: { ...selectedRequest.serviceData } }, fromclientDuePayment: fromclientDuePayment })}>
                                <Text style={styles.pressTxt}>تفاصيل الحجز</Text>
                            </Pressable> */}
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
        width: '50%',
        borderWidth: 3,
        borderColor: colors.puprble,
        borderRadius: 5
    },
    pressTxt: {
        fontSize: 18,
        color: colors.darkGold
    }

})