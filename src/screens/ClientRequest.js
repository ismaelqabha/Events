import React, { useContext, useEffect, useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, Alert, Modal, ToastAndroid } from 'react-native';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';
import { ScreenNames } from '../../route/ScreenNames';
import moment from 'moment';
import Entypo from "react-native-vector-icons/Entypo";
import { addNewRequest, createNewEvent, deleteRequestbyId, getEventList, getEventsInfo } from '../resources/API';
import { colors } from '../assets/AppColors';
import RequestDetail from '../components/RequestDetail';
import { SelectList } from 'react-native-dropdown-select-list';




const ClientRequest = (props) => {
    const { data } = props?.route.params
    const { userId } = useContext(UsersContext);
    const {
        requestedDate,
        resDetail,
        setResDetail,
        requestInfo, setRequestInfo,
        eventInfo, setEventInfo,
        eventTypeInfo, setEventTypeInfo } = useContext(SearchContext);

    const [date, setDate] = useState(new Date());
    const [IveEvent, setIveEvent] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectTime, setSelectTime] = useState(true);

    const [fileEventName, setfileEventName] = useState();
    const [requestStatus, setRequestStatus] = useState('')
    const [requestCost, setRequestCost] = useState()
    const [requestDiscount, setRequestDiscount] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [choosenEvents, setChoosenEvents] = useState([])

    const [eventTypeName, setEventTypeName] = useState()
    const [eventName, setEventName] = useState()
    const [eventTypeId, setEventTypeId] = useState()


    const creatNewRequest = () => {
        const newRequestItem = {
            ReqServId: data?.service_id,
            ReqUserId: userId,
            ReqStatus: requestStatus,
            ReqDate: moment(date).format('DD/MM/YYYY, h:mm:ss a'),
            Cost: requestCost,
            discountPercentage: requestDiscount,
            reservationDetail: resDetail
        }
        addNewRequest(newRequestItem).then(res => {
            const req = requestInfo || [];
            req.push(newRequestItem)
            setRequestInfo([...req])
        })
    }
    const onModalCancelPress = () => {
        setShowModal(false)
    }
    const onModalSavePress = () => {
        if (fileEventName !== undefined) {
            if (eventName !== undefined) {
                getEventTypeID(eventName)
                creatNewEvent()
                ToastAndroid.showWithGravity('تم اٍنشاء مناسبة بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )

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
    const creatNewEvent = () => {
        const newEventItem = {
            userId: userId,
            eventName: fileEventName,
            eventTitleId: eventTypeId
        }
        createNewEvent(newEventItem).then(res => {
            const evnt = eventInfo || [];
            evnt.push(newEventItem)
            setEventInfo([...evnt])
        })
    }

    const onPressRequest = () => {
        // setrequestedDate([])
        // console.log("res detail ", resDetail);
        // console.log("res detail lenght ", resDetail.length);
        // props.navigation.navigate(ScreenNames.ClientEvents, { data: { ...data }, isFromAddEventClick: true })
    }

    const onPressHandler = () => {
        // setisFromRequestScreen(false)
        // removeRequest()
        props.navigation.goBack();
    }

    const getEventsfromApi = () => {
        getEventsInfo({ userId: userId }).then(res => {
            if (res.message == 'No Event') {
                setIveEvent(false)
            } else {
                setIveEvent(true)
                setEventInfo(res)
            }
        })
    }

    const getEventsType = () => {
        getEventList({}).then(res => {
            setEventTypeInfo(res)

        })
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
        const eventTypeId = eventTypeInfo[eventTypeIndex].Id
        setEventTypeId(eventTypeId)
    }

    useEffect(() => {
        getEventsfromApi()
    }, [])


    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.txt}>طلب حجز</Text>
            </View>
        )
    }

    // render reservation Dates
    const renderRequestedDates = () => {
        if (Array.isArray(requestedDate)) {
            return requestedDate.map((item, index) => {
                return (
                    renderDate(item, index)
                )
            })
        } else {
            return (
                <View style={styles.dateItem1}>
                    <Text style={styles.dateTxtPressed}>{moment(requestedDate).format('dddd')}</Text>
                    <Text style={styles.dateTxtPressed}>{moment(requestedDate).format('L')}</Text>
                </View>
            )
        }
    }
    const handleDatePress = (item) => {
        setSelectedDate(item)
    }
    const renderDate = (item, index) => {
        return (
            <Pressable onPress={() => handleDatePress(item)} key={index} style={selectedDate === item ? styles.dateItemPressed : styles.dateItem}
            >
                <Text style={selectedDate === item ? styles.dateTxtPressed : styles.dateTxt}>
                    {moment(item).format('dddd')}</Text>
                <Text style={selectedDate === item ? styles.dateTxtPressed : styles.dateTxt}>
                    {moment(item).format('L')}
                </Text>
            </Pressable>
        )
    }

    // render service logo and title
    const renderServiceImage = () => {
        const index = data.images[0].logoArray?.findIndex((val) => val === true)
        const image = data.images[0]?.serviceImages[index]
        return <Image
            source={{ uri: image }}
            style={styles.img}
        />
    }
    const renderServiceinfo = () => {
        return <View >
            <View style={styles.titleView}>
                <View style={{ margin: 10, alignItems: 'flex-end' }}>
                    <Text style={styles.titleText}>{data?.title}</Text>
                    <Text style={styles.titleText}>{data?.address}</Text>
                    <Text style={styles.titleText}>5★</Text>
                </View>
                {renderServiceImage()}
            </View>
        </View>;
    }

    const renderRequestInfo = () => {
        return <View style={styles.requestDetailView}>
            <RequestDetail {...data} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </View>
    }
    const renderFoter = () => {
        return (
            <View style={styles.foter}>
                <Pressable onPress={() => onPressRequest()}
                    disabled={selectTime ? false : true}
                    style={[styles.btnview, selectTime ? styles.btnview : styles.btnRequestApproved]}
                >
                    <Text style={styles.btntext}>ارسال طلب</Text>
                </Pressable>
            </View>
        )
    }
    const handleEventChoosen = (eventId) => {
        setChoosenEvents(prevEvents => {
            // Check if eventId exists in prevEvents array
            const eventIndex = prevEvents.indexOf(eventId);

            // If eventId is not in prevEvents, add it
            if (eventIndex === -1) {
                return [...prevEvents, eventId];
            } else {
                // If eventId is in prevEvents, remove it
                const updatedEvents = [...prevEvents];
                updatedEvents.splice(eventIndex, 1);
                return updatedEvents;
            }
        });
    }
    // Event Section
    const onPressModalHandler = () => {
        getEventsType()
        setShowModal(true);
        getEventTypeInfo()
    }
    const renderEvents = () => {
        return (<View style={styles.eventView}>
            <Text style={styles.detailText}>اِضغط على المناسبة التي تنوي ارفاق الطلب لها</Text>
            {IveEvent &&
                renderEventInfo()
            }
            <Pressable style={styles.eventItem} onPress={onPressModalHandler}>
                <Text style={styles.detailText}>اِنشاء مناسبة جديدة</Text>
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
    const getEventLogo = (id) => {
        const logo = eventTypeInfo.filter(item => item.Id === id)
        return logo
    }
    const filtereventInfo = () => {
        const currentDate = moment(date, "YYYY-MM-DD")
        let day = currentDate.format('D')
        let month = currentDate.format('M')
        let year = currentDate.format('YYYY')
        let completeDate = year + '-' + month + '-' + day
        return eventInfo.filter(item => {
            const EDate = item.eventDate
            const CDate = completeDate
            const result = EDate >= CDate
            return result
        })
    }
    const renderEventInfo = () => {
        const eventData = filtereventInfo()
        return eventData.map((item, index) => {
            const document = getEventLogo(item.eventTitleId)
            return (
                <Pressable key={index} style={styles.eventItem} onPress={() => handleEventChoosen(item.EventId)}>
                    <View >
                        <Text style={styles.detailText}>{item.eventName}</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Image style={styles.iconImg} source={{ uri: document[0].eventImg }} />
                    </View>

                </Pressable>
            )
        })

    }
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

    return (
        <View style={styles.container}>
            {renderHeader()}

            <ScrollView contentContainerStyle={styles.home}>
                {renderServiceinfo()}
                <View style={styles.labelView}>
                    <Text style={styles.detailText}>تفاصيل الحجز</Text>
                </View>

                <View style={styles.DateView}>
                    <ScrollView horizontal={true}>
                        {renderRequestedDates()}
                    </ScrollView>
                </View>
                {renderRequestInfo()}
                {renderEvents()}
                <View style={styles.body}>
                    <Text style={styles.text}>لن يتم تأكيد الحجز حتى يقوم صاحب الخدمة بقبول الطلب خلال 24 ساعة</Text>
                </View>
                {renderFoter()}
            </ScrollView>
            {setModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
    },
    header: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        marginVertical: 2.5,
        height: 150,
        alignItems: 'center',
        paddingRight: 10
    },
    DateView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: 5,
        width: "100%",
        height: 80,
        alignItems: 'flex-end',
        //borderWidth: 1
    },
    labelView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        width: "100%",
        height: 40,
    },
    dateItem: {
        width: 120,
        height: 50,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'lightgray',
        marginRight: 20,
        borderRadius: 5,
    },
    dateItemPressed: {
        width: 120,
        height: 50,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: colors.puprble,
        marginRight: 20,
        borderRadius: 5,
    },
    dateItem1: {
        borderRadius: 5,
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'lightgray',
        marginRight: 20
        // backgroundColor: colors.puprble
    },
    dateTxt: {
        fontSize: 15,
        color: colors.puprble,
        textAlign: 'center'
    },
    dateTxtPressed: {
        fontSize: 15,
        color: colors.puprble,
        textAlign: 'center'
    },

    requestDetailView: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 5,
    },

    detailText: {
        fontSize: 20,
        color: colors.puprble,
        marginRight: 20
    },
    titleText: {
        fontSize: 16,
        color: colors.puprble,

    },
    eventView: {
        backgroundColor: 'white',
        marginVertical: 2.5,
        width: '100%',
        paddingRight: 10,
        paddingVertical: 10
    },
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%",
        marginVertical: 5,
    },
    myEvents: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "70%",
        height: 60,
        alignSelf: 'center',
        marginVertical: 5,
        backgroundColor: 'lightgray',
        elevation: 5,
        borderRadius: 10
    },

    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    iconImg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50
    },

    modaltext: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    text: {
        fontSize: 20,
        color: 'black'
    },
    txt: {
        fontSize: 20,
        marginRight: 20,
        color: colors.puprble
    },

    body: {
        backgroundColor: 'white',
        width: '100%',
        marginVertical: 2.5,
        paddingHorizontal: 5
    },

    icon: {
        marginLeft: 10,
    },
    img: {
        width: 150,
        height: 120,
        borderRadius: 15,
        // backgroundColor: 'black',
        justifyContent: 'flex-end'
    },

    foter: {
        alignItems: 'flex-end',
        width: '100%'
    },
    btntext: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'white',
    },
    btnview: {
        backgroundColor: colors.puprble,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        margin: 10
    },
    btnRequestApproved: {
        backgroundColor: colors.puprble,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        elevation: 5,
        opacity: 0.3
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
})

export default ClientRequest;
