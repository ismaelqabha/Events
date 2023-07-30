import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';


const ServiceCard = (props) => {
    const { isFromChooseServiceClick, isChecked } = props;
    const { cat, setCat, ServiceDataInfo, setServiceDataInfo, ServId, userId } = useContext(SearchContext);
    const navigation = useNavigation();

    
    // useEffect(()=> {
    //     getHomePageData().then(res => {
    //         console.log("res:" , res);
    //         setserviceImg(res)
    //     } ) 
    // } , [])

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
            navigation.navigate(ScreenNames.ClientHomeAds, { data: { ...props } });
        }
        //console.log(ServiceDataInfo);
    }


    const renderServiceType = () => {
        if (isFromChooseServiceClick === true) {
            const ServiceCard = props;
            const clicked = chickIfChecked(ServiceCard);
            return <TouchableOpacity style={clicked ? styles.otherbodyActive : styles.otherbody} onPress={() => onCatPress(ServiceCard)}>
                <Image
                    source={ServiceCard.img}

                    style={styles.otherimg}
                />
                <Text style={clicked ? styles.othertextActive : styles.othertext} >{props.titleCategory}</Text>
            </TouchableOpacity>;

        } else {
            return <TouchableOpacity style={styles.body} onPress={() => onCatPress()}>
                <Image
                    source={props.img}
                    style={styles.img}
                />
                <Text style={styles.text}>{props.titleCategory}</Text>
            </TouchableOpacity>;
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
        borderRadius: 12,
        alignItems: 'center',
        justifyContent:'space-between' ,
        marginTop: 10,
        // borderColor: 'white',
        marginLeft: 10,
        // padding:20, 
        // borderWidth:1 , 
        paddingVertical:20 ,
        backgroundColor:'#ffff' ,
        elevation:5 , 
    },
    img: {
        width: 25,
        height: 25,
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        // fontFamily: 'Cairo-VariableFont_slnt,wght',
        width:'100%' 
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
        borderColor: '#5f9ea0',
    },
    otherimg: {
        width: 60,
        height: 60,
    },
    othertext: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    othertextActive: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5f9ea0',
    },
})

export default ServiceCard;
