import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../../assets/AppColors';

const CreateInvetation = (props) => {
     const { eventTitle } = props.route?.params || {}

    //  const eventTitle = 'تخرج'

    const weddingCaller = 'أسم الداعي الاول'
    const regulerEventCaller = 'أسم الداعي'
    const weddingStar = 'أسم العريس'
    const eventStar = 'أسم نجم المناسبة'

    const [firstCallName, setFirstCallName] = useState()
    const [secondCallName, setSecondCallName] = useState()
    const [firstStName, setFirstStName] = useState()
    const [secondStName, setSecondStName] = useState()


    const onPressBack = () => {
        props.navigation.goBack();
    }

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressBack}>
                    <Ionicons
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.title}>اِنشاء بطاقة دعوة</Text>
            </View>
        )
    }

    const renderEventType = () => {
        return (
            <View style={styles.eventTypeView}>
                <Text style={styles.text}>{'بطاقة دعوة لمناسبة' + ' ' + eventTitle}</Text>
            </View>
        )
    }

    const firstCallerName = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                     placeholder={eventTitle == 'زواج' ? weddingCaller : regulerEventCaller}
                    onChangeText={setFirstCallName}
                />
            </View>
        )
    }
    const secondCallerName = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                     placeholder={'اسم الداعي الثاني'}
                    onChangeText={setSecondCallName} />
            </View>
        )
    }
    const firstStarName = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                     placeholder={eventTitle == 'زواج' ? weddingStar : eventStar}
                    onChangeText={setFirstStName} />
            </View>
        )
    }
    const secondStarName = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                     placeholder={'أسم العروس'}
                    onChangeText={setSecondStName} />
            </View>
        )
    }

    const renderCallers = () => {
        return (
            <View>
                <View style={styles.callerView}>
                    {firstCallerName()}
                    {eventTitle == 'زواج' && secondCallerName()}
                </View>
                <View style={styles.callerView}>
                    {firstStarName()}
                    {eventTitle == 'زواج' && secondStarName()}
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderEventType()}
            {renderCallers()}
        </View>
    )
}

export default CreateInvetation

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
    },

    eventTypeView: {
        width: '90%',
        height: 80,
        backgroundColor: 'white',
        elevation: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 20
    },
    text: {
        fontSize: 20,
        color: colors.puprble
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 15,
        color: 'black',
        marginVertical: 10
    },
    callerView: {
        // borderWidth: 1,
        width: '95%',
        borderColor: colors.silver,
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 5,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 5
    }
})