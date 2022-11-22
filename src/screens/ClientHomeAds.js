import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Header from "../components/Header";
import HomeCards from '../components/HomeCards';
import strings from '../assets/res/strings'
import { ScreenNames } from '../../route/ScreenNames';

const ClientHomeAds = () => {

    const renderCard = () => {
        const arr = [
            {
                src: (require('../../src/assets/masa.png')),
                //text: 'على استعداد لتلبية جميع مناسباتكم',
                text:strings.cardtxt1,
                page: ScreenNames.SignUp,
            },
            {
                src: (require('../../assets/photos.png')),
                text: 'استديو الاحلام لتصوير جميع مناسباتك الجميلة',
                page: ScreenNames.SignIn,
            },
            {
                src: (require('../../assets/salon.png')),
                text: 'احدث موديلات العرائس والتجميل',
                page: ScreenNames.SignUp,
            },
        ];
        const cardsArray = arr.map(card => {
            return <HomeCards  {...card} />;
        });
        return cardsArray;
    };

    return (
        <View style={styles.bg}>
            <Header />
            <ScrollView contentContainerStyle={styles.home}>
                {renderCard()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        borderRadius: 40,
        backgroundColor: '#fffaf0',
    },
    bg: {
        flex: 1,
        backgroundColor: '#f0f8ff',
    }
})

export default ClientHomeAds;
