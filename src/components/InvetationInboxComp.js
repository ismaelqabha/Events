import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { colors } from '../assets/AppColors'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScreenNames } from '../../route/ScreenNames';
import { useNavigation } from '@react-navigation/native';

const InvetationInboxComp = (props) => {

    const [userInfo, setUserInfo] = useState()

    const navigation = useNavigation();

    const getSenderUserInfo = (id) => {
        getRelations({ id }).then((relations) => {

            if (relations && relations.error) {
                showMessage("there has been an error")
            } else {
                return relations
                // setUserInfo(relations)
            }
        })
    }

    const getSenderName = (id) => {
        const userData = getSenderUserInfo(id)

        return (<View>
            <Pressable style={styles.title} onPress={() => navigation.navigate(ScreenNames.InvetationShow, { ...props })}>
                <Text style={styles.text}>{'من' + ' ' + userData.userName}</Text>
            </Pressable>
            <View style={styles.logo}>
                <Image style={styles.img} source={userData.userPhoto} />
            </View>
        </View >
        )
    }

    return (
        <View style={styles.card}>
            <View style={styles.stutes}>
                {props.status == 'open' ? <Pressable //onPress={onPressHandler}
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

            {getSenderName(props.user)}

        </View >
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