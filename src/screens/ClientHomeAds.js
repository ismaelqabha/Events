import { BackgroundImage } from '@rneui/base';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import SearchContext from '../../store/SearchContext';
import CampaignCard from '../components/CampaignCard';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import { SliderBox } from 'react-native-image-slider-box';
import AntDesign from "react-native-vector-icons/AntDesign";
import AddNewDates from '../components/AddNewDates';

const ClientHomeAds = (props) => {
    const { cat, ServiceDataInfo, campInfo, userRegion, setReachCampaignfrom, reachCampaignfrom } = useContext(SearchContext);
    const navigation = useNavigation();

    const queryCampaign = () => {
        return campInfo?.filter(res => {
            return res.campRigon == userRegion;
        })
    }

    const renderCampaigns = () => {
        //const x = AddNewDates()
        console.log("reachCampaignfrom", reachCampaignfrom);
        setReachCampaignfrom('fromHome')
        const CampData = queryCampaign();
        const campArray = CampData?.map(camp => {
            return < CampaignCard {...camp} />
        });
        return campArray;
    }
    useEffect(() => {
        //setReachCampaignfrom('fromHome')
    }, [])


    const photo = [
        require('../assets/photos/abofaneh.png'),
        require('../assets/photos/djfarah.png'),
        require('../assets/photos/djWaseem.png'),
        require('../assets/photos/DJ.png'),
    ]


    return (
        <View style={styles.bg}>
            <ScrollView contentContainerStyle={styles.home}>
                <Pressable
                    style={styles.search}
                    onPress={() => navigation.navigate(ScreenNames.ClientSearch)}>
                    <View>
                        <Text style={styles.txt}>بحث خدمات المناسبات</Text>
                    </View>
                    <AntDesign
                        style={styles.icon}
                        name={"search1"}
                        color={"gray"}
                        size={25} />
                </Pressable>

                <View >
                    <SliderBox
                        sliderBoxHeight={250}
                        images={photo}
                        dotColor="blue"
                        dotStyle={{ width: 8, height: 8, borderRadius: 50 }}
                        autoplay={true}
                    />
                </View>


                {/* <Pressable
                    style={styles.search}
                    onPress={() => navigation.navigate(ScreenNames.CreateUser)}
                >
                    <Text style={styles.txt}>انشاء حساب</Text>
                </Pressable> */}

                <Text style={styles.titleText}>أفضل العروض</Text>

                <View style={styles.viewSeper}>
                    <Text style={styles.CatText}>قاعات</Text>
                </View>

                <View style={styles.campighn}>
                    <View style={styles.campBox}>
                        <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                            {renderCampaigns()}
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.viewSeper}>
                    <Text style={styles.CatText}>تصوير</Text>
                </View>

                <View style={styles.campighn}>
                    <View style={styles.campBox}>
                        <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                            {renderCampaigns()}
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.viewSeper}>
                    <Text style={styles.CatText}>شيف</Text>
                </View>

                <View style={styles.campighn}>
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
        //marginTop: 40,
    },
    campBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,

    },
    titleText: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        marginRight: 20,
        marginTop: 40,
    },
    CatText: {
        fontSize: 14,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        marginRight: 20,
        marginTop: 10,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '90%',
        fontSize: 18,
        borderRadius: 50,
        fontWeight: 'bold',
        marginTop: 30,
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        elevation: 5,
        marginBottom: 30,
        alignSelf: 'center'

    },
    icon: {
        marginRight: 10
    },
    txt: {
        fontSize: 13,
        marginRight: 20,
        color: 'gray'
    },
    viewSeper: {
        marginTop: 30
    }

})

export default ClientHomeAds;
