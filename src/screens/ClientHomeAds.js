import { BackgroundImage } from '@rneui/base';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import SearchContext from '../../store/SearchContext';
import Header from "../components/Header";
import HomeCards from '../components/HomeCards';
import CampaignCard from '../components/CampaignCard';


const ClientHomeAds = (props) => {
    const { cat, ServiceDataInfo, campInfo, userRegion} = useContext(SearchContext);


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

    const queryCampaign = () => {
        return campInfo?.filter(res => {
            return res.campRigon == userRegion;
        })
    }

    const renderCampaigns = () => {

        const CampData = queryCampaign();
        const campArray = CampData?.map(camp => {
            return < CampaignCard {...camp} />
        });
        return campArray;
    }


    return (
        <View style={styles.bg}>
            <ScrollView contentContainerStyle={styles.home}>
            <Header />
            <View style={styles.campighn}>
                <Text style={styles.titleText}>أفضل العروض</Text>
                <View style={styles.campBox}>
                    <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                        {renderCampaigns()}
                    </ScrollView>
                </View>
            </View>
            
                {renderCard()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        borderRadius: 40,
        backgroundColor: 'snow',
    },
    bg: {
        flex: 1,
        backgroundColor: 'white',

    },
    campighn: {
        borderColor: 'black',
        flexDirection: 'column',
    },
    campBox: {
        flexDirection: 'row',
        justifyContent: 'center',
       padding: 10,
       
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        //color: 'black',
        fontFamily: 'Amiri-BoldItalic',
        marginRight: 20,
        marginTop: 10,
        //marginBottom: 10,
    }
})

export default ClientHomeAds;
