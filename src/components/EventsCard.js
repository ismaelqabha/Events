import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from "../../route/ScreenNames";
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';


const EventsCard = (props) => {
    const { isFromAddEventClick } = props;
    const navigation = useNavigation();
    const { eventName, eventDate, eventCost } = props;
    const { userId, ServId, DateText, TimeText, AddResToEventFile, setAddResToEventFile,RequestIdState } = useContext(SearchContext);

    let ReqId = uuidv4();
    console.log(ServId, DateText,TimeText);

    const checkIfInEvent = () => {
        const isinEvent = AddResToEventFile.find(ResDate => ResDate.reservationDate == DateText && ResDate.reservationTime == TimeText && ResDate.ReqServId == ServId);
        return !!isinEvent;
    }

    const onCaardPress = () => {
        if (isFromAddEventClick) {
            if (checkIfInEvent()) {
                console.log("already Added");
                navigation.navigate(ScreenNames.ClientBook, { data: { ...props } })
            } else {
                const AddBookingtoFile = {
                    RequestId: ReqId,
                    ReqEventId: props.EventId,
                    ReqServId: ServId,
                    ReqUserId: userId,
                    ReqStatus: false,
                    // ReqDate: '10/1/2023',
                    reservationDate: DateText,
                    reservationTime: TimeText,
                }
                let ResArr = AddResToEventFile;
                ResArr.push(AddBookingtoFile)
                setAddResToEventFile([...ResArr])
                navigation.navigate(ScreenNames.ClientBook, { data: { ...props } })
                console.log("Adding");
                console.log("isFromAddEventClick: ", isFromAddEventClick);
            }

        } else {
            console.log("navigate without adding");
            navigation.navigate(ScreenNames.ClientBook, { data: { ...props } })
            return;
        }

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
                        80:20:55:23
                    </Text>
                    <Text style={styles.text}>
                        ₪{eventCost}
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
