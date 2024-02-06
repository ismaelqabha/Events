import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import AntDesign from "react-native-vector-icons/AntDesign";

const RequestDetail = (props) => {
    // const { data } = props?.route.params
    const { TimeText, setTimeText, cat } = useContext(SearchContext);
    const [textValue, setTextValue] = useState('');
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
                    return (
                        <View style={styles.subDetail}>
                            <Text style={styles.detailViewText}>{item.detailSubtitle}</Text>
                            <AntDesign
                                style={{ alignSelf: 'center' }}
                                name={"checksquareo"}
                                color={colors.puprble}
                                size={30} />
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
                <View style={{flex:1, backgroundColor: 'green', width: Dimensions.get('window').width}}>
                    <View style={styles.serviceDetBooking}>
                        <Text style={styles.detailViewText}>الخدمات</Text>
                        {renderServiceDetail()}
                    </View>
                    <View style={styles.serviceDetBooking}>
                        <Text style={styles.detailViewText}>العروض</Text>
                        {renderServiceDetail()}
                    </View>
                    <View style={styles.serviceDetBooking}>

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
        <View>
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
        flex: 1,
        height: 300,
        width: '100%'
    },
    serviceDetBooking: {
        width: '90%',
        height: 300,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 5,
        marginTop: 10,
        backgroundColor: 'blue'
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
        //color: 'white'
        // fontWeight: 'bold',
        margin: 10,
        // position: 'absolute',
        // right: 0,
        // top: 0
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
        alignSelf: 'center'
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgray',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
        marginRight: 10,
        color: 'black',
        // backgroundColor: '#fffaf0',
    },
    viewDate: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 200,
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
        backgroundColor: colors.gold,
        borderRadius: 5,
        height: 50,
        width: '80%',
        margin: 5,
        justifyContent: 'center',
        paddingRight: 10,
        elevation: 5,
        alignSelf: 'flex-end'

    },
    subDetail: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }

})