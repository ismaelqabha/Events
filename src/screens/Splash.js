import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { getCampaigns, getFavoritesforUser, getHomePageData } from '../resources/API';
import SearchContext from '../../store/SearchContext';


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
        <View style={styles.container}>
            <Text style={styles.logo}>Monasbat</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 40,
        color: 'blue',
        fontWeight: 'bold'
    }
})