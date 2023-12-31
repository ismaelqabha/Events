import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SearchContext from '../../../store/SearchContext';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { ScreenNames } from '../../../route/ScreenNames';
import strings from '../../assets/res/strings';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { getServiceImages } from '../../resources/API';
import { BackgroundImage } from '@rneui/base';

const ProviderHome = (props) => {
    const { isFirst, setserviceTitle } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);
    const [servicePhotos, setservicePhotos] = useState()
    const language = strings.arabic.ProviderScreens.ProviderCreateListing
    const navigation = useNavigation();


    const seprator = () => {
        return (
            <View style={styles.seprater}></View>
        )
    }
    const getImagesfromApi = () => {
        getServiceImages({ serviceID: isFirst }).then(res => {
            setservicePhotos(res)
        })
    }

    const getLogoImg = () => {
        return servicePhotos?.filter(photo => {
            return photo.coverPhoto == true
        });
    };
    const getServiceImgs = () => {
        return servicePhotos?.filter(photo => {
            return photo.coverPhoto == false
        });
    };

    useEffect(() => {
        getImagesfromApi()
    }, [])

    const filterService = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === isFirst
        })
    }
    const renderServiceLogo = () => {
        // const data = getLogoImg()
        // const serviceLogo = data?.map(item => {
        return (
            <View>
                <BackgroundImage style={styles.logoview} source={require('../../assets/photos/backgroundPart.png')}>
                    <View style={styles.logoImg}>

                    </View>
                    <Pressable style={styles.editImg}>
                        <Entypo
                            name={"camera"}
                            color={colors.puprble}
                            size={25} />
                    </Pressable>
                </BackgroundImage>
            </View>
        )
        // })
        // return serviceLogo
    }
    const renderServiceType = () => {
        const data = filterService()
        const serviceType = data?.map(item => {
            setserviceTitle(item.title)
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
    const renderServicePhotos = () => {
        const data = filterService()
        const serviceType = data?.map(item => {
            return (
                <View>
                    <View style={styles.iconview}>
                        <View><Text style={styles.txt}>الصور (9)</Text></View>
                        <View style={styles.IconView}>
                            <Entypo
                                name={"images"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                </View>
            )
        })
        return serviceType
    }
    const renderServicePrice = () => {
        const data = filterService()
        const servicePrice = data?.map(item => {
            return (
                <View>
                    <View style={styles.iconview}>
                        <View><Text style={styles.txt}>السعر المبدئي</Text></View>
                        <View style={styles.IconView}>
                            <Entypo
                                name={"price-tag"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                    <View style={styles.serviceaddress}>
                        <Text style={styles.basicInfoTitle}>السعر</Text>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}>{item.servicePrice}</Text>
                        </View>
                    </View>
                </View>
            )
        })
        return servicePrice
    }
    const renderHallInfo = () => {
        const data = filterService()
        const servicePrice = data?.map(item => {
            return (
                <View>
                    <View style={styles.iconview}>
                        <View><Text style={styles.txt}>معلومات</Text></View>
                        <View style={styles.IconView}>
                            <Entypo
                                name={"info"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                    <View style={styles.serviceaddress}>
                        <Text style={styles.basicInfoTitle}>نوع القاعة</Text>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}>{item.hallType}</Text>
                        </View>
                    </View>
                    <View style={styles.serviceaddress}>
                        <Text style={styles.basicInfoTitle}>القدرة الاستيعابية</Text>
                        <View style={styles.mainTit}>
                            <Text style={styles.basicInfo}>{item.maxCapasity}</Text>
                        </View>
                    </View>
                </View>
            )
        })
        return servicePrice
    }
    const renderworkingReigon = () => {
        const data = filterService()
        const serviceWorking = data?.map((item, i) => {
            return (
                <View>
                    <View style={styles.iconview}>
                        <View><Text style={styles.txt}>مناطق العمل</Text></View>
                        <View style={styles.IconView}>
                            <Entypo
                                name={"info"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                    <View style={styles.serviceaddress}>
                        {item.workingRegion.map(itemRegion => {
                            return (
                                <View style={styles.regionTit}>
                                    <Text style={styles.basicInfo}>{itemRegion}</Text>
                                    <AntDesign
                                        style={{ alignSelf: 'center' }}
                                        name={"check"}
                                        color={colors.puprble}
                                        size={25} />
                                </View>
                            )
                        })}

                    </View>
                </View>
            )
        })
        return serviceWorking
    }
    const renderDetail = () => {
        const data = filterService()
        const serviceDetail = data?.map((item, i) => {
            return (
                <View>
                    <View style={styles.iconview}>
                        <View><Text style={styles.txt}>تفاصيل الخدمات</Text></View>
                        <View style={styles.IconView}>
                            <MaterialIcons
                                name={"details"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                    <View style={styles.serviceaddress}>
                        <Text style={styles.basicInfoTitle}>الخدمات الاجبارية</Text>
                        {item.additionalServices.map(itemDetail => {
                            return (<View>
                                <View style={styles.regionTit}>
                                    <Text style={styles.basicInfo}>{itemDetail.detailTitle}</Text>
                                    <AntDesign
                                        style={{ alignSelf: 'center' }}
                                        name={"check"}
                                        color={colors.puprble}
                                        size={25} />
                                </View>
                                {itemDetail.subDetailArray.map(subDItem => {
                                    return (
                                        <View style={styles.detailView}>
                                            <Text style={styles.basicInfo}>{subDItem.detailSubtitle}</Text>
                                            <Feather
                                                style={{ alignSelf: 'center' }}
                                                name={"corner-down-left"}
                                                color={colors.puprble}
                                                size={25} />
                                        </View>
                                    )
                                })}
                            </View>
                            )
                        })}

                    </View>
                    <View style={styles.serviceaddress}>
                        <Text style={styles.basicInfoTitle}>الخدمات الاختيارية</Text>
                        <View style={styles.regionTit}>
                            <Text style={styles.basicInfo}>{item.additionalServices + '   '}</Text>
                            <AntDesign
                                style={{ alignSelf: 'center' }}
                                name={"check"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                </View>
            )
        })
        return serviceDetail
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
                    {renderServiceLogo()}
                </View>
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
                <View style={styles.content}>
                    {renderServicePhotos()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderServicePrice()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderDetail()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderHallInfo()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderworkingReigon()}
                </View>
                <View style={{height : 100}}></View>

            </ScrollView>
        </View>
    )
}

export default ProviderHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BGScereen
    },
    basicInfoTitle: {
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
        textAlign: 'right'
    },

    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },

    headerTxt: {
        fontSize: 18,
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
    regionTit: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: "100%",
        backgroundColor: 'lightgray',
        borderRadius: 5,
        margin: 5
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
    logoview: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImg: {
        width: '60%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 20
    },
    editImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        right: 65,
        bottom: 10,
    },
    detailView: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})