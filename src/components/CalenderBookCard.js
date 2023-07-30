import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SearchContext from '../../store/SearchContext';


const CalenderBookCard = (props) => {
    const { AddResToEventFile,UserState } = useContext(SearchContext);

    const queryUser = () => {
        return UserState.filter(id => {
            return id.USER_ID == props.ReqUserId;
        })
    }
    const renderBookingUser = () => {
        const data = queryUser();

        const cardsArray = data.map(card => {
            return <View style={styles.cardBody}>
                <Text style={styles.headerText}>الزبون : {card.User_name}</Text>
                <Text style={styles.headerText}>العنوان : {card.UserAdress}</Text>
                <Text style={styles.headerText}>رقم التلفون : {card.UserPhone}</Text>
            </View>;
        }); return cardsArray;
    };
    const query = () => {
        return AddResToEventFile.filter(id => {
            return id.ReqServId == props.ReqServId;
        })
    }
    const renderBookingInfo = () => {
        const data = query();

        const cardsArray = data.map(card => {
            return <View style={styles.cardBody}>
                <Text style={styles.bodyText}>الوقت : {card.reservationTime}</Text>
                <Text style={styles.bodyText}>التكلفة : {card.Cost}</Text>
                <Text style={styles.bodyText}>الحاله : {card.ReqStatus}</Text>
            </View>;
        }); return cardsArray;
    };



    return (
        <View style={styles.container}>
            {renderBookingUser()}
            {renderBookingInfo()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default CalenderBookCard;
