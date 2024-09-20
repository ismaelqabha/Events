import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { colors } from '../../assets/AppColors';
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import SearchContext from '../../../store/SearchContext';
import moment from "moment";
import { ScreenNames } from '../../../route/ScreenNames';

const ProviderClientRequestShow = (props) => {
    const { requests, clientName } = props.route?.params
    const { eventTypeInfo } = useContext(SearchContext);

    // console.log("<<<", requests);
    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>{clientName + ' ' + 'قائمة حجوزات '}</Text>
            </View>
        )
    }
    const renderEventType = (eventTypeId) => {
        const eventTypeIndex = eventTypeInfo.findIndex(item => item.Id === eventTypeId)
        const eventPhoto = eventTypeInfo[eventTypeIndex].eventImg
        return (
            <View style={styles.layerItem}>
                <Image style={{ width: '60%', height: '100%' }} source={{ uri: eventPhoto }} />
            </View>
        )
    }
    const renderReqInfo = (ReqStatus) => {
        let stutesType = ''

        if (ReqStatus === 'partially paid') {
            stutesType = 'محجوز مدفوع جزئي'
            return <Text style={styles.txt}>{stutesType}</Text>
        }
        if (ReqStatus === 'waiting reply') {
            stutesType = 'بأنتظار الرد'
            return <Text style={styles.txt}>{stutesType}</Text>
        }
        if (ReqStatus === 'waiting pay') {
            stutesType = 'يمكنك الدفع'
            return <Text style={styles.txt}>{stutesType}</Text>
        }
        if (ReqStatus === 'refuse') {
            stutesType = 'غير متاح'
            return <Text style={styles.txt}>{stutesType}</Text>
        }
        if (ReqStatus === 'paid all') {
            stutesType = 'محجوز'
            return <Text style={styles.txt}>{stutesType}</Text>
        }
    }

    const renderPaymentStutes = (clientRequest, clientPayment, ReqStatus) => {

        if (ReqStatus === 'waiting reply' || ReqStatus === 'waiting pay') {
            return (
                <View style={styles.paymentButton}>
                    <Text style={styles.txt}>رد</Text>
                </View>)
        } else {
            const reqInfo = {
                isFromClientRequest: true,
                serviceRequest: [clientRequest],
                requestPayment: clientPayment
            }

            return (
                <Pressable style={styles.paymentButton} onPress={() => props.navigation.navigate(ScreenNames.RequestDuePaymentsShow, { reqInfo })}
                >
                    <FontAwesome5
                        name={"money-check"}
                        color={colors.puprble}
                        size={30} />
                </Pressable>)
        }
    }

    const renderRequest = () => {
        return requests.map(item => {
            const reqInfo = {
                isFromClientRequest: true,
                requestInfo: item.clientRequest,
                userPayments: item.clientPayment
            }
            const reqInfo1 = {
                isFromClientRequest: false,
                requestInfo: item.clientRequest,
                userPayments: item.clientPayment
            }
            return (
                <Pressable style={styles.req} onPress={() => props.navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>

                    <View style={styles.layer}>
                        <Pressable style={styles.layerItem} onPress={() => props.navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo: reqInfo1 })}>
                            {renderPaymentStutes(item.clientRequest, item.clientPayment, item.clientRequest.ReqStatus)}
                        </Pressable>
                        <View style={styles.layerItem}>
                            {renderReqInfo(item.clientRequest.ReqStatus)}
                        </View>
                        {renderEventType(item.clientRequest.ReqEventTypeId)}
                    </View>
                    <View style={styles.seperator}></View>

                    <View style={styles.secondLayer}>
                        {item.clientRequest.reservationDetail.map(element => {
                            return (
                                <View style={styles.viewDate}>
                                    <Text style={styles.txt}> {`${moment(element.reservationDate).format('L')}`}</Text>
                                    <Text style={styles.txt}> {`${moment(element.reservationDate).format('dddd')}`}</Text>

                                </View>
                            )
                        })}
                    </View>

                </Pressable >
            )
        })
    }

    return (
        <View style={styles.container}>
            {header()}
            {renderRequest()}
        </View>
    )
}

export default ProviderClientRequestShow

const styles = StyleSheet.create({
    container: {

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
    req: {
        width: '90%',
        height: 150,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: colors.silver,
        borderRadius: 10,
        marginVertical: 5,

    },
    seperator: {
        width: '90%',
        borderWidth: 1,
        borderColor: colors.silver,
        alignSelf: 'center'
    },
    layer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '50%'
    },
    layerItem: {
        width: "33%",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondLayer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%'
    },
    viewDate: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: "70%"
    },
    txt: {
        fontSize: 16,
        color: colors.puprble,
        textAlign: 'center'
    }
})