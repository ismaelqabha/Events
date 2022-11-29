import { color } from '@rneui/base';
import React from 'react';
import { View, StyleSheet, Text,ScrollView,Image,TouchableOpacity  } from 'react-native';
import {  Card, Button, Icon } from 'react-native-elements';
import { ScreenNames } from '../../route/ScreenNames';
import SearchResCard from '../components/SearchResCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const ClientResult = (props) => {
    const renderCard = () => {
        const arr = [
            {
                src: (require('../../src/assets/ameer.png')),
                title: 'قاعات الامير',
                page: ScreenNames.SignUp,
                desc: 'قاعة الامير لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم'
            },
            {
                src: (require('../../src/assets/MaisAlrem.png')),
                title: 'قاعات ميس الريم',
                page: ScreenNames.SignIn,
                desc: 'قاعة ميس الريم لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم'
            },
            {
                src: (require('../../src/assets/talmarah.png')),
                title: 'قاعات تل المرح',
                page: ScreenNames.SignIn,
                desc: 'قاعة تل المرح لاحياء جميع مناسباتكم السعيدة اهلا وسهلا بكم'
            },
           
        ];
        const cardsArray = arr.map(card => {
            return <SearchResCard  {...card} />;
        });
        return cardsArray;
    };

    return (
        <View style={styles.container}>
            <View style={styles.vieText}>
                <Text style={styles.text}>قاعات</Text>
                <Text style={styles.text}>الخيارات المتاحة من نوع </Text>
            </View>
            <ScrollView contentContainerStyle={styles.home}>
            {renderCard()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    home: {
        borderRadius: 40,
        backgroundColor: '#fffaf0',
    },
    vieText: {

        flexDirection: 'row',
        marginLeft: 140,
        marginTop: 20,

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e90ff',
    },

   
})

export default ClientResult;
