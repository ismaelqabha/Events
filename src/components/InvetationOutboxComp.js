import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../assets/AppColors'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';

const InvetationOutboxComp = (props) => {
    const { eventTypeInfo } = useContext(SearchContext);
    const { eventTitle, eventLogoId,relations, loading } = props


    const navigation = useNavigation();

    const getEventLogo = () => {
        return eventTypeInfo.filter(item => {
            return item.Id === eventLogoId
        })
    }
    const [eventLogo, setEventLogo] = useState(getEventLogo())
    // console.log(">>", eventLogo[0].eventImg);
    return (
        <View style={styles.card}>
            <View style={styles.stutes}>
                {props.sentStatus == 'unsend' ? <Pressable //onPress={onPressHandler}
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

            <Pressable style={styles.title} onPress={() => navigation.navigate(ScreenNames.InvetationOutboxShow, {...props}, relations, loading)}>
                <Text style={styles.text}>{eventTitle}</Text>
            </Pressable>

            <View style={styles.logo}>
                <Image style={styles.img} source={{uri : eventLogo[0]?.eventImg}} />
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
        borderWidth: 2,
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
    img: {
        width: '90%',
        height: '90%',
    }
})