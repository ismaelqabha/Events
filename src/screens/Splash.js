import { StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { getEventList, getEventsInfo, getFavoritesforUser, getHomePageData, getRequestInfoWithservice, getUserData, signIn } from '../resources/API';
import SearchContext from '../../store/SearchContext';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ImageBackground } from 'react-native';
import UsersContext from '../../store/UsersContext';
import { ScreenNames } from '../../route/ScreenNames';
import { asyncFunctions, showMessage } from '../resources/Functions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Splash(props) {
    const { setServiceDataInfo, setUserFavorates, servType, 
        setEventTypeInfo, setEventInfo, setRequestInfoAccUser, userFavorates, setFavorites, setAllServicesFavorites } = useContext(SearchContext);
    const { setUserInfo, userId, setuserId, setUserName } = useContext(UsersContext);

    let userEmail
    let userPassword
    let isGoogle = false
    const signInFlag = props?.route?.params?.signIn || false

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '789188949169-djr193kf3io9steeo3u90cle8ennp5po.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, []);

    useEffect(() => {
        if (!signInFlag) {
            // console.log("looking for existing user ");
            asyncFunctions.getItem("userInfo")
                .then(userInfo => {
                    userInfo = JSON.parse(userInfo)
                    const idToken = userInfo?.idToken
                    if (idToken) {
                        checkIfGoogle()
                    } else {
                        isGoogle = false
                        userEmail = userInfo?.Email
                        userPassword = userInfo?.Password
                        if (!userEmail || !userPassword) {
                            props.navigation.replace(ScreenNames.SignIn)
                        }
                    }
                })
                .catch(error => {
                    console.error("error : ", error);
                    props.navigation.replace(ScreenNames.SignIn)
                });
        }
    }, []);

    const checkIfGoogle = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        const isSignedIn = await GoogleSignin.isSignedIn()
        if (!isSignedIn) {
            isGoogle = false
            props.navigation.replace(ScreenNames.SignIn)
        } else {
            userEmail = currentUser?.user?.email
            isGoogle = true
            getUserInfo();
        }
    }

    const LoginUser = () => {
        if (signInFlag || isGoogle) {
            props.navigation.replace('Drawr')
            return
        }
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
            console.log("res", res);
            //console.log("res[0].services", res[0].services);
            setUserInfo(res[0].userInfo)
            setEventInfo(res[0].userEvents)
            setuserId(res[0].userInfo.USER_ID)
            setUserName(res[0].userInfo.User_name)
            setFavorites(res[0].favoriteUser)
            setAllServicesFavorites(res[0].services)
        })
    }

    const getFavoritesFromApi = () => {
        getFavoritesforUser({ favoListUserId: userId }).then(resjson => {
            !resjson?.message &&
                setUserFavorates(resjson)
            
        })
    }

    const getDataFromApi = () => {
        getHomePageData({ servType: servType }).then(res => {
            setServiceDataInfo(res)
            LoginUser()
          // console.log("servData", res);
             //getFavoritesFromApi()
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
           // console.log("res request" , res);
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