import React, { useContext } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native';
import BookingCard from '../../src/components/BookingCard';
import { Request } from '../resources/data';
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../store/SearchContext';


const ClientBook = (props) => {
   
    const { AddResToEventFile } = useContext(SearchContext);
    const { data } = props?.route.params;

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const query = () => {
        if (!data.EventId) {
            return AddResToEventFile || [];
        }
        return AddResToEventFile.filter(event => {
            return event.ReqEventId == data.EventId;
        })
    }
    const renderCard = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <BookingCard  {...card} />;
        }); return cardsArray;
    };
    // console.log("New Files " ,AddResToEventFile )
    // console.log("New Files " ,query().length )
    // console.log("all " ,AddResToEventFile.map(event=> event.ReqEventId) , "id: " ,  data.EventId)

    return (
        <View style={styles.container}>

            <View style={styles.headerImg}>
                <View style={styles.viewIcon}>
                    <Pressable onPress={onPressHandler}
                    >
                        <Ionicons
                            style={styles.icon}
                            name={"arrow-back"}
                            color={"black"}
                            size={25} />
                    </Pressable>
                </View>
                <View style={styles.viewtitle}>
                    <Text style={styles.title}>{data?.eventName || 'no event'}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.home}>
                {renderCard()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    home: {
        paddingBottom: 30,
    },
    viewtitle: {
        justifyContent: 'center',
        height: 50,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 30,
    },
    headerImg: {
        flexDirection: 'row',
        height: 60,
        justifyContent:'space-between',
        marginTop:10,
    },
    viewIcon: {
       alignItems: 'center',
       justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
    },

})

export default ClientBook;
