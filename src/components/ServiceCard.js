import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';


const ServiceCard = (props) => {
    const { cat, setCat } = useContext(SearchContext);
    const navigation = useNavigation();

    const onCatPress = () => {
        setCat(props.titleCategory);
        navigation.navigate(ScreenNames.ClientHomeAds, { data: { ...props } });
        console.log(cat);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.body} onPress={onCatPress}>
                <Image
                    source={props.img}
                    style={styles.img}
                />
                <Text style={styles.text}>{props.titleCategory}</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    body: {
        justifyContent:'center',
        height: 100,
        width: 70,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        borderColor: 'white',
       marginLeft: 5,
        backgroundColor: 'white',
       
    },
    img: {
        width: 50,
        height: 50,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
})

export default ServiceCard;
