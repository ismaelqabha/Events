import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';
import { TouchableOpacity } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import { AddNewFavorites  } from '../resources/API';



const FileFavoCard = (props) => {
    const { isFromFavorateClick, fileName, fileImg, fileId, fileFavoUserId } = props;
    const { setFId, fId, ServId, userId, userFavorates, setUserFavorates } = useContext(SearchContext);
    const navigation = useNavigation();



    // const query = () => {
    //     return userFavorates.filter(fav => {
    //         return fav.favoListFileId == fId;
    //     })
    // }

    const resetStack = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: ScreenNames.ClientHomeAds }
            ]
        })
    }


    const setNewFavoritFromApi = () => {
        console.log( "favoListFileId: ", fileId, "favoListUserId: ", userId, "favoListServiceId: ", ServId);

        const newFavorateItem = { favoListFileId: fileId, favoListUserId: userId, favoListServiceId: ServId }

        console.log("newFavorateItem: " , newFavorateItem);

        AddNewFavorites(newFavorateItem).then(res => {

            console.log("fav res : " , res);

            const userFav = userFavorates || [];
            userFav.push(newFavorateItem)
            setUserFavorates([...userFav])
        })
    }

    const onCaardPress = () => {
        setFId(props.fileId);
        console.log("ServId: ",ServId);
        if (!isFromFavorateClick) {
            navigation.navigate(ScreenNames.Favorites, { fileName: fileName })
            return;
        }

        setNewFavoritFromApi()

        resetStack()
    }
    return (
        <View style={styles.container}>
            <Card >
                <TouchableOpacity style={styles.cardHeader}
                    onPress={onCaardPress}
                >
                    <Card.Image
                        style={styles.image}
                        source={{ uri: fileImg }}
                    />
                    <Card.Title style={{ fontSize: 20, marginLeft: 90 }}>{fileName}</Card.Title>
                </TouchableOpacity>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 30,

    },
    card: {
        marginTop: 20,
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        //backgroundColor: '#87ceeb',
        alignItems: 'center',
        elevation: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#87ceeb',
        shadowOpacity: 0.1,
        marginBottom: 10,

    },
})

export default FileFavoCard;
