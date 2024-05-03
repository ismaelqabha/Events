// GoogleSignInButton.js

import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { showMessage } from '../resources/Functions';

const GoogleSignInButton = ({ navigation }) => {
    useEffect(() => {
        // Initialize GoogleSignin
        GoogleSignin.configure({
            webClientId: 'YOUR_WEB_CLIENT_ID',
            offlineAccess: true, 
            forceCodeForRefreshToken: true, 
        });
    }, []);

    const handleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            showMessage('تم تسجيل الدخول بنجاح');
            console.log('User Info:', userInfo);
            // Navigate to the main screen
            navigation.replace('drawr');
        } catch (error) {
            console.error('Error signing in with Google:', error);
            showMessage('حدث خطأ أثناء تسجيل الدخول');
        }
    };

    return (
        <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleSignIn}
        />
    );
};


export default GoogleSignInButton;
