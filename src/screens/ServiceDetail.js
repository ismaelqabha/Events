import React, { useContext, useState, useEffect } from 'react';
import { Pressable } from 'react-native';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Card } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { getServiceDetail } from '../resources/API';
import Ionicons from "react-native-vector-icons/Ionicons";



const ServiceDetail = (props) => {
    const { data, isFromServiceDesc } = props.route?.params || {}
    const { detailOfServ, setDetailOfServ, isFromServiceDescription, setdetailIdState } = useContext(SearchContext);
    const [showModal, setShowModal] = useState(false);

    const onPressHandler = (DId) => {
        setdetailIdState(DId)
        setShowModal(true);
    }
    const onPressModal = () => {
        //     let serviceDet = detailOfServ;
        //     let serviceDetIndex = serviceDet.findIndex(SDIndex => SDIndex.detail_Id === detailIdState)
        //     serviceDetIndex != -1 &&
        //         (serviceDet[serviceDetIndex].userID = userId)

        //     setDetailOfServ([...serviceDet])

        setShowModal(false);
    }


    //console.log("props.service_id", data.service_id)

    const getDetailFromApi = () => {
        getServiceDetail({ SDserviceID: data?.service_id }).then(res => {
            setDetailOfServ(res)
            //console.log("detailOfServ", res);
        })
    }

    useEffect(() => {
        getDetailFromApi()
    }, [])

    const backPress = () => {
        props.navigation.goBack();
    }


    const query = () => {
        return detailOfServ?.filter(ItemSerType => {
            return ItemSerType.SDserviceID == data?.service_id;
        })
    }
    const renderDetail = () => {
        const dataa = query();
        if (isFromServiceDesc) {
            const cardsArray = dataa?.map((card, i) => {
                return <View key={i} style={styles.serviceView}>
                    <Text style={styles.txt1}>{card?.detailDescription}</Text>
                    <Text style={styles.txt1}>{card?.cost}</Text>
                </View>;

            });
            return cardsArray;
        }

        if (!isFromServiceDesc) {
            const cardsArray = dataa.map(card => {
                return <TouchableOpacity onPress={() => onPressHandler(card.detail_Id)} style={styles.touchView}>
                    <Text style={styles.txt1}>{card?.detailDescription}</Text>
                    <Text style={styles.txt1}>{card?.cost}</Text>
                </TouchableOpacity>;
            });
            return cardsArray;
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Pressable onPress={backPress}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>
            {renderDetail()}



            {/* <Modal
                transparent
                visible={showModal}
                animationType='fade'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.Motitle}>
                            <Text style={styles.txt}>...</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.text}>الرجاء اختيار تفاصيل الخدمة</Text>
                            </View>
                            <SubDetailComp/>
                        </View>
                        <Pressable onPress={() => onPressModal()} style={styles.btnfooter}>
                            <Text style={styles.text}>تم</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems:'center'
    },
    title: {
        flexDirection: 'row',
        margin: 20,
    },
    icon: {
        justifyContent: 'flex-start'
    },
    serviceView: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: 100,
        margin: 5,
        borderRadius: 10,
        elevation: 5

    },
    touchView: {
        borderRadius: 10,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.3,
        backgroundColor: '#fffaf0',
    },
    detailModal: {
        width: "100%",
        height: "100%",
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Motitle: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    body: {
        height: '100%',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    txt1: {
        fontSize: 15,

    },
    btnfooter: {
        height: '15%',
    },
    txt: {
        fontSize: 25,
        color: 'black'
    },

})

export default ServiceDetail;
