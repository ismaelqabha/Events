
import React, { useState, useMemo, useEffect, useRef } from 'react';

import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import ActionSheet from 'react-native-actions-sheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


export default function App() {
 

    let actionsheet = useRef();
    let services = [
        'قاعات افراح',
        'تصوير',
        'مكياج',
        'فساتين',
        'مطربين',
        'Dj'
    ]
    const showActionSheet= () => {
        actionsheet.current.show();

    }

    const renderOptions = () => {
        return services.map(service => <Text style={styles.textS} onPress={()=> console.log('ser: ' , service)}>{service}</Text>)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress = {showActionSheet}
            >
                <Text style={styles.text}>بحث الخدمات </Text>
                <Image
                        source={require('../assets/search.png')}
                        style={styles.img}
                    />
               
            </TouchableOpacity>
            
            <ActionSheet
            ref = {actionsheet}
            title = {'choose'}
            options = {services}
            cancelButtonIndex = {3}
            destructiveButtonIndex = {2}
            style={styles.select}
            >
                {renderOptions()}
            </ActionSheet>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row-reverse',
        justifyContent:'center',
        backgroundColor: '#fff0f5',
        padding: 10,
        borderRadius: 25,
        marginTop: 30,
        width: 350,
        height: 60,
       
        borderColor: 'black'
    },
    text:{
        color:'black',
        textAlign:'center',
        fontWeight: '900',
        marginTop: 5,
        fontSize: 15,
    },
    textS:{
        color:'#1e90ff',
        textAlign:'right',
        fontWeight: 'bold',
        fontSize: 15,
        paddingVertical:10,
        textAlign: 'center',
    },
    select:{
        backgroundColor: 'red'
    },
    img: {
        width: 50,
        height: 50,
       marginBottom:30,
        marginRight:200
        
       

    },
});
