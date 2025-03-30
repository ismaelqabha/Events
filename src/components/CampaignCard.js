import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import { colors } from '../assets/AppColors';


const CampaignCard = (props) => {
    const { campImag, campTitle, isFromServiceDesc,serviceData } = props;
    const navigation = useNavigation();


    const onCaardPress = () => {
        navigation.navigate(ScreenNames.Campaigns, { data: { ...props }, isFromServiceDesc ,serviceData})
    }

    const renderCampaighn = () => {
        if (isFromServiceDesc) {
            return (<Pressable style={styles.forDescr} onPress={onCaardPress}>
                <Text style={styles.cardDesctxt}>{campTitle}</Text>
                <View style={styles.img}>
                    <Image style={{ width: 100, height: 100, borderRadius: 30 }} source={{ uri: campImag }} />
                </View>
            </Pressable>)
        } else {
            return (
                <Pressable style={styles.forHome} onPress={onCaardPress}>
                    <View style={styles.image}>
                        <Image style={{ flex: 1, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }} source={{ uri: campImag }} />
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.titleTxt}>{campTitle}</Text>
                        <Text style={styles.detailText}>التفاصيل</Text>
                    </View>


                </Pressable>)
        }

    }

    return (
        <View style={styles.container}>
            {renderCampaighn()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    forHome: {
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 3,
        margin: 10,
        width: 200,
        height: 180,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    forDescr: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 10,
        elevation: 5,
        marginVertical: 10,
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    image: {

        width: "50%",
        height: '100%',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%'
    },
    titleTxt: {
        fontSize: 14,
        color: colors.puprble,
    },
    img: {
        // borderRadius: 8,
        // marginBottom: 8,
    },
    cardDesctxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.puprble,
        marginRight: 20
    },
    description: {
        fontSize: 16,
        color: '#777',
    },

    detailText: {
        color: 'gray',
        position: 'absolute',
        bottom: 5,
    }
})

export default CampaignCard;
