import { StyleSheet, Text, View, Pressable, TextInput, Modal } from 'react-native'
import Zocial from "react-native-vector-icons/Zocial";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useContext } from 'react'
import { colors } from '../assets/AppColors';
import SearchContext from '../../store/SearchContext';
import BackgroundInvetCard from './BackgroundInvetCard';
import moment from 'moment';
import { updateInvitationDetails } from '../resources/API';


const InvetationCard = (props) => {
    const { eventType, enableInvetEditing ,setEnableInvetEditing} = props
    
    const { invitationId, eventTime, setEventTime, eventDate, setEventDate, 
        location, setLocation, hostName, setHostName, 
        welcom, setWelcom, additionalInfo, setAdditionalInfo, 
        hostName2, setHostName2,
        starName, setStarName,
        starName2, setStarName2,BG } = props

    const [showBGModal, setShowBGModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const weddingCaller = 'أسم الداعي الاول'
    const regulerEventCaller = 'أسم الداعي'
    const weddingStar = 'أسم العريس'
    const eventStar = 'أسم نجم المناسبة'


    const firstCallerName = () => {
        return (
            <View>
                <TextInput
                    style={[styles.input, enableInvetEditing ? styles.editingInput : styles.input]}
                    keyboardType='default'
                    placeholder={eventType == 'زواج' ? weddingCaller : regulerEventCaller}
                    onChangeText={val => setHostName(val)}
                    value={hostName}
                />
            </View>
        )
    }
    const secondCallerName = () => {
        return (
            <View>
                <TextInput
                    style={[styles.input, enableInvetEditing ? styles.editingInput : styles.input]}
                    keyboardType='default'
                    placeholder={'اسم الداعي الثاني'}
                    onChangeText={val => setHostName2(val)}
                    value={hostName2}
                />
            </View>
        )
    }
    const firstStarName = () => {
        return (
            <View>
                <TextInput
                    style={[styles.input, enableInvetEditing ? styles.editingInput : styles.input]}
                    keyboardType='default'
                    placeholder={eventType == 'زواج' ? weddingStar : eventStar}
                    onChangeText={val => setStarName(val)}
                    value={starName}
                />
            </View>
        )
    }
    const secondStarName = () => {
        return (
            <View>
                <TextInput
                    style={[styles.input, enableInvetEditing ? styles.editingInput : styles.input]}
                    keyboardType='default'
                    placeholder={'أسم العروس'}
                    onChangeText={val => setStarName2(val)}
                    value={starName2}
                />
            </View>
        )
    }

    const welcomingPhrase = () => {
        return (
            <View>
                <TextInput
                    style={[styles.inputPharzeEditing, enableInvetEditing ? styles.inputPharze : styles.inputPharzeEditing]}
                    keyboardType='default'
                    placeholder={'عبارة ترحيبية'}
                    onChangeText={setWelcom}
                    multiline={true}
                    value={welcom}
                />
            </View>
        )
    }
    const explanatoryPhrase = () => {
        return (
            <View>
                <TextInput
                    style={[styles.inputPharzeEditing, enableInvetEditing ? styles.inputPharze : styles.inputPharzeEditing]}
                    keyboardType='default'
                    placeholder={'عبارة توضيحية'}
                    onChangeText={setAdditionalInfo}
                    multiline={true}
                    value={additionalInfo}
                />
            </View>
        )
    }
    const renderDataTimeLocation = () => (
        <View style={styles.dateTime}>
            <View style={{ alignItems: 'center' }}>
                <Ionicons name={"location-sharp"} color={"black"} size={25} />
                <TextInput
                    style={[styles.input, enableInvetEditing ? styles.editingInput : styles.input]}
                    keyboardType='default'
                    placeholder={'الموقع'}
                    onChangeText={setLocation}
                    value={location}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Ionicons name={"time"} color={"black"} size={25} />
                <TextInput
                    style={[styles.input, enableInvetEditing ? styles.editingInput : styles.input]}
                    keyboardType='default'
                    placeholder={'الوقت'}
                    onChangeText={setEventTime}
                    value={eventTime}
                />
            </View>

            <Pressable style={{ alignItems: 'center' }} onPress={getEventDate}>
                <Zocial name={"cal"} color={"black"} size={25} />
                <TextInput
                    style={[styles.input, enableInvetEditing ? styles.editingInput : styles.input]}
                    keyboardType='default'
                    placeholder={'التاريخ'}
                    onChangeText={setEventDate}
                    value={moment(eventDate).format('L')}
                />
            </Pressable>
        </View>
    );

    const getEventDate = () => {
        setShowModal(true)
    }
    const renderEventDates = () => {
        return (
            <View>
                <Text style={styles.dateText}>2025-5-20</Text>
                <Text style={styles.dateText}>2025-5-21</Text>
            </View>
        )
    }
    const EventDateModal = () => {
        return (
            <Modal
                transparent
                visible={showModal}
                animationType='fade'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.centeredView1}>
                    <View style={styles.detailModal}>

                        <View style={styles.body}>
                            {renderEventDates()}
                        </View>

                    </View>
                </View>

            </Modal>
        )
    }

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
            if (response.message === '') {
                console.log("Updated");
            }
        } catch (error) {
            console.error('Error updating invitation:', error);
        }
    };
    const saveEditingPress = () => {
        updateInvitation()
        setEnableInvetEditing(false)
    }

    const renderBGModal = () => {
        setShowBGModal(true)
    }


    const renderBGCard = () => {
        return (
            <View style={{}}>
                <BackgroundInvetCard />
            </View>

        )
    }


    const renderEditingItem = () => {
        return (
            <View style={styles.editItemView}>
                <Pressable onPress={renderBGModal}>
                    <MaterialCommunityIcons
                        name={"image-edit"}
                        color={colors.puprble}
                        size={30} />
                </Pressable>
                <Pressable style={styles.saveView} onPress={saveEditingPress}>
                    <Text style={styles.saveText}>حفظ</Text>
                </Pressable>
            </View>
        )
    }

    const renderCallers = () => {
        return (
            <View>
                <View style={styles.callerView}>
                    {firstCallerName()}
                    {eventType == 'زواج' && secondCallerName()}
                </View>
                {welcomingPhrase()}
                <View style={[styles.starsView, eventType == 'زواج' ? styles.starsView : styles.otherstarsView]}>

                    {eventType == 'زواج' && secondStarName()}
                    {firstStarName()}
                </View>
            </View>
        )
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

                        <View>
                            {renderBGCard()}
                        </View>

                    </View>
                </View>

            </Modal>
        )
    }
    return (
        <View style={styles.card}>
            {enableInvetEditing && renderEditingItem()}
            {renderCallers()}
            {renderDataTimeLocation()}
            {explanatoryPhrase()}
            {backgroundCardModal()}
            {EventDateModal()}
        </View>
    )
}

export default InvetationCard

const styles = StyleSheet.create({
    card: {
        height: '100%'

    },
    editingInput: {
        textAlign: 'center',
        height: 50,
        alignSelf: 'center',
        borderWidth: 0.6,
        borderRadius: 10,
        fontSize: 15,
        color: 'black',
    },
    input: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 18,
    },
    callerView: {
        width: '80%',
        borderColor: colors.silver,
        alignSelf: 'center',
        marginTop: 30,
        paddingVertical: 5,
        borderRadius: 5
    },
    starsView: {

        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    otherstarsView: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center'

    },
    dateTime: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: 30
    },
    inputPharze: {
        textAlign: 'center',
        height: 100,
        width: '80%',
        alignSelf: 'center',
        borderWidth: 0.6,
        borderRadius: 10,
        fontSize: 18,
        color: 'black',
    },
    inputPharzeEditing: {
        textAlign: 'center',
        height: 100,
        width: '80%',
        alignSelf: 'center',
        fontSize: 15,

    },
    editItemView: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignSelf: 'center',
        marginTop: 10,

    },
    saveView: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: colors.puprble,
        borderWidth: 2
    },
    saveText: {
        fontSize: 20,
        color: colors.puprble
    },
    detailModal1: {
        width: '95%',
        height: '50%',
        backgroundColor: '#ffffff',
    },
    centeredView1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    detailModal: {
        width: '80%',
        height: '20%',
        borderRadius: 20,
        backgroundColor: '#ffffff',
    },

    body: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '70%',
        alignSelf: 'center',
        top: '30%',
        
    },
    dateText: {
        fontSize: 20,
        color: colors.puprble
    }
})