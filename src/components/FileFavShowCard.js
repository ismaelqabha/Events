import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';
import { TouchableOpacity } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';

const FileFavShowCard = (props) => {
    const { fId, ServId,setFId , userFavorates   } = useContext(SearchContext);
    const navigation = useNavigation();

    const query = () => {
        return userFavorates.filter(fav => {
            return fav.favoListFileId == fId;
        })
    }

    const onCaardPress = () => {
        setFId(props.fileId)
        navigation.navigate(ScreenNames.Favorites, { data: { ...props, ServId } })
    }
    return (
        <View style={styles.container}>
            <Card >
                <TouchableOpacity style={styles.cardHeader}
                    onPress={onCaardPress}
                >
                    <Card.Image
                        style={styles.image}
                        source={props.fileImg}
                    />
                    <Card.Title style={{ fontSize: 20, marginLeft: 90 }}>{props.fileName}</Card.Title>
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

export default FileFavShowCard;
