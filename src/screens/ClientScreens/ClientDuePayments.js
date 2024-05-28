import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SearchContext from '../../../store/SearchContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import BookingCard from '../../components/BookingCard'
import UsersContext from '../../../store/UsersContext'
import { showMessage } from '../../resources/Functions'
import { ScreenNames } from '../../../route/ScreenNames'

const ClientDuePayments = (props) => {
    const { requestInfoAccUser } = useContext(SearchContext);
    const { } = useContext(UsersContext);
    const [fromclientDuePayment, setFromClientDuePayment] = useState(true)


    const today = moment(new Date(), "YYYY-MM-DD")
    const day = today.format('D')
    const month = today.format('M')
    const year = today.format('YYYY')
    const todayDate = year + '-' + month + '-' + day

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
                return item.requestInfo.ReqStatus === 'partally paid'// && item.requestInfo.reservationDetail[0].reservationDate < todayDate
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
        const filterdData = reqData.filter(item => {
           // console.log(item.requestInfo.paymentInfo.length);
            if (item.requestInfo.paymentInfo.length > 1) {
                return item.requestInfo.paymentInfo.filter(element => {
                   // console.log(element.paymentStutes === 'not paid', element.PayDate, todayDate, element.PayDate <= todayDate);
                    return element.paymentStutes === 'not paid' && element.PayDate <= todayDate
                })
            } else {
                return item.requestInfo.paymentInfo[0].paymentStutes === 'not paid' && item.requestInfo.paymentInfo[0].PayDate <= todayDate
            }
        })

       // console.log("><><><" ,filterdData);

        return filterdData
    }

    const renderPayments = () => {
        const reqData = filterRequestAccordingPayment()

        return reqData.map(item => {

            return item.requestInfo.paymentInfo.map(elem => {
                const amount = elem.pers
                const reqID = item.requestInfo.RequestId
                return (
                    <View style={styles.paymentItem}>
                        <View style={styles.titleView}>
                            <Text style={{ fontSize: 20, color: colors.puprble }}>{item.serviceData[0].title}</Text>
                        </View>

                        <View style={styles.item}>
                            <View>
                                <Text style={styles.txtValue}>{elem.pers}</Text>
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
                                <Text>التاريخ </Text>
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
                        <Pressable style={styles.payButton} onPress={() => props.navigation.navigate(ScreenNames.MakePayment,  {amount: amount, reqID: reqID})}>
                            <Text>دفع</Text>
                        </Pressable>
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
        height: 300
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
    payButton:{
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.puprble,
        borderRadius: 5,
        position: 'absolute',
        bottom: 5
    }

})