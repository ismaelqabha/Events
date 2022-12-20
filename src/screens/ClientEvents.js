import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Text, Image } from 'react-native';
import EventsCard from '../components/EventsCard';
import { Events } from '../resources/data';
import DataNotExist from '../components/DataNotExist';
import { ScreenNames } from '../../route/ScreenNames';
import { calcCost } from '../utils/utils';

const ClientEvents = (props) => {
    const onPressHandler = () => {
        props.navigation.goBack();
    }


    const query = () => {
        return Events || [];

        // return servicesData.filter(nameItem => {
        //     return nameItem.address == city && nameItem.servType == Service;
        // })
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
            return <EventsCard  {...card} />;
        });
        return cardsArray;
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerImg}>
                <Pressable onPress={() => props.navigation.navigate(ScreenNames.ClientInfo)}>
                    <Image
                        source={require('../assets/add.png')}
                        style={styles.img}
                    />
                </Pressable>
                <Pressable onPress={onPressHandler}>
                    <Image
                        source={require('../assets/back.png')}
                        style={styles.img}
                    />
                </Pressable>
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
        alignItems: 'center',
    },
    img: {
        width: 50,
        height: 50,
        marginLeft: 70,
        marginRight: 200,
        marginTop: 5,

    },
    headerImg: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#87ceeb',
    },
})

export default ClientEvents;
