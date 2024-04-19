import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from "../../route/ScreenNames";
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { updateEvent, updateRequest as updateRequestAPI } from '../resources/API';
import moment from 'moment';
import 'moment/locale/ar-dz'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { colors } from '../assets/AppColors';



const EventsCard = (props) => {
    const { isFromAddEventClick, service_id } = props
    const navigation = useNavigation();
    const { eventName, eventDate, eventCost, eventTitleId, EventId } = props;
    const [date, setDate] = useState(new Date())
    const [editing, setEditing] = useState(false)


    const { eventTypeInfo, requestInfo, RequestIdState, userId, eventInfo, requestInfoAccUser,
        setEventInfo, TimeText, setRequestInfo, requestedDate } = useContext(SearchContext);

    

    const requestItemIndex = requestInfo?.findIndex(item => item.request_Id === RequestIdState && item.ReqUserId === userId);
    const eventItemIndex = eventInfo?.findIndex(item => item.EventId === props.EventId && item.userId === userId)


    const getEventTitle = () => {
        return eventTypeInfo.filter(item => {
            return item.Id === eventTitleId
        })
    }

    const eventType = getEventTitle()

    const filterReqAccEvent = () => {
        return requestInfoAccUser.filter(item => {
            return item.requestInfo.ReqEventId === EventId
        })
    }
 const [total, setTotal] = useState ()
    const getTotalCost = () => {
        let sumTotal = 0
        const data = filterReqAccEvent()
       
        data.forEach(element => {
            console.log(element.requestInfo.Cost);
            sumTotal = sumTotal + element.requestInfo.Cost
            setTotal(sumTotal)
        });
         console.log("total", total);
        // return sum
       
        
    }

   


    useEffect(() => {
        getTotalCost()
    }, [])

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


        // console.log("Update request");
        // UpdateRequest()
        // UpdateEventInfo()
        // navigation.navigate(ScreenNames.ClientBook, { data: { ...props } })

    }
    const whenPressLong = () => {
        setEditing(true)
    }
    //console.log("eventDate.length", eventDate.length);
    return (
        <View style={styles.container}>
            <Pressable style={styles.card} onPress={onCaardPress} onLongPress={whenPressLong}>

                <View style={styles.titlee}>
                    <Text style={styles.eventTxt}>{eventName}</Text>
                    {editing &&
                        <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
                            <Pressable style={{ margin: 10 }} //onPress={() => { props.deleteItem(props.subDetail_Id) }}
                            >
                                <AntDesign name='delete' size={20} color={colors.silver} />
                            </Pressable>
                            <Pressable style={{ margin: 10 }} //onPress={() => { props.openEdit(props) }}
                            >
                                <Feather name='edit' size={20} color={colors.silver} />
                            </Pressable>
                        </View>}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: "50%" }}>

                    <View style={styles.rightView}>
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

                    <View style={styles.leftView}>
                        <Image style={styles.eventLogo} source={{ uri: eventType[0].eventImg }} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text}>
                        {eventCost ? ("₪" + eventCost) : 0}
                    </Text>
                </View>
            </Pressable>
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
})

export default EventsCard;
