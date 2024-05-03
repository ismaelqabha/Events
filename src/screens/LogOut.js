import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { asyncFunctions } from '../resources/Functions';
import { ScreenNames } from '../../route/ScreenNames';

const LogOut = () => {
  const navigation = useNavigation(); // corrected from navigaton to navigation
  const handleLogout = () => {
    asyncFunctions.removeItem('userInfo')
      .then(() => {
        navigation.replace(ScreenNames.SignIn);
      })
      .catch(error => {
        console.error("Error removing user info:", error);
        navigation.replace(ScreenNames.SignIn);
      });
  };

  const showLogoutConfirmation = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل تريد تسجيل الخروج؟',
      [
        {
          text: 'لا',
          onPress: () => navigation.goBack(),
          style: 'cancel'
        },
        {
          text: 'نعم',
          onPress: () => handleLogout()
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={showLogoutConfirmation}>
        <Text>تسجيل الخروج</Text>
      </Pressable>
    </View>
  );
};

export default LogOut;
