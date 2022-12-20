import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import {  Card, Button, Icon } from 'react-native-elements';

const DataNotExist = () => {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>تحذير !</Card.Title>
                <Card.Divider />
                <Card.Image
                    style={{ padding: 0,width: 50,height: 50, marginLeft:120  }}
                    source={require('../assets/nothing-found.png')}
                />
                <Text style={styles.txt}>
                    لا يوجد خدمات مطابقة للبحث خاصتك الرجاء المحاولة مرة اخرى
                </Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 10,
        alignItems: 'center',
    },
    
})

export default DataNotExist;
