import React from 'react';
import { View, StyleSheet, Text, Pressable, Image ,TouchableOpacity} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { ScreenNames } from '../../route/ScreenNames';
import { Card, Paragraph } from 'react-native-paper';

const ServiceDescr = (props) => {
    const { data } = props?.route.params


    const images = [
        require('../../src/assets/ameer.png'),
        require('../../src/assets/ameer.png'),
        require('../../src/assets/ameer.png'),
        require('../../src/assets/ameer.png'),
    ]

    return (
        <View style={styles.container}>
            <View style={styles.slider} >
                <SliderBox
                    sliderBoxHeight={200}
                    images={images}
                    style={{ width: 400, height: 300 }} />
            </View>

            <Card>
                <Card.Title style={styles.title}>{data?.title || 'no event'}</Card.Title>
            </Card>

            <Card>
                <Card.Content style={styles.content}>
                    <Paragraph>وصف للقاعة</Paragraph>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content style={styles.content}>
                    <Paragraph> العنوان</Paragraph>
                </Card.Content>
                <TouchableOpacity
                //onPress={() => navigation.navigate(props.page)}
                >
                <Card.Image
                    style={styles.image}
                    source={require('../assets/location.png')}
                />
                 </TouchableOpacity>
            </Card>

            <Card>
                <Card.Content style={styles.content}>
                    <Paragraph>Service Cost</Paragraph>
                </Card.Content>
            </Card>

            <Card>
                <Card.Content style={styles.content}>
                    <Paragraph>Feedback</Paragraph>
                </Card.Content>
            </Card>

            <Card>
            <Text style={styles.text}>لمشاهدة الفيديو</Text>
            <Pressable onPress={() => props.navigation.navigate(ScreenNames.VideoPlayer)}>
            <Card.Image
                    style={styles.image}
                    source={require('../assets/playvideo.png')}
                />
            </Pressable>
            </Card>

            <Text style={styles.txt}>للتواصل </Text>
            <View style={styles.icon}>
                <Image style={styles.insicon} source={require('../assets/facebook--v2.png')} />
                <Image style={styles.insicon} source={require('../assets/instagram-new.png')} />
                <Image style={styles.insicon} source={require('../assets/apple-phone.png')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        alignItems: 'center',
        marginTop: 50,
        marginRight: 20,
        fontSize: 20,
        color: '#1e90ff',
    },
    text: {
        marginRight: 20,
        fontSize: 20,
        color: 'blue',
    },
    icon: {
        flexDirection: 'row',
        margin: 30,
        paddingLeft: 30,
    },
    insicon: {
        marginLeft: 25,
        marginHorizontal: 10,
        width: 50,
        height: 50,
        color: '#1e90ff'
    },

    txt: {
        marginTop: 50,
        marginRight: 20,
        fontSize: 20,
        color: '#1e90ff',
    },
   
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1e90ff',
        marginLeft: 90,
    },
})

export default ServiceDescr;
