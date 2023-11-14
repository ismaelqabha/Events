import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { colors } from '../assets/AppColors';


const ServiceCard = (props) => {
    const { isFromChooseServiceClick, isFromSearchServiceClick, isChecked } = props;
    const { cat, setCat, ServiceDataInfo, setServiceDataInfo, ServId, userId, setCategorychozen } = useContext(SearchContext);
    const navigation = useNavigation();

    const [pressed, setPressed] = useState(true)

    const chickIfChecked = () => {
        return isChecked
    }

    const onCatPress = (item) => {
        if (isFromChooseServiceClick) {

            props.onCatPress(props.titleCategory);

            let ServiceArr = ServiceDataInfo;
            const isChecked = chickIfChecked(item);
            if (!isChecked) {
                let serviceIndex = ServiceArr.findIndex(ser => ser.service_id === ServId)

                if (serviceIndex != -1) {
                    ServiceArr[serviceIndex].servType = props.titleCategory;
                }
                setServiceDataInfo([...ServiceArr])
            }

        } else {
            const x = props.titleCategory;
            setCat(x);
            setCategorychozen(true)
            props.onCatPress(props.titleCategory);
            let ServiceArr = ServiceDataInfo;
            const isChecked = chickIfChecked(item);
            if (!isChecked) {
                let serviceIndex = ServiceArr.findIndex(ser => ser.service_id === ServId)

                if (serviceIndex != -1) {
                    ServiceArr[serviceIndex].servType = props.titleCategory;
                }
                setServiceDataInfo([...ServiceArr])
            }
            //navigation.navigate(ScreenNames.Results, { data: { ...props } });
        }

    }


    const renderServiceType = () => {
        if (isFromChooseServiceClick === true) {
            const ServiceCard = props;
            const clicked = chickIfChecked(ServiceCard);
            return <TouchableOpacity style={[clicked ? styles.otherbodyActive : styles.otherbody,styles.shadow]} onPress={() => onCatPress(ServiceCard)}>
                <Image
                    source={ServiceCard.img}

                    style={styles.otherimg}
                />
                <Text style={clicked ? styles.othertextActive : styles.othertext} >{props.titleCategory}</Text>
            </TouchableOpacity>;

        } else {
            if (isFromSearchServiceClick === true) {
                const ServiceCard = props;
                const clicked = chickIfChecked(ServiceCard);
                return <View>
                    <TouchableOpacity style={clicked ? styles.pressBody : styles.body} onPress={() => onCatPress()}>
                        <Image
                            source={props.img}
                            style={styles.img}
                        />

                    </TouchableOpacity>
                    <Text style={styles.text}>{props.titleCategory}</Text>
                </View>;
            } else {
                const ServiceCard = props;
                const clicked = chickIfChecked(ServiceCard);
                return <View style={[clicked ? styles.HomeScreenViewPress : styles.HomeScreenView,styles.shadow]}>
                    <TouchableOpacity 
                    //onPress={() => onCatPress()}
                    >
                        <Image
                            source={props.img}
                            style={styles.HomeScreenimg}
                        />
                        <Text style={styles.text}>{props.titleCategory}</Text>
                    </TouchableOpacity>

                </View>;
            }

        }
    }


    return (
        <View style={styles.container}>
            {renderServiceType()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        height: 100,
        width: 100,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingVertical: 20,
        backgroundColor: '#ffff',
        elevation: 5,
    },
    pressBody: {
        height: 100,
        width: 100,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingVertical: 20,
        backgroundColor: '#ffff',
        elevation: 5,
        borderColor: 'gray',
        borderWidth: 2
    },
    img: {
        width: 100,
        height: 100,
    },
    HomeScreenView: {
        //alignItems: 'center',
        justifyContent:'center',
        margin: 15,
        height: 100,
        width: 60,
    },
    HomeScreenViewPress:{
        justifyContent:'center',
        margin: 15,
        height: 100,
        width: 60,
        backgroundColor: colors.darkGold,
        borderRadius: 15,
        elevation:5
    },
    HomeScreenimg: {
        width: 60,
        height: 60,
    },
    text: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.puprble,
        //fontFamily: 'Cairo-VariableFont_slnt,wght',
        width: '100%'
    },
    otherbody: {
        height: 120,
        width: 120,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: 'white',
    },
    otherbodyActive: {
        height: 120,
        width: 120,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: colors.puprble,
    },
    otherimg: {
        width: 60,
        height: 60,
    },
    othertext: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
    },
    othertextActive: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
    },
    // shadow: {
    //     shadowColor: 'black',
    //     shadowOffset: { width: -2, height: 4 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 3,
    //     elevation: 7,
    //   },
})

export default ServiceCard;
