import React, { useContext, useState,useEffect } from 'react';
import { TextInput } from 'react-native';
import { View, StyleSheet, Text, Pressable, Image, Modal, ScrollView } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import HallOrderComp from '../components/HallOrderComp';
import DateTPicker from '../components/DateTPicker'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
 import { SliderBox } from 'react-native-image-slider-box';
import { getImagDescBage } from '../resources/API';



const ServiceDescr = (props) => {
    const { data } = props?.route.params
    const [showModal, setShowModal] = useState(false);
    const { setcheckInDesc, isDateAvailable, DateText, TimeText, setServId, setRequestIdState, serviceImg,setserviceImg } = useContext(SearchContext);
    console.log("data.service_id", data.service_id);

    setcheckInDesc(true);

    const checkDateResult = () => {
        if (isDateAvailable == true) {
            return <Pressable onPress={() => modalBtnPress()} style={styles.Modalbtn}>
                <Text style={styles.text}>رجوع</Text>
            </Pressable>;
        } else {
            if (DateText == "dd/mm/yyyy" && TimeText == "00:00") {
                return <Pressable onPress={() => modalBtnPress()} style={styles.Modalbtn}>
                    <Text style={styles.text}>رجوع</Text>
                </Pressable>;
            } else {
                return <Pressable onPress={() => modalPressHandler()} style={styles.Modalbtn}>
                    <Text style={styles.text}>التالي</Text>
                </Pressable>;
            }
        }
    }
    const modalBtnPress = () => {
        setShowModal(false);;
    }

    const onPressHandler = () => {
        setShowModal(true);
        setServId(data.service_id);
    }
    const modalPressHandler = () => {
        setShowModal(false);
        setRequestIdState(uuidv4());
        props.navigation.navigate(ScreenNames.ClientRequest, { data: { ...data } })
    }


    
    const renderImg = () => {
    
        const imageArray = data.images.map(photos => {
            return photos.image;
        });
        return imageArray;
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.home}>
                <View >
                    <SliderBox
                        sliderBoxHeight={200}
                        images={renderImg()}
                        dotColor="blue"
                        dotStyle={{ width: 15, height: 15, borderRadius: 50 }}
                        autoplay={true}                // style={{ width: 400, }}
                    />

                    <Image source={data.img} style={styles.logo} />
                </View>

                <Text style={styles.title}>{data?.title || 'no event'}</Text>
                <Text style={styles.address}>{data.address}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.feedback}>التغذيه الراجعة 13</Text>
                    <Text style={styles.feedback}>5★</Text>
                </View>
                <Text style={styles.line}>____________________________________________________</Text>

                <Text style={styles.desc}>تحتوي هذة الخانة على شرح  عن الخدمة المعروضة بحيث يتم عرض الخدمات التي تقدمها</Text>
                <Pressable style={{ flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => props.navigation.navigate(ScreenNames.VideoPlayer)}>
                    <Image
                        style={styles.image}
                        source={require('../assets/playvideo.png')}
                    />
                </Pressable>

                <Text style={styles.line}>____________________________________________________</Text>

                <Text style={styles.desc1}>قائمة الخدمات </Text>
                <View style={styles.HallView}>
                    <HallOrderComp service_id={ data.service_id} />
                </View>
                <Text style={styles.line}>____________________________________________________</Text>
                <Text style={styles.desc}>عرض التغذية الراجعة عن الخدمة المختارة</Text>
                <Text style={styles.line}>____________________________________________________</Text>
                <Image
                    style={styles.image}
                    source={require('../assets/location.png')} />
                <Text style={styles.line}>____________________________________________________</Text>
                <View style={styles.icon}>
                    <Image style={styles.insicon} source={require('../assets/facebook--v2.png')} />
                    <Image style={styles.insicon} source={require('../assets/instagram-new.png')} />
                    <Image style={styles.insicon} source={require('../assets/apple-phone.png')} />
                </View>
            </ScrollView>
            <Modal
                transparent
                visible={showModal}
                animationType='slide'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.Motitle}>
                            <Text style={styles.text}>...</Text>
                        </View>
                        <View style={styles.body}>
                            <DateTPicker />
                        </View>
                        {checkDateResult()}
                    </View>
                </View>

            </Modal>
            <View style={styles.foter}>
                <Pressable style={styles.btnview} onPress={() => onPressHandler()}>
                    <Text style={styles.btntext}>فحص الامكانية</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        borderRadius: 50,
        width: 100,
        height: 100,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 150,
    },
    HallView: {
        marginRight: 20,
    },
    VHall: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // text: {
    //     marginRight: 20,
    //     fontSize: 15,
    //     color: 'black',
    // },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    insicon: {
        width: 40,
        height: 40,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 20,
        marginTop: 50,
    },
    feedback: {
        fontSize: 12,
        color: 'black',
        marginRight: 20,
    },
    line: {
        textAlign: 'center',
        color: '#d3d3d3'
    },
    desc: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    desc1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 20,
        marginTop: 20,

    },
    address: {
        fontSize: 16,
        color: 'black',
        marginRight: 20,
        marginBottom: 20,
    },
    image: {
        width: 40,
        height: 40,
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
    detailModal: {
        width: "100%",
        height: 500,
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
    Motitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        height: '80%',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    Modalbtn: {
        marginBottom: 20,
    },
})

export default ServiceDescr;
