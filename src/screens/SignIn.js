import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, Pressable, ImageBackground, ToastAndroid } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getUserData, signIn } from '../resources/API';


const SignIn = (props) => {
    const { userId,
        setuserId,
        userEmail,
        password,
        setPassword,
        setUserEmail,
        userInfo,
        setUserInfo, } = useContext(SearchContext);

    const [verifyUser, setVerifyUser] = useState()

    const logUser = () => {
        signIn({ Email: userEmail, Password: password }).then(res => {
            if (res.message === 'Authentecatin successed') {
                //setVerifyUser(res)
                ToastAndroid.showWithGravity('تم التسجيل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
                getUserInfo()
                props.navigation.navigate(ScreenNames.Splash);
                console.log("id", userId);
            } else {
                if (res.message === 'not found') {
                    ToastAndroid.showWithGravity('عذرا لا يوجد حساب لهذة البيانات المدخلة',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    )
                } else {
                    ToastAndroid.showWithGravity('',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    )
                }
            }
        })
    }

    const getUserInfo = () => {
        getUserData({ Email: userEmail }).then(res => {
            setUserInfo(res)
            console.log("user data", res);
            renderUserId()
        })
    }

    const onEnterPress = () => {
        logUser()
    }
    const onSignupPress = () => {
        props.navigation.navigate(ScreenNames.CreateUpersonalInfo);
    }

    const renderUserId = () => {
        const UserArray = userInfo.map(id => {
            return setuserId(id.USER_ID)
        });
        return UserArray;
    };

    return (
        <ImageBackground style={styles.container}
            source={require('../assets/photos/backgroundMain.png')}
        >
            {/* <Image
                source={require('../assets/photos/logoIcon.png')}
                style={styles.image}
            />  */}

            <Text style={styles.text}>مرحبا بك</Text>
            <View style={styles.textIn}>
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
            </View>
            <Pressable>
                <Text style={styles.txt}>نسيت كلمةالمرور?</Text>
            </Pressable>

            <Pressable style={styles.btnEnter} onPress={() => onEnterPress()}>
                <Text style={styles.txtُEnter}>دخول</Text>
            </Pressable>

        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        width: 150,
        height: 150,
        marginHorizontal: 120,
        marginVertical: 80,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1e90ff'

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
        Color: '#1e90ff'
    },
    txt: {
        color: 'black',
        fontSize: 15,
        marginTop: 10,
        paddingRight: 45,
    },
    or: {
        marginVertical: 10
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
    },

})

export default SignIn;
