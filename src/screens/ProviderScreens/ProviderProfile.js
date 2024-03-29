import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { colors } from "../../assets/AppColors"
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import strings from '../../assets/res/strings';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { getServiceInfoById } from '../../resources/API';
import CalenderServiceCard from '../../components/ProviderComponents/CalenderServiceCard';
import { useNavigation } from '@react-navigation/native';

const ProviderProfile = (props) => {
    const language = strings.arabic.ProviderScreens.ProviderCreateListing
    const { userId,setIsfirst, isFirst, setserviceTitle, serviceCat, setServiceCat } = useContext(SearchContext);
    const { serviceInfoAccorUser, setServiceInfoAccorUser } = useContext(ServiceProviderContext);
    const navigation = useNavigation();


    const getServiceInfofromApi = () => {
        getServiceInfoById({ userID: userId }).then(res => {
            setServiceInfoAccorUser(res)
        })
    }
    useEffect(() => {
        getServiceInfofromApi()
    }, [])

    const renderMyService = () => {
        const data = serviceInfoAccorUser || [];
        const cardsArray = data?.map((card,index) => {
            if(index == 0 && !isFirst){
                setIsfirst(card.service_id)
                setserviceTitle(card.title)
                setServiceCat(card.servType)
            }
            return <CalenderServiceCard {...card}/>;
        });
        return cardsArray;
    };

   

    const seprator = () => {
        return (
            <View style={styles.seprater}></View>
        )
    }
    const onCreatePress = () => {
        props.navigation.navigate(ScreenNames.ProviderCreateListing)
    }
    const createOfferPress = () => {
        props.navigation.navigate(ScreenNames.ProviderCreateOffer, {isFirst, serviceCat})
    }

    const renderClients = () => {
        return (<View>
            <Pressable style={styles.item}>
                <View>
                    <Text style={styles.basicInfo}>الزبائن (10)</Text>
                </View>
                <View style={styles.IconView}>
                    <FontAwesome5
                        name={"users"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderNotification = () => {
        return (<View>
            <Pressable style={styles.item}>
                <View>
                    <Text style={styles.basicInfo}>الاشعارات (2)</Text>
                </View>
                <View style={styles.IconView}>
                    <AntDesign
                        style={styles.icon}
                        name={"notification"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderPayments = () => {
        return (<View>
            <Pressable style={styles.item}>
                <View>
                    <Text style={styles.basicInfo}>دفعات الزبائن</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        style={styles.icon}
                        name={"payments"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderCreateService = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => onCreatePress()}>
                <View>
                    <Text style={styles.basicInfo}>اٍنشاء خدمة جديدة</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"plus"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderAddCampaign = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => createOfferPress()}>
                <View>
                    <Text style={styles.basicInfo}>اٍنشاء عرض جديد</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"plus"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderDetermineRegion = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => createOfferPress()}>
                <View>
                    <Text style={styles.basicInfo}>تحديد مناطق العمل</Text>
                </View>
                <View style={styles.IconView}>
                    <AntDesign
                        style={styles.icon}
                        name={"select1"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderSetEventsType = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => createOfferPress()}>
                <View>
                    <Text style={styles.basicInfo}>تحديد أنواع المناسبات </Text>
                </View>
                <View style={styles.IconView}>
                    <AntDesign
                        style={styles.icon}
                        name={"select1"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderSoialMedia = () => {
        return (<View>
            <Text style={styles.txt}>الشبكات الاجتماعية</Text>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>اضافة</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"add-to-list"}
                        color={colors.puprble}
                        size={25} />
                </View>

            </View>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>Facebook</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <FontAwesome
                        style={styles.icon}
                        name={"facebook"}
                        color={colors.puprble}
                        size={25} />
                </View>

            </View>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>Instegram</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <AntDesign
                        style={styles.icon}
                        name={"instagram"}
                        color={colors.puprble}
                        size={25} />
                </View>

            </View>
        </View>)
    }
    const renderContactInfo = () => {
        return (<View>
            <Text style={styles.txt}>معلومات التواصل </Text>
            <View style={styles.item}>
                <View><Text style={styles.basicInfo}>0546126692</Text>
                    <Text style={styles.basicInfoTitle}>الموبايل</Text>
                </View>
                <View style={styles.IconView}>
                    <Ionicons
                        style={styles.icon}
                        name={"call"}
                        color={colors.puprble}
                        size={25} />
                </View>

            </View>
            <View style={styles.item}>
                <View><Text style={styles.basicInfo}>exsample@gmail.com</Text>
                    <Text style={styles.basicInfoTitle}>Email</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"email"}
                        color={colors.puprble}
                        size={25} />
                </View>

            </View>
        </View>)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>بروفايل</Text>
                <Pressable
                    style={styles.drawer}
                    onPress={() => navigation.openDrawer()}
                >
                    <Entypo
                        name={"menu"}
                        color={colors.puprble}
                        size={30} />
                </Pressable>
            </View>
            <ScrollView>
                <View style={styles.headView}>
                    <Text style={styles.headtext}>{language.HeadText + 'اسماعيل كبها '}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.txt}>الخدمات المزودة</Text>
                    {renderMyService()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderPayments()}
                </View>
                <View style={styles.content}>
                    {renderNotification()}
                </View>
                <View style={styles.content}>
                    {renderClients()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderContactInfo()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderSoialMedia()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderCreateService()}
                </View>
                <View style={styles.content}>
                    {renderAddCampaign()}
                </View>
                <View style={styles.content}>
                    {renderDetermineRegion()}
                </View>
                <View style={styles.content}>
                    {renderSetEventsType()}
                </View>
                {seprator()}
                
            </ScrollView>
        </View>
    )
}

export default ProviderProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BGScereen,
        marginBottom: 70
    },
    headView: {
        marginTop: 20,
        marginRight: 20,
        marginBottom: 40
    },
    headtext: {
        fontSize: 20,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    content: {
        marginRight: 20,
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    basicInfoTitle: {
        fontSize: 12,
        textAlign: 'right'
    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10
    },
    seprater: {
        borderColor: colors.puprble,
        borderWidth: 0.2,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    drawer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    headerTxt: {
        fontSize: 18,
        marginLeft: 20,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
})