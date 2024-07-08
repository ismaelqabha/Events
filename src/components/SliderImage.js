
import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions, Pressable, ImageBackground, ToastAndroid } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import SIZES from '../resources/sizes';
import Icon from "react-native-vector-icons/FontAwesome";
import { RemoveFavorite, UpdateFileFavorite, getFavoritesforUser } from '../resources/API';
import { colors } from '../assets/AppColors';
import UsersContext from '../../store/UsersContext';

const height = SIZES.screenWidth * 0.6;
const width = SIZES.screenWidth - 10;

const SliderImage = (props) => {
    const navigation = useNavigation();
    const [active, setActive] = useState();
    const { userId } = useContext(UsersContext);
    const { setSType, userFavorates, setUserFavorates, setImgOfServeice, setServId, favorites, setFavorites } = useContext(SearchContext);

    // console.log("favorites", favorites);

    // const checkIfFavorate = () => {
    //     const isFav = userFavorates?.find(item =>
    //         item.favoListServiceId === props.service_id)
    //     return !!isFav;
    // }
    useEffect(() => {
        // const data = filterFavoritesFile()
        // console.log("data", data);
    }, [])

    const checkFavorates = () => {
        const isFav = favorites?.find(item => {
            return item.favoListServiceId.find(elem => {
                return elem === props.service_id
            })
        })
        return !!isFav;
    }

    //console.log("props", props.images[0]);

    // const removeFromFavorates = () => {
    //     RemoveFavorite({ favoListUserId: userId, favoListServiceId: props.service_id }).then(res => {
    //         setUserFavorates(res?.favorates)
    //     })
    // }

    const navigateToFavoratesList = () => {
        setImgOfServeice(props.img)
        navigation.navigate(ScreenNames.FileFavorites, { isFromFavorateClick: true }, { ...props });
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
        console.log(newData);

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
            setServId(props.service_id)
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
