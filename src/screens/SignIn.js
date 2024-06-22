import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Pressable, ImageBackground, ToastAndroid } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getUserData, signIn } from '../resources/API';
import UsersContext from '../../store/UsersContext';
import { asyncFunctions, showMessage } from '../resources/Functions';
import { emailVerification, passwordRegex, phoneNumberRegex } from '../resources/Regex';
import GoogleSignInButton from '../components/Login/GoogleSignInButton';


const SignIn = (props) => {
    //const { userId,setuserId, } = useContext(SearchContext);
    const {
        setuserId, userId,
        userEmail,
        password,
        setPassword,
        setUserEmail,
        userInfo,
        setUserInfo,
        setUserName } = useContext(UsersContext);


    const logUser = () => {
        signIn({ Email: userEmail, Password: password }).then(res => {
            if (res.message === 'Authentication succeeded') {
                showMessage('تم التسجيل بنجاح');
                // Save user info in AsyncStorage
                let userInfo = {
                    Email: userEmail,
                    Password: password
                };

                asyncFunctions.setItem("userInfo", JSON.stringify(userInfo))
                    .then(() => {
                        // Clear password field for security
                        setPassword("");

                        // Fetch user info and navigate to next screen
                        getUserInfo();
                        props.navigation.navigate(ScreenNames.Splash, { signIn: true });
                    })
                    .catch(error => {
                        showMessage('Failed to save user info: ' + error.message);
                    });
            } else {
                if (res.message === 'not found') {
                    showMessage('عذرا لا يوجد حساب لهذة البيانات المدخلة');
                } else {
                    showMessage('An error occurred: ' + res.message);
                }
            }
        }).catch(error => {
            showMessage('An error occurred: ' + error.message);
        });
    }

    const getUserInfo = () => {
        getUserData({ Email: userEmail }).then(res => {
            console.log("feteched user data ", res);
            setUserInfo(res)
            setuserId(res.user[0].USER_ID)
            setUserName(res.user[0].User_name)
        })
    }

    const onEnterPress = () => {
        // if (!emailVerification.test(userEmail) && !phoneNumberRegex.test(userEmail)) {
        //     showMessage("Enter a valid email");
        //     return;
        // }

        // if (!password || !password.trim() || !passwordRegex.test(password)) {
        //     showMessage("Enter a valid password");
        //     return;
        // }

        logUser();
    };
    const onSignupPress = () => {
        props.navigation.navigate(ScreenNames.CreateUpersonalInfo);
    }

    const renderUserId = () => {
        const UserArray = userInfo.map(id => {
            return setuserId(id.USER_ID)
        });
        return UserArray;
    };

    const onForgotPassword = () => {
        props.navigation.navigate(ScreenNames.ForgotPassword);
    }

    return (
        <ImageBackground style={styles.container}
            source={require('../assets/photos/backgroundMain.png')}
        >
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
                    onChangeText={(value) => setUserEmail(value)}
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

            <Pressable onPress={() => onForgotPassword()}>
                <Text>هل نسيت كلمة المرور؟</Text>
            </Pressable>
            <Text style={styles.or}>أو</Text>
            <Text style={styles.txt}>سجل من خلال</Text>

            <View style={styles.logInView}>
                <GoogleSignInButton nav={props?.navigation} />
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
    or: {
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
