import React from 'react';
import {View, StyleSheet,TextInput,Pressable,Text} from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';

const ClientInfo = () => {
    return (
        <View style={styles.container}>
             <Text style={styles.text}> نشكرك على اختيارك لنا لتنظيم حفلك</Text>
            <View style={styles.textIn}>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder='اسم الشريك'
                />
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder='الموبايل'
                />
                <TextInput
                    style={styles.input}
                    keyboardType="visible-password"
                    placeholder='المدينة'
                />
            </View>
            <Pressable style={styles.btnEnter} >
                <Text style={styles.txtُEnter}>تسجيل</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1e90ff',
        marginTop: 20,
    },
    input: {
        alignContent: 'center',
        textAlign: 'center',
        height: 40,
        width: 300,
        fontSize: 17,
        borderRadius: 15,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#1e90ff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        marginTop: 10,
        Color: '#1e90ff',
    },
    txtُEnter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    btnEnter: {
        width: 200,
        height: 40,
        borderRadius: 20,
        marginTop: 100,
        marginLeft: 90,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#1e90ff'
    },
    textIn: {
        alignItems: 'center',
        marginTop: 50,
    },
})

export default ClientInfo;
