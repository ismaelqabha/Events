import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import SliderImage from '../components/SliderImage';


const HomeCards = (props) => {
    
    const navigation = useNavigation();
    const { subTitle, address } = props;
    const { setSType} = useContext(SearchContext);

    

    const onCaardPress = () => {
        setSType((props.servType))
        navigation.navigate(ScreenNames.ServiceDescr, { data: { ...props } })
    }

    return (
        <View>
            <SliderImage  {...props} />
            <TouchableOpacity onPress={onCaardPress}  >
                <View style={{ width: 350, height: 100, marginTop: 10 }}>
                    <View style={styles.nestedView}>
                        <Text>★5</Text>
                        <Text style={styles.text} numberOfLines={2}>{subTitle}....</Text>
                    </View>
                    <Text style={styles.text}>{address}</Text>
                   
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nestedView: {
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    text: {
        fontSize: 15,
        color: '#696969',
        fontFamily: 'Amiri-BoldItalic',
        //fontFamily: 'Cairo-VariableFont_slnt,wght',
        // width: 350,
        // width: "80%",
        alignSelf: 'flex-end',
    },
    tex: {
        fontSize: 15,
        textAlign: 'right',
        fontWeight: 'bold'
    }

})

export default HomeCards;
