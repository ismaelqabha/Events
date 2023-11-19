import React from 'react';
import {View, StyleSheet,TouchableOpacity,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';
import { colors } from '../../assets/AppColors';

const ProviderShowServDetailComp = (props) => {
    const navigation = useNavigation();
    const onCaardPress = () => {
        navigation.navigate(ScreenNames.ProviderAddSubDetail, { data: { ...props} });
    }
    return (
        <View style={styles.container}>
                <TouchableOpacity style={styles.cardHeader}
                 onPress={onCaardPress}
                >
                    <Text style={styles.textTitle}>{props.detailTitle}</Text>
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardHeader: {
        height: 50,
        elevation: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        // marginBottom: 20,
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 10,
        justifyContent:'center',
        alignItems: 'center',
        margin:5 ,
        alignSelf:'center'
    },
    textTitle:{
        fontSize:25,
        fontWeight: 'bold',
        color:colors.puprble
    },
})

export default ProviderShowServDetailComp;
