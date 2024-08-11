import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Zocial from "react-native-vector-icons/Zocial";
import { colors } from '../../assets/AppColors';


const InvetationShow = (props) => {
    const { eventTitle, invitationCard } = props.route.params || []


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
                <Text style={styles.title}> {eventTitle}</Text>
            </View>
        )
    }
    const renderInvBackground = () => {
        return (
            <ImageBackground style={styles.card} source={invitationCard.invitationBackgraund}>

                <View style={styles.callerView}>
                    {renderFirstCallerName()}
                    {invitationCard.callerNames.length > 1 && renderSecondCallerName()}
                </View>


                {renderWelcomePharse()}

                <View style={[styles.starView,invitationCard.eventStar.length == 1 ? styles.singleStarView : styles.starView]}>
                    {invitationCard.eventStar.length > 1 && renderSecondStarName()}
                    {renderFirstStarName()}
                </View>


                <View style={styles.dateTime}>
                    {renderLocation()}
                    {renderEventTime()}
                    {renderEventDate()}
                </View>

                {renderExplanatoryPhrase()}
            </ImageBackground>
        )
    }

    const renderFirstCallerName = () => {

        return (
            <View>
                <Text style={styles.text}>{invitationCard.callerNames[0]}</Text>
            </View>
        )


    }
    const renderSecondCallerName = () => {
        return (
            <View>
                <Text style={styles.text}>{invitationCard.callerNames[1]}</Text>
            </View>
        )
    }
    const renderFirstStarName = () => {
        return (
            <View>
                <Text style={styles.starTxt}>{invitationCard.eventStar[0]}</Text>
            </View>
        )
    }
    const renderSecondStarName = () => {
        return (
            <View>
                <Text style={styles.starTxt}>{invitationCard.eventStar[1]}</Text>
            </View>
        )
    }
    const renderWelcomePharse = () => {
        return (
            <View style={styles.wePharseView}>
                <Text style={styles.text}>{invitationCard.welcomePharse}</Text>
            </View>
        )
    }
    const renderExplanatoryPhrase = () => {
        return (
            <View style={styles.ExpharseView}>
                <Text style={styles.text}>{invitationCard.explanatoryPhrase}</Text>
            </View>
        )
    }
    const renderEventDate = () => {
        return (
            <View style={{ alignItems: 'center', width:'34%' }}>
                <Zocial
                    name={"cal"}
                    color={"black"}
                    size={25} />
                <Text style={styles.text}>{invitationCard.eventDate}</Text>

            </View>

        )
    }
    const renderEventTime = () => {
        return (
            <View style={{ alignItems: 'center',width:'33%' }}>
                <Ionicons
                    name={"time"}
                    color={"black"}
                    size={25} />
                <Text style={styles.text}>{invitationCard.time}</Text>

            </View>
        )
    }
    const renderLocation = () => {
        return (
            <View style={{ alignItems: 'center',width:'33%' }}>
                <Ionicons
                    name={"location-sharp"}
                    color={"black"}
                    size={25} />
                <Text style={styles.text}>{invitationCard.location}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            {renderHeader()}
            {renderInvBackground()}
        </View>
    )
}

export default InvetationShow

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
    card: {
        marginTop: 20,
        width: '95%',
        height: 700,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: colors.darkGold,
    },
    dateTime: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: 30,
        position: 'absolute',
        bottom: 250,
    },
    starView: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 400
    },
    singleStarView: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 400
    },
    ExpharseView: {
        width: '80%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 100
    },
    wePharseView: {
        width: '80%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 500
    },
    callerView: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 600
    },
    text:{
        fontSize: 18,
        color: colors.puprble,
        textAlign:'center'
    },
    starTxt:{
        fontSize: 30,
        color: colors.puprble
    }
})