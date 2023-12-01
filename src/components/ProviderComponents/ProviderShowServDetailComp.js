import React from 'react';
import {View, StyleSheet,TouchableOpacity,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';

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
        height: 80,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        marginBottom: 20,
        backgroundColor: 'white',
        width: 300,
        borderRadius: 25,
        justifyContent:'center',
        alignItems: 'center'
        
    },
    textTitle:{
        fontSize:25,
        fontWeight: 'bold',
        color:'#483d8b'
    },
})

export default ProviderShowServDetailComp;
