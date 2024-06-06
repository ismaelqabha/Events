import { StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { getEventList, getEventsInfo, getFavoritesforUser, getHomePageData, getRequestInfoWithservice, getUserData, signIn } from '../resources/API';
import SearchContext from '../../store/SearchContext';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ImageBackground } from 'react-native';
import UsersContext from '../../store/UsersContext';
import { ScreenNames } from '../../route/ScreenNames';
import { asyncFunctions, showMessage } from '../resources/Functions';

export default function Splash(props) {
    const { setServiceDataInfo, setUserFavorates, servType, setEventTypeInfo, setEventInfo, setRequestInfoAccUser } = useContext(SearchContext);
    const { setUserInfo, userId, setuserId, setUserName } = useContext(UsersContext);

    let userEmail
    let userPassword
    const signInFlag = props?.route?.params?.signIn || false

    useEffect(() => {
        if (!signInFlag) {
            // console.log("looking for existing user ");
            asyncFunctions.getItem("userInfo")
                .then(userInfo => {
                    userInfo = JSON.parse(userInfo)
                    console.log("userInfo ", userInfo);
                    userEmail = userInfo?.Email
                    userPassword = userInfo?.Password
                    if (!userEmail || !userPassword) {
                        props.navigation.replace(ScreenNames.SignIn)
                    }
                })
                .catch(error => {
                    console.error("error : ", error);
                    props.navigation.replace(ScreenNames.SignIn)
                });
        }
    }, []);

    const LoginUser = () => {
        if (signInFlag) {
            props.navigation.replace('Drawr')
            return
        }
        console.log("userEmail", userEmail, "userPassword ", userPassword);
        if (userEmail && userPassword) {
            signIn({ Email: userEmail, Password: userPassword })
                .then(res => {
                    if (res.message === 'Authentication succeeded') {
                        showMessage('تم تسجيل الدخول بنجاح');
                        getUserInfo();
                        props.navigation.replace('Drawr')
                    } else {
                        showMessage('حدث خطأ: ' + res.message);
                        console.error("error : ", error);
                        props.navigation.replace(ScreenNames.SignIn)
                    }
                })
                .catch(error => {
                    showMessage('حدث خطأ: ' + error.message);
                    console.error("error : ", error);
                    props.navigation.replace(ScreenNames.SignIn)
                });
        }
    }

    const getUserInfo = () => {
        getUserData({ Email: userEmail }).then(res => {
            //console.log("res", res[0].userInfo.USER_ID);
            setUserInfo(res[0].userInfo)
            setEventInfo(res[0].userEvents)
            setuserId(res[0].userInfo.USER_ID)
            setUserName(res[0].userInfo.User_name)

        })
    }

    const getFavoritesFromApi = () => {
        getFavoritesforUser({ favoListUserId: userId }).then(resjson => {
            !resjson?.message &&
                setUserFavorates(resjson)
            LoginUser()
        })
    }

    const getDataFromApi = () => {
        getHomePageData({ servType: servType }).then(res => {
            setServiceDataInfo(res)
            getFavoritesFromApi()
        })
    }
    const getEventListfromApi = () => {
        getEventList().then(res => {
            //console.log("res", res);
            if (res.message !== 'No EventLog') {
                setEventTypeInfo(res)
            }
        })
    }
    const getRequestfromApi = () => {
        getRequestInfoWithservice({ ReqUserId: userId }).then(res => {
            setRequestInfoAccUser(res)
        })
    }




    useEffect(() => {
        getDataFromApi()
        getEventListfromApi()
        getRequestfromApi()
    }, [servType])


    return (
        // <View style={styles.container}>

        // </View>
        <ImageBackground style={styles.container} source={require('../assets/photos/backgroundSplash.png')}>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})