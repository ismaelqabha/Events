import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, ScrollView, Pressable } from 'react-native';
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
        <View style={styles.header} >
            <View style={styles.headerQuestio}>
                <Text style={styles.headerText}>مرحبا, اسماعيل</Text>
                <Text style={styles.headerText}>ماهي الخدمات التي تحتاجها لمناسبتك؟</Text>
            </View>
            
            <Pressable
                style={styles.search}
                onPress={() => navigation.navigate(ScreenNames.ClientSearch)}
            >
                <Image style={styles.img} source={require('../assets/search.png')} />
                <Text style={styles.txt}>بحث</Text>
            </Pressable>
            
            <Text style={styles.headerText}>تصنيف الخدمات</Text>
            <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false} >
                {renderCard()}
            </ScrollView>
        </View >
    );
}
const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: 400,
        backgroundColor: 'snow',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    headerQuestio: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10, 
     },
    headerText: {
        fontSize: 20,
        alignItems: 'flex-end',
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: 20.
    },
    
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 350,
        fontSize: 18,
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 10,
        justifyContent: 'space-between',
        backgroundColor: '#ffff',
        elevation: 5,
        marginBottom: 60,
        marginRight: 15
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
