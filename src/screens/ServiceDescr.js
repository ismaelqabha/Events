import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Alert, ScrollView, Modal } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/SearchContext';
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
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5'


const ServiceDescr = (props) => {
    const { data } = props?.route.params
    const [showModal, setShowModal] = useState(false);
    const [subDetArray, setSubDetArray] = useState([]);
    const { userId } = useContext(UsersContext);
    const {
        campiegnsAccordingServiceId, setCampiegnsAccordingServiceId,
        resDetail,
        setResDetail,
        requestInfo, setRequestInfo,
        requestedDate, setrequestedDate,
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
        getRequestfromApi();
        getCampeignsfromApi();

        // Cleanup function to reset resDetail when component unmounts or re-renders
        return () => {
            resetResDetail();
        };
    }, []);

    const resetResDetail = () => {
        setResDetail([]);
    };


    const modalDeletePress = () => {
        setShowModal(false);
    };



    const onRequestPressHandler = () => {
        // if (!checkIfInEvent()) {
        props.navigation.navigate(ScreenNames.ClientRequest, { data: { ...data } })
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
        setrequestedDate([])
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
    const renderLogo = () => {
        const index = data.images[0].logoArray?.findIndex((val) => val === true)
        const image = data.images[0]?.serviceImages[index]
        return <Image
            source={{ uri: image }}
            style={styles.img}
        />
    }
    const renderDescription = () => {
        const serviceDescription = data?.desc?.map(item => {
            return (
                <View style={styles.description}>
                    <Text style={styles.descText}>{item.descItem}</Text>
                    <View style={styles.IconView}>
                        <AntDesign
                            style={{ alignSelf: 'center' }}
                            name={"checksquareo"}
                            color={colors.puprble}
                            size={20} />
                    </View>
                </View>
            )
        })
        return serviceDescription || null
    }

    // render Service Dates Info from result screen
    const SelectDatePressed = (dat, setIsPressed, pressed) => {
        const index = requestedDate.findIndex((date) => date === dat);
        if (index === -1) {
            setIsPressed(true);
            setrequestedDate([...requestedDate, dat]);
        } else {
            setIsPressed(false);
            const newDates = [...requestedDate.slice(0, index), ...requestedDate.slice(index + 1)];
            setrequestedDate(newDates);
        }
    };
    const renderDates = () => {
        moment.locale('ar-dz');
        if (Array.isArray(data.availableDates)) {
            const DatesAvailable = data.availableDates
            const dateArray = DatesAvailable?.map(dat => {
                const [pressed, setIsPressed] = useState(false)
                useEffect(() => {
                    const found = requestedDate.find((date) => date === dat)
                    if (found) {
                        setIsPressed(true)
                    } else {
                        setIsPressed(false)
                    }
                }, [])
                return <View style={styles.dateView}>
                    <Pressable style={[styles.viewselectdate, pressed ? styles.viewselectdatepress : styles.viewselectdate]}
                        onPress={() => SelectDatePressed(dat, setIsPressed, pressed)}
                    >
                        <Text style={styles.datetext}>{moment(dat).format('dddd')}</Text>
                        <Text style={styles.datetext}>
                            {moment(dat).format('L')}
                        </Text>
                    </Pressable>
                </View>;
            });
            return dateArray;
        } else {
            const firstAvilableDate = data.availableDates
            setrequestedDate(firstAvilableDate)
            return <View style={styles.dateformat}>
                <View>
                    <Text style={styles.datetxt}>{`${moment(firstAvilableDate).format('L')}`}</Text>
                    <Text style={styles.Daytex}>{`${moment(firstAvilableDate).format('dddd')}`}</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={{ alignSelf: 'center' }}
                        name={"calendar"}
                        color={colors.puprble}
                        size={20} />
                </View>
            </View>;

        }
    };
    const renderDatesAvailable = () => {
        return (
            <View>
                <Text style={styles.text}>{Array.isArray(data.availableDates) ? 'التواريخ المتاحة' : 'التاريخ المتاح'}</Text>
                <View style={styles.DatesZone}>
                    <ScrollView contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>{renderDates()}</ScrollView>
                </View>
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
                        <View style={styles.SubDImg}><Image style={styles.SubPhoto} source={{ uri: subItem.subDetailPhoto.uri }} /></View>

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
                    <View style={{ marginVertical: 20 }}>{renderInitialPrice()}</View>
                    <Text style={styles.detailTxt}>الخدمات الاجبارية</Text>
                    {renderMandatoryDetail()}
                    <Text style={styles.detailTxt}>الخدمات الاختيارية</Text>
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
                    <Text style={styles.detailTxt}>الخدمات الاختيارية</Text>
                    {renderMandatoryDetail()}
                    <Text style={styles.detailTxt}>الخدمات الاختيارية</Text>
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
                        size={20} />
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
                        size={20} />
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
                    <Pressable style={styles.detailTypeView} onPress={() => subDetailPressed(item.detail_Id)}>
                        <Text style={styles.detailTxt}>{item.detailTitle}</Text>
                        <AntDesign
                            style={{ marginLeft: 10 }}
                            name={"enter"}
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
                    <Pressable style={styles.detailTypeView} onPress={() => subDetailPressed(item.detail_Id)}>
                        <Text style={styles.detailTxt}>{item.detailTitle}</Text>
                        <AntDesign
                            style={{ marginLeft: 10 }}
                            name={"enter"}
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
            const campArray = data.relatedCamp?.map(offer => {
                return <View style={styles.HallView}>
                    < CampaignCard  {...offer} />
                </View>
            });
            //console.log("campArray", campArray);
            return campArray;
    }
    const renderSoialMedia = () => {
        return data.socialMedia.map(item => {
            if (item.social == "facebook") {
                return <View>
                    <Pressable
                    >
                        <Entypo
                            name={"facebook"}
                            color={'blue'}
                            size={35} />
                    </Pressable>
                </View>
            }
            if (item.social == "instagram") {
                return <View>
                    <Pressable
                    //onPress={() => onPressModalHandler()}
                    >
                        <Entypo
                            name={"instagram"}
                            color={'black'}
                            size={35} />
                    </Pressable>
                </View>
            }
            if (item.social == "tiktok") {
                return <View>
                    <Pressable
                    //onPress={() => onPressModalHandler()}
                    >
                        <FontAwesome5Brands
                            name={"tiktok"}
                            color={'black'}
                            size={35} />
                    </Pressable>
                </View>
            }
            if (item.social == "youtube") {
                return <View>
                    <Pressable
                    //onPress={() => onPressModalHandler()}
                    >
                        <Entypo
                            name={"youtube"}
                            color={'red'}
                            size={35} />
                    </Pressable>
                </View>
            }
            if (item.social == "X") {
                return <View>
                    <Pressable
                    //onPress={() => onPressModalHandler()}
                    >
                        <Text>{item.social}</Text>
                        <Image style={styles.Xstyle} source={require('../assets/photos/X-Logo.png')} />
                    </Pressable>
                </View>
            }
        })

    }
    const seperator = () => {
        return (
            <View style={styles.seperaView}></View>
        )
    }
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressBack}
                >
                    <Ionicons
                        style={{ marginLeft: 10 }}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.title}>تفاصيل المصلحة</Text>
            </View>
        )
    }
    const renderFoter = () => {
        return (
            <View style={styles.foter}>
                <Pressable style={styles.btnview}
                    onPress={() => onRequestPressHandler()}
                >
                    <Text style={styles.btntext}>طلب حجز</Text>
                </Pressable>
            </View>
        )
    }
    const renderPhoneContact = () => {
        return (
            <Pressable
            //onPress={() => onPressModalHandler()}
            >
                <FontAwesome
                    name={"phone-square"}
                    color={colors.puprble}
                    size={35} />
            </Pressable>
        )
    }

    const renderBody = () => {
        return (
            <View style={styles.body}>
                <View style={styles.logo}>{renderLogo()}</View>
                {renderTitle()}
                {seperator()}
                {renderDatesAvailable()}
                {seperator()}
                <View>
                    <Text style={styles.text}>وصف الخدمات المقدمة</Text>
                    {renderDescription()}
                </View>
                {seperator()}
                <View style={styles.ditailView}>
                    <Text style={styles.text}>التفاصيل لتحديد تكلفة الحجز</Text>
                    {renderServiceDetail()}
                    <Text style={styles.text}>أو يمكنك اختيار احد العروض التالية</Text>
                    {renderCampeigns()}
                </View >
                {seperator()}
                {renderserviceLocation()}
                {seperator()}
                {renderClientReview()}
                {seperator()}
                <View style={styles.icon}>
                    {renderSoialMedia()}
                    {renderPhoneContact()}
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
            {renderFoter()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sliderView: {

    },
    body: {
        // borderTopLeftRadius: 60,
        // borderTopRightRadius: 60,
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
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    logo: {
        borderRadius: 40,
        width: 85,
        height: 85,
        position: 'absolute',
        top: -40,
        left: 50,
        borderWidth: 3,
        borderColor: colors.gold,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    seperaView: {
        borderWidth: 0.5,
        borderColor: 'lightgray'
    },
    titleInfo: {
        marginTop: 30
    },
    description: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    DatesZone: {
        marginVertical: 10,
        alignItems: 'center'
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
        //marginVertical: 10,
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
        marginVertical: 10
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
        fontSize: 20,
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
        color: colors.puprble,
    },
    detailTxt: {
        fontSize: 16,
        color: colors.puprble,
    },
    Xstyle: {
        width: 30,
        height: 30
    },

    icon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
        width: '95%',
        height: 300,
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
        paddingHorizontal: 5
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
    },
    SubPhoto: {
        width: 80,
        height: 80,
        borderRadius: 30,
    }
})

export default ServiceDescr;
