import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, TouchableOpacity, Dimensions, Modal } from 'react-native';
import React, { useState, useContext, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import moment from 'moment';

const RequestDetail = (props) => {
    // const { requestedDate } = props

    const { cat, setResDetail, resDetail, requestedDate } = useContext(SearchContext);
    const resivedDate = moment(requestedDate).format('L')
    const [selectTime, setSelectTime] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [startTimeText, setstartTimeText] = useState()
    const [endTimeText, setendTimeText] = useState()
    const [invitersValue, setInvitersValue] = useState('');
    const [offer, setOffer] = useState();

    const [invitersValueError, setInvitersValueError] = useState(false);


    const [selectedSupDet, setSelectedSupDet] = useState([]);
    const [detailViewPressed, setDetailViewPressed] = useState(false);
    const [campaignViewPressed, setCampaignViewPressed] = useState(false);
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const showStartMode = (currentMode) => {
        setShowStart(true);
        setMode(currentMode);
    }
    const showEndMode = (currentMode) => {
        setShowEnd(true);
        setMode(currentMode);
    }
    const onStartTimeChange = (event, selectedDate) => {
        setShowStart(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let startTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        // if (startTime < endTimeText && endTimeText != '00:00') {
        updateReservationDet(startTime, 'startingTime')
        setstartTimeText(startTime);
        // } else {
        //     console.log("Not valid time");
        // }

    }

    const onEndTimeChange = (event, selectedDate) => {
        setShowEnd(false)
        const currentDate = selectedDate || date1;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let endTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        if (endTime > startTimeText) {
            setendTimeText(endTime);
            updateReservationDet(endTime, 'endTime')
        } else {
            console.log("Not valid time");
        }
    }

    const checkStrings = val => {
        if (!val) {
            return false;
        } else if (val.trim().length <= 0) {
            return false;
        }
        return true;
    };

    const missingData = () => {
        checkStrings(invitersValue) ? showMissingInviters() : null;
    };

    useEffect(() => {
        setInvitersValueError(!checkStrings(invitersValue));

    }, [invitersValue]);

    useEffect(() => {
        newReservationDetail()

    }, [])

    const showMissingInviters = () => { };



    const newReservationDetail = () => {
        const resDetailForOneDate = {
            reservationDate: resivedDate,
            startingTime: null,
            EndTime: null,
            numOfInviters: null,
            subDetailId: [],
            offerId: null
        }
        setResDetail([...resDetail, resDetailForOneDate])
    }

    /**
     * Update function.
     * @param {'startingTime' | 'endTime' | 'invited' | 'subDetail' | 'offerId'} type - The type of update.
     */
    const updateReservationDet = (val, type) => {
        const detailIndex = resDetail.findIndex(item => item.reservationDate == resivedDate)
        if (detailIndex == -1) {
            return
        }
        const detail = resDetail
        switch (type) {
            case 'startingTime':
                detail[detailIndex].startingTime = val
                setResDetail([...detail])
                break;
            case 'endTime':
                detail[detailIndex].EndTime = val
                setResDetail([...detail])
                break;
            case 'invited':
                detail[detailIndex].numOfInviters = val
                setResDetail([...detail])
                break;
            case 'subDetail':
                const subDetailes = detail[detailIndex].subDetailId
                const index = subDetailes.findIndex((id) => id === val)
                index === -1 ? detail[detailIndex].subDetailId.push(val) :
                    detail[detailIndex].subDetailId = detail[detailIndex].subDetailId.slice(index, 1)
                setResDetail([...detail])
                break;
            case 'offerId':
                detail[detailIndex].offerId = val
                setResDetail([...detail])
                break;

            default:
                break;
        }
    }

    const addSubDetail = (id) => {
        const selectedSubDetail = {
            subD_id: id
        }
        const sub = resDetail
        let index = sub.findIndex(val => val.reservationDate == resivedDate)
        console.log("sub", sub);
        sub[index].subDetailId.push(selectedSubDetail)
        console.log("subDetailId", subDetailId);
    }



    const detailPress = () => {
        setDetailViewPressed(true)
        setCampaignViewPressed(false)
        setShowModal(true)
    }
    const campaignPress = () => {
        setDetailViewPressed(false)
        setCampaignViewPressed(true)
    }
    const handleClosePress = () => {
        setDetailViewPressed(false)
        setCampaignViewPressed(false)
        setShowModal(false)
    }
    const onInvitersInputChange = (val) => {
        setInvitersValue(val)
        updateReservationDet(val, 'invited')
    }
    const whenSupDetailPress = (SubId, setSelectedSubDetail, selectedSubDetail) => {

        if (selectedSubDetail) {
            setSelectedSubDetail(false)
            updateReservationDet(SubId, 'subDetail')

        } else {
            setSelectedSubDetail(true)
            updateReservationDet(SubId, 'subDetail')
        }
    }
    const checkStartTime = () => {
        showStartMode('time')
        if (startTimeText != "00:00") {
            //setSelectTime(true)
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء اختيار وقت بداية الحجز',
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    },
                ],
                { cancelable: false } // Prevent closing the alert by tapping outside
            );
        }
    }
    const checkEndTime = () => {
        showEndMode('time')
        if (endTimeText != "00:00") {
            //setSelectTime(true)
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء اختيار وقت بداية الحجز',
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    },
                ],
                { cancelable: false } // Prevent closing the alert by tapping outside
            );
        }
    }
    const renderReservStartingTime = () => {
        return <View>
            <Pressable onPress={() => checkStartTime()}
            >
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{startTimeText || "00:00"}</Text>
                    <Image
                        style={styles.icoon}
                        source={require('../assets/photos/time.png')}
                    />
                </View>
            </Pressable>
            {showStart && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='clock'
                    onChange={onStartTimeChange}
                />
            )}
        </View>
    }
    const renderReservEndingTime = () => {
        return <View>
            <Pressable onPress={() => checkEndTime()}
            >
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{endTimeText || "00:00"}</Text>
                    <Image
                        style={styles.icoon}
                        source={require('../assets/photos/time.png')}
                    />
                </View>
            </Pressable>
            {showEnd && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='clock'
                    onChange={onEndTimeChange}
                />
            )}
        </View>
    }
    const CatOfService = {
        'قاعات': [{
            style: styles.input,
            placeholder: 'ادخل عدد المدعوين',
        }],
        'تصوير': [{
            style: styles.input,
            placeholder: 'ادخل عدد الكاميرات',
        }],
        'Makeup': [{
            style: styles.input,
            placeholder: 'ادخل عدد الايام',
        }],
        'شيف': [{
            style: styles.input,
            placeholder: 'ادخل عدد الايام',
        }],
        'تصفيف شعر': [{
            style: styles.input,
            placeholder: 'ادخل عدد الايام',
        }],
        'بطاقات دعوة': [
            {
                style: styles.input,
                placeholder: 'ادخل عدد النسخ',
            },
            {
                style: styles.input,
                placeholder: 'نص البطاقة',
            }
        ],
        'حلويات': [{
            style: styles.input,
            placeholder: 'ادخل الكمية',
        }]
    }
    const renderInput = () => {
        return CatOfService[cat].map(type => {
            return (<TextInput style={styles.input}
                {...type}
                value={invitersValue}
                onChangeText={val => onInvitersInputChange(val)} />)
        })
    }
    const renderInviters = () => {
        return (
            <View style={styles.invitView}>
                {invitersValueError && (
                    <Text style={styles.textRequired}>*</Text>
                )}
                {renderInput()}
            </View>
        )
    }

    const renderServiceDetail = () => {

        const detail = props.additionalServices
        return detail.map(element => {
            return (<View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailText}>{element.detailTitle}</Text>
                </View>
                {element.subDetailArray.map(item => {
                    const [selectedSubDetail, setSelectedSubDetail] = useState(false);
                    return (
                        <View style={styles.subDetail}>
                            <Text style={styles.subDetText}>{item.detailSubtitle}</Text>
                            <Pressable style={styles.subPressable} onPress={() => whenSupDetailPress(item.subDetail_Id, setSelectedSubDetail, selectedSubDetail)}>
                                {selectedSubDetail && <Entypo
                                    style={{ alignSelf: 'center' }}
                                    name={"check"}
                                    color={colors.BGScereen}
                                    size={30} />}
                            </Pressable>
                        </View>
                    )
                })
                }
            </View>
            )
        })
    }
    const renderReservationDet = () => {
        return (
            <ScrollView style={styles.scroll} horizontal pagingEnabled>
                <View style={{ alignItems: 'center', backgroundColor: 'white', width: Dimensions.get('window').width, }}>
                    <View style={styles.serviceDetBooking}>
                        <Text style={styles.detailViewText}>الخدمات</Text>
                        {renderServiceDetail()}
                    </View>
                    <View style={styles.serviceDetBooking}>
                        <Text style={styles.detailViewText}>العروض</Text>
                        {/* {renderServiceDetail()} */}
                    </View>
                </View>
            </ScrollView>
        )
    }
    const renderModal = () => {
        return (
            <Modal
                transparent
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        {renderServiceDetail()}
                    </View>
                </View>
            </Modal>
        )
    }
    const renderDetail = () => {
        return (
            <View style={[styles.detailView, detailViewPressed ? styles.detailView : styles.pressDetailView]}>
                <TouchableOpacity onPress={detailPress}>
                    <Text style={styles.detailViewText}>تحديد التفاصيل</Text>
                </TouchableOpacity>
                {/* {detailViewPressed && */}
                <View style={{ flex: 1 }}>
                    {/* <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <ScrollView>
                                <DetailComp service_id={data.service_id} />
                            </ScrollView>
                        </View> */}
                    <TouchableOpacity onPress={handleClosePress} style={styles.closeView}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>اغلاق</Text>
                    </TouchableOpacity>
                </View>
                {/* } */}
            </View>
        )
    }
    const renderCampaighn = () => {
        return (
            <View style={[styles.detailView, campaignViewPressed ? styles.detailView : styles.pressDetailView]}>
                <TouchableOpacity onPress={campaignPress}>
                    <Text style={styles.detailViewText}>اختيار احد العروض</Text>
                </TouchableOpacity>
                {campaignViewPressed &&
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>

                        </View>
                        <TouchableOpacity onPress={handleClosePress} style={styles.closeView}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>اغلاق</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
    const renderNextBack = () => {
        return (
            <View style={styles.nextBackView}>
                <Pressable style={styles.backView} >
                    <Text style={styles.nextBackText}>رجوع</Text>
                </Pressable>
                <Pressable style={styles.nextView} onPress={() => newReservationDetail()}>
                    <Text style={styles.nextBackText} >التالي</Text>
                </Pressable>
            </View>
        )
    }
    const renderSaveButton = () => {
        return (
            <View style={styles.SaveView}>
                <Pressable style={styles.nextView} onPress={() => newReservationDetail()}>
                    <Text style={styles.nextBackText}>حفظ</Text>
                </Pressable>
            </View>
        )
    }
    console.log("requestedDate", requestedDate);
    const chooseButton = () => {
        if (Array.isArray(requestedDate) && requestedDate.length > 1) {
            {renderNextBack()}
        } else {
            {renderSaveButton()}
        }
    }

    const renderRequestInfo = () => {
        return <View style={styles.requestDetailView}>
            <View style={styles.Time}>
                {renderReservStartingTime()}
                <Text style={styles.subDetText}>من الساعة</Text>
            </View>
            <View style={styles.Time}>
                {renderReservEndingTime()}
                <Text style={styles.subDetText}>الى الساعة</Text>
            </View>
            {renderInviters()}
            {renderReservationDet()}
            {chooseButton()}

        </View>
    }

    return (
        <View >
            {renderRequestInfo()}
            {/* {renderModal()} */}
        </View>
    )
}

export default RequestDetail

const styles = StyleSheet.create({
    requestDetailView: {
        backgroundColor: colors.puprble,
        marginVertical: 2.5,
        width: '100%',
        padding: 10
    },
    scroll: {
        // flex: 1,
        // height: 300,
        // width: '100%'
    },
    serviceDetBooking: {
        width: '90%',
        height: 300,
        // borderWidth: 1,
        // borderColor: 'lightgray',
        padding: 5,
        marginTop: 10,
        backgroundColor: colors.puprble
        //margin: 5
    },
    detailView: {
        width: '90%',
        height: 500,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center',

    },
    pressDetailView: {
        width: 350,
        height: 60,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center',
    },
    detailViewText: {
        fontSize: 18,
        color: colors.BGScereen,
        fontWeight: 'bold',
        //margin: 5,
    },
    detailText: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold',
    },
    subDetText: {
        fontSize: 15,
        color: colors.BGScereen,
        marginRight: 10
    },
    closeView: {
        height: 30,
        width: 80,
        borderRadius: 5,
        backgroundColor: '#ffff',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    invitersView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
    },
    invitView: {
        alignSelf: 'center',
        width: '90%',
    },
    input: {
        textAlign: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgray',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: colors.BGScereen,
        color: colors.puprble,
    },
    viewDate: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '70%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: colors.BGScereen,
        justifyContent: 'space-evenly',
        elevation: 5
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
    icoon: {
        width: 35,
        height: 35,
    },
    detailItem: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        height: 40,
        width: '100%',
        marginVertical: 10,
        justifyContent: 'center',
        paddingRight: 10,
        // elevation: 5,
        alignSelf: 'flex-end'

    },
    subDetail: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 5
    },
    subPressable: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: colors.BGScereen,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Time: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20
    },
    textRequired: {
        fontSize: 14,
        color: 'red',
        alignSelf: 'flex-end'
    },
    nextBackView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
        // borderWidth: 1
    },
    nextView: {
        width: 100,
        height: 40,
        borderWidth: 1.5,
        borderColor: colors.BGScereen,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    nextBackText: {
        fontSize: 15,
        color: colors.BGScereen
    },
    detailModal: {
        width: '100%',
        height: 400,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    SaveView: {
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-end'
    },

})