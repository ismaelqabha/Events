

import { StyleSheet, Text, View, Pressable, Modal, ScrollView,Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';




const ClientShowRequest = (props) => {
    const { } = useContext(SearchContext);
    const { reqInfo } = props.route?.params || {}

    const [showModal, setShowModal] = useState(false);
    const [showMoreModal, setShowMoreModal] = useState(false);

    //console.log("reqInfo", reqInfo.reservationDetail[0].campaigns);


    const getSerDetail = (id) => {
        const serviceData = reqInfo.services[0].additionalServices.filter(element => {
            return element.subDetailArray.find(itemId => {
                return itemId.id === id
            })
        })

        return serviceData
    }

    const getSerSubDet = (id) => {
        const data = getSerDetail(id)
        const subDetInfo = data[0].subDetailArray.filter(item => {
            return item.id === id
        })
        return subDetInfo
    }


    const filterSelectedCampign = (id) => {
        const data = reqInfo.relatedCamp
        return data?.filter(item => {
            return item.CampId === id;
        });
    }


    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const onOfferPress = () => {
        setShowModal(true)
    }

    const showOfferDetail = (contentFromSubDet, campContents) => {
        return <View style={styles.contentView}>
            {contentFromSubDet.map(itemID => {
                const titleInfo = getSerSubDet(itemID)
                return (
                    <View style={styles.contentItem}>
                        <Text style={styles.itemtxt}>{titleInfo[0].detailSubtitle}</Text>
                        <View style={styles.IconView}>
                            <AntDesign
                                style={{ alignSelf: 'center' }}
                                name={"checksquareo"}
                                color={colors.puprble}
                                size={30} />
                        </View>
                    </View>
                )
            })}
            {campContents.map(content => {
                return (
                    <View style={styles.contentItem}>
                        <Text style={styles.itemtxt}>{content.contentItem}</Text>
                        <View style={styles.IconView}>
                            <AntDesign
                                style={{ alignSelf: 'center' }}
                                name={"checksquareo"}
                                color={colors.puprble}
                                size={30} />
                        </View>
                    </View>
                )
            })}
        </View>
    }
    const offerDetailModal = (contentFromSubDet, campContents) => {
        return (
            <Modal
                transparent
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderTxt}> مكونات العرض </Text>
                        </View>

                        <View style={styles.modalbody}>
                            <ScrollView>{showOfferDetail(contentFromSubDet, campContents)}</ScrollView>
                        </View>

                        <Pressable style={styles.Modalbtn} onPress={() => setShowModal(false)}>
                            <Text>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }
    const moreModal = () => {
        return (
            <Modal
                transparent
                visible={showMoreModal}
                animationType='slide'
                onRequestClose={() => setShowMoreModal(false)}>
                <View style={styles.centeredMoreView}>
                    <View style={styles.moreModal}>

                        <Pressable style={styles.modalHeader} onPress={() => setShowMoreModal(false)}>
                            <Text style={styles.modalHeaderTxt}>...</Text>
                        </Pressable>

                        <View style={styles.modalbody}>
                            {moreOperation()}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const moreOperation = () => {
        if (reqInfo.ReqStatus === 'waiting reply') {
            return (
                <View>
                    <Pressable style={styles.moreItem}>
                        <Text style={styles.moreTxt}>تعديل</Text>
                    </Pressable>

                    <Pressable style={styles.moreItem}>
                        <Text style={styles.moreTxt}>اِلغاء الحجز</Text>
                    </Pressable>
                </View>
            )
        }
        if (reqInfo.ReqStatus === 'waiting pay') {
            return (
                <View>
                    <Pressable style={styles.moreItem}>
                        <Text style={styles.moreTxt}>اِجراء عملية دفع</Text>
                    </Pressable>
                    <Pressable style={styles.moreItem}>
                        <Text style={styles.moreTxt}>تعديل</Text>
                    </Pressable>
                </View>
            )
        }
        if (reqInfo.ReqStatus === 'paid') {
            return (
                <View>
                    <Pressable style={styles.moreItem}>
                        <Text style={styles.moreTxt}>اِجراء عملية دفع</Text>
                    </Pressable>
                </View>
            )
        }
    }
    const moreModalPress = () => {
        setShowMoreModal(true)
    }


    const header = () => {
        return (
            <View style={styles.head}>
                <Pressable onPress={onPressHandler}>
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                {/* <Text style={styles.headerText}>تفاصيل الحجز</Text> */}
                <Pressable onPress={moreModalPress}
                >
                    <Fontisto
                        style={styles.icon}
                        name={"more-v"}
                        color={"black"}
                        size={20} />
                </Pressable>
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
            <View>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Pressable //onPress={showDetaiPress} 
                    >
                        <Image style={styles.iconImg} source={require('../assets/photos/invoice.png')} />
                    </Pressable>
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
            </View>
        )
    }
    const renderReqTime = (item) => {
        return (
            <View>
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
            {reqInfo.services[0].servType === 'قاعات' && renderInviters(item)}
        </View>
        )
    }
    const renderInviters = (item) => {
        return (
            <View>
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
        return reqInfo.services[0].additionalServices.map(item => {

            return data.subDetailId.map(subItem => {

                return item.subDetailArray.map(elem => {

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
            return (<View>
                <Pressable style={styles.dateview}
                    onPress={() => onOfferPress()}
                >
                    <Text style={styles.dateTxt}>{data[0].campTitle}</Text>
                    <View style={styles.IconView}>
                        <AntDesign
                            name={"checkcircle"}
                            color={colors.puprble}
                            size={20} />
                    </View>
                </Pressable>
                {offerDetailModal(data[0].contentFromSubDet, data[0].campContents)}
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
        return (<View style={styles.ContentView}>
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
                {moreModal()}
            </ScrollView>
        </View>
    )
}

export default ClientShowRequest

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        //borderWidth: 1
    },
    icon: {
        //marginLeft: 10,
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
    detailModal: {
        width: '95%',
        height: 350,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40,
    },
    modalHeaderTxt: {
        fontSize: 18
    },
    Modalbtn: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        height: 40
    },
    modalbody: {
        paddingHorizontal: 5
    },
    contentItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 30,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10
    },
    contentView: {
        marginVertical: 5,
        // borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray'
    },
    moreModal: {
        width: '95%',
        height: 120,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    centeredMoreView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    moreItem: {
        alignSelf: 'center',
        marginVertical: 5,
    },
    moreTxt: {
        fontSize: 18
    },
    iconImg: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        width: 30,
        height: 30
    },
})