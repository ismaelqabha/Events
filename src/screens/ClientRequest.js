import React, { useContext, useEffect, useRef, useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, Alert, Modal, ToastAndroid } from 'react-native';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';
import moment from 'moment';
import Entypo from "react-native-vector-icons/Entypo";
import { addNewRequest, createNewEvent, getEventList, getEventsInfo, updateEvent } from '../resources/API';
import { colors } from '../assets/AppColors';
import RequestDetail from '../components/RequestDetail';
import { SelectList } from 'react-native-dropdown-select-list';

import { calculateTotalPrice, showMessage } from '../resources/Functions'
import Recipt from '../components/ProviderComponents/recipt';



const ClientRequest = (props) => {
    const { data } = props?.route.params
    const { userId } = useContext(UsersContext);
    const {
        requestedDate,
        resDetail,
        setResDetail,
        requestInfo, setRequestInfo,
        eventInfo, setEventInfo,
        eventTypeInfo, setEventTypeInfo, totalPrice, setTotalPrice } = useContext(SearchContext);


    const [date, setDate] = useState(new Date());
    const [IveEvent, setIveEvent] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDetailRecipt, setShowDetailRecipt] = useState(false)
    const [selectTime, setSelectTime] = useState(true);

    const [fileEventName, setfileEventName] = useState();
    const [selectedDate, setSelectedDate] = useState()

    const [requestDiscount, setRequestDiscount] = useState()

    const [eventTypeName, setEventTypeName] = useState()
    const [eventName, setEventName] = useState()
    const [eventTypeId, setEventTypeId] = useState()
    const [eventTotalCost, setEventTotalCost] = useState()
    const [EVENTID, setEVENTID] = useState()
    const [updatedEventDate, setUpdatedEventDate] = useState()

    const scrollViewRef = useRef();
    const targetComponentRef = useRef();

    const [pressed, setPressed] = useState([])
    const [selectedEvent, setSelectedEvent] = useState('');

    let eventItemIndex

    const onPressHandler = () => {
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

    const handleScrollToPosition = () => {
        if (targetComponentRef.current) {
            targetComponentRef.current.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                    // Scroll to the position of the component
                    scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
                }
            );
        }
    };


    const checkAllDetails = () => {
        if (typeof totalPrice !== 'number' || totalPrice <= 0) {
            showMessage("Please choose proper services.");
            return false;
        }

        if (!data || !data._id) {
            showMessage("Invalid service data.");
            return false;
        }

        if (!userId) {
            showMessage("Invalid user ID.");
            return false;
        }

        if (!Array.isArray(resDetail) || resDetail.length === 0) {
            showMessage("Please provide reservation details.");
            return false;
        }

        // Iterate through each reservation detail and perform checks
        for (const detail of resDetail) {
            if (!detail.reservationDate || !detail.startingTime || !detail.EndTime ||
                detail.numOfInviters === null || !Array.isArray(detail.subDetailId) ||
                !Array.isArray(detail.offerId) || (detail.subDetailId.length === 0 &&
                    detail.offerId.length === 0)) {
                showMessage("Please fill all reservation details.");
                return false;
            }
        }

        return true;
    };

    const onServiceRequest = () => {
        if (!checkAllDetails()) {
            return
        }
        delete resDetail["campaigns"]
        const requestBody = {
            ReqDate: moment(date).format('YYYY-MM-DD, h:mm a'),
            ReqStatus: 'waiting reply',
            ReqEventId: selectedEvent,
            Cost: totalPrice,
            ReqServId: data?.service_id,
            ReqUserId: userId,
            reservationDetail: resDetail,
        }

        addNewRequest(requestBody).then((res) => {
            if (res.message && res.message === 'Request Created') {
                showMessage("Request Created successfully")
                UpdateEventInfo()
            } else {
                showMessage("failed to create request")
            }
        }).catch((E) => {
            console.error("error creating request E:", E);
        })
        // setrequestedDate([])
        // props.navigation.navigate(ScreenNames.ClientEvents, { data: { ...data }, isFromAddEventClick: true })
    }


    useEffect(() => {
        getEventsfromApi()
    }, [])

    useEffect(() => {
        setSelectedDate(requestedDate[0])
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

    // render service logo and title
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
    const renderServiceImage = () => {
        const index = data.images[0].logoArray?.findIndex((val) => val === true)
        const image = data.images[0]?.serviceImages[index]
        return <Image
            source={{ uri: image }}
            style={styles.img}
        />
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
            <Pressable ref={targetComponentRef} onPress={() => handleDatePress(item)} key={index} style={selectedDate === item ? styles.dateItemPressed : styles.dateItem}
            >
                <Text style={selectedDate === item ? styles.dateTxtPressed : styles.dateTxt}>
                    {moment(item).format('dddd')}</Text>
                <Text style={selectedDate === item ? styles.dateTxtPressed : styles.dateTxt}>
                    {moment(item).format('L')}
                </Text>
            </Pressable>
        )
    }


    /// request information and reservation detail
    const renderRequestInfo = () => {
        return <View style={styles.requestDetailView}>
            <RequestDetail {...data} selectedDate={selectedDate} setSelectedDate={setSelectedDate} handleScrollToPosition={handleScrollToPosition} pressed={pressed} setPressed={setPressed} />
        </View>
    }


    const renderFoter = () => {
        return (
            <View style={styles.foter}>
                <Pressable onPress={() => onServiceRequest()}
                    disabled={selectTime ? false : true}
                    style={[styles.btnview, selectTime ? styles.btnview : styles.btnRequestApproved]}
                >
                    <Text style={styles.btntext}>ارسال طلب</Text>
                </Pressable>
            </View>
        )
    }

    // Event Section
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
    const creatNewEvent = () => {
        const newEventItem = {
            userId: userId,
            eventName: fileEventName,
            eventTitleId: eventTypeId,
            eventDate: requestedDate,
            eventCost: eventTotalCost
        }
        createNewEvent(newEventItem).then(res => {
            const evnt = eventInfo || [];
            evnt.push(newEventItem)
            setEventInfo([...evnt])
        })
    }
    const onPressModalHandler = () => {
        getEventsType()
        setShowModal(true);
        getEventTypeInfo()
    }
    const renderEvents = () => {
        return (<View style={styles.eventView}>
            <Text style={styles.text}>اِختر او قم باٍنشاء مناسبة</Text>
            {IveEvent &&
                renderEventInfo()
            }
            <Pressable style={styles.eventItem} onPress={onPressModalHandler}>
                <Text style={styles.text}>اِنشاء مناسبة جديدة</Text>
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

    const UpdateEventInfo = () => {

        const newEventItem = {
            EventId: EVENTID,
            eventCost: eventTotalCost,
            eventDate: updatedEventDate
        }

        updateEvent(newEventItem).then(res => {
            const ev = eventInfo || [];
            if (eventItemIndex > -1) {
                ev[eventItemIndex] = newEventItem;
            }

            if (res.message === 'Updated Sucessfuly') {
                setEventInfo([...ev, newEventItem])
                showMessage("تم التعديل")
            } else {
                showMessage("لم يتم التعديل")
            }

        }).catch((E) => {
            console.error("error creating request E:", E);
        })

    }
    const UpdateEventCostState = (eventId) => {
        eventItemIndex = eventInfo?.findIndex(item => item.EventId === eventId && item.userId === userId)
        const evCost = eventInfo[eventItemIndex].eventCost
        const lastTotal = evCost + totalPrice
        setEventTotalCost(lastTotal)
        const newExitDate = eventInfo[eventItemIndex].eventDate

        if (!(newExitDate.includes(requestedDate))) {
            newExitDate.push(requestedDate)
        }
        setUpdatedEventDate(newExitDate)
        setEVENTID(eventId)
    }
    const whenEventPress = (eventId) => {
        setSelectedEvent(eventId || '');
        UpdateEventCostState(eventId)
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
                            onPress={() => whenEventPress(item.EventId)}
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

    // Call the function to calculate the initial total price

    useEffect(() => {
        calculateTotalPrice(resDetail, requestedDate, data, setTotalPrice);
    }, [requestedDate, resDetail]);




    return (
        <View style={styles.container}>
            {renderHeader()}

            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.home}>
                {renderServiceinfo()}
                <View style={styles.DateView}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        {renderRequestedDates()}
                    </ScrollView>
                </View>
                {renderRequestInfo()}
                {renderEvents()}

                <Recipt
                    totalPrice={totalPrice}
                    requestedDate={requestedDate}
                    resDetail={resDetail}
                    showDetailRecipt={showDetailRecipt}
                    setShowDetailRecipt={setShowDetailRecipt}
                    data={data}
                />
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
        backgroundColor: colors.silver,
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
        marginVertical: 5,
        width: '95%',
        height: 150,
        alignSelf: 'center',
        alignItems: 'center',
        paddingRight: 10,
        borderRadius: 15
    },
    DateView: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        marginBottom: 5,
        width: "95%",
        height: 80,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        //borderWidth: 1
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
        //justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: colors.silver,
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
        marginBottom: 5,
        width: '95%',
        paddingRight: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        borderRadius: 15
    },
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%",
        marginVertical: 5,
    },
    selectEvent: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: 'white'
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
        marginLeft: 10
    },

    modaltext: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    text: {
        fontSize: 15,
        marginRight: 10,
        color: colors.puprble
    },
    txt: {
        fontSize: 20,
        marginRight: 20,
        color: colors.puprble
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
