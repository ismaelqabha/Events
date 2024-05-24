import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal, Image, Text, TextInput, ToastAndroid, Alert } from 'react-native';
import EventsCard from '../components/EventsCard';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values'
import DateTimePicker from '@react-native-community/datetimepicker';
import { createNewEvent, getEventsInfo, getRequestInfoWithservice, updateEvent } from '../resources/API';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { SelectList } from 'react-native-dropdown-select-list';
import UsersContext from '../../store/UsersContext';
import { colors } from '../assets/AppColors';


const ClientEvents = (props) => {
    const { isFromAddEventClick, data } = props.route?.params || {}
    const [showModal, setShowModal] = useState(false);
    const [fileEventName, setfileEventName] = useState();
    const { userId } = useContext(UsersContext);
    const { eventInfo, setEventInfo, eventTypeInfo, setRequestInfoAccUser } = useContext(SearchContext);
    const [eventTypeName, setEventTypeName] = useState()
    const [eventName, setEventName] = useState()

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [dateOfEvent, setDateOfEvent] = useState([])
    // const [eventTypeId, setEventTypeId] = useState()
    // console.log("eventInfo", eventInfo);

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const onPressModalHandler = () => {
        setShowModal(true);
    }
    const onModalCancelPress = () => {
        setShowModal(false)
    }
    const onModalSavePress = () => {
        if (fileEventName !== undefined) {
            if (eventName !== undefined) {
                const evTitID = getEventTypeID(eventName)

                creatNewEvent(evTitID)
                ToastAndroid.showWithGravity('تم اٍنشاء مناسبة بنجاح',
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
    // const getEventsfromApi = () => {
    //     getEventsInfo({ userId: userId }).then(res => {
    //         setEventInfo(res)
    //     })
    // }

    // const getRequestfromApi = () => {
    //     getRequestInfoWithservice({ ReqUserId: userId }).then(res => {
    //         setRequestInfoAccUser(res)
    //     })
    // }

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

    const eventEditing = (eventID) => {
        const id = getEventTypeID(props.eventTitleId)
        setfileEventName(props.eventName)
        // setEventName()
        setDateOfEvent(props.eventDate)
        setShowModal(true)
    }

    const creatNewEvent = (eventTypeId) => {
        const newEventItem = {
            userId: userId,
            eventName: fileEventName,
            eventTitleId: eventTypeId,
            eventDate: dateOfEvent,
            eventCost: 0
        }
        createNewEvent(newEventItem).then(res => {
            const evnt = eventInfo || [];
            evnt.push(newEventItem)
            setEventInfo([...evnt])
        })
    }

    useEffect(() => {
        // getEventsfromApi()
        getEventTypeInfo()
        // getRequestfromApi()
    }, [])

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}>
                    <AntDesign
                        style={styles.iconBack}
                        name={"left"}
                        color={colors.puprble}
                        size={20} />
                </Pressable>

                <Text style={styles.txt}>منسباتي</Text>
                <Pressable
                    onPress={onPressModalHandler}
                >
                    <Entypo
                        style={styles.icon}
                        name={"plus"}
                        color={colors.puprble}
                        size={30} />
                </Pressable>
            </View>
        )
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
                        <Text style={styles.datetxt}>{dateOfEvent || "تاريخ المناسبة"}</Text>
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
    const createEventModal = () => {
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
                            {/* <Text style={styles.text}>اسم المناسبة</Text> */}
                            <View style={{ width: '100%', marginTop: 20 }}>
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
                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='ادخل اسم المناسبة '
                                onChangeText={setfileEventName}
                            />
                            {renderExpireDate()}
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

    // console.log("eventInfo",eventInfo);
    const query = () => {
        return eventInfo || [];
    }
    const renderCard = ({ item }) => {
        return <EventsCard  {...item}  eventEditing={eventEditing} />;
    };

    return (
        <View style={styles.container}>
            {renderHeader()}

            <FlatList
                data={query()}
                renderItem={renderCard}
                numColumns={1}
            />
            {createEventModal()}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
    },
    iconBack: {
        marginLeft: 10
    },
    icon: {
        marginRight: 10
    },
    txt: {
        fontSize: 20,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        color: colors.puprble,
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
    Motitle: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
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
    viewDate: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        //backgroundColor: 'lightgray',
        justifyContent: 'flex-end',
        borderWidth: 0.6,
        borderColor: 'gray',
    },
    datetxt: {
        fontSize: 15,
        marginRight: 90,
        color: colors.puprble,
    },
})

export default ClientEvents;
