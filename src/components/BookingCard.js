import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';





const BookingCard = (props) => {
    const { userPayment } = useContext(SearchContext);
    const navigation = useNavigation();


    const checkIfPayed = () => {
        const isPayed = userPayment.find(item => item.ReqId === props.RequestId)
        return !!isPayed;
    }


    const queryImg = () => {
        return props.image?.filter(photo => {
            return photo.coverPhoto == true
        });
    };

    const renderServiceLogo = () => {
        const logo = queryImg();
        const cover = logo?.map(img => {
            return <Image
                source={{ uri: img.image }}
                style={styles.img}
            />;
        })
        return cover
    }

    const renderServTitle = () => {
        const data = props.services;
        const cardsArray = data?.map(card => {
            return <View style={styles.cardHeader}>
                <View><Text style={styles.titleText}>{card.title}</Text></View>
            </View>;
        }); return cardsArray;
    };


    const checkIfAccepted = () => {
        if (props.ReqStatus == 'true') {
            if (checkIfPayed()) {
                return <View style={styles.status}>
                    <View style={{ justifyContent: 'center' }}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttontxt}>دفع</Text>
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.text}>
                            الحالة:  محجوز
                        </Text>
                        <Text style={styles.text}>
                            {'الحجز  ' + props.reservationDate}
                        </Text>
                        <Text style={styles.text}>
                            {'الوقت  ' + props.reservationTime}
                        </Text>
                        <View style={styles.status}>
                            <Text style={styles.text}>
                                الباقي: ₪{props.Cost}
                            </Text>
                            <Text style={styles.text}>
                                مدفوع: 1000
                            </Text>
                        </View>
                    </View>
                </View>;
            } else {
                return <View style={styles.status}>
                    <View style={{ justifyContent: 'center' }}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttontxt}>دفع</Text>
                        </Pressable>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttontxt}> الغاء الطلب</Text>
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.text}>
                            الحالة: يمكنك اتمام الحجز
                        </Text>
                        <Text style={styles.text}>
                            {'الحجز  ' + props.reservationDate}
                        </Text>
                        <Text style={styles.text}>
                            {'الوقت  ' + props.reservationTime}
                        </Text>
                        <Text style={styles.text}>
                            {'₪ ' + props.Cost}
                        </Text>
                    </View>
                </View>;
            }
        } else {
            return <View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.text}>
                        الحالة: بأنتظار الرد
                    </Text>
                    <Text style={styles.text}>
                        {'الحجز  ' + props.reservationDate}
                    </Text>
                    <Text style={styles.text}>
                        {'الوقت  ' + props.reservationTime}
                    </Text>
                    <Text style={styles.text}>
                        {'₪ ' + props.Cost}
                    </Text>
                </View>
            </View>;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.imgView}>
                    {renderServiceLogo()}
                </View>
                <View style={styles.infoView}>
                    {renderServTitle()}
                    <View>
                        <TouchableOpacity
                        //onPress={() => navigation.navigate(props.page)}
                        >
                            {checkIfAccepted()}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: 170,
    },
    card: {
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
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold'
    },
    imgView: {
        width: '100%',
        height: 170,
    },
    cardHeader: {
        alignItems: 'center',
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    text: {
        fontSize: 15,
        margin: 2,
        marginRight: 10
    },
    buttontxt: {
        fontSize: 15,
        color: 'white',
    },

    button: {
        backgroundColor: 'blueviolet',
        borderRadius: 10,
        width: 90,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
})

export default BookingCard;
