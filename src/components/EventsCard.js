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
import UsersContext from '../../store/UsersContext';



const EventsCard = (props) => {

    const navigation = useNavigation();
    const { eventName, eventDate, eventCost, eventTitleId, EventId, setIsRefreshing } = props;
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false)
    const [deleteEvent, setDeleteEvent] = useState(false)

    const [eventTypeName, setEventTypeName] = useState()
    const [fileEventName, setfileEventName] = useState(null);
    const [dateOfEvent, setDateOfEvent] = useState([])
    const [eventType, setEventType] = useState(null)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const { eventTypeInfo, eventInfo, setEventInfo, requestInfoAccUser } = useContext(SearchContext);
    const { userId } = useContext(UsersContext);

    const eventItemIndex = eventInfo?.findIndex(item => item.EventId === EventId && item.userId === userId)
    var evDate
    var todayDate = new Date();

    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    todayDate.setMilliseconds(0);
    //console.log("requestInfoAccUser", requestInfoAccUser[0].requestInfo);

    const getEventTitle = () => {
        return eventTypeInfo.filter(item => {
            return item.Id === eventTitleId
        })
    }

    const eventTitle = getEventTitle()

    const filterReqAccEventFile = () => {
        if (requestInfoAccUser.message !== "no Request") {
            return requestInfoAccUser?.filter(item => {
                return item.requestInfo.ReqEventId === EventId
            })
        } else {
            return []
        }
    }


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
    const getTitleEventType = (id) => {
        const eventTypeIndex = eventTypeInfo.findIndex(item => item.Id === id)
        const Typetitle = eventTypeInfo[eventTypeIndex].eventTitle
        return Typetitle
    }

    const onModalCancelPress = () => {
        setDeleteEvent(false)
        setEditing(false)
        setShowModal(false)
    }
    const onModalSavePress = () => {
        if (fileEventName !== null) {
            if (eventType !== null) {
                const title = getTitleEventType(eventTitleId)
                const val = eventType || title
                const evTitID = getEventTypeID(val)

                updateEventInfo(evTitID)

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
        evDate = new Date(fDate)
        if (evDate > todayDate) {
            setDateOfEvent(fDate);
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء اختيار تاريخ أكبر من تاريخ اليوم',
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
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const renderMultibleDate = () => {
        return eventDate.map(item => {
            return (
                <View style={styles.viewMultiDate}>
                    <Text style={styles.datetxt}>{item}</Text>
                </View>
            )
        })
    }
    const renderModalFooter = () => {
        return (
            <View style={styles.btn}>
                <Pressable onPress={onModalCancelPress} >
                    <Text style={styles.modaltext}>الغاء الامر</Text>
                </Pressable>
                <Pressable onPress={onModalSavePress} >
                    <Text style={styles.modaltext}>حفظ</Text>
                </Pressable>
            </View>
        )
    }
    const renderFileEventForm = () => {
        const reqData = filterReqAccEventFile()
        const title = getTitleEventType(eventTitleId)
        return (
            <View style={styles.body}>
                <View style={{ width: '100%' }}>
                    {reqData.length > 0 ?
                        <View style={styles.showTypeView}>
                            <Text>{title}</Text>
                        </View> :
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
                        </View>}
                </View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder={eventName}
                    onChangeText={setfileEventName}
                />
                <View style={{ width: '100%' }}>
                    {reqData.length > 0 ?
                        <View>
                            {eventDate.length > 1 ?
                                renderMultibleDate()
                                :
                                <View style={styles.viewDate}>
                                    <Text style={styles.datetxt}>{eventDate}</Text>
                                    <Entypo
                                        name='calendar'
                                        style={{ fontSize: 30, color: colors.silver, paddingRight: 20 }}
                                    />
                                </View>}
                        </View>
                        :
                        <Pressable onPress={() => showMode('date')} >
                            <View style={styles.viewDate}>
                                <Text style={styles.datetxt}>{dateOfEvent}</Text>
                                <Entypo
                                    name='calendar'
                                    style={{ fontSize: 30, color: colors.silver, paddingRight: 20 }}
                                />
                            </View>
                        </Pressable>}
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
                <View style={{ width: '100%' }}>
                    {renderModalFooter()}
                </View>

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
                        {renderFileEventForm()}
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
            eventCost: eventCost
        }
        updateEvent(editEventItem).then(res => {
            if (res.message === 'Updated Sucessfuly') {
                const ev = eventInfo || [];
                if (eventItemIndex > -1) {
                    ev[eventItemIndex] = editEventItem;
                }
                ToastAndroid.showWithGravity('تم التعديل',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
                setShowModal(false)
                setEventInfo([...ev])
                // setIsRefreshing(true)
                setDeleteEvent(false)
                setEditing(false)
            }
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
                const newData = delData?.filter(item => item?.EventId !== EventId)
                setEventInfo([...newData])

                ToastAndroid.showWithGravity('تم اٍلالغاء بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
            }
        })


    }

    const onCaardPress = () => {
        navigation.navigate(ScreenNames.ClientBook, { data: { ...props } })
    }

    const whenPressLong = () => {
        if (eventCost === 0) {
            setDeleteEvent(true)
        }
        setEditing(true)
    }

    const eventEditPress = () => {
        const val = getTitleEventType(eventTitleId)
        setEventType(val)
        setfileEventName(eventName)
        setDateOfEvent(eventDate)
        setShowModal(true)
    }

    const renderCard = () => {
        return (
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

        )
    }
    const renderPublicCard = () => {
        return (
            <Pressable style={styles.card2} onPress={onCaardPress}>
                <View style={styles.eventNameView}>
                    <Text style={styles.eventTxt}>{eventName === 'public event' && 'حجوزات عامة'}</Text>
                </View>
            </Pressable>
        )
    }
    return (
        <View style={styles.container}>
            {eventName === 'public event' ? renderPublicCard() : renderCard()}
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
        margin: 5
    },
    card2: {
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
        width: '90%',
        height: 80,
        margin: 5
    },
    titlee: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "25%",
    },
    eventNameView: {
        width: '100%',
        height: "90%",
        alignItems: 'center',
        justifyContent: 'center',

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
    viewMultiDate: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.6,
        borderColor: 'gray',
        marginBottom: 10
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
        position: 'absolute',
        bottom: -60
    },
    showTypeView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 15,
        color: 'black',
        marginTop: 20
    }
})

export default EventsCard;
