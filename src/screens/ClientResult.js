
import React from 'react';
import { useContext, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import SearchResCard from '../components/SearchResCard';
import { servicesData } from '../resources/data';
import DataNotExist from '../components/DataNotExist';
import SearchContext from '../../store/SearchContext';


const ClientResult = (props) => {
    const { Service, city } = useContext(SearchContext);
    // const { data } = props?.route.params;

    const query = () => {
        console.log(city,  Service);
        if (!city && !Service) {
            return servicesData || [];
        }
        return servicesData.filter(nameItem => {
            return nameItem.address == city && nameItem.servType == Service;
        })
    }
    const renderCard = () => {
        const data = query();

        if (!data?.length) {
            //TODO : return no data component
            return (
                <DataNotExist />
            );
        }

        const cardsArray = data.map(card => {
            return <SearchResCard  {...card} />;
        });
        return cardsArray;
    };

    return (
        <View style={styles.container}>
            <View style={styles.vieText}>
                <Text style={styles.text}>{Service}</Text>
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
