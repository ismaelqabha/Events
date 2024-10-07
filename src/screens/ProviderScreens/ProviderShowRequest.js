import { StyleSheet, Text, View, Pressable, Modal, ScrollView, Alert, ToastAndroid, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SearchContext from '../../../store/SearchContext';
import { colors } from '../../assets/AppColors';
import moment from "moment";
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { updateRequest } from '../../resources/API';
import { images } from '../../assets/photos/images';
import PaymentDetailComp from '../../components/PaymentDetailComp';
import Recipt from '../../components/ProviderComponents/recipt';


const ProviderShowRequest = (props) => {
    const { isFirst, campInfo, setRequestInfoByService, requestInfoByService } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);

    const { reqInfo, fromProviderDuePay, fromRequestCard } = props.route?.params || {}
    const [showModal, setShowModal] = useState(false);
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const [showDetailRecipt, setShowDetailRecipt] = useState(false)


    const totalCost = reqInfo.requestInfo.Cost
    const reservationDetail = reqInfo.requestInfo.reservationDetail
   

    const filterService = () => {
        return serviceInfoAccorUser?.filter(item => {
            console.log(item.service_id, isFirst);
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

    const getSerDetail = (id) => {
        const serData = serviceData[0].additionalServices.filter(element => {
            return element.subDetailArray.find(itemId => {
                return itemId.id === id
            })
        })
        return serData
    }

    const getSerSubDet = (id) => {
        const data = getSerDetail(id)
        const subDetInfo = data[0].subDetailArray.filter(item => {
            return item.id === id
        })
        return subDetInfo
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
        if (reqInfo.requestInfo.ReqStatus === 'waiting reply') {
            return (
                <View style={styles.moreChoice}>
                    <Pressable style={styles.moreItem} onPress={onRefuseReqPress}>
                        <Image style={{ width: 40, height: 40 }} source={images.refuse} />
                        <Text style={styles.moreTxt}>رفض</Text>
                    </Pressable>

                    <Pressable style={styles.moreItem} onPress={onAcceptReqPress}>
                        <Image style={{ width: 40, height: 40 }} source={images.accept} />
                        <Text style={styles.moreTxt}>قبول</Text>
                    </Pressable>
                </View>
            )
        }
        if (reqInfo.requestInfo.ReqStatus === 'waiting pay') {
            return (
                <View style={styles.moreChoice}>

                    <Pressable style={styles.moreItem}>
                        <AntDesign
                            name={"delete"}
                            color={colors.puprble}
                            size={30} />
                        <Text style={styles.moreTxt}>اِلغاء الطلب</Text>
                    </Pressable>

                    <Pressable style={styles.moreItem}>
                        <MaterialIcons
                            name={"payment"}
                            color={colors.puprble}
                            size={30} />
                        <Text style={styles.moreTxt}>اِجراء عملية دفع</Text>
                    </Pressable>
                </View>
            )
        }
        if (reqInfo.requestInfo.ReqStatus === 'paid') {
            return (
                <View>
                    <Pressable style={styles.moreItem}>
                        <MaterialIcons
                            name={"payment"}
                            color={colors.puprble}
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

    const onAcceptReqPress = () => {
        Alert.alert(
            'تأكيد',
            'هل انت متأكد من قبول طلب الحجز ؟ ',
            [
                {
                    text: 'لا',
                    style: 'cancel',
                },
                {
                    text: 'نعم',
                    onPress: () => onAcceptPress(),
                    style: 'destructive', // Use 'destructive' for a red-colored button
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    }
    const onRefuseReqPress = () => {
        Alert.alert(
            'تأكيد',
            'هل انت متأكد من رفض طلب الحجز ؟ ',
            [
                {
                    text: 'لا',
                    style: 'cancel',
                },
                {
                    text: 'نعم',
                    onPress: () => refuse(),
                    style: 'destructive', // Use 'destructive' for a red-colored button
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    }
    const refuse = () => {

        const newData = {
            RequestId: reqInfo.requestInfo.RequestId,
            ReqStatus: 'refuse'
        }
        updateInfo(newData)
        setShowMoreModal(false)
    }
    const updateInfo = (infoData) => {
        const requestInfoAccServiceIndex = requestInfoByService?.findIndex(item => item.requestInfo.RequestId === reqInfo.requestInfo.RequestId)

        updateRequest(infoData).then(res => {
            if (res.message === 'Updated Sucessfuly') {
                const data = requestInfoByService || [];
                if (requestInfoAccServiceIndex > -1) {
                    data[requestInfoAccServiceIndex] = { ...data[requestInfoAccServiceIndex], ...infoData };
                }
                setRequestInfoByService([...data])

                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })
    }



    //// set the payments Info
    const renderPaymentDetail = () => {
        return (
            <View>
                <PaymentDetailComp reqInfo={reqInfo} setShowPaymentModal={setShowPaymentModal} />
            </View>

        )
    }
    const renderModal = () => {
        return (
            <Modal
                transparent
                visible={showPaymentModal}
                animationType="slide"
                onRequestClose={() => setShowPaymentModal(false)}>
                <View style={styles.centeredPaymentView}>
                    <View style={styles.detailPaymentModal}>

                        {renderPaymentDetail()}
                    </View>
                </View>
            </Modal>
        )
    }
    const onAcceptPress = () => {
        setShowPaymentModal(true)
        setShowMoreModal(false)
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
                {fromProviderDuePay == undefined &&
                    <Pressable onPress={moreModalPress} style={styles.moreBtnPress}>
                        <Fontisto
                            style={styles.icon}
                            name={"more-v"}
                            color={"black"}
                            size={20} />
                    </Pressable>}
            </View>)
    }
    const renderSendingReqDate = () => {
        return (
            <View style={styles.ContentView}>
                <View style={styles.dateview}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dateTxt}>{reqInfo.requestInfo.ReqDate}</Text>
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
                <View style={styles.dateview}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.dateTxt}>{reqInfo.requestInfo.Cost}</Text>
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
            {serviceData[0].servType === 'قاعات' && renderInviters(item)}
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
        return serviceData[0].additionalServices.map(item => {
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
            return (
                <View>
                    <Pressable style={styles.dateview} onPress={() => onOfferPress()}>
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

    ///// for showing Request Information detail
    const isRequestWaitingPayForPaymentInfo = () => {
        if (reqInfo.requestInfo.paymentInfo.length > 0) {
            return (<View>
                <Text style={styles.labelText}>تفاصيل الدفعات</Text>
                <View style={styles.ContentView}>{renderPaymentInfo()}</View>
            </View>)
        }
    }
    const renderPaymentInfo = () => {

        return reqInfo.requestInfo.paymentInfo.map(item => {
            const amount = calculatePersentage(item.pers)
            return (
                <View >
                    <View style={styles.dateview}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>
                            <Text style={styles.dateTxt}>{item.PayDate}</Text>
                            <Text style={styles.dateTxt}>{amount}</Text>
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
    const calculatePersentage = (persentage) => {

        const ReqPrice = reqInfo.requestInfo.Cost
        const fact = ReqPrice * persentage
        const realAmount = fact / 100

        return realAmount
    }


    const renderMultibleDatesRequest = () => {
        return reqInfo.requestInfo.reservationDetail.map(item => {
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
            {renderReqDate(reqInfo.requestInfo.reservationDetail[0])}
            {renderReqTime(reqInfo.requestInfo.reservationDetail[0])}
            {isHall(reqInfo.requestInfo.reservationDetail[0])}
            {isSelectedFromDetail(reqInfo.requestInfo.reservationDetail[0])}
            {isSelectedFromCampign(reqInfo.requestInfo.reservationDetail[0])}
        </View>)
    }
    // console.log("fromProviderDuePay", fromProviderDuePay);

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderSendingReqDate()}

                {reqInfo.requestInfo.reservationDetail.length > 1 ? renderMultibleDatesRequest() : renderSingleDateRequest()}

                <Recipt
                    totalPrice={totalCost}
                    requestedDate={reservationDetail.reservationDate}
                    resDetail={reservationDetail}
                    showDetailRecipt={showDetailRecipt}
                    setShowDetailRecipt={setShowDetailRecipt}
                    data={serviceData}
                />
                {/* {renderfinalCost()} */}
                {isRequestWaitingPayForPaymentInfo()}
                {fromProviderDuePay == undefined && moreModal()}
                {renderModal()}

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
        height: 60,
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
    },
    icon: {

    },
    moreBtnPress: {
        width: 50,
        height: 50,
        alignItems: 'flex-end',
        justifyContent: 'center'
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
    contentView: {
        marginVertical: 5,
        // borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray'
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
    detailPaymentModal: {
        width: '90%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius : 20,
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
    },
    centeredPaymentView: {
        flex: 1,
        justifyContent: 'flex-end',
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
        //  marginVertical: 5,
        alignItems: 'center'
    },
    moreChoice: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderWidth: 1
    },
    moreTxt: {
        fontSize: 18
    },
})