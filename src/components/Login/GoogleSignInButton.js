import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { asyncFunctions, showMessage } from '../../resources/Functions';
import { colors } from '../../assets/AppColors';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';
import { LoginGoogleUser } from '../../resources/API';

const GoogleSignInButton = (props) => {


    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '789188949169-djr193kf3io9steeo3u90cle8ennp5po.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, []);

    const handleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            await LoginGoogleUser({ idToken: userInfo.idToken }).then((res) => {
                if (res.message === "User created") {
                    showMessage('تم انشاء الحساب بنجاح');
                    NavigateToSplash(userInfo)
                } else if (res.message === "User already exists") {
                    showMessage('تم تسجيل الدخول بنجاح');
                    NavigateToSplash(userInfo)
                } else {
                    showMessage('حدث خطأ أثناء تسجيل الدخول');
                }
            })
        } catch (error) {
            console.error('Error signing in with Google:', error);
            showMessage('حدث خطأ أثناء تسجيل الدخول');
        }
    };

    const NavigateToSplash = async (userInfo) => {
        await asyncFunctions.setItem('googleUserInfo', JSON.stringify(userInfo));
        props.nav.navigate(ScreenNames.Splash, { signIn: true });
    }

    return (
        <Pressable style={styles.googleBtn} onPress={handleSignIn}>
            <AntDesign
                name={"google"}
                color={"white"}
                size={15}
            />
            <Text style={styles.googleTxt}>Google</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    googleBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
        backgroundColor: colors.gold, // Assuming you have a 'gold' color defined in your colors module
    },
    googleTxt: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
        marginLeft: 20,
    },
});

export default GoogleSignInButton;
