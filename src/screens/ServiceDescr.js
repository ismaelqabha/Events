import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Alert, ScrollView } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values'
import { SliderBox } from 'react-native-image-slider-box';
import { getCampaignsByServiceId, getRequestbyUserId, getServiceDetail, getbookingDates } from '../resources/API';
import moment from 'moment';
import 'moment/locale/ar-dz'
import DetailComp from '../components/DetailComp';
import CampaignCard from '../components/CampaignCard';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../assets/AppColors"
import Ionicons from "react-native-vector-icons/Ionicons";

const ServiceDescr = (props) => {
    const { data } = props?.route.params

    const [date, setDate] = useState(new Date())

    const { userId,
        campiegnsAccordingServiceId, setCampiegnsAccordingServiceId,
        requestedDate, setrequestedDate,
        requestInfo, setRequestInfo,
        setReachCampaignfrom } = useContext(SearchContext);

    const [select, setSelect] = useState(false)

    const getRequestfromApi = () => {
        getRequestbyUserId({ ReqUserId: userId }).then(res => {
            setRequestInfo(res)
        })
    }
    const getCampeignsfromApi = () => {
        getCampaignsByServiceId({ serviceId: data?.service_id }).then(res => {
            setCampiegnsAccordingServiceId(res)
        })
    }

    useEffect(() => {
        getRequestfromApi()
        getCampeignsfromApi()
        setrequestedDate(0)
    }, [])

    const checkIfInEvent = () => {
        const isinEvent = requestInfo?.find(ResDate => {
            const reservDate = ResDate.reservationDate;
            const bookdate = moment(requestedDate).format('L');
            const res1 = reservDate === bookdate
            const res2 = ResDate.ReqServId === data?.service_id
            const res3 = ResDate.ReqUserId == userId
            const result = res1 && res2 && res3
            return result
        });
        return !!isinEvent;
    }

    const onPressHandler = () => {
        // if (!checkIfInEvent()) {
        props.navigation.navigate(ScreenNames.ClientRequest, { data: { ...data, requestedDate } })
        // } else {
        //     Alert.alert(
        //         'تنبية',
        //         '  الرجاء اختيار تفاصيل حجز اخرى التفاصيل الحالية محجوزة مسبقا لديك',
        //         [
        //             {
        //                 text: 'Ok',
        //                 style: 'cancel',
        //             },
        //         ],
        //         { cancelable: false } // Prevent closing the alert by tapping outside
        //     );
        // }

    }

    const SelectDatePressed = (dat) => {
        setSelect(true)
        setrequestedDate(dat)
    }
    const onPressBack = () => {
        props.navigation.goBack();
    }


    const renderImg = () => {
        const imageArray = data.images[0].serviceImages.map(photos => {
            return photos;
        });
        return imageArray;
    };

    const renderDates = () => {
        moment.locale('ar-dz');
        if (Array.isArray(data.availableDates)) {
            //const pressableStyle = isPressed ? styles.pressablePressed : styles.pressableDefault;

            const DatesAvailable = data.availableDates
            const dateArray = DatesAvailable?.map(dat => {

                return <View style={styles.dateView}>
                    <Pressable style={({ pressed }) =>
                        [styles.viewselectdate, pressed ? styles.viewselectdatepress : styles.viewselectdate]}
                        onPress={() => SelectDatePressed(dat)}
                    >
                        <Text style={styles.datetext}>{moment(dat).format('dddd')}</Text>
                        <Text style={styles.datetext}>{dat}</Text>
                    </Pressable>
                </View>;
            });
            return dateArray;
        } else {
            const firstAvilableDate = data.availableDates
            setrequestedDate(firstAvilableDate)
            return <View style={styles.dateformat}>
                <View>
                    <Text style={styles.datetxt}>{firstAvilableDate}</Text>
                    <Text style={styles.Daytex}>{`${moment(firstAvilableDate).format('dddd')}`}</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={{ alignSelf: 'center' }}
                        name={"calendar"}
                        color={colors.puprble}
                        size={30} />
                </View>
            </View>;

        }
    };

    const renderTitle = () => {
        return <View style={styles.titleInfo}>
            <Text style={styles.title}>{data?.title || 'no event'}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                <Text style={styles.feedback}>5★</Text>
                <Text style={styles.address}>{data.address}</Text>
            </View>
        </View>
    }
    const renderDescription = () => {
        return (
            <View style={styles.description}>
                <Text style={styles.descText}>تحتوي هذة الخانة على شرح  عن المزود </Text>
            </View>
        )
    }
    const renderDatesAvailable = () => {
        return (
            <View style={styles.DatesZone}>
                <Text style={styles.text}>{Array.isArray(data.availableDates) ? 'التواريخ المتاحة' : 'التاريخ المتاح'}</Text>
                <ScrollView contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>{renderDates()}</ScrollView>
            </View>
        )
    }
    const selectMandatoryDetail = () => {
        return data.additionalServices.filter(item => {
            return item.necessity == 'Mandatory'
        })
    }
    const renderMandatoryDetail = () => {
        const data = selectMandatoryDetail()
        const serviceDetailInfo = data.map((item) => {
            return (
                <View style={styles.detailItem}>
                    <Text style={styles.detailTxt}>الخدمات الاجبارية</Text>
                    <View style={styles.detailTypeView}>
                        <Text style={styles.detailTxt}>{item.detailTitle}</Text>
                        <AntDesign
                            style={{ alignSelf: 'center' }}
                            name={"check"}
                            color={colors.puprble}
                            size={20} />
                    </View>
                </View>
            )
        })
        return serviceDetailInfo
    }
    const selectOptionalDetail = () => {
        return data.additionalServices.filter(item => {
            return item.necessity == 'Optional'
        })
    }
    const renderOptionalDetail = () => {
        const data = selectOptionalDetail()
        const serviceDetailInfo = data.map((item) => {
            return (
                <View style={styles.detailItem}>
                    <Text style={styles.detailTxt}>الخدمات الاختيارية</Text>
                    <View style={styles.detailTypeView}>
                        <Text style={styles.detailTxt}>{item.detailTitle}</Text>
                        <AntDesign
                            style={{ alignSelf: 'center' }}
                            name={"check"}
                            color={colors.puprble}
                            size={20} />
                    </View>
                </View>
            )
        })
        return serviceDetailInfo
    }
    const renderClientReview = () => {
        return (
            <View style={styles.ReviewView}>
                <Text style={styles.text}>عرض التغذية الراجعة عن الخدمة المختارة</Text>
            </View>
        )
    }
    const renderserviceLocation = () => {
        return (
            <View style={styles.locationView}>
                <Image
                    style={styles.mapImage}
                    source={require('../assets/photos/location.png')} />
            </View>
        )
    }
    const renderCampeigns = () => {
        setReachCampaignfrom('fromServiceDescr')
        const CampData = campiegnsAccordingServiceId;
        if (CampData.message !== 'No Campaigns') {
            const campArray = CampData?.map(camp => {
                return <View style={styles.HallView}>
                    <Text style={styles.text}>أو يمكنك اختيار احد العروض التالية</Text>
                    < CampaignCard  {...camp} />
                </View>
            });
            return campArray;
        }
    }
    const renderSoialMedia = () => {
        return <View style={styles.icon}>
            <Pressable
            //onPress={() => onPressModalHandler()}
            >
                <Entypo
                    name={"facebook"}
                    color={colors.gold}
                    size={35} />
            </Pressable>

            <Pressable
            //onPress={() => onPressModalHandler()}
            >
                <Entypo
                    name={"instagram"}
                    color={colors.gold}
                    size={35} />
            </Pressable>

            <Pressable
            //onPress={() => onPressModalHandler()}
            >
                <FontAwesome
                    name={"phone-square"}
                    color={colors.gold}
                    size={35} />
            </Pressable>
        </View>
    }
    const seperator = () => {
        return (
            <View style={styles.seperaView}></View>
        )
    }
    const renderHeader = () => {
        return (
            <View style={styles.head}>
                <Pressable onPress={onPressBack}
                >
                    <Ionicons
                        //style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>
        )
    }
    const renderSlider = () => {
        return (
            <View style={styles.sliderView}>
                <SliderBox
                    sliderBoxHeight={300}
                    images={renderImg()}
                    dotColor={colors.puprble}
                    dotStyle={{ width: 8, height: 8, borderRadius: 50 }}
                    autoplay={true}
                />
            </View>
        )
    }
    const renderBody = () => {
        return (
            <View style={styles.body}>
                <View style={styles.logo}></View>
                {renderTitle()}
                {seperator()}
                {renderDescription()}
                {seperator()}
                {renderDatesAvailable()}
                {seperator()}

                <View style={styles.ditailView}>
                    <Text style={styles.text}>تفاصيل الخدمات لتحديد تكلفة الحجز</Text>
                    {renderMandatoryDetail()}
                    {renderOptionalDetail()}
                    {renderCampeigns()}
                </View >
                {seperator()}
                {renderClientReview()}
                {seperator()}

                {renderserviceLocation()}

                {seperator()}

                {renderSoialMedia()}
                <View style={styles.foter}>
                    <Pressable style={styles.btnview}
                        onPress={() => onPressHandler()}
                    >
                        <Text style={styles.btntext}>طلب حجز</Text>
                    </Pressable>
                </View>
            </View >
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView >
                {renderSlider()}
                {renderBody()}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sliderView: {

    },
    body: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        paddingHorizontal: 10,
        backgroundColor: colors.BGScereen,
        //position: 'absolute',
        //top: 200,
        //width: '100%',
        //height: 420,
    },
    home: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    InfoView: {

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
    logo: {
        borderRadius: 30,
        width: 70,
        height: 70,
        position: 'absolute',
        top: -40,
        left: 50,
        backgroundColor: colors.gold,
    },
    seperaView: {
        borderWidth: 0.5,
        borderColor: 'lightgray'
    },
    titleInfo: {
        marginTop: 50
    },
    description: {
        marginVertical: 10,
    },
    DatesZone: {
        marginVertical: 10,
    },
    ditailView: {
        marginVertical: 10,
    },
    ReviewView: {
        marginVertical: 10,
    },
    locationView: {
        marginVertical: 10,
    },
    detailItem: {
        marginVertical: 10,
    },
    detailTypeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.puprble,
        marginBottom: 10
    },
    changDatetext: {
        fontSize: 15,
        color: 'blue',
        fontWeight: 'bold'
    },
    mapImage: {
        alignSelf: 'center'
    },
    viewDate: {
        flexDirection: 'row',
        borderColor: '#808080',
        width: 250,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignSelf: 'center'
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.puprble,
    },
    feedback: {
        fontSize: 15,
        color: 'black',
    },
    address: {
        fontSize: 15,
        color: 'black',
        marginBottom: 20,
    },
    descText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.puprble,
    },
    detailTxt: {
        fontSize: 16,
        color: colors.puprble,
    },

    icon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 50
    },
    insicon: {
        width: 40,
        height: 40,
    },
    foter: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: colors.BGScereen,
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGold,
    },
    btnview: {
        backgroundColor: colors.puprble,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 5
    },
    dateView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateformat:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%",
    },
    viewselectdate: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        height: 70,
        margin: 4,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 5,
    },
    viewselectdatepress: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        height: 70,
        margin: 4,
        backgroundColor: colors.gold,
        borderRadius: 8,
        elevation: 5,
    },
    datetxt: {
        fontSize: 18,
        color: colors.puprble,
        marginLeft: 20
    },
    datetext:{
        fontSize: 16,
        color: colors.puprble,
    },
    priceView: {
        backgroundColor: 'snow',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 5
    },

    txt: {
        fontSize: 15,
        margin: 10,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'right'
    }
})

export default ServiceDescr;
