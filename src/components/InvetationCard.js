import { StyleSheet, Text, View, Pressable, TextInput, } from 'react-native'
import Zocial from "react-native-vector-icons/Zocial";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from 'react'
import { colors } from '../assets/AppColors';


const InvetationCard = (props) => {
    const { eventTitle } = props
    
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

    const welcomingPhrase = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder={'عبارة ترحيبية'}
                    onChangeText={setSecondStName} />
            </View>
        )
    }
    const explanatoryPhrase = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder={'عبارة توضيحية'}
                    onChangeText={setSecondStName} />
            </View>
        )
    }
    const renderDataTimeLocation = () => {
        return (
            <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <Ionicons
                        name={"location-sharp"}
                        color={"black"}
                        size={25} />
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder={'الموقع'}
                        onChangeText={setSecondStName} />

                </View>

                <View style={{ alignItems: 'center' }}>
                    <Ionicons
                        name={"time"}
                        color={"black"}
                        size={25} />
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder={'الوقت'}
                        onChangeText={setSecondStName} />

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Zocial
                        name={"cal"}
                        color={"black"}
                        size={25} />
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder={'التاريخ'}
                        onChangeText={setSecondStName} />

                </View>

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
                {welcomingPhrase()}
                <View style={styles.starsView}>

                    {eventTitle == 'زواج' && secondStarName()}
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
       // flex: 1,
      
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: '80%',
        alignSelf: 'center',
        borderWidth: 0.6,
        borderRadius: 10,
        //borderColor: 'gray',
        fontSize: 15,
        color: 'black',
        // marginVertical: 10
    },
    callerView: {
        // borderWidth: 1,
        width: '80%',
        borderColor: colors.silver,
        alignSelf: 'center',
        marginTop: 50,
        paddingVertical: 5,
        // backgroundColor: 'white',
        // elevation: 5,
        borderRadius: 5
    },
    starsView: {
        borderWidth: 1,
        //  borderColor: colors.silver,
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
        // backgroundColor: 'white',
        // elevation: 5,
        //  borderRadius: 5
    }
})