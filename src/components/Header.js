import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, ScrollView } from 'react-native';
import { BackgroundImage } from '@rneui/base';
import ServiceCard from '../components/ServiceCard';
import SearchContext from '../../store/SearchContext';
import { servicesCategory } from '../resources/data';

const Header = (props) => {
    const { cat, setCat } = useContext(SearchContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'search',
            },
        });
    }, [navigation]);

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
        <BackgroundImage source={require('../assets/headerBG.png')} style={styles.header} >
            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder='بحث'
            />
            <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false} >
                {renderCard()}
            </ScrollView>

        </BackgroundImage>
    );
}
const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: 200,
        backgroundColor: '#d8bfd8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    home: {
        // flexDirection: 'row',
        marginTop: 30,
    },
    input: {
        textAlign: 'right',
        height: 40,
        width: 300,
        fontSize: 18,
        borderRadius: 20,
        fontWeight: 'bold',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        backgroundColor: 'white',
        marginTop: 10,
    },
})
export default Header;
