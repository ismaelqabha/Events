import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import React from 'react'
import { colors } from '../assets/AppColors'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

const InvetationOutboxComp = (props) => {
    const {eventTitle}= props
    return (
        <View style={styles.card}>
            <View style={styles.stutes}>
                {props.invitStatus.sentStatus == 'unsend' ? <Pressable //onPress={onPressHandler}
                >
                    <FontAwesome
                        name={"send"}
                        color={colors.silver}
                        size={25} />
                </Pressable> :
                    <Pressable //onPress={onPressHandler}
                    >
                        <Entypo
                            name={"archive"}
                            color={colors.silver}
                            size={25} />
                    </Pressable>}
            </View>

            <View style={styles.title}>
                <Text style={styles.text}>{eventTitle}</Text>
            </View>

            <View style={styles.logo}>
                <Image style={styles.img} source={require('../assets/photos/wedding.png')}/>
            </View>
        </View>
    )
}

export default InvetationOutboxComp

const styles = StyleSheet.create({
    card: {
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        backgroundColor: colors.puprble,
        marginVertical: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.silver,
        borderWidth:2,
        borderColor: colors.puprble,
        borderRadius: 40
    },
    title: {
        width: '65%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth:1
    },
    stutes: {
        width: '15%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth:1
    },
    text: {
        fontSize: 18,
        color: colors.silver
    },
    img:{
        width: '90%',
        height: '90%',  
    }
})