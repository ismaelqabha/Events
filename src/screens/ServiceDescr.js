import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Alert, ScrollView, Modal } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values'
import { SliderBox } from 'react-native-image-slider-box';
import { getCampaignsByServiceId, getRequestbyUserId } from '../resources/API';
import moment from 'moment';
import 'moment/locale/ar-dz'
import CampaignCard from '../components/CampaignCard';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../assets/AppColors"
import Ionicons from "react-native-vector-icons/Ionicons";

const ServiceDescr = (props) => {
    const { data } = props?.route.params
    const [showModal, setShowModal] = useState(false);
    const [subDetArray, setSubDetArray] = useState([]);
    const { userId,
        campiegnsAccordingServiceId, setCampiegnsAccordingServiceId,
        requestedDate, setrequestedDate,
        requestInfo, setRequestInfo,
        setReachCampaignfrom } = useContext(SearchContext);

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
        // setrequestedDate(0)
    }, [])

    const modalDeletePress = () => {
        setShowModal(false);
    };

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


    const onPressBack = () => {
        props.navigation.goBack();
    }


    const renderImg = () => {
        const imageArray = data.images[0].serviceImages.map(photos => {
            return photos;
        });
        return imageArray;
    };
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

    // render Service Dates Info
    const SelectDatePressed = (dat, setIsPressed, pressed) => {
        // console.log("requestedDate",requestedDate);
        if (pressed) {
            setIsPressed(false)
            const index = requestedDate.findIndex((date) => date.time === dat.time)
            const newDates = requestedDate.slice(index, 1)
            setrequestedDate(newDates)
        } else {
            setIsPressed(true)
            setrequestedDate([...requestedDate, dat])
        }
    }
    const renderDates = () => {
        moment.locale('ar-dz');
        if (Array.isArray(data.availableDates)) {
            //const pressableStyle = isPressed ? styles.pressablePressed : styles.pressableDefault;

            const DatesAvailable = data.availableDates
            const dateArray = DatesAvailable?.map(dat => {
                const [pressed, setIsPressed] = useState(false)
                return <View style={styles.dateView}>
                    <Pressable style={[styles.viewselectdate, pressed ? styles.viewselectdatepress : styles.viewselectdate]}
                        onPress={() => SelectDatePressed(dat, setIsPressed, pressed)}
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
    const renderDatesAvailable = () => {
        return (
            <View style={styles.DatesZone}>
                <Text style={styles.text}>{Array.isArray(data.availableDates) ? 'التواريخ المتاحة' : 'التاريخ المتاح'}</Text>
                <ScrollView contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>{renderDates()}</ScrollView>
            </View>
        )
    }

    // Sub Detail Info Modal
    const RenderCancelButton = () => {
        return (
            <Pressable onPress={() => modalDeletePress()}>
                <Text style={styles.text}>Ok</Text>
            </Pressable>
        );
    };
    const renderSubDetailModal = () => {
        return (
            <Modal
                transparent
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalHeaderTxt}>تفاصيل الاسعار </Text>
                        </View>
                        <View style={styles.modalbody}>
                            <ScrollView>{renderSubDetail()}</ScrollView>
                        </View>
                        <View style={styles.Modalbtn}>
                            {RenderCancelButton()}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    const renderSubDetail = () => {
        const data = subDetArray
        const DetailInfo = data.map(item => {
            return item.subDetailArray.map(subItem => {
                return (
                    <View style={styles.subDetailView}>
                        <Text style={styles.priceSDetTxt}>{'₪' + subItem.detailSubtitleCost}</Text>
                        <View style={styles.subDetailItem}>
                            <Text style={styles.SupDetTxt}>{subItem.detailSubtitle}</Text>
                        </View>
                        <View style={styles.SubDImg}><Image source={{ uri: subItem.subDetailPhoto }} /></View>

                    </View>
                )
            })
        })
        return DetailInfo
    }
    const subDetailPressed = (id) => {
        setShowModal(true)
        const subInfo = data.additionalServices.filter(item => {
            return item.detail_Id == id
        })
        setSubDetArray(subInfo)
        return subInfo
    }

    // render Pricing and Detail Info 
    const renderServiceDetail = () => {
        if (!!data.servicePrice && data.additionalServices.length > 0) {
            return (
                <View>
                    {renderInitialPrice()}
                    {renderMandatoryDetail()}
                    {renderOptionalDetail()}
                </View>
            )
        }
        if (!!data.servicePrice && data.additionalServices.length < 1) {
            return (
                <View>
                    {renderFinalPrice()}
                </View>
            )
        }
        if (!!data.servicePrice || data.additionalServices.length > 0) {
            return (
                <View>
                    {renderMandatoryDetail()}
                    {renderOptionalDetail()}
                </View>
            )
        }
    }
    const renderInitialPrice = () => {
        return (
            <View style={styles.dateformat}>
                <View>
                    <Text style={styles.datetxt}>{data.servicePrice}</Text>
                    <Text style={styles.Daytex}>السعر المبدئي</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={{ alignSelf: 'center' }}
                        name={"price-tag"}
                        color={colors.puprble}
                        size={30} />
                </View>
            </View>
        )
    }
    const renderFinalPrice = () => {
        return (
            <View style={styles.dateformat}>
                <View>
                    <Text style={styles.datetxt}>{data.servicePrice}</Text>
                    <Text style={styles.Daytex}>السعر الشامل</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={{ alignSelf: 'center' }}
                        name={"price-tag"}
                        color={colors.puprble}
                        size={30} />
                </View>
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
                    <Pressable style={styles.detailTypeView} onPress={() => subDetailPressed(item.detail_Id)}>
                        <Text style={styles.detailTxt}>{item.detailTitle}</Text>
                        <AntDesign
                            style={{ marginLeft: 10 }}
                            name={"check"}
                            color={colors.puprble}
                            size={20} />
                    </Pressable>
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
                    <Pressable style={styles.detailTypeView} onPress={() => subDetailPressed(item.detail_Id)}>
                        <Text style={styles.detailTxt}>{item.detailTitle}</Text>
                        <AntDesign
                            style={{ marginLeft: 10 }}
                            name={"check"}
                            color={colors.puprble}
                            size={20} />
                    </Pressable>
                </View>
            )
        })
        return serviceDetailInfo
    }
    ///////
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
                    {renderServiceDetail()}
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
            {renderSubDetailModal()}
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
        justifyContent: 'flex-end',
        backgroundColor: '#dcdcdc',
        width: '80%',
        height: 40,
        alignSelf: 'flex-end',
        borderRadius: 5,
        paddingRight: 20,
        marginVertical: 5
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
    dateformat: {
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
    datetext: {
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
    },
    detailModal: {
        width: '100%',
        height: 400,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Modalbtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        width: '100%'
    },
    modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
    },
    modalHeaderTxt: {
        fontSize: 18
    },
    priceSDetTxt: {
        fontSize: 18,
        color: colors.puprble,
        position: 'absolute',
        left: 5
    },
    subDetailItem: {
        width: '65%'
    },
    SupDetTxt: {
        fontSize: 15,
        color: colors.puprble,
    },
    modalbody: {
        //marginTop: 20
    },
    subDetailView: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        margin: 5,
        paddingHorizontal: 5
    },
    SubDImg: {
        width: 80,
        height: 80,
        borderRadius: 30,
        marginLeft: 10,
        borderWidth: 1
    }
})

export default ServiceDescr;
