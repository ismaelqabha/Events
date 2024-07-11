import { BackgroundImage } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Image, ImageBackground, FlatList, Animated } from 'react-native';
import SearchContext from '../../store/SearchContext';
import CampaignCard from '../components/CampaignCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../assets/AppColors"
import { servicesCategory } from '../resources/data';
import ServiceCard from '../components/ServiceCard';
import HomeServiceCard from '../components/HomeServiceCard';
import Interactable from 'react-native-interactable';
import UsersContext from '../../store/UsersContext';
import { getEventsInfo } from '../resources/API';
import { asyncFunctions } from '../resources/Functions';
import SuggestionsServicesComp from '../components/SuggestionsServicesComp';

const ClientHomeAds = (props) => {
    const { cat, setCat,
        ServiceDataInfo,
        campInfo,
        userRegion } = useContext(SearchContext);
    const { userId, userInfo } = useContext(UsersContext);

    const isFinishedSetup = props.route.params?.isFinishedSetup
    const route = useRoute()

    const [selectServiceType, setSelectServiceType] = useState('');
    const navigation = useNavigation();

    const deltaX = new Animated.Value(0);
    const deltaY = new Animated.Value(0);


    useEffect(() => {

        setCat('قاعات')
    }, [])

    useEffect(() => {
        checkSetUp()
    }, [userInfo])

    const checkSetUp = () => {
        console.log("checking setup.");
        // if its not a google account then its already setup
        if (!userInfo?.isGoogle) {
            console.log("user is not from google, set up done!");
            return;
        }
        // if setup has been already finised
        if (userInfo?.isSetUpFinished) {
            console.log("user setup is finished!");
            return;
        } else if (isFinishedSetup) {
            console.log("user finished setting up!");
            return
        } else {
            console.log("user setup is'nt finished, starting setup!");
            startSetup()
        }

    }

    const startSetup = () => {
        navigation.replace(ScreenNames.SetUserAddress, { isFromGoogleUser: true })
    }



    const getHallServices = () => {
        return ServiceDataInfo?.filter(item => {
            return item.serviceData.servType == cat
        })
    }

    const getCampaign = () => {
        return ServiceDataInfo?.filter(item => {
            return item.serviceCamp.find(elem => {
                return item.serviceData.servType == cat && elem.campCatType === cat && elem.campRigon.includes(userRegion)
            })

        })
    }

    const renderCampaigns = () => {
        const CampData = getCampaign();
        const campArray = CampData?.map(camp => {
            const serCamp = camp.serviceCamp
            const obj = {
                ...camp,
                ...serCamp[0]
            }
            return < CampaignCard {...obj}
            />
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

    const renderTopServices = () => {
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
        const ServiceArray = data?.map((card, i) => {
            return <HomeServiceCard {...card.serviceData}
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
                isFromSugestServicesClick={true}
            />;
        })
        return ServiceArray
    }



    const renderSeeAll = () => {
        return (
            <View style={styles.seeAllView}>
                <Entypo
                    name={"triangle-left"}
                    size={20}
                />
                <Text style={styles.CatText}>مشاهدة المزيد</Text>
            </View>
        )
    }


    return (
        <ImageBackground style={styles.bg} source={require('../assets/photos/backgroundMain.png')}>
            <View style={styles.header}>
                <Animated.View
                // style={{
                //     transform: [
                //         {
                //             translateY: deltaY.interpolate({
                //                 inputRange: [-150, -150, 0, 0],
                //                 outputRange: [-58, -58, 0, 0]
                //             }),
                //         },
                //         {
                //             scale: deltaY.interpolate({
                //                 inputRange: [-150, -150, 0, 0],
                //                 outputRange: [0.35, 0.35, 1, 1]
                //             }),
                //         }
                //     ],
                // }}
                >
                    <View style={styles.drawerView}>
                        <Pressable
                            style={styles.drawer}
                            onPress={() => props.navigation.navigate(ScreenNames.ProviderNotification)}
                        >
                            <Ionicons
                                //style={styles.menu}
                                name={"notifications"}
                                color={colors.puprble}
                                size={30} />
                        </Pressable>
                        <Image source={require('../assets/photos/purpalearabiclogo.png')} style={styles.titleImg} />
                        <Pressable
                            style={styles.drawer}
                            onPress={() => navigation.openDrawer()}
                        >
                            <Entypo
                                //style={styles.menu}
                                name={"menu"}
                                color={colors.puprble}
                                size={30} />
                        </Pressable>

                    </View>
                    <Pressable
                        style={styles.search}
                        onPress={() => navigation.navigate(ScreenNames.ClientSearch, { isFromSearchServiceClick: true })}
                    >
                        <View>
                            <Text style={styles.txt}>{'|  ' + 'بحث الخدمات'}</Text>
                        </View>
                        <AntDesign
                            style={styles.icon}
                            name={"search1"}
                            size={20}
                        />
                    </Pressable>
                    <View style={styles.CatView}>
                        <FlatList
                            data={Categoryquery()}
                            renderItem={renderCat}
                            horizontal={true}
                        />
                    </View>
                </Animated.View>
            </View>

            {/* <Interactable.View
                verticalOnly={true}
                snapPoints={[{ y: 0 }, { y: -150 }]}
                boundaries={{ tob: -150 }}
                animatedValueY={deltaY}
                animatedValueX={deltaX}
            >
                <Text>Test</Text>
            </Interactable.View> */}

            <ScrollView contentContainerStyle={styles.home}>

                {/* <SuggestionsServicesComp /> */}

                <View style={styles.centents}>
                    <View style={styles.itemView}>
                        {renderSeeAll()}
                        <Text style={styles.titleText}>{'الاكثر طلبا من' + ' ' + cat}</Text>
                    </View>
                    <View
                    //style={{height: 360, borderWidth: 1}}
                    >
                        {renderTopServices()}
                    </View>

                </View>
                {/* {CampData && */}
                <View style={styles.centents}>
                    <View style={styles.itemView}>
                        {renderSeeAll()}
                        <Text style={styles.titleText}>{'أفضل العروض من' + ' ' + cat}</Text>
                    </View>
                    <View style={styles.campBox}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            {renderCampaigns()}
                        </ScrollView>
                    </View>
                </View>



                <View style={styles.centents}>
                    <View style={styles.itemView}>
                        {renderSeeAll()}
                        <Text style={styles.titleText}>{'الاقرب لي من' + ' ' + cat}</Text>
                    </View>
                    <ScrollView
                        horizontal={true} showsHorizontalScrollIndicator={false}
                    >
                        {renderNearestServices()}
                    </ScrollView>
                </View>


                <View style={styles.centents}>
                    <View style={styles.itemView}>
                        {renderSeeAll()}
                        <Text style={styles.titleText}>{'نقترح عليك من' + ' ' + cat}</Text>
                    </View>

                    <ScrollView
                    //horizontal={true} showsHorizontalScrollIndicator={false}
                    >
                        {renderSuggestionServices()}
                    </ScrollView>
                </View>

                <View style={{ height: 100 }}></View>

            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    home: {
        //borderRadius: 40,

    },
    scroll: {
        height: 360,
    },
    bg: {
        flex: 1,
        backgroundColor: colors.BGScereen,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    seeAllView: {
        flexDirection: 'row',
        //justifyContent: 'flex-start',
        alignItems: 'center',
    },
    campBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titleText: {
        textAlign: 'right',
        fontSize: 17,
        color: colors.TitleFont,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        marginRight: 20
    },
    CatText: {
        fontSize: 15,
    },
    search: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    icon: {
        marginRight: 20,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    txt: {
        fontSize: 20,
        marginRight: 10,
        color: colors.puprble
    },
    headerTxt: {
        fontSize: 20,
        marginLeft: 20,
        color: colors.TitleFont,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    centents: {
        marginVertical: 10
    },
    header: {
        width: "100%",
        height: 200,
        alignSelf: 'center',
        backgroundColor: colors.BGScereen,
        // borderBottomLeftRadius: 40,
        // borderBottomRightRadius: 40
    },
    drawerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        width: '100%',
        alignSelf: 'center',
        marginTop: 20,
        // borderBottomLeftRadius: 60,
        // borderBottomRightRadius: 60
        // marginBottom: 30
    },
    home1: {
        flex: 1,
        backgroundColor: 'red'
    }

})

export default ClientHomeAds;
