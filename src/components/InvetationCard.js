import { StyleSheet, Text, View, Pressable, TextInput, } from 'react-native'
import Zocial from "react-native-vector-icons/Zocial";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from 'react'
import { colors } from '../assets/AppColors';


const InvetationCard = (props) => {
    const { eventType, isFromInvetShow, eventTitle, invitationCard, eventLogoId } = props

    console.log(isFromInvetShow);

    const weddingCaller = 'أسم الداعي الاول'
    const regulerEventCaller = 'أسم الداعي'
    const weddingStar = 'أسم العريس'
    const eventStar = 'أسم نجم المناسبة'

    const [firstCallName, setFirstCallName] = useState()
    const [secondCallName, setSecondCallName] = useState()
    const [firstStName, setFirstStName] = useState()
    const [secondStName, setSecondStName] = useState()


    const firstCallerName = () => {
        return (
            <View>
                <TextInput
                    style={[styles.input, isFromInvetShow ? styles.input : styles.editingInput]}
                    keyboardType='default'
                    placeholder={eventType == 'زواج' ? weddingCaller : regulerEventCaller}
                    onChangeText={setFirstCallName}
                    value={isFromInvetShow && invitationCard.callerNames[0]}
                />
            </View>
        )
    }
    const secondCallerName = () => {
        return (
            <View>
                <TextInput
                    style={[styles.input, isFromInvetShow ? styles.input : styles.editingInput]}
                    keyboardType='default'
                    placeholder={'اسم الداعي الثاني'}
                    onChangeText={setSecondCallName}
                    value={isFromInvetShow && invitationCard.callerNames[1]} />
            </View>
        )
    }
    const firstStarName = () => {
        return (
            <View>
                <TextInput
                    style={[styles.input, isFromInvetShow ? styles.input : styles.editingInput]}
                    keyboardType='default'
                    placeholder={eventType == 'زواج' ? weddingStar : eventStar}
                    onChangeText={setFirstStName}
                    value={isFromInvetShow && invitationCard.eventStar[0]} />
            </View>
        )
    }
    const secondStarName = () => {
        return (
            <View>
                <TextInput
                    style={[styles.input, isFromInvetShow ? styles.input : styles.editingInput]}
                    keyboardType='default'
                    placeholder={'أسم العروس'}
                    onChangeText={setSecondStName}
                    value={isFromInvetShow && invitationCard.eventStar[1]} />
            </View>
        )
    }

    const welcomingPhrase = () => {
        return (
            <View>
                <TextInput
                    style={[styles.inputPharzeEditing, isFromInvetShow ? styles.inputPharzeEditing : styles.inputPharze]}
                    keyboardType='default'
                    placeholder={'عبارة ترحيبية'}
                    onChangeText={setSecondStName}
                    multiline={true}
                    value={isFromInvetShow && invitationCard.welcomePharse} />
            </View>
        )
    }
    const explanatoryPhrase = () => {
        return (
            <View>
                <TextInput
                    style={[styles.inputPharzeEditing, isFromInvetShow ? styles.inputPharzeEditing : styles.inputPharze]}
                    keyboardType='default'
                    placeholder={'عبارة توضيحية'}
                    onChangeText={setSecondStName}
                    multiline={true}
                    value={isFromInvetShow && invitationCard.explanatoryPhrase} />
            </View>
        )
    }
    const renderDataTimeLocation = () => {
        return (
            <View style={styles.dateTime}>
                <View style={{ alignItems: 'center' }}>
                    <Ionicons
                        name={"location-sharp"}
                        color={"black"}
                        size={25} />
                    <TextInput
                        style={[styles.input, isFromInvetShow ? styles.input : styles.editingInput]}
                        keyboardType='default'
                        placeholder={'الموقع'}
                        onChangeText={setSecondStName}
                        value={isFromInvetShow && invitationCard.location} />

                </View>

                <View style={{ alignItems: 'center' }}>
                    <Ionicons
                        name={"time"}
                        color={"black"}
                        size={25} />
                    <TextInput
                        style={[styles.input, isFromInvetShow ? styles.input : styles.editingInput]}
                        keyboardType='default'
                        placeholder={'الوقت'}
                        onChangeText={setSecondStName}
                        value={isFromInvetShow && invitationCard.time} />

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Zocial
                        name={"cal"}
                        color={"black"}
                        size={25} />
                    <TextInput
                        style={[styles.input, isFromInvetShow ? styles.input : styles.editingInput]}
                        keyboardType='default'
                        placeholder={'التاريخ'}
                        onChangeText={setSecondStName}
                        value={isFromInvetShow && invitationCard.eventDate} />

                </View>

            </View>
        )
    }

    const renderCallers = () => {
        return (
            <View>
                <View style={styles.callerView}>
                    {firstCallerName()}
                    {eventType == 'زواج' && secondCallerName()}
                </View>
                {welcomingPhrase()}
                <View style={[styles.starsView, eventType == 'زواج' ? styles.starsView : styles.otherstarsView]}>

                    {eventType == 'زواج' && secondStarName()}
                    {firstStarName()}
                </View>
            </View>
        )
    }
    return (
        <View style={styles.card}>
            {renderCallers()}
            {renderDataTimeLocation()}
            {explanatoryPhrase()}
        </View>
    )
}

export default InvetationCard

const styles = StyleSheet.create({
    card: {
        height: '100%'

    },
    editingInput: {
        textAlign: 'center',
        height: 50,
        alignSelf: 'center',
        borderWidth: 0.6,
        borderRadius: 10,
        fontSize: 15,
        color: 'black',
    },
    input: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 18,
    },
    callerView: {
        width: '80%',
        borderColor: colors.silver,
        alignSelf: 'center',
        marginTop: 50,
        paddingVertical: 5,
        borderRadius: 5
    },
    starsView: {

        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    otherstarsView: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center'

    },
    dateTime: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: 30
    },
    inputPharze: {
        textAlign: 'center',
        height: 100,
        width: '80%',
        alignSelf: 'center',
        borderWidth: 0.6,
        borderRadius: 10,
        fontSize: 18,
        color: 'black',
    },
    inputPharzeEditing: {
        textAlign: 'center',
         height: 100,
        width: '80%',
        alignSelf: 'center',
        fontSize: 15,

    },
})