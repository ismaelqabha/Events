
import React, { useState, useMemo, useEffect, useRef } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import ActionSheet from 'react-native-actions-sheet';


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
                <Text style={styles.text}>بحث الخدمات</Text>
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
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 40,
        width: 150,
        height: 40,
        borderWidth:1
    },
    text:{
        color:'#1e90ff',
        textAlign:'right',
        fontWeight: 'bold'
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
});
