import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';



const CampaignCard = (props) => {
    const { campImag, campTitle, campDesc } = props;
    const navigation = useNavigation();


    const onCaardPress = () => {
        navigation.navigate(ScreenNames.Campaigns, { data: { ...props } })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touch} onPress={onCaardPress}>
                <View style={styles.image}>
                    <Image style={{ flex: 1 }} source={{ uri: campImag }} />
                </View>
                <View style={styles.title}>
                    <Text>{campTitle}</Text>
                    {/* <Text>{campDesc}</Text> */}
                </View>
                <Text style={styles.detailText}>التفاصيل</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderColor: 'black',
        margin: 5,
        width: 170,
        height: 320
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
        // borderWidth:1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#777',
    },

    touch: {
        flexDirection: 'column',
        flex: 1,
    },
    detailText: {

        alignSelf: 'flex-start',
        justifyContent: 'flex-end',
        color: 'blue',
        position: 'absolute',
        left: 0,
        bottom: 0,

    }
})

export default CampaignCard;
