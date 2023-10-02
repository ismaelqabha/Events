import { BackgroundImage } from '@rneui/base';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import SearchContext from '../../store/SearchContext';
import CampaignCard from '../components/CampaignCard';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import { SliderBox } from 'react-native-image-slider-box';
import AddNewDates from '../components/AddNewDates';

const ClientHomeAds = (props) => {
    const { cat, ServiceDataInfo, campInfo, userRegion } = useContext(SearchContext);
    const navigation = useNavigation();

    const queryCampaign = () => {
        return campInfo?.filter(res => {
            return res.campRigon == userRegion;
        })
    }

    const renderCampaigns = () => {
        //const x = AddNewDates()

        const CampData = queryCampaign();
        const campArray = CampData?.map(camp => {
            return < CampaignCard {...camp} />
        });
        return campArray;
    }
   

    const photo = [
        require('../assets/photos/abofaneh.png'),
        require('../assets/photos/djfarah.png'),
        require('../assets/photos/djWaseem.png'),
        require('../assets/photos/DJ.png'),
    ]


    return (
        <View style={styles.bg}>
            <ScrollView contentContainerStyle={styles.home}>
                <View >
                    <SliderBox
                        sliderBoxHeight={300}
                        images={photo}
                        dotColor="blue"
                        dotStyle={{ width: 15, height: 15, borderRadius: 50 }}
                        autoplay={true}
                    />
                </View>

                <Pressable
                    style={styles.search}
                    onPress={() => navigation.navigate(ScreenNames.ClientSearch)}
                >
                    <Image style={styles.img} source={require('../assets/photos/search1.png')} />
                    <View>
                        <Text style={styles.txt}>بحث خدمات المناسبات</Text>
                        <Text style={styles.txt}>حسب المكان / حسب الزمان</Text>
                    </View>
                </Pressable>

                <View style={styles.campighn}>
                    <Text style={styles.titleText}>أفضل العروض</Text>
                    <View style={styles.campBox}>
                        <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                            {renderCampaigns()}
                        </ScrollView>
                    </View>
                </View>
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
        marginTop: 40,
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
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '90%',
        fontSize: 18,
        borderRadius: 50,
        fontWeight: 'bold',
        marginTop: 10,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 5,
        marginBottom: 10,
        alignSelf: 'center'

    },
    img: {
        width: 40,
        height: 40,
        marginLeft: 7,
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 20,
        color: 'gray'
    },

})

export default ClientHomeAds;
