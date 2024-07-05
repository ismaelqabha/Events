import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useContext,useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchContext from '../../../store/SearchContext';
import { colors } from '../../assets/AppColors';
import EventsCard from '../../components/EventsCard';


const ClientOldEvents = (props) => {
    const { eventInfo, requestInfoAccUser } = useContext(SearchContext);

    useEffect(() => {
        
      }, [])

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
    
    const filterRequestAccEventFile = (id) => {
        if (requestInfoAccUser.message !== "no Request") {
            const reqInfo = requestInfoAccUser.filter(item => {
                return item.requestInfo.ReqEventId === id
            })
            return reqInfo
        } else {
            return []
        }
    }

    const getEvents = () => {
        const reqData = getBookingInfo()
        return eventInfo.filter(eventItem => {
            const reqDataAccfile = filterRequestAccEventFile(eventItem.EventId)
            return reqData.find(item => {
                if (reqData.length === reqDataAccfile.length) {
                    return item.requestInfo.ReqEventId === eventItem.EventId
                }
            })
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