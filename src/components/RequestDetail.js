import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";

const RequestDetail = (props) => {
    // const { data } = props?.route.params
    const { TimeText, setTimeText, cat } = useContext(SearchContext);
    const [textValue, setTextValue] = useState('');
    const SubDetailArray = []
    const [selectedSupDet, setSelectedSupDet] = useState([]);
    const [detailViewPressed, setDetailViewPressed] = useState(false);
    const [campaignViewPressed, setCampaignViewPressed] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        setTimeText(fTime);

    }
    const checkavailblity = () => {
        showMode('time')
        if (TimeText != "00:00") {
            setSelectTime(true)
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء اختيار الوقت الزمني للحجز',
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

    const detailPress = () => {
        setDetailViewPressed(true)
        setCampaignViewPressed(false)
    }
    const campaignPress = () => {
        setDetailViewPressed(false)
        setCampaignViewPressed(true)
    }
    const handleClosePress = () => {
        setDetailViewPressed(false)
        setCampaignViewPressed(false)
    }
    const whenSupDetailPress = (item, SubId, setSelectedSubDetail, selectedSubDetail) => {
        const SubDetail = item
        if (selectedSubDetail) {
            setSelectedSubDetail(false)
            // SubDetail.pop(SubId)
            // setSelectedSupDet([...SubDetail])
        } else {
            setSelectedSubDetail(true)
            // SubDetail.push(SubId)
            // setSelectedSupDet([...SubDetail])
        }
    }

    const renderSetTime = () => {
        return <View>
            <Pressable onPress={() => checkavailblity()} >
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{TimeText || "00:00"}</Text>
                    <Image
                        style={styles.icoon}
                        source={require('../assets/photos/time.png')}
                    />
                </View>
            </Pressable>
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='clock'
                    onChange={onChange}
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
            return (<TextInput
                {...type}
                value={textValue}
                onChangeText={setTextValue} />)
        })
    }
    const renderInviters = () => {
        return (
            <View style={styles.invitView}>
                {renderInput()}
            </View>
        )
    }

    const renderServiceDetail = () => {

        const detail = props.additionalServices
        return detail.map(element => {
            return (<View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailViewText}>{element.detailTitle}</Text>
                </View>
                {element.subDetailArray.map(item => {
                    const [selectedSubDetail, setSelectedSubDetail] = useState(false);
                    return (
                        <View style={styles.subDetail}>
                            <Text style={styles.subDetText}>{item.detailSubtitle}</Text>
                            <Pressable style={styles.subPressable} onPress={() => whenSupDetailPress(item, item.subDetail_Id, setSelectedSubDetail, selectedSubDetail)}>
                                {selectedSubDetail && <Entypo
                                    style={{ alignSelf: 'center' }}
                                    name={"check"}
                                    color={colors.puprble}
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
                <View style={{ alignItems: 'center', backgroundColor: 'green', width: Dimensions.get('window').width, }}>
                    <View style={styles.serviceDetBooking}>
                        <Text style={styles.detailViewText}>الخدمات</Text>
                        {renderServiceDetail()}
                    </View>
                    <View style={styles.serviceDetBooking}>
                        <Text style={styles.detailViewText}>العروض</Text>
                        {renderServiceDetail()}
                    </View>
                </View>
            </ScrollView>
        )
    }
    const renderDetail = () => {
        return (
            <View style={[styles.detailView, detailViewPressed ? styles.detailView : styles.pressDetailView]}>
                <TouchableOpacity onPress={detailPress}>
                    <Text style={styles.detailViewText}>تحديد التفاصيل</Text>
                </TouchableOpacity>
                {detailViewPressed &&
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <ScrollView>
                                <DetailComp service_id={data.service_id} />
                            </ScrollView>
                        </View>
                        <TouchableOpacity onPress={handleClosePress} style={styles.closeView}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>اغلاق</Text>
                        </TouchableOpacity>
                    </View>
                }
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
    const renderRequestInfo = () => {
        return <View style={styles.requestDetailView}>

            {renderSetTime()}
            {renderInviters()}
            {renderReservationDet()}
            {/* {renderCampaighn()} */}

        </View>
    }

    return (
        <View >
            {renderRequestInfo()}
        </View>
    )
}

export default RequestDetail

const styles = StyleSheet.create({
    requestDetailView: {
        backgroundColor: 'white',
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
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 5,
        marginTop: 10,
        backgroundColor: 'white'
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
        color: colors.puprble,
        fontWeight: 'bold',
        //margin: 5,
    },
    subDetText: {
        fontSize: 15,
        color: colors.puprble,
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
        marginVertical: 20,
        color: 'black',
    },
    viewDate: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'white',
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
        alignItems: 'center',
        justifyContent: 'center'
    }

})