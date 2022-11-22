import React from 'react';
import { View, StyleSheet, Text, Image, Pressable,TouchableOpacity } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import { useNavigation } from '@react-navigation/native';

const HomeCards = (props) => {

    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(props.page)}>
        <View style={styles.card}>
            <Image
                source={props.src}
                style={styles.image}
            />
           
        </View>
        <View style={styles.nestedView}>
                <Text style={styles.text}>{props.text}</Text>

                <Pressable style={styles.press}>
                    <Text style={styles.text1}>...</Text>
                </Pressable>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 8,
        elevation: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'white',
        shadowOpacity: 0.1,
        margin: 20,
        height: 220,
        marginBottom:1
        
    },
    image: {
        width: 330,
        height: 205,
        borderRadius: 8,
        margin: 8,
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

    press:{
        paddingVertical: 5
    },
    line:{
        color: '#a9a9a9',
        alignItems: 'flex-start',
    }
})

export default HomeCards;
