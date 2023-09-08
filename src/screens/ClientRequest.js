import React, { useContext, useEffect, useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import ServiceDetailComp from '../components/ServiceDetailComp';
import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { ScreenNames } from '../../route/ScreenNames';
import { servicesData } from '../resources/data';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getServiceImages } from '../resources/API';



const ClientRequest = (props) => {
    const { data, isFromServiceRequest } = props?.route.params
    const { sType, ServId, ServiceImages, setServiceImages,requestedDate,setisFromServiceDescription, setRequestIdState } = useContext(SearchContext);
    const [textValue, setTextValue] = useState('');

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [TimeText, setTimeText] = useState()

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
        // props.navigation.navigate(ScreenNames.ClientEvents, { data: { ...props }, isFromAddEventClick: true })
    }

    const onPressHandler = () => {
       setisFromServiceDescription(true);
        props.navigation.goBack();
    }
  
    const getImagesfromApi = () => {
        getServiceImages({ serviceID: data?.service_id }).then(res => {
            setServiceImages(res)
        })
    }
    
    useEffect(() => {
        getImagesfromApi()
        setisFromServiceDescription(false)
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
        return <View style={styles.imgTitle}>
            <View style={{ justifyContent: 'center', margin:10 }}>
                <Text style={styles.text}>{data?.title}</Text>
                <Text style={styles.text}>{data?.address}</Text>
                <Text style={{ textAlign: 'right', marginRight: 10 }}>5★</Text>
            </View>
            {renderServiceImage()}
        </View>;
    }

    const renderDateTime = () => {
        return <View style={styles.DateView}>
            <Text style={styles.t1}> الزمان </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Text style={styles.t3}>{moment(requestedDate).format('LL')}</Text>
                <Text style={styles.t3}>{moment(requestedDate).format('dddd')}</Text>
            </View>
            <Pressable onPress={() => showMode('time')} >
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{TimeText || "00:00"}</Text>
                    <Image
                        style={styles.icoon}
                        source={require('../assets/time.png')}
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

    const renderServiceDetail = () => {
        return <View style={styles.HallView}>
            <Text style={styles.desc1}>قائمة الخدمات </Text>
            <Text style={styles.feedback}>قم بالضغط لتحديد التفاصيل  </Text>
            {checkType()}
            <ServiceDetailComp service_id={data.service_id} isFromServiceRequest={isFromServiceRequest} />
        </View>
    }
    const CatOfService = {
        'قاعات': [{
            style: styles.input,
            placeholder: 'ادخل عدد الضيوف',
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
                {renderServiceinfo()}
            </View>

            <ScrollView contentContainerStyle={styles.home}>

                {renderDateTime()}

                {renderServiceDetail()}

                <View style={styles.body}>
                    <Text style={styles.t1}>سياسة الغاء الحجز</Text>

                </View>
                <View style={styles.body}>
                    <Text style={styles.t1}>لن يتم تأكيد الحجز حتى يقوم صاحب الخدمة بقبول الطلب خلال 24 ساعة</Text>

                </View>
            </ScrollView>
            <View style={styles.foter}>
                <Pressable style={styles.btnview} onPress={() => onPressRequest()}>
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
        alignItems: 'center',
    },
    HallView: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 280,
        marginBottom: 10,
    },
    DateView: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
    },
    t1: {
        fontSize: 20,
        marginTop: 10,
        marginRight: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    t2: {
        fontSize: 15,
        marginTop: 10,
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
        width: 200,
        height: 50,
        borderRadius: 5,
        elevation: 5,
        alignItems: 'center',
        //borderWidth: 1,
        justifyContent: 'space-evenly',
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
        height: 200,
        marginBottom: 10,
    },
    body: {
        backgroundColor: 'white',
        height: 200,
        marginBottom: 10,
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
    },
    imgTitle: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems:'center'
    },
    feedback: {
        fontSize: 12,
        color: 'black',
        marginRight: 20,
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
        borderRadius: 30,
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
        borderRadius: 15,
        marginRight: 20,
    },
})

export default ClientRequest;
