import { StyleSheet, Text, View, Pressable, ImageBackground, ScrollView, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../../assets/AppColors';
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import InvetationCard from '../../components/InvetationCard';
import SearchContext from '../../../store/SearchContext';
import SIZES from '../../resources/sizes';
import InveteesComp from '../../components/InveteesComp';
import { invetationBackground } from '../../resources/data';
import { addInvitee, removeInvitee } from '../../resources/API';
import { showMessage } from '../../resources/Functions';

const height = SIZES.screenWidth * 1.8;
const width = SIZES.screenWidth - 18;

const InvetationOutboxShow = (props) => {
    const { eventTypeInfo, setInvitationData} = useContext(SearchContext);
    
    const { eventTitle, _id , invitationCard , eventLogoId ,invitees} = props.route.params || []
   
    const [BG, setBG] = useState(invitationCard.invitationBackground);
    const [eventTime, setEventTime] = useState(invitationCard.time);
    const [welcom, setWelcom] = useState(invitationCard.welcomePhrase);
    const [eventDate, setEventDate] = useState(invitationCard.eventDate);
    const [location, setLocation] = useState(invitationCard.location);
    const [hostName, setHostName] = useState(invitationCard.callerNames[0]);
    const [hostName2, setHostName2] = useState(invitationCard.callerNames[1]);
    const [starName, setStarName] = useState(invitationCard.eventStars[0]);
    const [starName2, setStarName2] = useState(invitationCard.eventStars[1]);
    const [additionalInfo, setAdditionalInfo] = useState(invitationCard.explanatoryPhrase);
    const [invitationId, setInvitationId] = useState(_id);

    

    const [selectedInvitees, setSelectedInvitees] = useState({});
    const [showInveteesModal, setShowInveteesModal] = useState(false)

    const [enableInvetEditing, setEnableInvetEditing] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)

    const handleSelectionChange = (newSelection) => {
        setSelectedInvitees(newSelection);
    };

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
                <InvetationCard 
                    eventType={eventType[0].eventTitle}
                    invitationId={invitationId}
                    BG={BG}
                    eventTime={eventTime}
                    setEventTime={setEventTime}
                    eventDate={eventDate}
                    setEventDate={setEventDate}
                    location={location}
                    setLocation={setLocation}
                    hostName={hostName}
                    setHostName={setHostName}
                    welcom={welcom}
                    setWelcom={setWelcom}
                    additionalInfo={additionalInfo}
                    setAdditionalInfo={setAdditionalInfo}
                    hostName2={hostName2}
                    setHostName2={setHostName2}
                    starName={starName}
                    setStarName={setStarName}
                    starName2={starName2}
                    setStarName2={setStarName2}
                    enableInvetEditing={enableInvetEditing}
                    setEnableInvetEditing={setEnableInvetEditing}
                    showSaveButton = {showSaveButton}
                    setShowSaveButton = {setShowSaveButton}
                    isFromCreateInvetation = {false} />
            </View>
        )
    }

   
    const openInveteesModal = () => {
        setShowInveteesModal(true)
    }

    const editCardPress = () => {
        setShowSaveButton(true)
        setEnableInvetEditing(true)
    }

    const RnderInvtees = () => {
        return (
            <View>
                <InveteesComp 
                    inviteesList={invitees || []}
                    onSelectionChange={handleSelectionChange}
                    />
            </View>

        )
    }
    const onModalCancelPress = () => {
        setShowInveteesModal(false)
    }
    const onModalSendPress = async () => {
        try {
            // console.log("slectedInvitees", selectedInvitees);

            const inviteeslist = Object.keys(selectedInvitees).filter(key => selectedInvitees[key]);

            if (!invitees) {
                showMessage('No invitation data found.');
                return;
            }

            const alreadyInvited = invitees.map(invitee => invitee.user._id);
            //console.log("invitationData.invitees", invitees);


            const newInvitees = inviteeslist.filter(userId => !alreadyInvited.includes(userId));
            const inviteesToRemove = alreadyInvited.filter(userId => inviteeslist.includes(userId));

            for (const userId of inviteesToRemove) {
                await removeInvitee(invitationId, userId);
            }

            for (const userId of newInvitees) {
                await addInvitee(invitationId, { userId });
            }

            const updatedInvitees = [
                ...invitees.filter(invitee => !inviteesToRemove.includes(invitee.user._id)),
                ...newInvitees.map(userId => ({
                    user: { _id: userId },
                    status: 'pending',
                    invitationSentDate: new Date(),
                })),
            ];

            setInvitationData(prevData => ({
                ...prevData,
                invitees: updatedInvitees
            }));

            if (newInvitees.length === 0 && inviteesToRemove.length === 0) {
                showMessage('No changes in invitees.');
            } else {
                showMessage('Invitation updated successfully!');
            }

            setShowModal(false);
        } catch (error) {
            console.error('Error updating invitees:', error);
            showMessage('Error updating invitees.');
        }
    };
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

    const renderInvetees = () => {
        return (
            <Pressable style={styles.inviteesView} onPress={openInveteesModal}>
                <Text style={styles.text}>قائمة المدعوين</Text>
                <View style={styles.IconView}>
                    <Entypo
                        name={"users"}
                        color={colors.darkGold}
                        size={25} />
                </View>
            </Pressable>
        )
    }

    const editInvetationCard = () => {
        return (
            <Pressable style={styles.inviteesView} onPress={editCardPress}>
                <Text style={styles.text}>تعديل البطاقة</Text>
                <View style={styles.IconView}>
                    <Feather
                        name={"edit"}
                        color={colors.darkGold}
                        size={25} />
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView>
                <ImageBackground style={styles.card} source={typeof BG === 'string' ? { uri: BG } : BG}>
                {renderInvetationCard()}
                </ImageBackground>
                {renderInvetees()}
                {editInvetationCard()}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        width: "95%",
        height: 60,
        marginVertical: 10,
        borderColor: colors.darkGold,
        borderWidth: 3
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
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginHorizontal: 20
    },
    text: {
        fontSize: 18,
        color: colors.puprble
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
})