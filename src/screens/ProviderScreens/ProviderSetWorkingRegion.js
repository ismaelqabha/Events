import React from 'react';
import { View, StyleSheet, Text, Pressable,ScrollView } from 'react-native';
import { regionData } from '../../resources/data';
import ProviderWorkRegionComp from '../../components/ProviderWorkRegionComp';
import { ScreenNames } from '../../../route/ScreenNames';

const ProviderSetWorkingRegion = (props) => {

    const onNextPress = () => {
        props.navigation.navigate(ScreenNames.ProviderSetPrice, { data: { ...props } });
    }
    const onBackPress = () => {
        props.navigation.goBack();
    }

    const query = () => {
        return regionData || [];
    }
    const renderCard = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <ProviderWorkRegionComp  {...card} />;
        });
        return cardsArray;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>ما هي المناطق التي تود العمل فيها؟</Text>
            </View>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.home}>
                    {renderCard()}
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.back} onPress={onBackPress}>
                    <Text style={styles.backText}>رجوع</Text>
                </Pressable>
                <Pressable style={styles.next} onPress={onNextPress}>
                    <Text style={styles.nextText}>التالي</Text>
                </Pressable>

            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 40,
        marginBottom: 10,
    },
    headText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    body: {
        height: '75%',
        marginTop: 20,
        // marginLeft: '18%',
    },
    footer: {
        //alignSelf: 'flex-end',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,

    },
    next: {
        width: 70,
        height: 40,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    backText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
})

export default ProviderSetWorkingRegion;
