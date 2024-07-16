import { StyleSheet, Text, View, Pressable, Alert, Modal, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from '../assets/AppColors';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';
import { createNewEvent } from '../resources/API';
import { SelectList } from 'react-native-dropdown-select-list';


const SetEventForRequest = (props) => {
    const { serviceType } = props
    const { eventInfo, setEventInfo, requestedDate, eventTypeInfo,
        eventTotalCost, setEventTotalCost, totalPrice,
        setUpdatedEventDate,
        setEVENTID,
        setEvTiltleId } = useContext(SearchContext);
    const { userId } = useContext(UsersContext);

    const [selectedEvent, setSelectedEvent] = useState('');

    const [IveEvent, setIveEvent] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [fileEventName, setfileEventName] = useState(null);
    const [eventName, setEventName] = useState(null)
    const [eventTypeId, setEventTypeId] = useState()
    const [eventTypeName, setEventTypeName] = useState()

    // const [evTiltleId, setEvTiltleId] = useState()
    // const [EVENTID, setEVENTID] = useState()
    // const [updatedEventDate, setUpdatedEventDate] = useState()
    // const [eventTotalCost, setEventTotalCost] = useState()


    const serviceTypeList = ["تصوير"]

    const checkService = () => {
        return serviceTypeList.map(item => {
            if (item === serviceType) {
                console.log("in");
            } else {
                return (
                    <View>
                        {renderEvents()}
                    </View>

                )
            }
        })
    }

    const checkIfThereIsEvent = () => {
        if (eventInfo.message == 'No Event') {
            setIveEvent(false)
        } else {
            setIveEvent(true)
        }
    }

    useEffect(() => {
        checkIfThereIsEvent()
        getEventTypeInfo()
    }, [])

    const setModal = () => {
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
                        <View style={styles.Motitle}>
                            <Text style={styles.modaltext}>انشاء مناسبة</Text>
                        </View>
                        <View style={styles.body}>
                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='ادخل اسم المناسبة '
                                onChangeText={setfileEventName}
                            />
                            <View style={{ width: '100%', marginVertical: 20 }}>
                                <SelectList
                                    data={eventTypeName}
                                    setSelected={val => {
                                        setEventName(val);
                                    }}
                                    placeholder={"أختر نوع المناسبة"}
                                    boxStyles={styles.dropdown}
                                    inputStyles={styles.droptext}
                                    dropdownTextStyles={styles.dropstyle}
                                />
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <Pressable onPress={onModalCancelPress} >
                                <Text style={styles.modaltext}>الغاء الامر</Text>
                            </Pressable>
                            <Pressable onPress={onModalSavePress} >
                                <Text style={styles.modaltext}>حفظ</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }


    const onPressModalHandler = () => {
        setShowModal(true);
    }

    const getEventTypeInfo = () => {
        const eventList = []
        eventTypeInfo.forEach(element => {
            eventList.push(element?.eventTitle)
        })
        eventList.sort()
        setEventTypeName(eventList)
    }

    const getEventTypeID = (val) => {
        const eventTypeIndex = eventTypeInfo.findIndex(item => item.eventTitle === val)
        const eventTyId = eventTypeInfo[eventTypeIndex].Id
        setEventTypeId(eventTyId)
        creatNewEvent(eventTyId)
    }
    const onModalCancelPress = () => {
        setShowModal(false)
    }
    const onModalSavePress = () => {
        if (fileEventName !== null) {
            if (eventName !== null) {
                getEventTypeID(eventName)

            } else {
                Alert.alert(
                    'تنبية',
                    'الرجاء اختيار نوع المناسبة',
                    [
                        {
                            text: 'Ok',
                            // style: 'cancel',
                        },
                    ],
                    { cancelable: false } // Prevent closing the alert by tapping outside
                );
            }
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء اختيار اسم المناسبة',
                [
                    {
                        text: 'Ok',
                        // style: 'cancel',
                    },
                ],
                { cancelable: false } // Prevent closing the alert by tapping outside
            );
        }

    }
    const creatNewEvent = (eventTyId) => {
        const newEventItem = {
            userId: userId,
            eventName: fileEventName,
            eventTitleId: eventTyId,
            eventDate: requestedDate,
            eventCost: eventTotalCost
        }
        createNewEvent(newEventItem).then(res => {
            const evnt = eventInfo || [];
            evnt.push(newEventItem)

            if (res.message === 'Event Created') {
                setEventInfo([...evnt])

                ToastAndroid.showWithGravity('تم اٍنشاء مناسبة بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
                setShowModal(false)
            }
        })
    }

    const renderEvents = () => {
        return (
            <View>
                <Text style={styles.text}>تحديد المناسبة</Text>
                {IveEvent &&
                    renderEventInfo()
                }
                <Pressable style={styles.eventItem} onPress={onPressModalHandler}
                >
                    <Text style={styles.text}>مناسبة جديدة</Text>
                    <View style={styles.IconView}>
                        <Entypo
                            style={{ alignSelf: 'center' }}
                            name={"plus"}
                            color={colors.puprble}
                            size={30} />
                    </View>
                </Pressable>
            </View>
        )
    }

    const filtereventInfo = () => {
        var BookDate
        var todayDate = new Date();

        todayDate.setHours(0);
        todayDate.setMinutes(0);
        todayDate.setSeconds(0);
        todayDate.setMilliseconds(0);
       
        return eventInfo?.filter(item => {
           
            return item.eventDate.find(dateElment => {
                BookDate = new Date(dateElment)
                const result = BookDate > todayDate // || BookDate.length < 1
                return result
            })

        })
    }
    const whenEventPress = (eventId, eventTitleId) => {
        setSelectedEvent(eventId || '');
        setEvTiltleId(eventTitleId)
        UpdateEventCostState(eventId)
    }
    const UpdateEventCostState = (eventId) => {
        eventItemIndex = eventInfo?.findIndex(item => item.EventId === eventId && item.userId === userId)
        const evCost = eventInfo[eventItemIndex].eventCost
        const lastTotal = evCost + totalPrice
        setEventTotalCost(lastTotal)

        const newExitDate = eventInfo[eventItemIndex].eventDate

        if (Array.isArray(requestedDate)) {
            requestedDate.forEach((item) => {
                if (!(newExitDate.includes(item))) {
                    newExitDate.push(item)
                }
            });

        } else {
            if (!(newExitDate.includes(requestedDate))) {
                newExitDate.push(requestedDate)
            }
        }

        setUpdatedEventDate(newExitDate)
        setEVENTID(eventId)

    }

    const renderEventInfo = () => {
        const eventData = filtereventInfo()
       
        return eventData.map((item, index) => {

            const isSelected = selectedEvent === item.EventId;
            return (
                <Pressable key={index} style={styles.eventItem}>
                    <View >
                        <Text style={styles.text}>{item.eventName}</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Pressable style={styles.selectEvent}
                            onPress={() => whenEventPress(item.EventId, item.eventTitleId)}
                        >
                            {isSelected && (
                                <Entypo
                                    style={{ alignSelf: 'center' }}
                                    name={"check"}
                                    color={colors.puprble}
                                    size={20}
                                />
                            )}
                        </Pressable>
                    </View>
                </Pressable>
            )
        })

    }

    return (
        <View>
            <Text>{serviceType}</Text>
            {checkService()}
            {setModal()}
        </View>
    )
}

export default SetEventForRequest

const styles = StyleSheet.create({
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%",
        marginVertical: 5,
    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 10
    },
    text: {
        fontSize: 15,
        color: colors.puprble
    },
    selectEvent: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: 'white'
    },
    detailModal: {
        width: '90%',
        height: 450,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Motitle: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modaltext: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    body: {
        backgroundColor: 'white',
        width: '95%',
        height: 100,
        marginBottom: 5,
        paddingHorizontal: 5,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: '100%',
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 15,
        color: 'black',
    },
    dropdown: {
        height: 50,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'right',
        borderWidth: 0.6
    },
    dropstyle: {
        color: 'black',
        fontSize: 18,
    },
    droptext: {
        fontSize: 18,
        color: 'black',
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
})