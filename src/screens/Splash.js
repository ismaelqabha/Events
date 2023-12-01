import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { getCampaigns, getFavoritesforUser, getHomePageData } from '../resources/API';
import SearchContext from '../../store/SearchContext';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ImageBackground } from 'react-native';


export default function Splash(props) {
    const { setServiceDataInfo, setUserFavorates, servType, userId , setCampInfo, userRegion} = useContext(SearchContext);

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
            console.log("setServiceDataInfo", res);
            getFavoritesFromApi()
            getCampaignfromApi()
        })
    }

    useEffect(() => {
        getDataFromApi()
    }, [servType])

    

    const getCampaignfromApi = () => {
      
        getCampaigns({campRigon : userRegion}) .then (res => {
            setCampInfo(res)
           
        })
       
    }

    return (
        <ImageBackground style={styles.container} source={require('../assets/photos/backgroundSplash.png')}>
           
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    
})