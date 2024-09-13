import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Alert, ScrollView, Modal, Linking } from 'react-native';
import 'react-native-get-random-values'
import { SliderBox } from 'react-native-image-slider-box';
import moment from 'moment';
import 'moment/locale/ar-dz'
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5'
import SearchContext from '../../../store/SearchContext';
import { colors } from '../../assets/AppColors';
import { ScreenNames } from '../../../route/ScreenNames';
import CampaignCard from '../../components/CampaignCard';
import ClientCalender from '../../components/ClientCalender';
import { showMessage } from '../../resources/Functions';
import { getProviderRequests } from '../../resources/API';


const ServiceDescr = (props) => {
    const { data, isFromClientRequest, isFromCampaign } = props?.route.params
    const servicePhone = props.route.params?.data?.servicePhone;
    const { requestedDate, setrequestedDate, setResDetail, dateFromCalender } = useContext(SearchContext);

    
    const [showModal, setShowModal] = useState(false);
    const [changeDateshowModal, setChangeDateshowModal] = useState(false);
    const [changeDateIsLocal, setchangeDateIsLocal] = useState(false);

    const [showAllDesc, setShowAllDesc] = useState(false);
    const [displayCount, setDisplayCount] = useState(5);

    const [showAllManDetail, setShowAllManDetail] = useState(false);
    const [showAllOpDetail, setShowAllOpDetail] = useState(false);

    const [isFromServiceDesc, setIsFromServiceDesc] = useState(true);
    const [subDetArray, setSubDetArray] = useState([]);

    const [ProviderRequests, setProviderRequests] = useState(data.serviceRequests);



    useEffect(() => {
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


    const checkRequestBeforSending = () => {
        if (ProviderRequests !== undefined) {
            const reqResult = ProviderRequests.filter(item => {
                return item.reservationDetail.find(element => {

                    if (Array.isArray(requestedDate)) {
                        return requestedDate.find(elemDate => {
                            // console.log(">>>", element.reservationDate, elemDate, element.reservationDate == elemDate);
                            return elemDate == element.reservationDate
                        })
                    } else {
                        // console.log(element.reservationDate, requestedDate, element.reservationDate == requestedDate);
                        return element.reservationDate == requestedDate
                    }
                })
            })
            return reqResult
        }else{
            return 0
        }
    }


    const onRequestPressHandler = () => {
        const result = checkRequestBeforSending()
        if (result.length > 0) {
            Alert.alert(
                'تنبية',
                '  الرجاء اختيار تفاصيل حجز اخرى التفاصيل الحالية محجوزة مسبقا لديك',
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    },
                ],
                { cancelable: false } // Prevent closing the alert by tapping outside
            );

        } else {
            props.navigation.navigate(ScreenNames.ClientRequest, { data: { ...data }, isfromClientShowRequest:false })

        }

    }
    const onPressBack = () => {
        setrequestedDate([])
        props.navigation.goBack();
    }

    const renderImg = () => {
        const imageArray = data.images[0].serviceImages?.map(photos => {
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
    const getDescItem = () => {
        const serviceDescription = data?.desc?.slice(0, displayCount).map(item => {
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
    const renderDescription = () => {
        return (
            <View style={styles.descView}>
                <Text style={styles.text}>الوصف</Text>
                {getDescItem()}
                {data?.desc.length > displayCount &&
                    <View>
                        {!showAllDesc ?
                            <Pressable onPress={onPressMore} style={{ alignSelf: 'flex-start' }}>
                                <Text >المزيد...</Text>
                            </Pressable> :
                            <Pressable onPress={onPressLess} style={{ alignSelf: 'flex-start' }}>
                                <Text >اغلاق...</Text>
                            </Pressable>}
                    </View>}
            </View>
        )
    }
    const onPressMore = () => {
        setDisplayCount(displayCount + 11)
        setShowAllDesc(!showAllDesc)
    }
    const onPressLess = () => {
        setDisplayCount(5)
        setShowAllDesc(!showAllDesc)
    }

    // render Service Dates Info from result screen
    const SelectDatePressed = (dat, setIsPressed, pressed) => {
        if (Array.isArray(requestedDate)) {
            const index = requestedDate.findIndex((date) => date === dat);
            if (index === -1) {
                setIsPressed(true);
                setrequestedDate([...requestedDate, dat]);
            } else {
                setIsPressed(false);
                const newDates = [...requestedDate.slice(0, index), ...requestedDate.slice(index + 1)];
                setrequestedDate(newDates);
            }
        } else {
            if (requestedDate) {
                if (requestedDate === dat) {
                    setIsPressed(false);
                    setrequestedDate([]);
                } else {
                    setIsPressed(true);
                    setrequestedDate([requestedDate, dat]);
                }
            }
        }
    };
    const renderDates = (dateSource) => {
        moment.locale('ar-dz');
        if (Array.isArray(dateSource)) {
            const DatesAvailable = dateSource
            // console.log("DatesAvailable", DatesAvailable);
            const dateArray = DatesAvailable?.map(dat => <DateComp dat={dat} />);
            return dateArray;
        } else {
            const firstAvilableDate = dateSource
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
    const DateComp = (props) => {
        const [pressed, setIsPressed] = useState(false)
        const dat = props?.dat
        useEffect(() => {
            if (Array.isArray(requestedDate)) {
                const found = requestedDate?.find((date) => date === dat)
                if (found) {
                    setIsPressed(true)
                } else {
                    setIsPressed(false)
                }
            } else {
                if (requestedDate) {
                    if (requestedDate === dat) {
                        setIsPressed(true)
                    } else {
                        setIsPressed(false)
                    }
                }
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
    }
    const renderDatesAvailable = (dateSource) => {
        return (
            <View>
                <Text style={styles.text}>{Array.isArray(dateSource) ? 'التواريخ المتاحة' : 'التاريخ المتاح'}</Text>
                <View style={styles.DatesZone}>
                    <ScrollView contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>{renderDates(dateSource)}</ScrollView>
                </View>
            </View>
        )
    }
    const displayDates = (dateSource) => {
        if (!isFromClientRequest) {
            return (
                <View>
                    {renderDatesAvailable(dateSource)}
                </View>
            )
        }
    }
    const getDatesInfoSource = () => {
        if (changeDateIsLocal) {
            return (
                <View>
                    {displayDates(dateFromCalender)}
                </View>
            )
        } else {
            return (
                <View>
                    {displayDates(data.availableDates)}
                </View>
            )

        }
    }

    /// to change the selected date part

    const onChangDatePress = () => {
        setChangeDateshowModal(true)
        setchangeDateIsLocal(true)
    }
    const renderChangeDateModal = () => {
        return (
            <Modal
                transparent
                visible={changeDateshowModal}
                animationType="slide"
                onRequestClose={() => setChangeDateshowModal(false)}>
                <View style={styles.changeDatecenteredView}>
                    <View style={styles.changeDatedetailModal}>
                        <View style={{ marginTop: 20 }}>
                            <ClientCalender  {...data} />

                            <Pressable onPress={() => {
                                setrequestedDate([])
                                setChangeDateshowModal(false)
                            }} style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                                <Text>بحث</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    const changeDateComponent = () => {
        return (
            <Pressable onPress={onChangDatePress}>
                <View style={styles.changeDateView}>
                    <Fontisto
                        style={{ alignSelf: 'center' }}
                        name={"date"}
                        color={colors.puprble}
                        size={50} />
                </View>
            </Pressable>
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
                        <View style={styles.SubDImg}>
                            <Image style={styles.SubPhoto} source={{ uri: subItem.subDetailPhoto.uri }} />
                        </View>

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
    const onShowManDetPress = () => {
        setShowAllManDetail(!showAllManDetail)
    }
    const onShowOpDetPress = () => {
        setShowAllOpDetail(!showAllOpDetail)
    }
    const renderServiceDetail = () => {
        if (!!data.servicePrice && data.additionalServices.length > 0) {
            return (
                <View>
                    <View style={{ marginVertical: 20 }}>{renderInitialPrice()}</View>
                    <Text style={styles.text}> الخدمات المتوفرة</Text>

                    <View style={styles.detailPressedView}>
                        <Text style={styles.detailTxt}>الخدمات الاجبارية</Text>
                        <Pressable style={styles.IconView} onPress={onShowManDetPress}>
                            {showAllManDetail ?
                                <AntDesign
                                    style={{ alignSelf: 'center' }}
                                    name={"minus"}
                                    color={colors.puprble}
                                    size={20} /> :
                                <AntDesign
                                    style={{ alignSelf: 'center' }}
                                    name={"plus"}
                                    color={colors.puprble}
                                    size={20} />}
                        </Pressable>
                    </View>
                    {renderMandatoryDetail()}


                    <View style={styles.detailPressedView}>
                        <Text style={styles.detailTxt}>الخدمات الاختيارية</Text>

                        <Pressable style={styles.IconView} onPress={onShowOpDetPress}>
                            {showAllOpDetail ?
                                <AntDesign
                                    style={{ alignSelf: 'center' }}
                                    name={"minus"}
                                    color={colors.puprble}
                                    size={20} /> :
                                <AntDesign
                                    style={{ alignSelf: 'center' }}
                                    name={"plus"}
                                    color={colors.puprble}
                                    size={20} />}
                        </Pressable>
                    </View>
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
                    <View style={styles.detailPressedView}>
                        <Text style={styles.detailTxt}>الخدمات الاجبارية</Text>
                        <Pressable style={styles.IconView} onPress={onShowManDetPress}>
                            {showAllManDetail ?
                                <AntDesign
                                    style={{ alignSelf: 'center' }}
                                    name={"minus"}
                                    color={colors.puprble}
                                    size={20} /> :
                                <AntDesign
                                    style={{ alignSelf: 'center' }}
                                    name={"plus"}
                                    color={colors.puprble}
                                    size={20} />}
                        </Pressable>
                    </View>
                    {renderMandatoryDetail()}
                    <View style={styles.detailPressedView}>
                        <Text style={styles.detailTxt}>الخدمات الاختيارية</Text>

                        <Pressable style={styles.IconView} onPress={onShowOpDetPress}>
                            {showAllOpDetail ?
                                <AntDesign
                                    style={{ alignSelf: 'center' }}
                                    name={"minus"}
                                    color={colors.puprble}
                                    size={20} /> :
                                <AntDesign
                                    style={{ alignSelf: 'center' }}
                                    name={"plus"}
                                    color={colors.puprble}
                                    size={20} />}
                        </Pressable>
                    </View>
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
        var data = []
        if (showAllManDetail) {
            data = selectMandatoryDetail()
        } else {
            data = []
        }

        // const data = selectMandatoryDetail()
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
        var data = []
        if (showAllOpDetail) {
            data = selectOptionalDetail()
        } else {
            data = []
        }
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
            <Pressable onPress={openMap} style={styles.locationView}>
                <Image
                    style={styles.mapImage}
                    source={require('../../assets/photos/location.png')} />
            </Pressable >
        )
    }

    const openMap = () => {
        const { location } = props.route.params.data;

        if (location && location.coordinates) {
            const [longitude, latitude] = location.coordinates;

            // Construct the URL for opening the location in the map app
            const url = Platform.select({
                ios: `maps:0,0?q=${latitude},${longitude}`,
                android: `geo:0,0?q=${latitude},${longitude}`
            });

            // Open the URL
            Linking.openURL(url).catch(err => {
                console.error('An error occurred', err)
                showMessage('An error occurred')
            });
        } else {
            console.error('Location coordinates are not available');
            showMessage('Location coordinates are not available')

        }
    }
    const renderCampeigns = () => {
        const campArray = data.relatedCamp?.map(offer => {

            const serviceData = {
                title: data?.title,
                additionalServices: data?.additionalServices,
            }

            return <View style={styles.HallView}>
                < CampaignCard  {...offer}
                    serviceData={serviceData}
                    isFromServiceDesc={isFromServiceDesc} />
            </View>
        });
        //console.log("campArray", campArray);
        return campArray;
    }
    const openSocialMedia = (url) => {
        if (url) {
            Linking.openURL(url).catch(err => {
                console.error('An error occurred', err)
                showMessage('An error occurred')
            });
        } else {
            showMessage("url is wrong")
        }
    }

    const renderSoialMedia = () => {
        return data.socialMedia.map(item => {
            const { social, link: url } = item;
            if (social === "facebook") {
                return (
                    <View key={social}>
                        <Pressable onPress={() => openSocialMedia(url)}>
                            <Entypo
                                name={"facebook"}
                                color={'blue'}
                                size={35} />
                        </Pressable>
                    </View>
                )
            }
            if (social === "instagram") {
                return (
                    <View key={social}>
                        <Pressable onPress={() => openSocialMedia(url)}>
                            <Entypo
                                name={"instagram"}
                                color={'black'}
                                size={35} />
                        </Pressable>
                    </View>
                )
            }
            if (social === "tiktok") {
                return (
                    <View key={social}>
                        <Pressable onPress={() => openSocialMedia(url)}>
                            <FontAwesome5Brands
                                name={"tiktok"}
                                color={'black'}
                                size={35} />
                        </Pressable>
                    </View>
                )
            }
            if (social === "youtube") {
                return (
                    <View key={social}>
                        <Pressable onPress={() => openSocialMedia(url)}>
                            <Entypo
                                name={"youtube"}
                                color={'red'}
                                size={35} />
                        </Pressable>
                    </View>
                )
            }
            if (social === "X") {
                return (
                    <View key={social}>
                        <Pressable onPress={() => openSocialMedia(url)}>
                            <Text>{social}</Text>
                            <Image style={styles.Xstyle} source={require('../../assets/photos/X-Logo.png')} />
                        </Pressable>
                    </View>
                )
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
            <Pressable onPress={openPhoneApp}>
                <FontAwesome
                    name={"phone-square"}
                    color={colors.puprble}
                    size={35}
                />
            </Pressable>
        );
    };

    const openPhoneApp = () => {
        if (servicePhone) {
            const phoneNumber = `tel:${servicePhone}`;
            Linking.openURL(phoneNumber).catch(err => {
                console.error('Error opening phone app', err)
                showMessage("Error opening phone app")
            }
            );
        } else {
            // console.log("Service phone number is not available");
            showMessage("Service phone number is not available")
        }
    };

    const renderBody = () => {
        return (
            <View style={styles.body}>
                <View style={styles.logo}>{renderLogo()}</View>
                {renderTitle()}
                {!isFromClientRequest && seperator()}
                {!isFromClientRequest && changeDateComponent()}
                {getDatesInfoSource()}

                {seperator()}

                {renderDescription()}

                {seperator()}

                <View style={styles.ditailView}>
                    {renderServiceDetail()}
                    {data.relatedCamp.length > 0 &&
                        <View>
                            <Text style={styles.text}>العروض المتوفرة</Text>
                            {renderCampeigns()}
                        </View>}
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
                {!isFromClientRequest && renderFoter()}
            </ScrollView>
            {renderSubDetailModal()}
            {renderChangeDateModal()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {

        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    sliderView: {

    },
    body: {
        paddingHorizontal: 10,
        backgroundColor: colors.BGScereen,
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
    descView: {

    },
    description: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,

    },
    DatesZone: {
        marginVertical: 10,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    ditailView: {
        marginVertical: 10,
        paddingHorizontal: 10
    },
    ReviewView: {
        marginVertical: 10,
    },
    locationView: {
        marginVertical: 10,
    },
    detailItem: {
        marginBottom: 10,
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
        color: colors.puprble,
    },
    btnview: {
        borderWidth: 1,
        borderColor: colors.puprble,
        // backgroundColor: colors.puprble,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        // elevation: 5,
        marginRight: 20
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
        width: 100,
        height: 70,
        margin: 4,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 5,

    },
    viewselectdatepress: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
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
    changeDatedetailModal: {
        //  width: '80%',
        height: '80%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    changeDatecenteredView: {
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
        width: "25%",
        height: "100%",
        borderRadius: 30,
        marginLeft: 10,
    },
    SubPhoto: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
    },
    changeDateView: {
        width: '70%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 5,
        marginVertical: 10,
        borderRadius: 30
    },
    detailPressedView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 10
    }
})

export default ServiceDescr;
