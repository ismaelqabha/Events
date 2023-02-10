import React, { useContext, useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import HallOrderComp from '../components/HallOrderComp';
import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { ScreenNames } from '../../route/ScreenNames';
import { servicesData } from '../resources/data';



const ClientRequest = (props) => {
    //const { data } = props?.route.params
    const { sType, setcheckInDesc, ServId, DateText, TimeText, setRequestIdState } = useContext(SearchContext);
    const [textValue, setTextValue] = useState('');


    setcheckInDesc(false);
    const onPressRequest = () => {
        props.navigation.navigate(ScreenNames.ClientEvents, { data: { ...props }, isFromAddEventClick: true })
    }

    const onPressHandler = () => {
        setcheckInDesc(true);
        props.navigation.goBack();
    }
    const query = () => {
        if (!sType) {
            return servicesData || [];
        }
        return servicesData.filter(ItemSerId => {
            return ItemSerId.service_id == ServId;
        })
    }
    const renderServiceInfo = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <View style={styles.imgTitle}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{card.title}</Text>
                    <Text style={{ textAlign: 'right', marginRight: 10 }}>5★</Text>
                </View>
                <Image
                    source={card.img}
                    style={styles.img}
                />
            </View>;
        });
        return cardsArray;
    };



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
                {renderServiceInfo()}
            </View>
            <ScrollView contentContainerStyle={styles.home}>
                <View style={styles.DateView}>
                    <Text style={styles.t1}>تفاصيل الحجز </Text>
                    <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                        <Text style={styles.t3}>{TimeText}</Text>
                        <Text style={styles.t2}>الوقت</Text>
                        <Text style={styles.t3}>{DateText}</Text>
                        <Text style={styles.t2}>التاريخ</Text>
                    </View>
                </View>
                <View style={styles.HallView}>
                    <Text style={styles.desc1}>قائمة الخدمات </Text>
                    <Text style={styles.feedback}>قم بالضغط لتحديد التفاصيل  </Text>
                    {checkType()}
                    <HallOrderComp />
                </View>
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
        backgroundColor: 'white',
        height: 120,
        marginBottom: 10,
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
        marginTop: 10,
        marginLeft: 20,
        textAlign: 'right',
    },
    text: {
        fontSize: 15,
        marginRight: 10,
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
        width: 120,
        height: 100,
        borderRadius: 15,
        marginRight: 20,

    },
    imgTitle: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'flex-end',
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
