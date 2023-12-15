import { Alert } from "react-native";
import { ToastAndroid } from "react-native";
import { Platform } from "react-native";
import { addService, addServiceImages } from "./API";


export const showMessage = (msg) => {
  Platform.OS === 'android'
    ? ToastAndroid.show(msg, ToastAndroid.SHORT)
    : Alert.IOS.alert(msg);
};
export const onPublishPress = async (allData) => {

  await addService(allData)
    .then(async res => {
      console.log(' service res ->', res.serviceID);

      await addServiceImages(allData.photoArray, res?.serviceID).then((res) => {
        console.log("images res -> ", res);
        showMessage("تم حفظ البيانات")
      }).catch((e) =>{
      console.log('upload photos event error : ', e);

      })
    })
    .catch(e => {
      console.log('create new event error : ', e);
    });
};