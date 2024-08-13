import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import Fontisto from "react-native-vector-icons/Fontisto"

import moment from "moment";
import { ScreenNames } from '../../route/ScreenNames';


const BookingCard = (props) => {
    const reqInfo = { ...props }
    const { fromclientDuePayment } = props
    const { userPayment } = useContext(SearchContext);
    const navigation = useNavigation();
    const data = { ...props }

    const [clientSide, setClientSide] = useState(true)

    
    
    const serviceRequest = reqInfo.serviceRequest[0]
    const requestPayment = reqInfo.requestPayment[0]
    const services = reqInfo.services
    const images = reqInfo.images[0]
    const relatedCamp = reqInfo.relatedCamp[0]
    const BookDates = reqInfo.BookDates[0]

   // console.log("><<requestInfo>><",serviceRequest.reqPayments);


    const requestCost = serviceRequest.Cost
    const ReqDate = serviceRequest.ReqDate
    const ReqStatus = serviceRequest.ReqStatus
    const RequestId = serviceRequest.RequestId
    const reservationDetail = serviceRequest.reservationDetail
    //console.log("serviceRequest", serviceRequest);

    const today = moment(new Date(), "YYYY-MM-DD")
    const day = today.format('D')
    const month = today.format('M')
    const year = today.format('YYYY')
    const todayDate = year + '-' + month + '-' + day

    const renderLogo = () => {
        const index = images.logoArray?.findIndex((val) => val === true)
        const img = images?.serviceImages[index]
        return <Image
            source={{ uri: img }}
            style={styles.img}
        />
    }
    const renderServTitle = () => {
        const obj = {
            ...data,
            ...services[0]
        }
        delete obj.services

        const cardsArray = services?.map(card => {
            return <Pressable style={styles.cardHeader}
                onPress={() => navigation.navigate(ScreenNames.ServiceDescr, { data: obj, isFromClientRequest: true })}
            >
                <Text style={styles.titleText}>{card.title}</Text>
            </Pressable>;
        });
        return cardsArray;
    };

    const renderPrice = (item) => {
        return (
            <View style={styles.itemView}>
                <View>
                    <Text style={styles.itemTxt}>{item}</Text>
                </View>
                <Image style={styles.shekeImg} source={require('../assets/photos/shekelSign.png')} />
            </View>
        )
    }
    const renderBookingDate = (item) => {
        return (
            <View style={styles.itemView}>
                <View>
                    <Text style={styles.itemTxt}>{item}</Text>
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

    //// single Request 
    const renderSingleRequest = (stutesType) => {
        return (
            <View style={styles.card}>
                <View style={styles.imgView}>
                    {renderLogo()}
                </View>
                <View style={styles.infoView}>
                    {renderServTitle()}

                    <Pressable style={styles.detailView}
                        onPress={() => navigation.navigate(ScreenNames.ClientShowRequest, { reqInfo })}
                    >
                        <View style={styles.requestStuts}>
                            <Text style={styles.itemTxt}>{stutesType}</Text>
                        </View>
                        <View>
                            {renderBookingDate(reservationDetail[0].reservationDate)}
                            {renderPrice(requestCost)}
                        </View>
                    </Pressable>

                    {stutesType !== 'بأنتظار الرد' &&
                        <View>
                            {stutesType !== 'غير متاح' &&
                                <Pressable style={styles.paymentButton} onPress={() => navigation.navigate(ScreenNames.RequestDuePaymentsShow, { reqInfo, clientSide })}>
                                    <Text style={styles.itemTxt}>تفاصيل الدفعات</Text>
                                </Pressable>}
                        </View>}

                </View >
            </View >
        )
    }
    /// Multible Requests
    const renderMultiRequests = (stutesType) => {
        return reservationDetail.map(item => {
            return (
                <View style={styles.card}>
                    <View style={styles.imgView}>
                        {renderLogo()}
                    </View>
                    <View style={styles.infoView}>
                        {renderServTitle()}
                        <View>
                            <Pressable style={styles.detailView}
                                onPress={() => navigation.navigate(ScreenNames.ClientShowRequest, { reqInfo })}
                            >
                                <View style={styles.requestStuts}>
                                    <Text style={styles.itemTxt}>{stutesType}</Text>
                                </View>
                                <View>
                                    {renderBookingDate(item.reservationDate)}
                                    {renderPrice(item.datePrice)}
                                </View>
                            </Pressable>
                        </View>
                        {stutesType !== 'بأنتظار الرد' &&
                        <View>
                            {stutesType !== 'غير متاح' &&
                                <Pressable style={styles.paymentButton}>
                                    <Text style={styles.itemTxt}>تفاصيل الدفعات</Text>
                                </Pressable>}
                        </View>}
                    </View>
                </View>
            )
        })
    }
    const renderReqInfo = () => {
        let stutesType = ''
       // console.log("reservationDetail", reservationDetail.length);
        if (reservationDetail.length > 1) {

            if (ReqStatus === 'partially paid') {
                stutesType = 'محجوز مدفوع جزئي'
                return (
                    <View >
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }
            if (ReqStatus === 'waiting reply') {
                stutesType = 'بأنتظار الرد'
                return (
                    <View>
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }

            if (ReqStatus === 'waiting pay') {
                stutesType = 'يمكنك الدفع'
                return (
                    <View>
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }
            if (ReqStatus === 'refuse') {
                stutesType = 'غير متاح'
                return (
                    <View>
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }
            if (ReqStatus === 'paid all') {
                stutesType = 'محجوز'
                return (
                    <View>
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }


        } else {
          
            if (ReqStatus === 'partially paid') {
                stutesType = 'محجوز مدفوع جزئي'
                return (
                    <View >
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
            if (ReqStatus === 'waiting reply') {
                stutesType = 'بأنتظار الرد'
                return (
                    <View>
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
            if (ReqStatus === 'waiting pay') {
                stutesType = 'يمكنك الدفع'
                return (
                    <View >
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
            if (ReqStatus === 'refuse') {
                stutesType = 'غير متاح'
                return (
                    <View>
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
            if (ReqStatus === 'paid all') {
                stutesType = 'محجوز'
                return (
                    <View>
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
            // console.log(fromclientDuePayment, props.ReqStatus, props.reservationDetail[0].reservationDate, todayDate);

        }

    }


    return (
        <View style={styles.container}>
            {renderReqInfo()}
        </View>
    );

}

const styles = StyleSheet.create({
    DueImg: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    img: {
        width: '100%',
        height: 170,
    },

    card: {
        alignSelf: 'center',
        width: '80%',
        height: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginVertical: 25,
    },
    infoView: {
        width: '100%',
        height: 160,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // position: 'absolute',
        // bottom: 0,
        elevation: 5,
    },
    titleText: {
        fontSize: 18,
        color: colors.puprble,
    },

    cardHeader: {
        alignItems: 'center',
    },


    itemView: {
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
    itemTxt: {
        color: colors.puprble,
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
    labelDateTxt: {
        fontSize: 15
    },
    detailView: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    requestStuts: {
        width: '20%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dueCard: {
        width: '95%',
        height: 100,
        alignSelf: 'center',
        backgroundColor: colors.silver,
        elevation: 10,
        shadowColor: colors.puprble,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        marginTop: 15,

    },
    paymentButton: {
        width: '40%',
        height: 30,
        borderWidth: 0.5,
        marginLeft: 5,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:colors.puprble,
        borderRadius: 5
    }
})

export default BookingCard;
