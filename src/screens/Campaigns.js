import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../assets/AppColors';
import { ScreenNames } from '../../route/ScreenNames';
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchContext from '../../store/SearchContext';
import { getServiceBySerId } from '../resources/API';


const Campaigns = (props) => {
    const { data ,isFromServiceDesc} = props?.route.params
    const { ServiceInfoById, setServiceInfoById, ServiceDataInfo } = useContext(SearchContext);

    const onPressHandler = () => {
        props.navigation.goBack();
    }




    const getServiceDataFromApi = () => {
        getServiceBySerId({ service_id: data.serviceId }).then(res => {
            setServiceInfoById(res)
            //console.log("res", res);
        })
    }
    useEffect(() => {
        getServiceDataFromApi()
    }, [])

    const filterServiceInfo = () => {
        return ServiceDataInfo.filter(item => {
            return item.serviceData.service_id === data.serviceId
        })
    }
    const getServiceDetail = (id) => {
        const data = filterServiceInfo()
        const serviceData = data[0].serviceData.additionalServices.filter(element => {
            return element.subDetailArray.find(itemId => {
                return itemId.id === id
            })
        })
        return serviceData
    }

    const getSerSubDet = (id) => {
        const data = getServiceDetail(id)
        const subDetInfo = data[0].subDetailArray.filter(item => {
            return item.id === id
        })
        return subDetInfo
    }

    const renderHeader = () => {
        return (
            <View style={styles.title}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>
        )
    }
    const onCheckAvailablePress = () => {
        relatedCamp = {
            CampId: data.CampId,
            campCatType: data.campCatType,
            campTitle: data.campTitle,
            campContents: data.campContents,
            contentFromSubDet: data.contentFromSubDet,
            campImag: data.campImag,
            campCost: data.campCost,
            campRigon: data.campRigon,
            campExpirDate: data.campExpirDate,
            priceInclude: data.priceInclude,
            userId: data.userId,
            serviceId: data.serviceId
        }
        const serviceInfoObj = {
            additionalServices: data.serviceData.additionalServices,
            socialMedia: data.serviceData.socialMedia,
            title: data.serviceData.title,
            desc: data.serviceData.desc,
            address: data.serviceData.address,
            servicePhone: data.serviceData.servicePhone,
            serviceLocation: data.serviceData.serviceLocation,
            maxCapasity: data.serviceData.maxCapasity,
            images: data.serviceImages,
            BookDates: data.serviceDates,
            serviceRequests: data.serviceRequests,
            relatedCamp: relatedCamp
        }


         props.navigation.navigate(ScreenNames.ServiceDescr, { data: serviceInfoObj, isFromCampaign: true })
    }

    const renderImg = () => {
        return (
            <View style={styles.image}>
                <Image style={{ flex: 1 }} source={{ uri: data.campImag }} />
            </View>
        )
    }
    const seperator = () => {
        return (
            <View style={styles.seperaView}></View>
        )
    }
    const renderPrice = () => {
        if (data.isPerPerson) {
            return (<View style={styles.priceView}>
                <Text style={styles.titletxt}>{'₪' + data.campCost}</Text>
                <Text style={styles.titletxt}>السعر يشمل للشخص</Text>
            </View>
            )
        } else {
            return (<View style={styles.priceView}>
                <Text style={styles.titletxt}>{'₪' + data.campCost}</Text>
                <Text style={styles.titletxt}>السعر شامل</Text>
            </View>
            )
        }
    }
    const renderBody = () => {
        return (
            <View style={styles.body}>
                <View style={styles.Offertitle}>
                    <Text style={styles.titletxt}>{data.campTitle}</Text>
                    {renderPrice()}
                </View>
                {seperator()}
                <Text style={styles.titletxt}>العرض يشمل</Text>
                <View style={styles.contentView}>
                    {data.contentFromSubDet.map(itemID => {
                        const titleInfo = getSerSubDet(itemID)
                        return (
                            <View style={styles.contentItem}>
                                <Text style={styles.itemtxt}>{titleInfo[0].detailSubtitle}</Text>
                                <View style={styles.IconView}>
                                    <AntDesign
                                        style={{ alignSelf: 'center' }}
                                        name={"checksquareo"}
                                        color={colors.puprble}
                                        size={30} />
                                </View>
                            </View>
                        )
                    })}
                    {data.campContents.map(content => {
                        return (
                            <View style={styles.contentItem}>
                                <Text style={styles.itemtxt}>{content.contentItem}</Text>
                                <View style={styles.IconView}>
                                    <AntDesign
                                        style={{ alignSelf: 'center' }}
                                        name={"checksquareo"}
                                        color={colors.puprble}
                                        size={30} />
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
    const renderFooter = () => {
        return (
            <View style={styles.foter}>
                <Pressable style={styles.btnview}
                    onPress={onCheckAvailablePress}
                >
                    <Text style={styles.btntext}>فحص الامكانية </Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView>

                {renderImg()}
                <View style={{ borderWidth: 3, borderColor: colors.puprble }}>
                    {renderBody()}
                    {!isFromServiceDesc && renderFooter()}
                </View>

            </ScrollView>

        </View>
    )
}

export default Campaigns

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 8,
        // marginBottom: 8,
        // borderWidth:1
    },
    titletxt: {
        fontSize: 20,
        color: colors.puprble,
        // marginBottom: 10
    },
    itemtxt: {
        fontSize: 18,
        color: colors.puprble,
    },
    body: {
        backgroundColor: colors.BGScereen,
        alignSelf: 'center',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        padding: 10,
        // position: 'absolute',
        width: '99%',
        // height: 420,
        // top: 280
    },
    Offertitle: {
        padding: 10
    },
    contentView: {
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray'
    },
    contentItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 30,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10
    },
    foter: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // position: 'absolute',
        // bottom: 0,
        width: '100%'
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGold,
    },
    btnview: {
        backgroundColor: colors.puprble,
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 20,
        elevation: 5
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 10
    },
    priceView: {
        //flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        width: 120,
    },
    seperaView: {
        borderWidth: 0.5,
        borderColor: 'lightgray',
        marginBottom: 20
    },
})