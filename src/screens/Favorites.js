import React,{useContext} from 'react';
import {View, StyleSheet,Text, ScrollView,Pressable} from 'react-native';
import HomeCards from '../components/HomeCards';
import { servicesData } from '../resources/data';
import SearchContext from '../../store/SearchContext';
import Ionicons from "react-native-vector-icons/Ionicons";

const Favorites = (props) => {
    const { userId, ServId,fileId , userFavorates , fId} = useContext(SearchContext);
    const { fileName } = props?.route.params;

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const query = () => {
        const filterdFav = userFavorates.filter(favService => {
            return favService.favoListFileId ==  fId &&
            favService.favoListUserId == userId ;
        })


       const faveArr = filterdFav.map(fav => servicesData.find(ser => ser.service_id === fav.favoListServiceId))
       return faveArr ;
    }
    const renderCard = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return card ? <HomeCards  {...card} /> : null;
        });
        return cardsArray;
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerImg}>
                <View style={styles.viewIcon}>
                    <Pressable onPress={onPressHandler}
                    >
                        <Ionicons
                            style={styles.icon}
                            name={"arrow-back"}
                            color={"black"}
                            size={25} />
                    </Pressable>
                </View>
                <View style={styles.viewtitle}>
                <Text style={styles.title}>{fileName}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
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
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        marginTop: 20,
    },
    viewtitle: {
        justifyContent: 'center',
        height: 50,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 30,
    },
    headerImg: {
        flexDirection: 'row',
        height: 60,
        justifyContent:'space-between',
        marginTop:10,
    },
    viewIcon: {
       alignItems: 'center',
       justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    contentContainerStyle:{
        paddingBottom:100,
    }
})

export default Favorites;
