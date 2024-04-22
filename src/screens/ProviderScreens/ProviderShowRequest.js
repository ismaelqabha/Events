import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import SearchContext from '../../../store/SearchContext';
import { colors } from '../../assets/AppColors';
import moment from "moment";
import ServiceProviderContext from '../../../store/ServiceProviderContext';


const ProviderShowRequest = (props) => {
    const { isFirst, campInfo } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);
    const { reqInfo } = props.route?.params || {}

    const filterService = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === isFirst;
        });
    }
    const serviceData = filterService()

    const filterSelectedCampign = (id) => {
        const data = campInfo || []
        return data?.filter(item => {
                return item.CampId === id;
        });
    }


    const onPressHandler = () => {
        props.navigation.goBack();
    }


    const header = () => {
        return (
            <View style={styles.head}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.headerText}>تفاصيل الحجز</Text>
            </View>)
    }
    const renderSendingReqDate = () => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dateTxt}>{reqInfo.ReqDate}</Text>
                        <Text style={styles.labelDateTxt}>تاريخ طلب الحجز</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Fontisto
                            name={"date"}
                            color={colors.puprble}
                            size={20} />
                    </View>
                </View>
            </View>
        )
    }


    const renderReqDate = (item) => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dateTxt}>{moment(item.reservationDate).format('L')}</Text>
                        <Text style={styles.labelDateTxt}>تاريخ الحجز</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Fontisto
                            name={"date"}
                            color={colors.puprble}
                            size={20} />
                    </View>
                </View>
            </View>
        )
    }
    const renderfinalCost = () => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dateTxt}>{reqInfo.Cost}</Text>
                        <Text style={styles.labelDateTxt}>السعر</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Entypo
                            name={"price-tag"}
                            color={colors.puprble}
                            size={20} />
                    </View>
                </View>
            </View>
        )
    }
    const renderReqTime = (item) => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={styles.timeView}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.dateTxt}>{item.EndTime}</Text>
                            <Text style={styles.labelDateTxt}>الى الساعة</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.dateTxt}>{item.startingTime}</Text>
                            <Text style={styles.labelDateTxt}>من الساعة</Text>
                        </View>
                    </View>
                    <View style={styles.IconView}>
                        <Ionicons
                            name={"time"}
                            color={colors.puprble}
                            size={30} />
                    </View>
                </View>
            </View>
        )
    }
    const isHall = (item) => {
        return (<View>
            {serviceData[0].servType === 'قاعات' && renderInviters(item)}
        </View>
        )
    }
    const renderInviters = (item) => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dateTxt}>{item.numOfInviters}</Text>
                        <Text style={styles.labelDateTxt}>عدد المدعوين</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Ionicons
                            name={"people"}
                            color={colors.puprble}
                            size={20} />
                    </View>
                </View>
            </View>
        )
    }
    const isSelectedFromDetail = (item) => {
        if (item.subDetailId.length > 0) {
            return (<View>
                <Text style={styles.labelText}>الخدمات المختارة</Text>
                <View style={styles.ContentView}>{renderServiceDetail(item)}</View>
            </View>)
        }
    }
    const renderServiceDetail = (data) => {
        return serviceData[0].additionalServices.map(item => {
            return data.subDetailId.map(subItem => {
               
                return item.subDetailArray .map(elem =>{
                    if (elem.id === subItem) {
                        return (
                            <View>
                                
                                <View style={styles.dateview}>
                                    <Text style={styles.dateTxt}>{elem.detailSubtitle}</Text>
                                    <View style={styles.IconView}>
                                        <AntDesign
                                            name={"checkcircle"}
                                            color={colors.puprble}
                                            size={20} />
                                    </View>
                                </View>
                            </View>
                        )
                    }
                })
            })
        })
    }
    const isSelectedFromCampign = (item) => {
        if (item.offerId.length > 0) {
            return (<View>
                <Text style={styles.labelText}>العرض المختار</Text>
                <View style={styles.ContentView}>{renderCampigns(item)}</View>
            </View>)
        } else {
            return []
        }
    }
    const renderCampigns = (item) => {
        return item.offerId.map(Offid => {

            const data = filterSelectedCampign(Offid)
            return (
                <View>
                    <View style={styles.dateview}>
                        <Text style={styles.dateTxt}>{data[0].campTitle}</Text>
                        <View style={styles.IconView}>
                            <AntDesign
                                name={"checkcircle"}
                                color={colors.puprble}
                                size={20} />
                        </View>
                    </View>
                </View>
            )
        })
    }


    const renderMultibleDatesRequest = () => {
        return reqInfo.reservationDetail.map(item => {
            return (<View style={styles.ContentView}>
                {renderReqDate(item)}
                {renderReqTime(item)}
                {isHall(item)}
                {isSelectedFromDetail(item)}
                {isSelectedFromCampign(item)}
            </View>)
        })
    }

    const renderSingleDateRequest = () => {
        return (<View>
            {renderReqDate(reqInfo.reservationDetail[0])}
            {renderReqTime(reqInfo.reservationDetail[0])}
            {isHall(reqInfo.reservationDetail[0])}
            {isSelectedFromDetail(reqInfo.reservationDetail[0])}
            {isSelectedFromCampign(reqInfo.reservationDetail[0])}
        </View>)
    }


    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderSendingReqDate()}

                {reqInfo.reservationDetail.length > 1 ? renderMultibleDatesRequest() : renderSingleDateRequest()}

                {renderfinalCost()}
            </ScrollView>
        </View>
    )
}

export default ProviderShowRequest

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-between'
    },
    icon: {

        marginLeft: 10,
    },
    headerText: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 10
    },
    ContentView: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.silver,
        borderRadius: 10,
        elevation: 5,
        marginVertical: 10
    },
    dateview: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 10
    },
    timeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%'
    },
    dateTxt: {
        color: colors.puprble,
        fontSize: 20,

    },
    labelText: {
        color: colors.puprble,
        fontSize: 20,
        marginRight: 20
    },
    labelDateTxt: {
        fontSize: 15
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BGScereen,
        borderRadius: 30,
        marginLeft: 15
    },
})