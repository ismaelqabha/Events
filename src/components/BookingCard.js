import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';





const BookingCard = (props) => {
    const { userPayment} = useContext(SearchContext);
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
                source={{ uri: img.image}}
                style={styles.img}
            />;
        })
        return cover
    }

    const renderServInfo = () => {
        const data = props.services;
        const cardsArray = data?.map(card => {
        
            return <View style={styles.cardHeader}>
                <View style={{}}>{renderServiceLogo()}</View>
                
                <View style={{}}><Text style={{fontSize: 15, color:'back',fontWeight:'bold'}}>{card.title}</Text></View>
            </View>;
        }); return cardsArray;
    };
   

    const checkIfAccepted = () => {
        if (props.ReqStatus == 'true') {
            if (checkIfPayed()) {
                return <View><Text style={{ marginBottom: 10, fontSize: 18 }}>
                    الحالة:  محجوز
                </Text>
                    <View style={styles.status}>
                        <Text style={styles.text}>
                            الباقي: ₪{props.Cost}
                        </Text>
                        <Text style={styles.text}>
                            مدفوع: 1000
                        </Text>
                    </View>
                    <View style={styles.status}>
                        <Text style={{ marginBottom: 10, fontSize: 18 }}>
                            التاريخ: {props.reservationDate}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 18 }}>
                            الوقت: {props.reservationTime}
                        </Text>
                    </View>
                </View>;
            } else {
                return <View>
                    <View style={styles.status}>
                        <Text style={styles.text}>
                            ₪{props.Cost}
                        </Text>
                        <Text style={styles.text}>
                            الحالة: يمكنك اتمام الحجز
                        </Text>
                    </View>
                    <View style={styles.status}>
                        <Text style={{ marginBottom: 10, fontSize: 18 }}>
                            التاريخ: {props.reservationDate}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 18 }}>
                            الوقت: {props.reservationTime}
                        </Text>
                    </View>
                    <View style={styles.status}>
                        <Pressable style={styles.button}><Text style={styles.txt}>
                            الغاء الطلب
                        </Text></Pressable>
                        <Pressable style={styles.button}><Text style={styles.txt}>
                            تثبيت الحجز
                        </Text></Pressable>
                    </View>
                </View>;
            }
        } else {
            return <View>
                <Text style={{ marginBottom: 10, fontSize: 18 }}>
                    الحالة: بأنتظار الرد
                </Text>
                <View style={styles.status}>
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>
                        التاريخ: {props.reservationDate}
                    </Text>
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>
                        الوقت: {props.reservationTime}
                    </Text>
                </View></View>;
        }
    };

    return (
        <View style={styles.container}>
            <Card >
                {renderServInfo()}
                <Card.Divider />
                <TouchableOpacity
                //style={{ flexDirection: 'row', }}
                //onPress={() => navigation.navigate(props.page)}
                >
                {checkIfAccepted()}
                </TouchableOpacity>
            </Card>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 5
    },
    card: {
        marginTop: 20,
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 2,
        marginBottom: 10,
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    text: {
        fontSize: 20,
    },
    txt: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#00ffff',
        borderRadius: 10,
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default BookingCard;
