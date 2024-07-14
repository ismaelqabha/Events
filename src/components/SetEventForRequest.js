import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from '../assets/AppColors';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';


const SetEventForRequest = (props) => {
    const { serviceType } = props
    const {eventInfo, setEventInfo,requestedDate} = useContext(SearchContext);
    const { userId } = useContext(UsersContext);

    const [selectedEvent, setSelectedEvent] = useState('');

    const [IveEvent, setIveEvent] = useState(false);

    const [evTiltleId, setEvTiltleId] = useState()
    const [EVENTID, setEVENTID] = useState()
    const [updatedEventDate, setUpdatedEventDate] = useState()
    const [eventTotalCost, setEventTotalCost] = useState()

    const serviceTypeList = ["تصوير"]

    const checkService = () => {
        return serviceTypeList.map(item => {
            if (item === serviceType) {
                console.log("in");
            } else {
                return (
                    <View>
                        {renderEvents()}
                    </View>

                )
            }
        })
    }

    const checkIfThereIsEvent = () => {
        if (eventInfo.message == 'No Event') {
            setIveEvent(false)
        } else {
            setIveEvent(true)   
        }
    }

    useEffect(() => {
        checkIfThereIsEvent()
    }, [])

    const renderEvents = () => {
        return (
            <View>
                <Text style={styles.text}>تحديد المناسبة</Text>
                {IveEvent &&
                    renderEventInfo()
                }
                <Pressable style={styles.eventItem} //onPress={onPressModalHandler}
                >
                    <Text style={styles.text}>مناسبة جديدة</Text>
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
        var BookDate
        var todayDate = new Date();

        todayDate.setHours(0);
        todayDate.setMinutes(0);
        todayDate.setSeconds(0);
        todayDate.setMilliseconds(0);

        return eventInfo.filter(item => {
            return item.eventDate.find(dateElment => {
                BookDate = new Date(dateElment)
                const result = BookDate >= todayDate // || BookDate.length < 1

                return result
            })

        })
    }
    const whenEventPress = (eventId, eventTitleId) => {
        setSelectedEvent(eventId || '');
         setEvTiltleId(eventTitleId)
         UpdateEventCostState(eventId)
    }
    const UpdateEventCostState = (eventId) => {
        eventItemIndex = eventInfo?.findIndex(item => item.EventId === eventId && item.userId === userId)

        const evCost = eventInfo[eventItemIndex].eventCost
        const lastTotal = evCost + totalPrice
        setEventTotalCost(lastTotal)

        const newExitDate = eventInfo[eventItemIndex].eventDate

        if (Array.isArray(requestedDate)) {
            requestedDate.forEach((item) => {
                if (!(newExitDate.includes(item))) {
                    newExitDate.push(item)
                }
            });
           
        } else {
            if (!(newExitDate.includes(requestedDate))) {
                newExitDate.push(requestedDate)
            }
        }

        setUpdatedEventDate(newExitDate)
        setEVENTID(eventId)
        
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
                            onPress={() => whenEventPress(item.EventId, item.eventTitleId)}
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

    return (
        <View>
            <Text>{serviceType}</Text>
            {checkService()}
        </View>
    )
}

export default SetEventForRequest

const styles = StyleSheet.create({
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%",
        marginVertical: 5,
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
    text: {
        fontSize: 15,
        color: colors.puprble
    },
    selectEvent: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: 'white'
    },
})