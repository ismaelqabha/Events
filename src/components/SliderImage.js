
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions, Pressable, ImageBackground } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import SIZES from '../resources/sizes';
import Icon from "react-native-vector-icons/FontAwesome";
import { RemoveFavorite, getFavoritesforUser } from '../resources/API';

const height = SIZES.screenWidth * 0.6;
const width = SIZES.screenWidth - 40;

const SliderImage = (props) => {
    const navigation = useNavigation();
    const [active, setActive] = useState();
    const { setSType, setServId, userFavorates, setUserFavorates, setImgOfServeice, userId } = useContext(SearchContext);


    const getFavoritesFromApi = () => {
        getFavoritesforUser({ favoListUserId: userId }).then(resjson => {
            !resjson?.message ?
                setUserFavorates(res) :
                null
            console.log("userFav", userFavorates);
        })
    }

    useEffect(() => {
         getFavoritesFromApi()
    }, [])



    const checkIfFavorate = () => {
        //console.log("userFAvorites check,", userFavorates);
        const isFav = userFavorates?.find(item =>
            item.favoListServiceId === props.service_id)
        return !!isFav;
    }
    console.log("checkIfFavorate(): ", checkIfFavorate())


    const removeFromFavorates = () => {
       
        RemoveFavorite({ favoListUserId: userId, favoListServiceId: props.service_id }).then(res => {
            setUserFavorates(res?.favorates)
           // console.log("userFavorates: ", res)
        })
    }

    const navigateToFavoratesList = () => {
        console.log("props.service_id: ", props.service_id);
        setServId(props.service_id)
        setImgOfServeice(props.img)
        navigation.navigate(ScreenNames.FileFavorites, { isFromFavorateClick: true }, { ...props });
    }

    const OnClickFavorite = () => {
        if (checkIfFavorate()) {
            removeFromFavorates()
        } else {
            navigateToFavoratesList()
        }
    }

    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }
    const onImagesPress = () => {

        setSType((props.servType))
        navigation.navigate(ScreenNames.ServiceDescr, { data: { ...props } })
    }


    const renderImages = () => {

        const imageArray = props.images?.map(photo => {
            return photo.image;
        });

        return imageArray?.map((image, index) => {
            return (
                <Pressable onPress={onImagesPress}>
                    <Image
                        style={styles.img}
                        source={{ uri: image }}
                        key={index}
                    />
                </Pressable>
            )
        })
    }

    const renderDots = () => {
        return props.images?.map((i, k) => (
            <Text key={k} style={active ? styles.dotActiveStyle : styles.dotStyle}>•</Text>
        ))
    }

    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                style={{ width, height }}
                showsHorizontalScrollIndicator={false} >
                {renderImages()}
            </ScrollView>

            <Pressable
                onPress={OnClickFavorite}
                style={styles.heartFavo} >
                <View style={styles.heartView}>
                    <Icon
                        style={styles.icon}
                        name={(checkIfFavorate()) ? "heart" : "heart-o"}
                        color={(checkIfFavorate()) ? "red" : "white"}
                        size={25} />
                </View>
            </Pressable>
            <View style={styles.dot}>
                {renderDots()}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignSelf: 'center'
    },
    heartView: {
        //borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: 'gray',
        elevation: 5,
        marginTop: 5,
        marginRight: 15,
        width: 40,
        height: 40,
    },
    img: {
        width,
        height,
        resizeMode: 'contain',
        borderRadius: 15,
    },
    heartFavo: {
        position: 'absolute',
        right: -10,
    },
    icon: {

    },
    dot: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    dotStyle: {
        color: 'white',
        margin: 3,
        fontSize: (width / 30),
    },
    dotActiveStyle: {
        color: 'blue',
        margin: 3,
        fontSize: (width / 30),
    },
})

export default SliderImage;
