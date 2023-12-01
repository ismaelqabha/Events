import { BackgroundImage } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Image, ImageBackground, FlatList } from 'react-native';
import SearchContext from '../../store/SearchContext';
import CampaignCard from '../components/CampaignCard';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import { SliderBox } from 'react-native-image-slider-box';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../assets/AppColors"
import { servicesCategory } from '../resources/data';
import AddNewDates from '../components/AddNewDates';
import ServiceCard from '../components/ServiceCard';
import HomeServiceCard from '../components/HomeServiceCard';

const ClientHomeAds = (props) => {
    const { cat, setCat,
        ServiceDataInfo,
        campInfo,
        userRegion,
        setReachCampaignfrom,
        reachCampaignfrom } = useContext(SearchContext);

    const [selectServiceType, setSelectServiceType] = useState('');
    const navigation = useNavigation();

    const queryCampaign = () => {

        return campInfo?.filter(res => {
            return res.campRigon == userRegion && res.campCatType == cat;
        })
    }

    const renderCampaigns = () => {
        setReachCampaignfrom('fromHome')
        const CampData = queryCampaign();
        const campArray = CampData?.map(camp => {
            return < CampaignCard {...camp} />
        });
        return campArray;
    }

    const Categoryquery = () => {
        return servicesCategory || [];
    }
    const renderCat = ({ item }) => {
        return (
            <ServiceCard
                {...item}
                isChecked={item.titleCategory === selectServiceType}
                onCatPress={(value) => setSelectServiceType(value)}
            />
        )
    };

    const getHallServices = () => {
        return ServiceDataInfo?.filter(item => {
            return item.serviceData.servType == cat
        })
    }
    const renderTopServices = () => {
        console.log("data", data);
        const data = getHallServices()
        const ServiceArray = data?.map(card => {
            return <HomeServiceCard {...card.serviceData}
                images={card?.serviceImages}
                isFromTopServicesClick={true}
            />;
        })
        return ServiceArray
    }
    const renderNearestServices = () => {
        const data = getHallServices()
        const ServiceArray = data?.map((card , i) => {
            return  <HomeServiceCard {...card.serviceData}
                images={card?.serviceImages}
                isFromNearestServicesClick={true}
            />;
        })
        return ServiceArray
    }
    const renderSuggestionServices = () => {
        const data = getHallServices()
        const ServiceArray = data?.map(card => {
            return <HomeServiceCard {...card.serviceData}
                images={card?.serviceImages}
                isFromSuggestionServicesClick={true}
            />;
        })
        return ServiceArray
    }

    useEffect(() => {
        setCat('قاعات')
    }, [])


    const photo = [
        ("https://annlifestyle.com/wp-content/uploads/2018/11/mvpdecoration_43914656_692834574424375_5213177054772732757_n.jpg"),
        ('https://i.ytimg.com/vi/o21N8hYhgpA/maxresdefault.jpg'),
        ('https://i1.sndcdn.com/artworks-S0TyHTUkz9UGdPeB-ce8Cpg-t500x500.jpg'),
        ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSidf4Cc6xHlFYGAzdeR9MZw6_yVIUcSSaJzQ&usqp=CAU'),
        ('https://htouches.com/wp-content/uploads/2021/10/r.png'),
        ('https://i.ytimg.com/vi/8TE-BK89hHE/maxresdefault.jpg'),
        ('https://api.mzadqatar.com/uploads/images/2019/03/18/8158896-4022558486.jpg'),
        ("https://opensooq-images.os-cdn.com/previews/0x720/e9/48/e9485efd37c92c3002cadf210fe4b869a11432646d11a993195423b708d7f4f1.jpg.webp"),
    ]


    return (
        <ImageBackground style={styles.bg} source={require('../assets/photos/backgroundMain.png')}>
            <View style={styles.header}>
                <Image source={require('../assets/photos/supLogoTitle.png')} style={styles.titleImg} />

                <Pressable
                    style={styles.drawer}
                    onPress={() => navigation.openDrawer()}
                >
                    <Entypo
                        //style={styles.menu}
                        name={"menu"}
                        color={colors.gold}
                        size={30} />
                </Pressable>

            </View>

            <ScrollView contentContainerStyle={styles.home}>
                <Pressable
                    style={styles.search}
                    onPress={() => navigation.navigate(ScreenNames.ClientSearch, { isFromSearchServiceClick: true })}
                >
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


                <Pressable
                    // style={styles.search}
                    onPress={() => navigation.navigate(ScreenNames.SignIn)}
                >
                    <Text style={styles.txt}>Login</Text>
                </Pressable>

                <View style={styles.CatView}>
                    <FlatList
                        data={Categoryquery()}
                        renderItem={renderCat}
                        horizontal={true}
                    />
                </View>

                <View style={styles.centents}>
                    <Text style={styles.titleText}>أفضل العروض</Text>
                    <View style={styles.campighn}>
                        <Text style={styles.CatText}>{cat}</Text>
                        <View style={styles.campBox}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                {renderCampaigns()}
                            </ScrollView>
                        </View>
                    </View>
                </View>

                <View style={styles.centents}>
                    <Text style={styles.titleText}>الاكثر طلبا</Text>
                    <Text style={styles.CatText}>{cat}</Text>

                    <ScrollView
                    
                    // contentContainerStyle={styles.home1}
                    // horizontal={true}
                    // showsHorizontalScrollIndicator={false}
                    >
                        {renderTopServices()}
                    </ScrollView>

                </View>

                <View style={styles.centents}>
                    <Text style={styles.titleText}>الاقرب لي</Text>
                    <Text style={styles.CatText}>{cat}</Text>

                    <ScrollView
                   // horizontal={true} showsHorizontalScrollIndicator={false}
                    >
                        {renderNearestServices()}
                    </ScrollView>
                </View>


                <View style={styles.centents}>
                    <Text style={styles.titleText}>نقترح عليك</Text>
                    <Text style={styles.CatText}>{cat}</Text>
                    <ScrollView style={styles.scroll}>{renderSuggestionServices()}</ScrollView>
                </View>


            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    home: {
        borderRadius: 40,
    },
    scroll: {
        height: 360,
    },
    bg: {
        flex: 1,
        backgroundColor: colors.BGScereen,
    },
    campighn: {
        marginTop: 20
    },
    campBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleText: {
        textAlign: 'center',
        fontSize: 17,
        color: colors.TitleFont,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        backgroundColor: colors.BGScereen,
        width: 110,
        position: 'absolute',
        top: -18,
        right: 10
    },
    CatText: {
        color: colors.TitleFont,
        fontSize: 15,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        marginRight: 20,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '90%',
        fontSize: 18,
        borderRadius: 10,
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
    headerTxt: {
        fontSize: 20,
        marginLeft: 20,
        color: colors.TitleFont,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    centents: {
        borderWidth: 0.5,
        borderColor: colors.darkGold,
        marginBottom: 50,
        paddingTop: 10
    },
    header: {
        width: "100%",
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: colors.TitleFont
    },
    drawer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    titleImg: {
        width: 250,
        height: 60,
        alignItems: 'center',
    },
    CatView: {
        marginTop: 50,
        marginBottom: 30
    },
    home1: {
        flex: 1,
        backgroundColor: 'red'
    }

})

export default ClientHomeAds;
