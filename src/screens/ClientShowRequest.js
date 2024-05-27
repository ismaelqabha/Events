

import { StyleSheet, Text, View, Pressable, Modal, ScrollView, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import { calculateTotalPrice } from '../resources/Functions';
import Recipt from '../components/ProviderComponents/recipt';
import { deleteRequestbyId, updateEvent } from '../resources/API';
import { ScreenNames } from '../../route/ScreenNames';




const ClientShowRequest = (props) => {
    const { totalPrice, setTotalPrice, setRequestInfoAccUser, eventInfo, setEventInfo, requestInfoAccUser } = useContext(SearchContext);
    const { reqInfo } = props.route?.params || {}

    const [showModal, setShowModal] = useState(false);
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [showDetailRecipt, setShowDetailRecipt] = useState(false)

    const eventItemIndex = eventInfo?.findIndex(item => item.EventId === reqInfo.eventData.EventId)

    const queryRequest = () => {
        if (requestInfoAccUser.message !== "no Request") {
            const clientReq = requestInfoAccUser.filter(item => {
                return item.requestInfo.ReqEventId == reqInfo.eventData.EventId;
            })
            return clientReq
        } else {
            return []
        }
    }

    const eventDatesArr = reqInfo.eventData.eventDate




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

    const callDeleteReqFunc = () => {
        deleteRequestbyId({ RequestId: reqInfo.RequestId }).then(res => {

            // setRequestInfoAccUser(res)

            updateEventData()
            setShowMoreModal(false)
            props.navigation.navigate(ScreenNames.ClientHomeAds)

        })
    }
    const deleteReqPress = () => {
        Alert.alert(
            'تأكيد',
            'هل انت متأكد من حذف الطلب ؟ ',
            [
                {
                    text: 'الغاء الامر',
                    onPress: () => setShowMoreModal(false),
                    style: 'cancel',
                },
                {
                    text: 'حذف',
                    onPress: () => callDeleteReqFunc(),
                    style: 'destructive', // Use 'destructive' for a red-colored button
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );

    }
    const checkEventDateHasMoreThanOneReq = () => {
        const allRequests = queryRequest()
        if (reqInfo.reservationDetail.length > 1) {
            const multi = reqInfo.reservationDetail.map(item => {


                const result = allRequests.filter(allreq => {

                    // console.log("all requset", allreq.requestInfo.reservationDetail);
                    // console.log(">>>current req>>>>", reqInfo.reservationDetail);

                    if (allreq.requestInfo.reservationDetail.length > 1) {
                        return allreq.requestInfo.reservationDetail.find(morethanOne => {
                            // console.log(morethanOne.reservationDate, item.reservationDate, morethanOne.reservationDate.includes(item.reservationDate));
                            return morethanOne.reservationDate.includes(item.reservationDate)
                        })
                    } else {
                        // console.log(allreq.requestInfo.reservationDetail[0].reservationDate, item.reservationDate, allreq.requestInfo.reservationDetail[0].reservationDate.includes(item.reservationDate));
                        return allreq.requestInfo.reservationDetail[0].reservationDate.includes(item.reservationDate)
                    }
                })

                if (result.length === 1) {
                    eventDatesArr.pop(item.reservationDate)
                }
                // console.log("result", result, result.length);

                return result
            })
            return multi

        } else {
            const single = allRequests.filter(item => {


                if (item.requestInfo.reservationDetail.length > 1) {
                    return item.requestInfo.reservationDetail.find(multiDate => {
                        // console.log(multiDate.reservationDate, reqInfo.reservationDetail[0].reservationDate, multiDate.reservationDate.includes(reqInfo.reservationDetail[0].reservationDate));
                        return multiDate.reservationDate.includes(reqInfo.reservationDetail[0].reservationDate)
                    })

                } else {
                    // console.log(item.requestInfo.reservationDetail[0].reservationDate, reqInfo.reservationDetail[0].reservationDate, item.requestInfo.reservationDetail[0].reservationDate.includes(reqInfo.reservationDetail[0].reservationDate));

                    return item.requestInfo.reservationDetail[0].reservationDate.includes(reqInfo.reservationDetail[0].reservationDate)
                }
            })

            if (single.length === 1) {
                eventDatesArr.pop(reqInfo.reservationDetail[0].reservationDate)
            }
            // console.log("single", single, single.length);
            return single
        }

    }
    const updateEventData = () => {

        checkEventDateHasMoreThanOneReq()

        const lastTotal = reqInfo.eventData.eventCost - reqInfo.Cost

        const editEventItem = {
            EventId: reqInfo.eventData.EventId,
            eventDate: eventDatesArr,
            eventCost: lastTotal,
            eventTitleId: reqInfo.eventData.eventTitleId
        }

        updateEvent(editEventItem).then(res => {
            const ev = eventInfo || [];
            if (eventItemIndex > -1) {
                ev[eventItemIndex] = editEventItem;
            }
            setEventInfo([...ev, editEventItem])
        })
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

    useEffect(() => {
        calculateTotalPrice(reqInfo.reservationDetail, reqInfo.reservationDetail.reservationDate, reqInfo.services, setTotalPrice);
    }, [reqInfo.reservationDetail.reservationDate, reqInfo.reservationDetail]);


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
                <View style={styles.moreChoice}>
                    <Pressable style={styles.moreItem} onPress={deleteReqPress}>
                        <AntDesign
                            name={"delete"}
                            color={"black"}
                            size={30} />
                        <Text style={styles.moreTxt}>اِلغاء الحجز</Text>
                    </Pressable>

                    <Pressable style={styles.moreItem}>
                        <Feather
                            name={"edit"}
                            color={"black"}
                            size={30} />
                        <Text style={styles.moreTxt}>تعديل</Text>
                    </Pressable>
                </View>
            )
        }
        if (reqInfo.ReqStatus === 'waiting pay') {
            return (
                <View style={styles.moreChoice}>
                    <Pressable style={styles.moreItem}>
                        <MaterialIcons
                            name={"payment"}
                            color={"black"}
                            size={30} />
                        <Text style={styles.moreTxt}>اِجراء عملية دفع</Text>
                    </Pressable>
                    <Pressable style={styles.moreItem}>
                        <Feather
                            name={"edit"}
                            color={"black"}
                            size={30} />
                        <Text style={styles.moreTxt}>تعديل</Text>
                    </Pressable>
                </View>
            )
        }
        if (reqInfo.ReqStatus === 'paid') {
            return (
                <View>
                    <Pressable style={styles.moreItem}>
                        <MaterialIcons
                            name={"payment"}
                            color={"black"}
                            size={30} />
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
    const isRequestWaitingPayForPaymentInfo = (item) => {
        if (reqInfo.paymentInfo.length > 0) {
            return (<View>
                <Text style={styles.labelText}>تفاصيل الدفعات</Text>
                <View style={styles.ContentView}>{renderPaymentInfo(item)}</View>
            </View>)
        }
    }
    const renderPaymentInfo = () => {
        return reqInfo.paymentInfo.map(item => {
            return (
                <View >
                    <View style={styles.dateview}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',width: '80%'}}>
                            <Text style={styles.dateTxt}>{item.PayDate}</Text>
                            <Text style={styles.dateTxt}>{item.pers}</Text>
                        </View>
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
        return (<View style={styles.ContentView}>
            {renderReqDate(reqInfo.reservationDetail[0])}
            {renderReqTime(reqInfo.reservationDetail[0])}
            {isHall(reqInfo.reservationDetail[0])}
            {isSelectedFromDetail(reqInfo.reservationDetail[0])}
            {isSelectedFromCampign(reqInfo.reservationDetail[0])}
        </View>)
    }



    useEffect(() => {
        calculateTotalPrice(reqInfo.reservationDetail, reqInfo.reservationDetail.reservationDate, reqInfo.services, setTotalPrice);
    }, [reqInfo.reservationDetail.reservationDate, reqInfo.reservationDetail]);

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderSendingReqDate()}

                {reqInfo.reservationDetail.length > 1 ? renderMultibleDatesRequest() : renderSingleDateRequest()}

                {/* {renderfinalCost()} */}
                <Recipt
                    totalPrice={totalPrice}
                    requestedDate={reqInfo.reservationDetail.reservationDate}
                    resDetail={reqInfo.reservationDetail}
                    showDetailRecipt={showDetailRecipt}
                    setShowDetailRecipt={setShowDetailRecipt}
                    data={reqInfo.services}
                />

                {isRequestWaitingPayForPaymentInfo()}
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
        width: '95%',
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
        // borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center'

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
    moreChoice: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderWidth: 1
    }
})