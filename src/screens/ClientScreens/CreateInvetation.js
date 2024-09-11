import { StyleSheet, Text, View, Pressable, Modal, ImageBackground, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../../assets/AppColors';
import { images } from '../../assets/photos/images';
import InvetationCard from '../../components/InvetationCard'
import SIZES from '../../resources/sizes';
import InveteesComp from '../../components/InveteesComp';
import { invetationBackground, invitation } from '../../resources/data';
import Entypo from "react-native-vector-icons/Entypo"
import BackgroundInvetCard from '../../components/BackgroundInvetCard';
import { showMessage } from '../../resources/Functions';
import { useFocusEffect } from '@react-navigation/native';
import { getItem, setItem } from '../../resources/common/asyncStorageFunctions';
import { createInvitation, getInvitationStatus, updateInvitationDetails } from '../../resources/API';
import UsersContext from '../../../store/UsersContext';

const height = SIZES.screenWidth * 1.8;
const width = SIZES.screenWidth - 18;

const inveteesHeightView = SIZES.screenWidth * 0.5;

const CreateInvetation = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [showBGModal, setShowBGModal] = useState(false);
    const [BG, setBG] = useState(images.invetationCard());
    const { eventType, eventTitleId } = props.route?.params || {}

    const [eventTime, setEventTime] = useState('');
    const [welcom, setWelcom] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [hostName, setHostName] = useState('');
    const [hostName2, setHostName2] = useState('');
    const [starName, setStarName] = useState('');
    const [starName2, setStarName2] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const [selectedInvitees, setSelectedInvitees] = useState({});
    const [invitationId, setInvitationId] = useState(null);
    const [invitationData, setInvitationData] = useState(null);
    const { userId } = useContext(UsersContext)
    const handleSelectionChange = (newSelection) => {
        setSelectedInvitees(newSelection);
    };

    useEffect(() => {
        const fetchOrCreateInvitation = async () => {
            try {
                const response = await getInvitationStatus({ createdBy: userId, eventLogoId: eventTitleId });
                console.log("response ", response);

                if (response && response.invitation) {
                    setInvitationId(response.invitation._id);
                    setInvitationData(response.invitation);
                    setEventTime(response.invitation.invitationCard.time);
                    setEventDate(response.invitation.invitationCard.eventDate ?
                        new Date(response.invitation.invitationCard.eventDate).toISOString().split('T')[0] :
                        '');
                    setLocation(response.invitation.invitationCard.location);
                    setHostName(response.invitation.invitationCard.callerNames[0]);
                    setHostName2(response.invitation.invitationCard.callerNames[1]);
                    setStarName(response.invitation.invitationCard.eventStars[0]);
                    setStarName2(response.invitation.invitationCard.eventStars[1]);
                    setWelcom(response.invitation.invitationCard.welcomePhrase);
                    setAdditionalInfo(response.invitation.invitationCard.explanatoryPhrase);
                    setBG(response.invitation.invitationCard.invitationBackground);
                } else {
                    const newInvitationData = {
                        eventLogoId: eventTitleId,
                        createdBy: userId,
                        invitees: [],
                        invitationCard: {
                            invitationBackground: images.invetationCard(),
                            location: '',
                            eventDate: new Date(),
                            welcomePhrase: '',
                            explanatoryPhrase: '',
                            time: '',
                            callerNames: ['', ''],
                            eventStars: ['', ''],
                        }
                    };

                    const createResponse = await createInvitation(newInvitationData);
                    if (createResponse && createResponse.invitation) {
                        setInvitationId(createResponse.invitation._id);
                        setInvitationData(createResponse.invitation);
                    }
                }
            } catch (error) {
                console.error('Error fetching or creating invitation:', error);
                showMessage('Error fetching or creating invitation.');
            }
        };

        fetchOrCreateInvitation();
    }, [eventTitleId, userId]);

    useEffect(() => {
        if (invitationId) {
            const updateInvitation = async () => {
                const updatedInvitationData = {
                    invitationCard: {
                        invitationBackground: BG,
                        location,
                        eventDate: new Date(eventDate),
                        welcomePhrase: welcom,
                        explanatoryPhrase: additionalInfo,
                        time: eventTime,
                        callerNames: [hostName, hostName2],
                        eventStars: [starName, starName2]
                    }
                };
                try {
                    const response = await updateInvitationDetails(invitationId, updatedInvitationData);
                } catch (error) {
                    console.error('Error updating invitation:', error);
                }
            };

            updateInvitation();
        }
    }, [eventTime, welcom, eventDate, location, hostName, hostName2, starName, starName2, additionalInfo, BG, invitationId]);

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
                <BackgroundInvetCard setBG={setBG} setShowBGModal={setShowBGModal} />
            </View>

        )
    }
    const renderInvetationCard = () => {
        return (
            <View style={{}}>
                <InvetationCard eventType={eventType}
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
                />
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
    const validateFields = () => {

        if (!eventTime.trim()) {
            return "Event time is required.";
        }

        if (!welcom.trim()) {
            return "Welcome message is required.";
        }

        const date = new Date(eventDate);
        if (isNaN(date.getTime())) {
            return "Invalid event date.";
        }

        if (!location.trim()) {
            return "Location is required.";
        }

        if (!hostName.trim()) {
            return "Host name is required.";
        }

        if (!hostName2.trim()) {
            return "Second host name is required.";
        }

        if (!starName.trim()) {
            return "Star name is required.";
        }

        if (!starName2.trim()) {
            return "Second star name is required.";
        }

        return null;
    };
    const onSendPress = () => {
        const validationError = validateFields();

        if (validationError) {
            showMessage(validationError)
        } else {
            setShowModal(true);
        }
    };
    const onSaveInvetPress = () => {

    }
    const onModalSendPress = async () => {
        try {
            // Get only the selected invitees
            const inviteesList = Object.keys(selectedInvitees).filter(key => selectedInvitees[key]);

            // Separate new invitees and those who are already invited
            const alreadyInvited = invitation[0].inviteesList.map(invitee => invitee.recivedId);
            const newInvitees = inviteesList.filter(userId => !alreadyInvited.includes(userId));
            const inviteesToRemove = inviteesList.filter(userId => alreadyInvited.includes(userId));

            // Remove already invited users
            for (const userId of inviteesToRemove) {
                await removeInvitee(invitation[0]._id, userId); // Assuming invitation[0]._id holds the invitation ID
            }

            if (newInvitees.length === 0) {
                showMessage('No new invitees to add.');
                return;
            }

            // Prepare the invitation data with the new invitees only
            const invitationData = {
                eventLogoId: "someEventLogoId",  // Replace with actual eventLogoId
                invitees: newInvitees.map(userId => ({ user: userId, status: 'pending', invitationSentDate: new Date() })),  // Only new invitees
                invitationCard: {
                    invitId: "someInvitId",  // Replace with actual invitId
                    invitationBackground: BG,  // Background image
                    location,  // Location of the event
                    eventDate: new Date(eventDate),  // Ensure the event date is a valid Date object
                    welcomePhrase: welcom,  // Welcome message
                    explanatoryPhrase: additionalInfo,  // Explanatory message
                    time: eventTime,  // Event time
                    callerNames: [hostName, hostName2],  // Caller names
                    eventStars: [starName, starName2]  // Event stars
                }
            };

            // Send the new invitation data to the server
            const response = await createInvitation(invitationData);  // Send the data to the server
            if (response.message === 'Invitation created successfully!') {
                showMessage('Invitation sent successfully!');
                setShowModal(false);  // Close the modal after successful invite
            } else {
                showMessage('Failed to send invitation. Try again.');
            }
        } catch (error) {
            console.error('Error sending invitation:', error);
            showMessage('Error sending invitation.');
        }
    };
    const onModalCancelPress = () => {
        setShowModal(false)
    }
    const getInvetationInfo = () => {
        return (
            <InveteesComp
                inviteesList={invitation[0].inviteesList}
                onSelectionChange={handleSelectionChange}
            />
        );
    };

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
                <ImageBackground style={styles.card} source={BG}>
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
    BGCard: {
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