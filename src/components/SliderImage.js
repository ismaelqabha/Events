
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions, Pressable, ImageBackground, ToastAndroid } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import SIZES from '../resources/sizes';
import Icon from "react-native-vector-icons/FontAwesome";
import { UpdateFileFavorite } from '../resources/API';
import { colors } from '../assets/AppColors';


const height = SIZES.screenWidth * 0.6;
const width = SIZES.screenWidth - 10;

const SliderImage = (props) => {
    const navigation = useNavigation();
    const [active, setActive] = useState();
    const { favorites, setFavorites } = useContext(SearchContext);



    useEffect(() => {

    }, [])

    const checkFavorates = () => {
        const isFav = favorites?.find(item => {
            return item.favoListServiceId.find(elem => {
                return elem === props.service_id
            })
        })
        return !!isFav;
    }

    const navigateToFavoratesList = () => {
        const serviceId = props.service_id
        const index = props.images[0].logoArray?.findIndex((val) => val === true)
        const lastSerLogoSelected = props.images[0]?.serviceImages[index]
        navigation.navigate(ScreenNames.FileFavorites, { isFromFavorateClick: true, lastSerLogoSelected, serviceId }, { ...props });
    }

    const filterFavoritesFile = () => {
        const file = favorites?.findIndex(item => {
            return item.favoListServiceId.find(elem => {
                return elem === props.service_id
            })
        })
        return file;
    }

    const updatefavorites = () => {
        const fileFavoritesIndex = filterFavoritesFile()
        const file = favorites || [];

        const favoSer = file[fileFavoritesIndex].favoListServiceId.filter(elme => elme !== props.service_id)

        const newData = {
            fileId: file[fileFavoritesIndex].fileId,
            fileImg: '',
            fileName: file[fileFavoritesIndex].fileName,
            favoListServiceId: [...favoSer]
        }

        UpdateFileFavorite(newData).then(res => {
            if (res.message === 'Updated Sucessfuly') {

                if (fileFavoritesIndex > -1) {
                    file[fileFavoritesIndex] = newData;
                }
                setFavorites([...file])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }

        })
    }

    const OnClickFavorite = () => {
        if (checkFavorates()) {
            updatefavorites()
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
        navigation.navigate(ScreenNames.ServiceDescr, { data: { ...props } })
    }


    const renderImages = () => {
        const imageArray = props.images[0].serviceImages
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
                        name={(checkFavorates()) ? "heart" : "heart-o"}
                        color={(checkFavorates()) ? "red" : colors.puprble}
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
        backgroundColor: 'white',
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
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: 'stretch'
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
