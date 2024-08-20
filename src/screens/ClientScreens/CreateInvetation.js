import { StyleSheet, Text, View, Pressable, Modal, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../../assets/AppColors';
import { images } from '../../assets/photos/images';
import InvetationCard from '../../components/InvetationCard'
import SIZES from '../../resources/sizes';
import InveteesComp from '../../components/InveteesComp';
import { invitation } from '../../resources/data';
import Entypo from "react-native-vector-icons/Entypo"
import BackgroundInvetCard from '../../components/BackgroundInvetCard';

const height = SIZES.screenWidth * 1.8;
const width = SIZES.screenWidth - 18;

const inveteesHeightView = SIZES.screenWidth * 0.5;

const CreateInvetation = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [showBGModal, setShowBGModal] = useState(false);
    const { eventType } = props.route?.params || {}

    //   const eventTitle = 'تخرج'


    const onPressBack = () => {
        props.navigation.goBack();
    }

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressBack}>
                    <Ionicons
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.title}>اِنشاء بطاقة دعوة</Text>
            </View>
        )
    }
    const renderEventType = () => {
        return (
            <View style={styles.eventTypeView}>
                <Text style={styles.text}>{'بطاقة دعوة لمناسبة' + ' ' + eventType}</Text>
            </View>
        )
    }
    const renderBGCard = () => {
        return (
            <View style={{}}>
                <BackgroundInvetCard />
            </View>

        )
    }
    const renderInvetationCard = () => {
        return (
            <View style={{}}>
                <InvetationCard eventType={eventType} />
            </View>

        )
    }
    const renderFooter = () => {
        return (
            <View style={styles.buttonView}>
                <Pressable onPress={onSaveInvetPress}>
                    <Text style={styles.text}>لاحقا</Text>
                </Pressable>
                <Pressable onPress={onSendPress}>
                    <Text style={styles.text}>ارسال الدعوة</Text>
                </Pressable>

            </View>
        )
    }
   
    const changeBGCardPress = () => {
        setShowBGModal(true)
    }
    const backgroundCardModal = () => {
        return (
            <Modal
                transparent
                visible={showBGModal}
                animationType='fade'
                onRequestClose={() =>
                    setShowBGModal(false)
                }
            >
                <View style={styles.centeredView1}>
                    <View style={styles.detailModal1}>

                        <View style={styles.body}>
                            {renderBGCard()}
                        </View>
                        
                    </View>
                </View>

            </Modal>
        )
    }
    const renderSetBackgroundCard = () => {
        return (
            <Pressable style={styles.BGCard} onPress={changeBGCardPress}>
                <Text style={styles.text}>تغيير خلفية البطاقة</Text>
                <View style={styles.IconView}>
                    <Entypo
                        name={"images"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        )
    }

    const onSendPress = () => {
        setShowModal(true)
    }
    const onSaveInvetPress = () => {

    }
    const onModalSendPress = () => {

    }
    const onModalCancelPress = () => {
        setShowModal(false)
    }
    const getInvetationInfo = () => {
        return (
            <InveteesComp inviteesList={invitation[0].inviteesList} />
        )
    }

    const inviteesListModal = () => {
        return (
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

                        <View style={styles.body}>
                            {getInvetationInfo()}
                        </View>
                        <View style={styles.btn}>
                            <Pressable onPress={onModalCancelPress} >
                                <Text style={styles.modaltext}>الغاء الامر</Text>
                            </Pressable>
                            <Pressable onPress={onModalSendPress} >
                                <Text style={styles.modaltext}>ارسال</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }

    return (

        <View style={styles.container}>

            {renderHeader()}
            <ScrollView style={{}}>
                {renderEventType()}
                {renderSetBackgroundCard()}
                <ImageBackground style={styles.card} source={images.invetationCard()}>
                    {renderInvetationCard()}
                </ImageBackground>

                {renderFooter()}
            </ScrollView>
            {inviteesListModal()}
            {backgroundCardModal()}
        </View>

    )
}

export default CreateInvetation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 50
    },
    card: {
        height,
        marginTop: 20,
        width,

        alignSelf: 'center',
        borderWidth: 3,
        borderColor: colors.darkGold,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
    },

    eventTypeView: {
        width: '95%',
        height: 80,
        borderWidth: 2,
        borderColor: colors.darkGold,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: colors.puprble
    },
    buttonView: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.darkGold,
        width: '95%',
        height: 80,
        inveteesHeightView,
        alignSelf: 'center',
    },
    detailModal: {
        width: '95%',
        height: '100%',
        backgroundColor: '#ffffff',
        //borderRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    detailModal1: {
        width: '95%',
        height: '50%',
        backgroundColor: '#ffffff',
        //borderRadius: 20,
    },
    centeredView1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    body: {
        marginTop: 30,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        bottom: 0
    },
    modaltext: {
        fontSize: 18,
        color: colors.puprble
    },
    BGCard:{
        width: '95%',
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
        borderColor: colors.darkGold,
        borderWidth: 2
    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
      
    },

})