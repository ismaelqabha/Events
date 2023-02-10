import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, Pressable, ScrollView } from 'react-native';
import { fileFavorites } from '../resources/data';
import SearchContext from '../../store/SearchContext';
import FileFavShowCard from '../components/FileFavShowCard';

const FileFavoritesShow = (props) => {
    const { userId  , userFavorates} = useContext(SearchContext);
    const  data = userFavorates;

    const query = () => {
        if (!data.fileId) {
            return fileFavorites || [];
        }
        return fileFavorites.filter(id => {
            return id.fileFavoUserId == userId;
        })
    }
    const renderCard = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <FileFavShowCard  {...card} />;
        }); return cardsArray;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>قوائم الامنيات</Text>
            </View>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.home}>
                    {renderCard()}
                </ScrollView>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    header: {
        alignItems: 'flex-end',
        marginTop: 20,
        marginRight: 20,
    },
    body: {
        width: '100%',
        height: 550,
        backgroundColor: 'white',
        marginTop: 20,
    },
    img: {
        width: 60,
        height: 60,

    },
})

export default FileFavoritesShow;
