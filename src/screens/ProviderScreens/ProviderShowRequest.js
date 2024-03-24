import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import SearchContext from '../../../store/SearchContext';
import { colors } from '../../assets/AppColors';
import moment from "moment";
import ServiceProviderContext from '../../../store/ServiceProviderContext';


const ProviderShowRequest = (props) => {
    const { isFirst } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);
    const { reqInfo } = props.route?.params || {}

    const filterService = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === isFirst;
        });
    }
    const serviceData = filterService()

    const filterSerDetail = (id) => {
        return serviceData[0].additionalServices[0].subDetailArray?.filter(item => {
            return item.subDetail_Id === id;
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
    const renderSelectedSubDetail = () => {
        return reqInfo.reservationDetail[0].subDetailId.map(item => {
            const data = filterSerDetail(item)
            // console.log("dataaa", data.detailSubtitle);
            return data.map(subItem => {
                console.log("subItem", subItem.detailSubtitle);
                return (
                    <View style={styles.ContentView}>
                        <View style={styles.dateview}>
                            {/* <View style={{ alignItems: 'flex-end' }}> */}
                            <Text style={styles.dateTxt}>{subItem.detailSubtitle}</Text>
                            {/* </View> */}
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

        })

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
                {renderSelectedSubDetail()}
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
        fontSize: 20
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