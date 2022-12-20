import React, { useContext,useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Header from "../components/Header";
import HomeCards from '../components/HomeCards';
import strings from '../assets/res/strings'
import { ScreenNames } from '../../route/ScreenNames';
import { BackgroundImage } from '@rneui/base';
import SearchContext from '../../store/SearchContext';
import { servicesData } from '../resources/data';
import DataNotExist from '../components/DataNotExist';
import { useNavigation } from '@react-navigation/native';

const ClientHomeAds = () => {
    const { cat } = useContext(SearchContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
        });
    }, [navigation]);
    
    const query = () => {
        if (!cat) {
            return servicesData || [];
        }

        return servicesData.filter(nameItem => {
            return nameItem.servType == cat;
        })
    }

    const renderCard = () => {
        const arr = [
            {
                src: (require('../../src/assets/x1.png')),
                //text: 'على استعداد لتلبية جميع مناسباتكم',
                title: 'قاعة الماسة للافراح',
                subTitle: strings.cardtxt1,
                page: ScreenNames.ServiceDescr,
            },
            {
                src: (require('../../assets/photos.png')),
                title: 'تصوير الاحلام',
                subTitle: 'استديو الاحلام لتصوير جميع مناسباتك الجميلة',
                page: ScreenNames.ServiceDescr,
            },
            {
                src: (require('../../assets/salon.png')),
                title: 'صالون اميرة للسيدات',
                subTitle: 'احدث موديلات العرائس والتجميل',
                page: ScreenNames.ServiceDescr,
            },
        ];
       
        const data = query();
        const cardsArray = data.map(card => {
            return <HomeCards  {...card} />;
        });
        return cardsArray;
    };

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
        backgroundColor: '#fff0f5',

    },
    bg: {
        flex: 1,
        backgroundColor: '#fff0f5',

    }
})

export default ClientHomeAds;
