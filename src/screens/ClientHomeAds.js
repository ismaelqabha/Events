import React, { useState,useContext,useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Header from "../components/Header";
import HomeCards from '../components/HomeCards';
import { BackgroundImage } from '@rneui/base';
import SearchContext from '../../store/SearchContext';
import { servicesData } from '../resources/data';


const ClientHomeAds = (props) => {
    const { data } = props.route.params || {}
    const { cat , userFavorates,ServiceDataInfo} = useContext(SearchContext);
   
    const [favorates, setFavoratis] = useState([]);

    const getfav = async () => {
        var favoritsFromStorage = await AsyncStorage.getItem('favorite');
        if (favoritsFromStorage) {
            favoritsFromStorage = await JSON.parse(favoritsFromStorage);
        } else {
            favoritsFromStorage = []
        }
        return favoritsFromStorage;
    }


    const checkIsFavorate = (id) => {
        const isFav = userFavorates.find(item => item.favoListServiceId === id)
        return !!isFav;
    }

    const query = () => {
        if (!cat) {
            return ServiceDataInfo || [];
        }
        return ServiceDataInfo.filter(nameItem => {
            return nameItem.servType == cat;
        })
    }

    const renderCard = () => { 
        const data = query();
        const cardsArray = data.map(card => {
            return <HomeCards  {...card}
                   // service_id={item}
                    isFavorate={checkIsFavorate(data?.service_id)}
            />;
        });
        return cardsArray;
    };
    useEffect(() => {
        getfav().then(res => setFavoratis([...res]))
    }, []);

    return (
        <BackgroundImage style={styles.bg}
        //source={require('../../src/assets/bg.png')}
        >
            <Header />
            <ScrollView contentContainerStyle={styles.home}>
                {renderCard()}
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    home: {
        borderRadius: 40,
        backgroundColor: 'white',
      

    },
    bg: {
        flex: 1,
        backgroundColor: 'white',

    }
})

export default ClientHomeAds;
