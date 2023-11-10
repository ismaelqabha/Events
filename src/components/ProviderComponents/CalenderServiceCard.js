import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';
import { colors } from '../../assets/AppColors';


const CalenderServiceCard = (props) => {
    const navigation = useNavigation();

    const onCardPress = () => {
        navigation.navigate(ScreenNames.ProviderCalender, { data: { ...props } })
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.item}
            //onPress={onCardPress}
            >
                <View style={styles.imgView}>
                    <Text style={styles.basicInfo}>{props.title}</Text>
                    <Image style={styles.profilImg} source={require('../../assets/photos/ameer.png')} />
                </View>
            </Pressable>
        </View>
    )
}

export default CalenderServiceCard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10
    },
    basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    profilImg: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: colors.BGScereen,
        borderWidth: 3,
        borderColor: colors.puprble,
    },
    imgView: {
        width: "95%",
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 5,
        shadowColor: colors.puprble,
        backgroundColor: 'white',
        alignSelf: 'center',
        margin: 5,
        borderRadius: 20
    },

})