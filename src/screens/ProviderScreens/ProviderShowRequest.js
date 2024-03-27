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
    
    // console.log("reqInfo", reqInfo);
    const [listSelectedDet, setListSelectedDet] = useState([])
    const subDetArray = []

    const filterService = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === isFirst;
        });
    }
    const serviceData = filterService()

    const filterSelectedCampign = (id) => {
        return campInfo?.filter(item => {
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
    const renderReqDate = () => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dateTxt}>{moment(reqInfo.reservationDetail[0].reservationDate).format('L')}</Text>
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
    const renderReqTime = () => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={styles.timeView}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.dateTxt}>{reqInfo.reservationDetail[0].EndTime}</Text>
                            <Text style={styles.labelDateTxt}>الى الساعة</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.dateTxt}>{reqInfo.reservationDetail[0].startingTime}</Text>
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
    const isHall = () => {
        return (<View>
            {serviceData[0].servType === 'قاعات' && renderInviters()}
        </View>
        )
    }
    const renderInviters = () => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dateTxt}>{reqInfo.reservationDetail[0].numOfInviters}</Text>
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

    const isSelectedFromDetail = () => {
        //console.log("l",reqInfo.reservationDetail[0].subDetailId.length);
        if (reqInfo.reservationDetail[0].subDetailId.length > 0) {
            return (<View>
                <Text style={styles.labelText}>الخدمات المختارة</Text>
                <View style={styles.ContentView}>{renderServiceDetail()}</View>
            </View>)
        }
    }

    const renderServiceDetail = () => {
        return serviceData[0].additionalServices.map(item => {
            return reqInfo.reservationDetail[0].subDetailId.map(subItem => {
                if (item.subDetailArray[0].subDetail_Id.includes(subItem)) {
                    return (
                        <View>
                            {/* <Text style={styles.dateTxt}>{item.detailTitle}</Text> */}
                            <View style={styles.dateview}>
                                <Text style={styles.dateTxt}>{item.subDetailArray[0].detailSubtitle}</Text>
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
    }
   

    const renderCampigns = () => {
        return reqInfo.reservationDetail[0].offerId.map(Offid => {
        
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
    const isSelectedFromCampign = () => {
        console.log("len", reqInfo.reservationDetail[0].offerId.length);
        if (reqInfo.reservationDetail[0].offerId.length > 0) {
            return (<View>
                <Text style={styles.labelText}>العروض المختارة</Text>
                <View style={styles.ContentView}>{renderCampigns()}</View>
            </View>)
        }
    }

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderSendingReqDate()}
                {renderReqDate()}
                {renderfinalCost()}
                {renderReqTime()}
                {isHall()}
                {isSelectedFromDetail()}
                {/* {isSelectedFromCampign()} */}
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
        //width: '90%',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-between'
    },
    icon: {
        //alignSelf: 'flex-start',
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