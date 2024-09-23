import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import React from 'react'
import { colors } from '../assets/AppColors'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScreenNames } from '../../route/ScreenNames';
import { useNavigation } from '@react-navigation/native';

const InvetationInboxComp = (props) => {

    const navigation = useNavigation();

    return (
        <View style={styles.card}>
            <View style={styles.stutes}>
                {props.recivedStatus == 'open' ? <Pressable //onPress={onPressHandler}
                >
                    <FontAwesome
                        name={"envelope-open"}
                        color={colors.silver}
                        size={25} />
                </Pressable> :
                    <Pressable //onPress={onPressHandler}
                    >
                        <FontAwesome
                            name={"envelope"}
                            color={colors.silver}
                            size={25} />
                    </Pressable>}
            </View>

            <Pressable style={styles.title} onPress={() => navigation.navigate(ScreenNames.InvetationShow, {...props}) }>
                <Text style={styles.text}>{'من'+ ' ' + props.userName }</Text>
            </Pressable>

            <View style={styles.logo}>
                <Image style={styles.img} source={props.userPhoto}/>
            </View>
        </View>
    )
}

export default InvetationInboxComp

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