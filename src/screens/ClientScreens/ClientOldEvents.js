import { StyleSheet, Text, View, Pressable, ScrollView, FlatList, Modal, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { ScreenNames } from '../../route/ScreenNames';
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchContext from '../../../store/SearchContext';
import UsersContext from '../../../store/UsersContext';
import { colors } from '../../assets/AppColors';
import EventsCard from '../../components/EventsCard';


const ClientOldEvents = (props) => {
    const { userId } = useContext(UsersContext);
    const { eventInfo, requestInfoAccUser } = useContext(SearchContext);

    var eventDate
    var todayDate = new Date();

    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    todayDate.setMilliseconds(0);


    const onBackHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onBackHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>المناسبات السابقة</Text>
            </View>
        )
    }

    const getBookingInfo = () => {
        if (requestInfoAccUser.message !== "no Request") {
            const reqInfo = requestInfoAccUser.filter(item => {
                return item.requestInfo.ReqStatus === 'completed'
            })
            return reqInfo
        } else {
            return []
        }
    }

    const getEvents = () => {
        return eventInfo.filter(eventItem => {
            if (eventItem.eventDate.length > 1) {
                return eventItem.eventDate.filter(dateItem => {
                    evDate = new Date(dateItem)
                   // console.log(evDate , todayDate, evDate < todayDate);
                    return evDate < todayDate
                })
            } else {
                evDate = new Date(eventItem.eventDate)
                //console.log(">>>",evDate , todayDate, evDate < todayDate);
                return eventItem.eventDate < todayDate
            }

        })
    }
    const renderEventsCard = () => {
        const data = getEvents()
        return data.map(item => {
            return <EventsCard  {...item} />;
        })

    };

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderEventsCard()}
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default ClientOldEvents

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    headerTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
})