import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import SearchContext from '../../../store/SearchContext';
import AntDesign from "react-native-vector-icons/AntDesign";
import ServiceProviderContext from '../../../store/ServiceProviderContext';


import { ScreenNames } from '../../../route/ScreenNames';
import strings from '../../assets/res/strings';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";

const ProviderHome = (props) => {
    const { isFirst, userId } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);
    const language = strings.arabic.ProviderScreens.ProviderCreateListing
    const navigation = useNavigation();

    const seprator = () => {
        return (
            <View style={styles.seprater}></View>
        )
    }

    const filterService = () => {
        return data = serviceInfoAccorUser?.filter(item => {
            return item.service_id === isFirst
        })
    }
    const renderServiceType = () => {
        const data = filterService()
        const serviceType = data?.map(item => {
            return (
                <View>
                    <View style={styles.iconview}>
                        <Text style={styles.txt}>تصنيف الخدمة</Text>
                        <View style={styles.IconView}>
                            <AntDesign
                                name={"checkcircleo"}
                                color={colors.puprble}
                                size={30} />
                        </View>
                    </View>
                    <View style={styles.servicetype}>
                        <Text style={styles.basicInfo}>{item.servType}</Text>
                    </View>
                </View>
            )
        })
        return serviceType
    }
    const renderServiceTitle = () => {
        const data = filterService()
        const serviceTitle = data?.map(item => {
            return (
                <View>
                    <View style={styles.iconview}>
                        <View><Text style={styles.txt}>الخطوط العريضة</Text></View>
                        <View style={styles.IconView}>
                            <AntDesign
                                name={"checkcircleo"}
                                color={colors.puprble}
                                size={30} />
                        </View>
                    </View>
                    <View style={styles.servicetitle}>
                        <View style={{}}>
                            <Text style={styles.basicInfoTitle}>العنوان الرئيسي</Text>
                        </View>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={styles.servicetitle}>
                        <View style={{}}>
                            <Text style={styles.basicInfoTitle}>العنوان الترويجي</Text>
                        </View>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}>{item.subTitle}</Text>
                        </View>
                    </View>
                    <View style={styles.servicetitle}>
                        <View style={{}}>
                            <Text style={styles.basicInfoTitle}>الوصف</Text>
                        </View>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}>{item.desc}</Text>
                        </View>
                    </View>
                </View>
            )
        })
        return serviceTitle
    }
    const renderServiceAddress = () => {
        const data = filterService()
        const serviceType = data?.map(item => {
            return (
                <View>
                    <View style={styles.iconview}>
                        <View><Text style={styles.txt}>العنوان</Text></View>
                        <View style={styles.IconView}>
                            <Entypo
                                name={"location-pin"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                    <View style={styles.serviceaddress}>
                        <Text style={styles.basicInfoTitle}>المنطقة</Text>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}>{item.region}</Text>
                        </View>
                    </View>
                    <View style={styles.serviceaddress}>
                        <Text style={styles.basicInfoTitle}>المدينة</Text>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}>{item.address}</Text>
                        </View>
                    </View>
                    <View style={styles.serviceaddress}>
                        <Text style={styles.basicInfoTitle}>Location</Text>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}></Text>
                        </View>
                    </View>
                </View>
            )
        })
        return serviceType
    }

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>خدماتي</Text>

            </View>
            <ScrollView>
                <View style={styles.content}>
                    {renderServiceType()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderServiceTitle()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderServiceAddress()}
                </View>
                {seprator()}
            </ScrollView>
        </View>
    )
}

export default ProviderHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    basicInfoTitle:{
        fontSize: 16, 
        fontWeight: 'bold',
        textAlign: 'right'
    },
    seprater: {
        borderColor: colors.puprble,
        borderWidth: 0.2,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
        //marginRight: 20,
        fontWeight: 'bold'
    },
    content: {
        marginVertical: 20,
        padding: 10
    },
    iconview: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    servicetype: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: 'lightgray',
        width: '60%',
        borderRadius: 9,
    },
    basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold',
        margin: 7,
    },

    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    headerTxt: {
        fontSize: 18,
        marginRight: 20,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    servicetitle: {
        alignSelf: 'center',
        width: '90%',
        marginVertical: 10
    },
    mainTit: {
        justifyContent: 'center',
        width: "100%",
        backgroundColor: 'lightgray',
        borderRadius: 5
    },
    serviceaddress: {
        alignSelf: 'center',
        width: '90%',
        marginVertical: 10
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
})