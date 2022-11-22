import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import ServiceDropDown from '../components/ServiceDropDown';

const Header = (props) => {

    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <Image
                style={styles.searchIm}
                source={require('../../assets/search.png')} />
            <ServiceDropDown />
            <Pressable>
                <Text
                    style={styles.text}
                    onPress={() => navigation.navigate(ScreenNames.SignIn)}
                >دخول</Text>
            </Pressable>
            <Pressable>
                <Text style={styles.text}
                    onPress={() => navigation.navigate(ScreenNames.SignUp)}
                >تسجيل</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row-reverse',
        width: '100%',
        height: 80,
        backgroundColor: '#f0f8ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textS: {
        paddingHorizontal: 100,
        paddingRight: 5,
        paddingLeft: 160,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1e90ff',
    },
    text: {
        paddingHorizontal: 20,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1e90ff',
    },
    searchIm: {
        width: 30,
        height: 30,
    },

})

export default Header;
