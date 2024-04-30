import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import Fontisto from "react-native-vector-icons/Fontisto"
import { ScreenNames } from '../../route/ScreenNames';


const BookingCard = (props) => {
    const reqInfo = { ...props }
    const { userPayment } = useContext(SearchContext);
    const navigation = useNavigation();
    const data = { ...props }

    const renderLogo = () => {
        const index = props.images[0].logoArray?.findIndex((val) => val === true)
        const img = props.images[0]?.serviceImages[index]
        return <Image
            source={{ uri: img }}
            style={styles.img}
        />
    }

    const renderServTitle = () => {
        const serData = props.services;
        const obj = {
            ...data,
            ...serData[0]
        }
        delete obj.services
        
        const cardsArray = serData?.map(card => {
            return <Pressable style={styles.cardHeader}
                onPress={() => navigation.navigate(ScreenNames.ServiceDescr, { data: obj })}
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
                            {renderBookingDate(props.reservationDetail[0].reservationDate)}
                            {renderPrice(props.Cost)}
                        </View>
                    </Pressable>
                </View >
            </View >
        )
    }

    /// Multible Requests
    const renderMultiRequests = (stutesType) => {
        return props.reservationDetail.map(item => {
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
                    </View>
                </View>
            )
        })
    }


    const renderReqInfo = () => {
        let stutesType = ''
        if (props.reservationDetail.length > 1) {
            if (props.ReqStatus === 'waiting reply') {
                stutesType = 'بأنتظار الرد'
                return (
                    <View>
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }
            if (props.ReqStatus === 'paid') {
                stutesType = 'محجوز'
                return (
                    <View>
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }
            if (props.ReqStatus === 'waiting pay') {
                stutesType = 'يمكنك الدفع'
                return (
                    <View>
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }
            if (props.ReqStatus === 'refuse') {
                stutesType = 'غير متاح'
                return (
                    <View>
                        {renderMultiRequests(stutesType)}
                    </View>
                )
            }

        } else {
            if (props.ReqStatus === 'paid') {
                stutesType = 'محجوز'
                return (
                    <View >
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
            if (props.ReqStatus === 'waiting reply') {
                stutesType = 'بأنتظار الرد'
                return (
                    <View>
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
            if (props.ReqStatus === 'waiting pay') {
                stutesType = 'يمكنك الدفع'
                return (
                    <View >
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
            if (props.ReqStatus === 'refuse') {
                stutesType = 'غير متاح'
                return (
                    <View>
                        {renderSingleRequest(stutesType)}
                    </View>
                )
            }
        }

    }


    return (
        <View style={styles.container}>
            {renderReqInfo()}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {

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
        margin: 2,
        marginTop: 20,
    },
    infoView: {
        width: '100%',
        height: 130,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        bottom: 0,
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
        marginTop: 10,
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
    }
})

export default BookingCard;
