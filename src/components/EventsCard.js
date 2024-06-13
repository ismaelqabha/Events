import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Pressable, Modal, Alert, ToastAndroid, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from "../../route/ScreenNames";
import SearchContext from '../../store/SearchContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { deleteEventInfo, updateEvent } from '../resources/API';
import moment from 'moment';
import 'moment/locale/ar-dz'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from '../assets/AppColors';



const EventsCard = (props) => {
    
    const navigation = useNavigation();
    const { eventName, eventDate, eventCost, eventTitleId, EventId , eventEditing , setIsRefreshing } = props;
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false)
    const [deleteEvent, setDeleteEvent] = useState(false)

    const [eventTypeName, setEventTypeName] = useState()
    const [fileEventName, setfileEventName] = useState();
    const [dateOfEvent, setDateOfEvent] = useState([])
    const [eventType, setEventType] = useState()

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const { eventTypeInfo, userId, eventInfo, setEventInfo } = useContext(SearchContext);

    const eventItemIndex = eventInfo?.findIndex(item => item.EventId === EventId && item.userId === userId)

    // console.log("eventTitleId", eventTitleId);

    const getEventTitle = () => {
        return eventTypeInfo.filter(item => {
            return item.Id === eventTitleId
        })
    }

    const eventTitle = getEventTitle()
    // console.log("eventTitle", eventTitle);

    useEffect(() => {
        getEventTypeInfo()

    }, [])

    //// editing event info section
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
        const TypeId = eventTypeInfo[eventTypeIndex].Id
        return TypeId
    }
    const onModalCancelPress = () => {
        setShowModal(false)
    }
    const onModalSavePress = () => {
        if (fileEventName !== undefined) {
            if (eventType !== undefined) {
                const evTitID = getEventTypeID(eventType)

                updateEventInfo(evTitID)
                ToastAndroid.showWithGravity('تم التعديل',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
                setShowModal(false)
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
    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        setDateOfEvent(fDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const renderExpireDate = () => {
        return (
            <View>
                <Pressable onPress={() => showMode('date')} >
                    <View style={styles.viewDate}>
                        <Text style={styles.datetxt}>{dateOfEvent}</Text>
                        <Entypo
                            name='calendar'
                            style={{ fontSize: 30, color: colors.silver, paddingRight: 20 }}
                        />
                    </View>
                </Pressable>
                {show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='calendar'
                        onChange={onChange}
                    />
                )}
            </View>
        )
    }
    const updateEventModal = () => {
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
                            <View style={{ width: '100%', marginTop: 20 }}>
                                <SelectList
                                    data={eventTypeName}
                                    setSelected={val => {
                                        setEventType(val);
                                    }}
                                    placeholder={eventTitle[0].eventTitle}
                                    boxStyles={styles.dropdown}
                                    inputStyles={styles.droptext}
                                    dropdownTextStyles={styles.dropstyle}
                                />
                            </View>
                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder={eventName}
                                onChangeText={setfileEventName}
                            />
                            {eventDate.length < 1 && renderExpireDate()}
                        </View>
                        <View style={styles.btn}>
                            <Pressable onPress={() => onModalCancelPress()} >
                                <Text style={styles.modaltext}>الغاء الامر</Text>
                            </Pressable>
                            <Pressable onPress={() => onModalSavePress()} >
                                <Text style={styles.modaltext}>حفظ</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }
    const updateEventInfo = (eventTypeId) => {
        const editEventItem = {
            EventId: EventId,
            eventName: fileEventName,
            eventTitleId: eventTypeId,
            eventDate: dateOfEvent,
        }
        updateEvent(editEventItem).then(res => {
            
            const ev = eventInfo || [];
            if (eventItemIndex > -1) {
                ev[eventItemIndex] = editEventItem;
            }
             setEventInfo([...ev])
             setIsRefreshing(true)
            console.log("Ok");
            // eventEditing(ev)
        })
    }

    /// deleting event info section

    const deletingEventPress = () => {
        Alert.alert(
            'تأكيد',
            'هل انت متأكد من الحذف ؟ ',
            [
                {
                    text: 'الغاء الامر',
                    style: 'cancel',
                },
                {
                    text: 'حذف',
                    onPress: () => removingEvent(),
                    style: 'destructive', // Use 'destructive' for a red-colored button
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    }
    const removingEvent = () => {
        deleteEventInfo({ EventId: EventId }).then(res => {
            if (res.message === "Deleted Sucessfuly") {
                const delData = eventInfo
                const newData = delData?.filter(item => item !== EventId)
                setEventInfo([...newData])
            }
        })

        ToastAndroid.showWithGravity('تم اٍلالغاء بنجاح',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }



    // console.log("eventType", eventType);

    // const UpdateRequest = () => {
    //     const newRequestInfo = {
    //         RequestId: RequestIdState,
    //         ReqEventId: props.EventId,
    //         reservationTime: TimeText
    //     }
    //     updateRequestAPI(newRequestInfo).then(res => {
    //         const req = requestInfo || [];
    //         if (requestItemIndex > -1) {
    //             req[requestItemIndex] = newRequestInfo;
    //         }
    //         setRequestInfo([...req])
    //     })
    // }
    // const UpdateEventInfo = () => {
    //     const newEventItem = {
    //         EventId: props.EventId,
    //         userId: userId,
    //         eventDate: moment(requestedDate).format('L'),
    //         // eventCost: "50890",
    //     }
    //     updateEvent(newEventItem).then(res => {
    //         const ev = eventInfo || [];
    //         if (eventItemIndex > -1) {
    //             ev[eventItemIndex] = newEventItem;
    //         }
    //         setEventInfo([...ev, newEventItem])
    //     })
    // }


    const onCaardPress = () => {
        navigation.navigate(ScreenNames.ClientBook, { data: { ...props } })
    }

    const whenPressLong = () => {
        if (eventDate.length < 1 && eventCost === 0) {
            setDeleteEvent(true)
        }
        setEditing(true)
    }


    const eventEditPress = () => {
        setShowModal(true)
    }
    //console.log("eventDate.length", eventDate.length);
    return (
        <View style={styles.container}>
            <Pressable style={styles.card} onPress={onCaardPress} onLongPress={whenPressLong}>

                <View style={styles.titlee}>
                    <Text style={styles.eventTxt}>{eventName}</Text>

                    <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>

                        {deleteEvent &&
                            <Pressable style={{ margin: 10 }} onPress={deletingEventPress}>
                                <AntDesign name='delete' size={20} color={colors.silver} />
                            </Pressable>}

                        {editing &&
                            <Pressable style={{ margin: 10 }} onPress={eventEditPress}>
                                <Feather name='edit' size={20} color={colors.silver} />
                            </Pressable>}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: "50%" }}>

                    <View style={styles.rightView}>

                        {eventDate.length === 0 ? <Text style={styles.text}>الموعد غير محدد</Text> :
                            <View>
                                {eventDate.length > 1 ?
                                    <Text style={styles.text}>في أكثر من يوم</Text> :
                                    <View>
                                        <Text style={styles.text}>
                                            {moment(eventDate[0]).format('dddd')}
                                        </Text>
                                        <Text style={styles.text}>
                                            {moment(eventDate[0]).format('L')}
                                        </Text>
                                    </View>}
                            </View>
                        }
                    </View>

                    <View style={styles.leftView}>
                        <Image style={styles.eventLogo} source={{ uri: eventTitle[0].eventImg }} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text}>
                        {eventCost ? ("₪" + eventCost) : 0}
                    </Text>
                </View>
            </Pressable>
            {updateEventModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    card: {
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
        width: '90%',
        height: 200,
        // marginTop: 30,
        margin: 5
    },
    titlee: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "25%",

    },
    eventTxt: {
        fontSize: 15,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        color: colors.puprble,
    },
    footer: {
        width: '100%',
        height: "25%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.silver,
        alignItems: 'center',
        justifyContent: 'center'
    },

    leftView: {
        width: '50%',
        // height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventLogo: {
        width: 100,
        height: 100,
    },
    rightView: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 10,
        fontSize: 18,
        color: colors.puprble,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    detailModal: {
        width: '90%',
        height: 480,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    body: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 15,
        textAlign: 'center'
    },
    droptext: {
        fontSize: 15,
        // color: 'black',
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
        marginVertical: 20
    },
    viewDate: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderWidth: 0.6,
        borderColor: 'gray',
    },
    datetxt: {
        fontSize: 15,
        marginRight: 90,
        color: colors.puprble,
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

export default EventsCard;
