import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import ServiceDropDown from '../components/ServiceDropDown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Header = (props) => {

    const navigation = useNavigation();
    return (
        <View style={styles.header}>
           
            <ServiceDropDown />
            <Pressable onPress={() => navigation.navigate(ScreenNames.SignIn)}>
              
                {/* <FontAwesome5
                    name='arrow-down'
                    style={styles.icon}
                    onPress={() => navigation.navigate(ScreenNames.SignIn)}
                /> */}
                <Image source={require('../assets/icons8-login-rounded-48.png')}/>
                {/* <Text
                    style={styles.text}
                    onPress={() => navigation.navigate(ScreenNames.SignIn)}
                >دخول</Text> */}
            </Pressable>
            <Pressable>
                <Text style={styles.text}
                    onPress={() => navigation.navigate(ScreenNames.SignUp)}
                >تسجيل</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row-reverse',
        width: '100%',
        height: 80,
        backgroundColor: '#f0f8ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // textS: {
    //     paddingHorizontal: 100,
    //     paddingRight: 5,
    //     paddingLeft: 160,
    //     fontSize: 15,
    //     fontWeight: 'bold',
    //     color: '#1e90ff',
    // },
    text: {
        paddingHorizontal: 40,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1e90ff',
    },

    icon:{
        paddingRight: 20,
      fontSize: 20,
        color:'#1e90ff',
        
    }

})

export default Header;
