import React, { useContext, useState } from 'react';
import { Pressable } from 'react-native';
import { View, StyleSheet, TouchableOpacity, Text, Modal, Card } from 'react-native';
import SearchContext from '../../store/SearchContext';
import SubDetailComp from './SubDetailComp';


const HallOrderComp = (props) => {
    const { ServId, checkInDesc, detailOfServ, setDetailOfServ, userId, setdetailIdState, detailIdState } = useContext(SearchContext);
    const [showModal, setShowModal] = useState(false);

    const onPressHandler = (DId) => {
        setShowModal(true);
        setdetailIdState(DId);
    }
    const onPressModal = () => {
        //     let serviceDet = detailOfServ;
        //     let serviceDetIndex = serviceDet.findIndex(SDIndex => SDIndex.detail_Id === detailIdState)
        //     serviceDetIndex != -1 &&
        //         (serviceDet[serviceDetIndex].userID = userId)

        //     setDetailOfServ([...serviceDet])

        setShowModal(false);
    }


    const query = () => {
        if (!ServId) {
            return detailOfServ || [];
        }
        return detailOfServ.filter(ItemSerType => {
            return ItemSerType.SDserviceID == ServId;
        })
    }
    const renderDetail = () => {
        const data = query();

        if (checkInDesc == true) {
            const cardsArray = data.map(card => {
                return <View style={styles.serviceView}>
                    <Text style={styles.txt1}>{card.detailTitle}</Text>
                </View>;

            });
            return cardsArray;
        } else {
            const cardsArray = data.map(card => {

                return <TouchableOpacity onPress={() => onPressHandler(card.detail_Id)} style={styles.touchView}>
                    <Text style={styles.text}>{card.detailTitle}</Text>
                </TouchableOpacity>;
            });
            return cardsArray;
        }

    };

    return (
        <View style={styles.container}>
            {renderDetail()}
            <Modal
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
                            <SubDetailComp />
                        </View>
                        <Pressable onPress={() => onPressModal()} style={styles.btnfooter}>
                            <Text style={styles.text}>تم</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        justifyContent: 'center',
        alignItems: 'center',

    },
    body: {
        height: '85%',
        marginTop: 10,
        marginRight: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    txt1: {
        fontSize: 20,
    },
    btnfooter: {
        height: '15%',
    },
    txt: {
        fontSize: 25,
        color: 'black'
    },

})

export default HallOrderComp;
