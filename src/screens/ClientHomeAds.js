import { BackgroundImage } from '@rneui/base';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet , View } from 'react-native';
import SearchContext from '../../store/SearchContext';
import Header from "../components/Header";
import HomeCards from '../components/HomeCards';
import { getHomePageData } from '../resources/API';


const ClientHomeAds = (props) => {
    const { cat ,ServiceDataInfo  , servType , setServiceDataInfo} = useContext(SearchContext);
   

    const query = () => {
        if (!cat) {
            return ServiceDataInfo || [];
        }
        return ServiceDataInfo?.filter(nameItem => {
            return nameItem.serviceData.servType == cat;
        })
    }

    const renderCard = () => { 
        const data = query();
        const cardsArray = data?.map(card => {
            return <HomeCards  {...card.serviceData}
                   images={card?.serviceImages}
            />;
        });
        return cardsArray;
    };
    

    
    const getDataFromApi = () => {
        getHomePageData({servType: servType}).then(res => {
            setServiceDataInfo(res)
        } ) 
    }


    useEffect(()=> {
       getDataFromApi()
    } , [servType])




    return (
        <View style={styles.bg}
        >
            <Header />
            <ScrollView contentContainerStyle={styles.home}>
                {renderCard()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        borderRadius: 40,
        backgroundColor: 'white',
      

    },
    bg: {
        flex: 1,
        backgroundColor: 'white',

    }
})

export default ClientHomeAds;
