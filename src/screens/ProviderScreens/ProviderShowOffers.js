import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../../assets/AppColors'
import SearchContext from '../../../store/SearchContext';
import { getCampaignsByServiceId } from '../../resources/API';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScreenNames } from '../../../route/ScreenNames';
import moment from 'moment';

const ProviderShowOffers = (props) => {
    const { isFirst, campInfo, setCampInfo } = useContext(SearchContext);



    const getCampignsfromApi = () => {
        getCampaignsByServiceId({ serviceId: isFirst }).then(res => {
            setCampInfo(res);
        });
    };
    var todayDate = new Date();

    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    todayDate.setMilliseconds(0);



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
    const calculateTime = (time) => {
        const date1 = moment(todayDate);
        const date2 = moment(time);
        const diffInDays = date2.diff(date1, 'day');
        if (diffInDays < 0) {
            return (
                <Text style={styles.offerTitletxt}>انتهى العرض</Text>
            )
        } else {
            return (
                <Text style={styles.offerTitletxt}>{diffInDays + ' ' + 'يوم'}</Text>
            ) 
        }
       
    }

    const renderOffers = () => {
        return campInfo.map(item => {
            return (
                <Pressable style={styles.offerView}
                    onPress={() => props.navigation.navigate(ScreenNames.ProviderOfferDesc, { data: { ...item } })}
                >
                    {calculateTime(item.campExpirDate)}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={styles.offerTitletxt}>{item.campTitle}</Text>
                        <View style={styles.imageView}>
                            <Image style={styles.image} source={{ uri: item.campImag }} />
                        </View>
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
        justifyContent: 'space-between',
        marginVertical: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 5,
        paddingVertical: 5,
        borderRadius: 5,
        paddingLeft: 10
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