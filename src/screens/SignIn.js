import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";


const SignIn = (props) => {
    const { userId, setuserId, UserState, setUserState } = useContext(SearchContext);
    const [userName, setuserName] = useState()
    const [Password, setPassword] = useState()

    const CheckUser = () => {
        const isUser = UserState.find(item => item.User_name === userName && item.Password === Password)
        return !!isUser;
    }
    const onEnterPress = () => {
          props.navigation.navigate(ScreenNames.Splash);
    }
    const onSignupPress = () => {
        props.navigation.navigate(ScreenNames.CreateUpersonalInfo);
    }
    const query = () => {
        return UserState.filter(use => {
            return use.Password === Password;
        })
    }

    const renderUserId = () => {
        const data = query();
        const UserArray = data.map(id => {
            return setuserId(id.USER_ID)
        });
        return UserArray;
    };

    return (


        // <View >

        <ImageBackground style={styles.container}
            source={require('../assets/photos/backgroundMain.png')}
        >

            {/* <View style={styles.container}> */}
            {/* <Text onPress={() => props.navigation.navigate(ScreenNames.SignUp)}>In</Text> */}
            {/* <Text onPress={()=> props.navigation.navigate('Tabs' , {screen:ScreenNames.ClientInfo}) }>In</Text> */}
            <Image
                source={require('../assets/photos/logoIcon.png')}
                style={styles.image}
            />
            <Text style={styles.TitleTxt}>تسجيل الدخول</Text>
            <Text style={styles.text}>مرحبا بك</Text>
            <View style={styles.logInView}>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder='البريد الالكتروني'
                    onChangeText={(value) => setuserName(value)}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="visible-password"
                    placeholder='كلمة المرور'
                    onChangeText={(value) => setPassword(value)}
                />
                <Pressable style={styles.btnEnter} onPress={() => onEnterPress()}>
                    <Text style={styles.txtُEnter}>تسجيل الدخول</Text>
                </Pressable>
            </View>

            <Pressable>
                <Text>هل نسيت كلمة المرور؟</Text>
            </Pressable>
            <Text style={styles.or}>أو</Text>
            <Text style={styles.txt}>سجل من خلال</Text>

            <View style={styles.logInView}>
                <Pressable style={styles.facebookbtn} onPress={() => onEnterPress()}>
                    <AntDesign
                        name={"google"}
                        color={"white"}
                        size={15} />
                    <Text style={styles.facetxtُ}>Google</Text>
                </Pressable>
                <Pressable style={styles.facebookbtn}>
                    <EvilIcons
                        name={"sc-facebook"}
                        color={"white"}
                        size={25} />
                    <Text style={styles.facetxtُ}>Facebook</Text>
                </Pressable>

            </View>
            <Pressable style={styles.signup} onPress={() => onSignupPress()}>
                <Text style={styles.text}>ليس لديك حساب؟ سجل الان</Text>
            </Pressable>

        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    image: {
        width: 170,
        height: 170,
        alignSelf: 'center',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.puprble,
        marginBottom: 10
    },
    TitleTxt: {
        fontSize: 25,
        textAlign: 'center',
        color: colors.puprble,
        fontWeight: 'bold'
    },
    input: {
        textAlign: 'center',
        height: 40,
        width: '90%',
        fontSize: 15,
        borderRadius: 25,
        backgroundColor: 'lightgray',
        elevation: 5,
        marginBottom: 15,
    },
    txt: {
        fontSize: 15,
        marginVertical: 10,
    },
    or:{
      marginVertical: 10
    },
    txtُEnter: {
        fontSize: 15,
        //fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    btnEnter: {
        width: '90%',
        height: 50,
        borderRadius: 25,
        marginTop: 10,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: colors.puprble
    },
    logInView: {
        alignItems: 'center',
        width: 400,
        //paddingVertical: 20
    },
    signup: {
        position: 'absolute',
        bottom: 20
    },
    facebookbtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
        backgroundColor: colors.gold
    },
    facetxtُ: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        marginLeft: 20
    },


})

export default SignIn;
