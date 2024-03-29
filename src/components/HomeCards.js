import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import SliderImage from '../components/SliderImage';
import { colors } from "../assets/AppColors"
import SIZES from '../resources/sizes';

const HomeCards = (props) => {

    const navigation = useNavigation();
    const { subTitle, address } = props;
    const { setSType } = useContext(SearchContext);



    const onCaardPress = () => {
        setSType((props.servType))
        navigation.navigate(ScreenNames.ServiceDescr, { data: { ...props } })
    }

    return (
        <View style={styles.container}>
            <SliderImage  {...props} />
            <TouchableOpacity onPress={onCaardPress}  >
                <View style={styles.info}>
                    <View style={{marginRight: 20, marginLeft: 10}}>
                        <View style={styles.nestedView}>
                            <Text style={styles.text}>★5</Text>
                            <Text style={styles.text} numberOfLines={2}>{subTitle}....</Text>
                        </View>
                        <Text style={styles.text}>{address}</Text>
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

    },
    nestedView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 5
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
