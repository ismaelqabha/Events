import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, Image } from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../assets/AppColors';
import { images } from '../assets/photos/images';


const ClientIncomingRelation = (props) => {

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const renderHeader = () => {
        return (
            <View style={styles.headerImg}>
                <View style={styles.viewIcon}>
                    <Pressable onPress={onPressHandler}>
                        <Ionicons
                            style={styles.icon}
                            name={"arrow-back"}
                            color={"black"}
                            size={25} />
                    </Pressable>
                </View>
                <View style={styles.viewtitle}>
                    <Text style={styles.title}>قائمة طلبات الصداقة</Text>
                </View>
            </View>
        )
    }

    const renderRequestCard = () => {
        return (
            <View style={styles.card}>
                <View style={styles.cardInfo}>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.infoTxt}>أحمد كبها</Text>
                        <Text style={styles.timeTxt}>منذ 3 ساعات</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <Pressable style={styles.refusPressView}>
                            <Text style={styles.infoTxt}>رفض</Text>
                        </Pressable>
                        <Pressable style={styles.acceptPressView}>
                            <Text style={styles.infoTxt}>موافقة</Text>
                        </Pressable>
                    </View>
                </View>
                <Image source={images.profileMalePicture} style={{ width: 80, height: 80, borderRadius: 50 }} />
            </View>
        )
    }
    const renderRequestCard2 = () => {
        return (
            <View style={styles.card}>
                <View style={styles.cardInfo}>
                    <View style={{marginVertical: 10}}>
                        <Text style={styles.infoTxt}>خالد عبد الوهاب علي</Text>
                        <Text style={styles.timeTxt}>منذ 3 ايام</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <Pressable style={styles.refusPressView}>
                            <Text style={styles.infoTxt}>رفض</Text>
                        </Pressable>
                        <Pressable style={styles.acceptPressView}>
                            <Text style={styles.infoTxt}>موافقة</Text>
                        </Pressable>
                    </View>
                </View>
                <Image source={images.profileMalePicture} style={{ width: 80, height: 80, borderRadius: 50 }} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                    {renderRequestCard()}
                    {renderRequestCard2()}
                </ScrollView>
            </View>
        </View>
    )
}

export default ClientIncomingRelation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BGScereen,
    },
    headerImg: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    body: {
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
    viewtitle: {
        justifyContent: 'center',
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
        marginRight: 20,
    },
    card: {
        width: '90%',
        height: 100,
        elevation: 5,
        backgroundColor: colors.BGScereen,
        margin: 10,
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    cardInfo: {
        width: '70%',
        height: '100%',
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 5,
        alignSelf: 'flex-end',
    },
    acceptPressView: {
        width: 120,
        height: 30,
        borderWidth: 3,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.puprble,
    },
    refusPressView: {
        width: 120,
        height: 30,
        borderWidth: 3,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.silver,
        marginRight: 10
    },
    infoTxt: {
        fontSize: 18,
        color: colors.puprble
    },
    timeTxt: {
        fontSize: 15,
    }
})