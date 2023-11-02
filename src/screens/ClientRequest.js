import React, { useContext, useEffect, useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { ScreenNames } from '../../route/ScreenNames';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addNewRequest, deleteRequestbyId, getServiceImages } from '../resources/API';
import DetailComp from '../components/DetailComp';
import { v4 as uuidv4 } from 'uuid';




const ClientRequest = (props) => {
    const { data } = props?.route.params
    const { sType, userId, ServiceImages, setServiceImages, requestedDate, TimeText, setTimeText,
        setisFromRequestScreen, requestInfo, setRequestInfo, detailIdState, setRequestIdState } = useContext(SearchContext);
    const [textValue, setTextValue] = useState('');
    const [selectTime, setSelectTime] = useState(false);
    const [detailViewPressed, setDetailViewPressed] = useState(false);
    const [campaignViewPressed, setCampaignViewPressed] = useState(false);
    const idReq = uuidv4()


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

    const onPressRequest = () => {
        props.navigation.navigate(ScreenNames.ClientEvents, { data: { ...data }, isFromAddEventClick: true })
    }

    const onPressHandler = () => {
        setisFromRequestScreen(false)
        removeRequest()
        props.navigation.goBack();
    }
    const removeRequest = () => {
        deleteRequestbyId({ RequestId: idReq }).then(res => {
            setRequestInfo(res)
            console.log("Request Deleted");
        })
    }
    const getImagesfromApi = () => {
        getServiceImages({ serviceID: data?.service_id }).then(res => {
            setServiceImages(res)

        })
    }
    const creatNewRequest = () => {
        setRequestIdState(idReq)
        const newRequestItem = {
            RequestId: idReq,
            ReqServId: data?.service_id,
            ReqUserId: userId,
            ReqStatus: 'false',
            ReqDate: moment(date).format('L'),
            reservationDate: moment(requestedDate).format('L')
        }
        addNewRequest(newRequestItem).then(res => {
            const req = requestInfo || [];
            req.push(newRequestItem)
            setRequestInfo([...req])
            console.log("Request Created");
        })
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

    useEffect(() => {
        getImagesfromApi()
        setisFromRequestScreen(true)
        creatNewRequest()
    }, [])

    const queryImg = () => {
        return ServiceImages.filter(photo => {
            return photo.coverPhoto == true
        });
    };

    const renderServiceImage = () => {
        const logo = queryImg();
        const coverphoto = logo.map(img => {
            return <Image
                source={{ uri: img.image }}
                style={styles.img}
            />
        })

        return coverphoto
    }

    const renderServiceinfo = () => {
        return <View style={styles.DateView}><View style={styles.imgTitle}>
            <View style={{ margin: 10, alignItems: 'flex-end' }}>
                <Text style={styles.text}>{data?.title}</Text>
                <Text style={styles.text}>{data?.address}</Text>
                <Text style={{}}>5★</Text>
            </View>
            {renderServiceImage()}
        </View></View>;
    }

    const renderDateTime = () => {
        return <View style={styles.DateView}>
            <Text style={styles.t1}> الزمان </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={styles.t3}>{moment(requestedDate).format('LL')}</Text>
                <Text style={styles.t3}>{moment(requestedDate).format('dddd')}</Text>
            </View>
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
    const renderServiceDetail = () => {
        return <View style={styles.HallView}>
            <Text style={styles.desc1}>تفاصيل الحجز</Text>
            <View style={{}}>
                {checkType()}
                {renderDetail()}
                {renderCampaighn()}
            </View>
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
        return CatOfService[sType].map(type => {
            return (<TextInput
                {...type}
                value={textValue}
                onChangeText={setTextValue} />)
        })
    }

    const checkType = () => {
        return (
            <View style={styles.VHall}>
                {renderInput()}
            </View>
        )
    }
    const pricingPress = () => {
        props.navigation.navigate(ScreenNames.ServiceDetail, { data: { ...data } })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Pressable onPress={onPressHandler}
                    >
                        <Ionicons
                            style={styles.icon}
                            name={"arrow-back"}
                            color={"black"}
                            size={25} />
                    </Pressable>
                    <Text style={styles.txt}>Request</Text>
                </View>

            </View>

            <ScrollView contentContainerStyle={styles.home}>
                {renderServiceinfo()}

                {renderDateTime()}

                {renderServiceDetail()}

                {/* <View style={styles.body}>
                    <Pressable style={styles.priceView} onPress={pricingPress}>
                        <Text style={styles.descText}>تحديد الرزمة</Text>
                    </Pressable>
                </View> */}

                <View style={styles.body}>
                    <Text style={styles.t1}>سياسة الغاء الحجز</Text>

                </View>
                <View style={styles.body}>
                    <Text style={styles.t1}>لن يتم تأكيد الحجز حتى يقوم صاحب الخدمة بقبول الطلب خلال 24 ساعة</Text>

                </View>
            </ScrollView>
            <View style={styles.foter}>
                <Pressable onPress={() => onPressRequest()}
                    disabled={selectTime ? false : true}
                    style={[styles.btnview, selectTime ? styles.btnview : styles.btnRequestApproved]}
                >
                    <Text style={styles.btntext}>ارسال طلب</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
    },
    VHall: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
    },
    HallView: {
        backgroundColor: 'white',
        height: 730,
        borderRadius: 5,
        margin: 5,

    },
    DateView: {
        backgroundColor: 'white',
        height: 200,
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5,
    },
    descText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    detailViewText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        position: 'absolute',
        right: 0,
        top: 0
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

    priceView: {
        backgroundColor: 'snow',
        height: 50,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 5
    },

    t1: {
        fontSize: 20,
        //marginTop: 10,
        marginRight: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    t2: {
        fontSize: 15,
        //marginTop: 10,
        marginRight: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    t3: {
        fontSize: 15,
        color: 'black',
        margin: 10
    },
    viewDate: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 200,
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'snow',
        justifyContent: 'space-evenly',
        elevation: 5
    },
    icoon: {
        width: 35,
        height: 35,
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
    txt: {
        fontSize: 20,
        marginLeft: 120
    },
    header: {
        backgroundColor: 'white',
        //height: 200,
        // marginBottom: 10,
    },
    body: {
        backgroundColor: 'white',
        height: 100,
        margin: 5,

        borderRadius: 5,
        margin: 5,
        //alignItems: 'center',

    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    img: {
        width: 150,
        height: 120,
        borderRadius: 15,
        backgroundColor: 'black',
        justifyContent: 'flex-end'
    },
    imgTitle: {
        flexDirection: 'row',
        //marginTop: 20,
        justifyContent: 'space-around'
    },

    desc1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 20,
        marginTop: 10,
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
        marginRight: 10,
        color: 'black',
        backgroundColor: '#fffaf0',
    },
    foter: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#fffaf0',
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    btnview: {
        backgroundColor: '#f0ffff',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 20,
        elevation: 5
    },
    btnRequestApproved: {
        backgroundColor: '#f0ffff',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 20,
        elevation: 5,
        opacity: 0.3
    },
})

export default ClientRequest;
