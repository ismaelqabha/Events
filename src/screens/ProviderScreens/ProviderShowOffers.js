import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../../assets/AppColors'
import SearchContext from '../../../store/SearchContext';
import { getCampaignsByServiceId } from '../../resources/API';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScreenNames } from '../../../route/ScreenNames';

const ProviderShowOffers = (props) => {
    const { isFirst, campInfo, setCampInfo } = useContext(SearchContext);
    const [OfferId, setOfferId] = useState()

    const getCampignsfromApi = () => {
        getCampaignsByServiceId({ serviceId: isFirst }).then(res => {
            setCampInfo(res);
        });
    };

    useEffect(() => {
        // getCampignsfromApi()
    }, [])

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const renderheader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>قائمة العروض</Text>

            </View>
        )
    }

    const renderOffers = () => {
        return campInfo.map(item => {
            return (
                <Pressable style={styles.offerView}
                    onPress={() => props.navigation.navigate(ScreenNames.ProviderOfferDesc, { data: { ...item } })}
                >
                    <Text style={styles.offerTitletxt}>{item.campTitle}</Text>
                    <View style={styles.imageView}>
                        <Image style={styles.image} source={{ uri: item.campImag }} />
                    </View>
                </Pressable>
            )
        })
    }

    return (
        <View style={styles.container}>
            {renderheader()}
            {renderOffers()}
        </View>
    )
}

export default ProviderShowOffers

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10
    },
    headerTxt: {
        fontSize: 20,
        marginRight: 20,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    offerView: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 5,
        paddingVertical: 5,
        borderRadius: 5
    },
    offerTitletxt: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 10
    },

    imageView: {
        marginRight: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },

})