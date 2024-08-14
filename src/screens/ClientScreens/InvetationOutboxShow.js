import { StyleSheet, Text, View, Pressable, ImageBackground, ScrollView, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../../assets/AppColors';
import Ionicons from "react-native-vector-icons/Ionicons";
import InvetationCard from '../../components/InvetationCard';
import SearchContext from '../../../store/SearchContext';
import SIZES from '../../resources/sizes';
import InveteesComp from '../../components/InveteesComp';

const height = SIZES.screenWidth * 1.8;
const width = SIZES.screenWidth - 18;

const InvetationOutboxShow = (props) => {
    const { eventTypeInfo } = useContext(SearchContext);
    const { eventTitle, invitationCard, eventLogoId ,inviteesList} = props.route.params || []

    const [showInveteesModal, setShowInveteesModal] = useState(false)

    const getEventType = () => {
        return eventTypeInfo.filter(item => {
            return item.Id === eventLogoId
        })
    }
    const [eventType, setEventType] = useState(getEventType())

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
                <Text style={styles.title}> {eventTitle}</Text>
            </View>
        )
    }
    const renderInvetationCard = () => {
        return (
            <View style={{}}>
                <InvetationCard {...props.route.params}
                    eventType={eventType[0].eventTitle}
                    isFromInvetShow={true} />
            </View>
        )
    }
    const openInveteesModal = () => {
        setShowInveteesModal(true)
    }

    const RnderInvtees = () => {
        return (
            <View>
                <InveteesComp inviteesList={inviteesList} />
            </View>

        )
    }
    const inveteesModal = () => {
        return (
            <Modal
                transparent
                visible={showInveteesModal}
                animationType='slide'
                onRequestClose={() => setShowInveteesModal(false)}>

                <View style={styles.centeredMoreView}>
                    <View style={styles.moreModal}>

                        <Pressable style={styles.modalHeader} onPress={() => setShowInveteesModal(false)}>
                            <Text style={styles.modalHeaderTxt}>...</Text>
                        </Pressable>

                        <View style={styles.modalbody}>
                            {RnderInvtees()}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const renderInvetees = () => {
        return (
            <Pressable style={styles.inviteesView} onPress={openInveteesModal}>
                <Text>قائمة المدعوين</Text>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView>
                <ImageBackground style={styles.card} source={invitationCard.invitationBackgraund}>
                    {renderInvetationCard()}
                </ImageBackground>
                {renderInvetees()}
            </ScrollView >
            {inveteesModal()}
        </View>

    )
}

export default InvetationOutboxShow

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
    card: {
        height,
        marginTop: 20,
        width,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: colors.darkGold,
    },
    inviteesView: {
        //    alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: "95%",
        height: 50,
        marginVertical: 10,
        borderColor: colors.darkGold,
        borderWidth: 1
    },
    moreModal: {
        width: '95%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    centeredMoreView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 40,
    },
    modalHeaderTxt: {
        fontSize: 18
    },
    modalbody: {
        paddingHorizontal: 5
    },
})