import { StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { getEventList, getFavoritesforUser, getHomePageData, getUserData } from '../resources/API';
import SearchContext from '../../store/SearchContext';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ImageBackground } from 'react-native';
import UsersContext from '../../store/UsersContext';


export default function Splash(props) {
    const { setServiceDataInfo, setUserFavorates, servType, setEventTypeInfo } = useContext(SearchContext);
    const { setUserInfo, userId } = useContext(UsersContext);

    const getFavoritesFromApi = () => {
        getFavoritesforUser({ favoListUserId: userId }).then(resjson => {
            !resjson?.message &&
                setUserFavorates(resjson)
            props.navigation.replace('Drawr')
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
    const getUserfromApi = () => {
        getUserData({ USER_ID: userId }).then(res => {
            setUserInfo(res)
        })
    }



    useEffect(() => {
        getDataFromApi()
        getEventListfromApi()
        getUserfromApi()
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