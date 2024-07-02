import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import SliderImage from '../components/SliderImage';
import { colors } from "../assets/AppColors"
import SIZES from '../resources/sizes';
import moment from 'moment';

const HomeCards = (props) => {

    const navigation = useNavigation();
    const { subTitle, address, availableDates } = props;
    const { setSType } = useContext(SearchContext);

    const onCaardPress = () => {
        setSType((props.servType))
        navigation.navigate(ScreenNames.ServiceDescr, { data: { ...props, availableDates } })
    }

    const checkDateStyle = () => {
        if (Array.isArray(availableDates)) {
            if (availableDates.length <= 10) {
                return "(" + availableDates.length + ")" + "  تواريخ متاحه "
            } else {
                return "(" + availableDates.length + ")" + "  تاريخ متاح "
            }
        } else {
            return moment(availableDates).format('L')
        }
    }

    return (
        <View style={styles.container}>
            <SliderImage  {...props} />
            <TouchableOpacity onPress={onCaardPress}  >
                <View style={styles.info}>
                    <View style={{ marginRight: 20, marginLeft: 10 }}>
                        <View style={styles.nestedView}>
                            <Text style={styles.text}>★5</Text>
                            <Text style={styles.text} numberOfLines={2}>{subTitle}</Text>
                        </View>
                        <View style={styles.nestedView}>
                            <Text style={styles.text}>{checkDateStyle()}</Text>
                            <Text style={styles.text}>{address}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    info: {
        width: SIZES.screenWidth - 10,
        height: 70,
        backgroundColor: colors.puprble,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
        alignSelf: 'center'
    },
    nestedView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: 'white' //colors.darkGold,
    },
    // tex: {
    //     fontSize: 20,
    //     textAlign: 'right',
    //     fontWeight: 'bold'
    // }

})

export default HomeCards;
