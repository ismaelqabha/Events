import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../../assets/AppColors'
import { updateService } from '../../resources/API'
import SearchContext from '../../../store/SearchContext'
import ServiceProviderContext from '../../../store/ServiceProviderContext'



const ProviderEventTypesComp = (props) => {

    const { eventsTypeWorking, setEventsTypeWorking } = useContext(ServiceProviderContext);
    const [selectEvent, setSelectEvent] = useState(false)

    useEffect(() => {
        checkPressed()
      }, [])
    
      const checkPressed = () => {
        eventsTypeWorking.includes(props.Id) ? setSelectEvent(true) : null
      }

      const checkExists = () => {
        eventsTypeWorking.includes(props.Id) ? removeFromList(): addToSelected();
      }
    
      const addToSelected = () => {
        var list = eventsTypeWorking;
        list.push(props.Id);
        setSelectEvent(true)
        setEventsTypeWorking(list);
      };
    
      const removeFromList = () => {
        const newList = eventsTypeWorking.filter((area) => area !== props.Id)
        setSelectEvent(false)
        setEventsTypeWorking(newList)
      }

    const onCardPress = () => {
        setSelectEvent(!selectEvent);
        checkExists()
    }

    return (
        <View style={styles.container}>
            <Pressable style={[styles.eventCard, selectEvent ? styles.eventCardPress : styles.eventCard]} onPress={onCardPress}>
                <Image style={styles.eventImg} source={{ uri: props.eventImg }} />
                <Text style={styles.txt}>{props.eventTitle}</Text>
            </Pressable>
        </View>
    )
}

export default ProviderEventTypesComp

const styles = StyleSheet.create({
    container: {

    },
    eventCard: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    eventCardPress: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.puprble
    },
    eventImg: {
        width: 120,
        height: 120,
    },
    txt: {
        fontSize: 18,
        color: colors.puprble
    }
})