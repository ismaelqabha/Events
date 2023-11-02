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
            <Card style={styles.card1}>
                <Card.Title style={styles.title}>{eventName}</Card.Title>
                <Card.Divider />
                <TouchableOpacity onPress={onCaardPress} style={styles.body}>
                    <Text style={{ marginBottom: 10, fontSize: 18, color: 'black' }}>
                        {eventDate}
                    </Text>
                    <Text style={{ marginBottom: 10, fontSize: 18, color: 'black' }}>
                        {/* <CalculetRemaingTime targetDate={props.eventDate}/> */}
                    </Text>
                    <Text style={styles.text}>
                        {eventCost ? ("₪" + eventCost) : ''}
                    </Text>
                </TouchableOpacity>

            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    card1: {
        borderWidth: 10,
        borderRadius: 30,
        backgroundColor: '#800000',
        elevation: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'white',
        shadowOpacity: 0.1,
    },
    container: {
        flex: 1,

    },
    body: {
        alignItems: 'center',
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
