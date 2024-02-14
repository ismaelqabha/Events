import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../../assets/AppColors'
import { updateService } from '../../resources/API'
import SearchContext from '../../../store/SearchContext'
import ServiceProviderContext from '../../../store/ServiceProviderContext'



const ProviderEventTypesComp = (props) => {

    const { isFirst } = useContext(SearchContext);
    const { serviceInfoAccorUser, setServiceInfoAccorUser } = useContext(ServiceProviderContext);
    const [selectEvent, setSelectEvent] = useState(false)


    const updateServiceEvents = () => {
        const serviceIndex = serviceInfoAccorUser.findIndex(item => item.service_id == isFirst)

        if (serviceIndex == -1) {
            return
        }
        const serviceInfo = serviceInfoAccorUser
        const events = serviceInfo[serviceIndex].eventWorkWith
        const index = events.findIndex((id) => id === props.Id)
        index === -1 ? serviceInfo[serviceIndex].eventWorkWith.push(props.Id) :
            serviceInfo[serviceIndex].eventWorkWith = serviceInfo[serviceIndex].eventWorkWith.slice(index, 1)

        updateService(serviceInfo).then(res => {
           console.log("res.message",res.message);
            setServiceInfoAccorUser([...serviceInfo])
        })

    }


    const onCardPress = () => {
        if (selectEvent) {
            setSelectEvent(false)
            updateServiceEvents()
            console.log("serviceInfoAccorUser", serviceInfoAccorUser);
        } else {
            setSelectEvent(true)
            updateServiceEvents()
            console.log("serviceInfoAccorUser", serviceInfoAccorUser);
        }

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