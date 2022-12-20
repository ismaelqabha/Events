import React, {useContext} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';
import {bookingList} from '../resources/data';

const EventsCard = (props) => {
    const navigation = useNavigation();
    const { eventName, eventDate,EventId } = props;
    const {eventTotalCost,setEventTotalCost} = useContext(SearchContext);

   console.log(EventId);
    const rendercost = () => {
        const eventIdinBooking = bookingList.filter(eveId => {
            return eveId.eventId == EventId;
        })

        const serviceCost = eventIdinBooking.map(Scost => {
            return Scost.srrCost;
        });
        return serviceCost;

        serviceCost.forEach(cost => {
            setEventTotalCost += cost;
        });
        return setEventTotalCost
    };

    const onCaardPress = () => {
        navigation.navigate(props.linkPage, { data: { ...props } })
    }
    return (
        <View style={styles.container}>
            <Card style={styles.card1}>
                <Card.Title style={styles.title}>{eventName}</Card.Title>
                <Card.Divider />
                <TouchableOpacity onPress={onCaardPress} style={styles.body}>
                    <Text style={{ marginBottom: 10, fontSize: 18, color: '#87ceeb' }}>
                        {eventDate}
                    </Text>
                    <Text style={{ marginBottom: 10, fontSize: 18, color: '#87ceeb', }}>
                        التكلفة
                    </Text>
                    <Text style={styles.text}>
                    ₪{eventTotalCost} 
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
        borderWidth: 1,
        borderRadius: 5,
        color: '#87ceeb',
        borderColor: '#87ceeb'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#87ceeb',
    },
})

export default EventsCard;
