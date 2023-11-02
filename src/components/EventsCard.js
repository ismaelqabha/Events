import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from "../../route/ScreenNames";
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import { updateEvent, updateRequest as updateRequestAPI } from '../resources/API';
import moment from 'moment';
import 'moment/locale/ar-dz'
import CalculetRemaingTime from './CalculetRemaingTime';


const EventsCard = (props) => {
    const { isFromAddEventClick, service_id } = props
    const navigation = useNavigation();
    const { eventName, eventDate, eventCost } = props;
    const [date, setDate] = useState(new Date())

    const { TimeText, requestInfo, setRequestInfo, requestedDate, RequestIdState, userId, eventInfo, setEventInfo } = useContext(SearchContext);

    // console.log("requestedDate", props.eventDate);
    const requestItemIndex = requestInfo?.findIndex(item => item.request_Id === RequestIdState && item.ReqUserId === userId);
    const eventItemIndex = eventInfo?.findIndex(item => item.EventId === props.EventId && item.userId === userId)




    const UpdateRequest = () => {
        const newRequestInfo = {
            RequestId: RequestIdState,
            ReqEventId: props.EventId,
            reservationTime: TimeText
        }
        updateRequestAPI(newRequestInfo).then(res => {
            const req = requestInfo || [];
            if (requestItemIndex > -1) {
                req[requestItemIndex] = newRequestInfo;
            }
            setRequestInfo([...req])
        })
    }
    const UpdateEventInfo = () => {
        const newEventItem = {
            EventId: props.EventId,
            userId: userId,
            eventDate: moment(requestedDate).format('L'),
            // eventCost: "50890",
        }
        updateEvent(newEventItem).then(res => {
            const ev = eventInfo || [];
            if (eventItemIndex > -1) {
                ev[eventItemIndex] = newEventItem;
            }
            setEventInfo([...ev, newEventItem])
        })
    }


    const onCaardPress = () => {

        if (!isFromAddEventClick) {
            console.log("navigate without adding");
            navigation.navigate(ScreenNames.ClientBook, { data: { ...props } })
            return;
        }

        console.log("Update request");
        UpdateRequest()
        UpdateEventInfo()
        navigation.navigate(ScreenNames.ClientBook, { data: { ...props } })

    }


    return (
        <View style={styles.container}>
            {/* <Card >
                <Card.Title style={styles.title}>{eventName}</Card.Title>
                <Card.Divider />
                <TouchableOpacity onPress={onCaardPress} style={styles.body}>
                    <Text style={{ marginBottom: 10, fontSize: 18, color: 'black' }}>
                        {eventDate}
                    </Text>
                    <Text style={{ marginBottom: 10, fontSize: 18, color: 'black' }}>
                        
                    </Text>
                    <Text style={styles.text}>
                        {eventCost ? ("₪" + eventCost) : ''}
                    </Text>
                </TouchableOpacity>

            </Card> */}

            <View style={styles.card}>
                <View style={styles.titlee}>
                    <Text style={styles.eventTxt}>{eventName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.leftView}></View>
                    <View style={styles.rightView}>
                        <Text style={styles.text}>
                            {/* {moment(eventDate).format('dddd')} */}
                        </Text>
                        <Text style={styles.text}>
                            {eventDate}
                        </Text>
                        <Text style={styles.text}>
                            {eventCost ? ("₪" + eventCost) : ''}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onCaardPress} style={styles.footer}>
                    <View>
                        <Text style={styles.text}>
                            باقي 45 يوم
                            {/* <CalculetRemaingTime targetDate={props.eventDate}/> */}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        width: '80%',
        height: 250,
        marginTop: 30,
        margin: 10
    },
    titlee: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        //position: 'absolute',
        //top: 0,
        //borderWidth: 1
    },
    eventTxt: {
        fontSize: 15,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        color: 'black',
    },
    footer: {
        width: '100%',
        height: '35%',
        borderRadius: 20,
        borderWidth: 0.5,
        position: 'absolute',
        bottom: 0,
        borderColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center'
    },

    body: {
        alignItems: 'center',

    },
    leftView: {
        width: '50%',
        height: 120,
    },
    rightView: {
        width: '50%',
        height: 120,
        alignItems: 'center'
    },
    text: {
        marginBottom: 10,
        fontSize: 18,
        color: 'black',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
})

export default EventsCard;
