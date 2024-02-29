import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';
import { colors } from '../../assets/AppColors';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ProviderShowServDetailComp = (props) => {
    const navigation = useNavigation();
    const onCaardPress = () => {
        navigation.navigate(ScreenNames.ProviderAddSubDetail, { data: { ...props } });
    }
    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => { props.deleteItem(props.detail_Id) }}>
                        <AntDesign name='delete' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => { props.openEdit(props) }}>
                        <Feather name='edit' size={20} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={onCaardPress}
                >
                    <Text style={styles.textTitle}>{props.detailTitle}</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 5,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.puprble
    },
})

export default ProviderShowServDetailComp;
