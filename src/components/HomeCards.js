import React from 'react';
import { View, StyleSheet, Text, Image, Pressable, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

const HomeCards = (props) => {

    const navigation = useNavigation();
    const { img, subTitle, title, linkPage } = props;
    const onCaardPress = () => {
        navigation.navigate(linkPage, { data: { ...props } })
    }

    return (
        <TouchableOpacity onPress={onCaardPress} style={styles.container}>
            <Card style={styles.card}>
                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}

                <Card.Cover  style={styles.img} source={img} />
                <Card.Content style={styles.content}>
                    <Title>{title}</Title>
                    <Paragraph>{subTitle}</Paragraph>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    card: {
        // flexDirection: 'row',
        borderRadius: 20,
        // elevation: 2,
        // shadowOffset: { width: 1, height: 1 },
        // shadowColor: 'white',
        // shadowOpacity: 0.1,
        margin: 20,
        height: 300,
        width: 350,
        padding: 10,
    },
    content: {
        alignItems: 'center'
    },
    img:{
        width: '100%',
        height: 220,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginLeft: 290,
        marginTop: 10
    },
    image1: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
    nestedView: {
        marginRight: 20,

    },
    text: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#696969',
    },
    text1: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#696969',
    },

    press: {
        flexDirection: 'row',
        paddingVertical: 5,

    },
    line: {
        color: '#a9a9a9',
        alignItems: 'flex-start',
    }
})

export default HomeCards;
