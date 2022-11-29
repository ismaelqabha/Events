import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { ScreenNames } from '../../route/ScreenNames';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const ServiceDescr = (props) => {


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
            <View style={styles.desc}>
                <Text style={styles.title}>قاعات  الامير</Text>
                <Text style={styles.txt}>وصف للقاعة</Text>
            </View>
            <Pressable onPress={() => props.navigation.navigate(ScreenNames.VideoPlayer)}>
                <Text style={styles.text}>لمشاهدة الفيديو</Text>
            </Pressable>
            <Text style={styles.txt}>للتواصل </Text>
            <View style={styles.icon}>
                
            <Image style={styles.insicon} source={require('../assets/icons8-facebook-48.png')} />
            <Image style={styles.insicon} source={require('../assets/icons8-instagram-48.png')} />
            <Image style={styles.insicon} source={require('../assets/icons8-call-50.png')} />
                {/* <FontAwesome5
                    style={styles.insicon}
                    name='facebook'
                />
                <FontAwesome5
                    style={styles.insicon}
                    name='instagram'
                />
                <FontAwesome5
                    style={styles.insicon}
                    name='phone'
                /> */}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        marginHorizontal: 20,
        fontSize: 30,
        color: '#1e90ff'
    },
    slider: {

    },
    txt: {
        marginTop: 50,
        marginRight: 20,
        fontSize: 20,
        color: '#1e90ff',
    },
    desc: {
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1e90ff',
    },
})

export default ServiceDescr;
