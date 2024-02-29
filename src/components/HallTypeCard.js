import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../assets/AppColors'
import ServiceProviderContext from '../../store/ServiceProviderContext'
import SearchContext from '../../store/SearchContext'


const HallTypeCard = (props) => {
    const { isChecked } = props;
    const { setHallType } = useContext(ServiceProviderContext)
    const { ServiceDataInfo, setServiceDataInfo, ServId } = useContext(SearchContext);


    const chickIfChecked = () => {
        return isChecked
    }


    const onHallTypePress = (item) => {
        setHallType(props.hallType)
        props.onHallTypePress(props.hallType);

        let ServiceArr = ServiceDataInfo;
        const isChecked = chickIfChecked(item);
        if (!isChecked) {
            let serviceIndex = ServiceArr.findIndex(ser => ser.service_id === ServId)

            if (serviceIndex != -1) {
                ServiceArr[serviceIndex].hallType = props.hallType;
            }
            setServiceDataInfo([...ServiceArr])
        }

    }
    useEffect(() => {
        // if (hallType !== props.hallType) {
        //     setHallPress(false)
        // } else {
        //     setHallPress(true)
        // }
    }, [])

    const renderHallTypeCard = () => {
        const HallCard = props;
        const clicked = chickIfChecked(HallCard);
        return (
            <Pressable style={[clicked ? styles.typePress : styles.typeNotPres]}
                onPress={() => onHallTypePress(HallCard)}
            >
                <Image style={styles.img} source={props.img} />
                <Text style={styles.typetxt}>{props.hallType}</Text>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            {renderHallTypeCard()}
        </View>
    )
}

export default HallTypeCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    typePress: {
        width: 75,
        height: 80,
        borderWidth: 3,
        borderColor: colors.puprble,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    typeNotPres: {
        width: 75,
        height: 80,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    typetxt: {
        fontSize: 14,
        color: colors.puprble
    },
    img: {
        width: 50,
        height: 50
    }
})