import { Alert } from "react-native";
import { ToastAndroid } from "react-native";
import { Platform } from "react-native";


export const showMessage = (msg) => {
    Platform.OS === 'android'
      ? ToastAndroid.show(msg, ToastAndroid.SHORT)
      : Alert.IOS.alert(msg);
  };