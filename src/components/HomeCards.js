import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, Text, Pressable, TouchableOpacity, Animated, ScrollView, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { BackgroundImage } from 'react-native-elements/dist/config';
import SliderImage from '../components/SliderImage';


const HomeCards = (props) => {
    const navigation = useNavigation();
    const { img, subTitle, title, service_id, image, servType, } = props;
    const { setSType, setServId, userFavorates, setUserFavorates, setFavorite, setServiceImg } = useContext(SearchContext);
    const [serviceImage, setServiceImage] = useState([])

    const checkIfFavorate = () => {
        const isFav = userFavorates.find(item => item.favoListServiceId === service_id)
        return !!isFav;
    }

    const OnClickFavorite = () => {
        if (checkIfFavorate()) {
            let favArr = userFavorates;
            favArr = favArr.filter(fav => fav.favoListServiceId != service_id)
            setUserFavorates([...favArr])

        } else {
            setServiceImg(props.img)
            navigation.navigate(ScreenNames.FileFavorites, { isFromFavorateClick: true });
        }
    }
    useEffect(() => {
        setFavorite(checkIfFavorate())
        setServiceImage([...image])
    }, [userFavorates])

    const onCaardPress = () => {
        setServId(props.service_id)
        setSType((props.servType))
        navigation.navigate(ScreenNames.ServiceDescr, { data: { ...props } })
    }

    const scroll = useRef(new Animated.Value(0)).current
    let { width: windowWidth, height: windowHeight } = useWindowDimensions();
    windowHeight = windowHeight - 300;

    const renderImage = () => {
        return serviceImage.map((image, imageIndex) => {
            return (
                <Animated.View
                    style={[{ width: windowWidth, height: windowHeight }, styles.scrollContainer]}
                    key={imageIndex}>
                    <BackgroundImage style={styles.card1} source={image}>
                        <Pressable onPress={OnClickFavorite} >
                            <Icon
                                style={styles.icon}
                                name={(checkIfFavorate()) ? "heart" : "heart-o"}
                                color={(checkIfFavorate()) ? "red" : "white"}
                                size={25} />
                        </Pressable>
                    </BackgroundImage>
                </Animated.View >
            )
        })
    }
    const renderDots = () => {
        return serviceImage.map((image, imageIndex) => {
            const width = scroll.interpolate({
                inputRange: [
                    windowWidth * (imageIndex - 1),
                    windowWidth * (imageIndex),
                    windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
            })
            return (
                <Animated.View style={[styles.normallDots, { width }, { backgroundColor: 'green' }]} />
            );
        }
        )
    }


    return (
        <TouchableOpacity onPress={onCaardPress}>
            {/* <View style={[styles.scrollContainer]}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scroll } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={15}
                >
                    {renderImage()}
                </ScrollView>
            </View>
            <View style={styles.dots}>
                {renderDots()}
            </View> */}

            {/* <SliderImage images={image} /> */}
            <BackgroundImage style={styles.card} source={img}>
                <Pressable onPress={OnClickFavorite} >
                    <Icon
                        style={styles.icon}
                        name={(checkIfFavorate()) ? "heart" : "heart-o"}
                        color={(checkIfFavorate()) ? "red" : "white"}
                        size={25} />
                </Pressable>
            </BackgroundImage>
            <View>
                <View style={styles.nestedView}>
                    <Text>5★</Text>
                    <Title>{title}</Title>
                </View>
                <Text style={styles.text}>{subTitle}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    normallDots: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        marginBottom: 20,
    },
    card1: {
        flex: 1,
        width: 300,
        overflow: 'hidden',
        alignSelf: 'center',
        borderRadius: 15,
    },
    card: {
        marginTop: 10,
        height: 320,
        width: 330,
        alignSelf: 'center',
    },
    nestedView: {
        marginRight: 20,
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        marginRight: 20,
        marginBottom: 30,
        textAlign: 'right',
        fontSize: 15,
        color: '#696969',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 35,
        marginTop: 12,
    },
    touch: () => ({
        //backgroundColor: 'rgba(1,0,0,0)',
        flex: 1,
        elevation: 1,
        width: 350,
        alignSelf: 'center',
        //marginVertical: 20,
        marginBottom: 10,
    }),

})

export default HomeCards;
