import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, ScrollView,Pressable } from 'react-native';
import { BackgroundImage } from '@rneui/base';
import ServiceCard from '../components/ServiceCard';
import SearchContext from '../../store/SearchContext';
import { servicesCategory } from '../resources/data';
import { ScreenNames } from '../../route/ScreenNames';


const Header = (props) => {
    const { cat, setCat } = useContext(SearchContext);
    const navigation = useNavigation();


    const query = () => {
        return servicesCategory || [];
    }
    const renderCard = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <ServiceCard  {...card} />;
        });
        return cardsArray;
    };
    return (
        <View
            style={styles.header} >
            <Pressable
                style={styles.search}
                onPress={() => navigation.navigate(ScreenNames.ClientSearch)}
            >
                <Image style={styles.img} source={require('../assets/search.png')} />
                <Text style={styles.txt}>بحث</Text>
            </Pressable>
            <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false} >
                {renderCard()}
            </ScrollView>
        </View >
    );
}
const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: 180,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    home: {

    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 300,
        fontSize: 18,
        borderRadius: 20,
        fontWeight: 'bold',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.3,
        // backgroundColor: 'white',
        marginTop: 10,
        justifyContent: 'space-between',
        //borderWidth: 1,
        backgroundColor:'#ffff' ,
        elevation:5 , 
    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 7,
    },
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 15,
        color: 'gray'
    },
})
export default Header;
