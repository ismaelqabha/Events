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


const ServiceDescr = (props) => {
    const { data } = props?.route.params

    const { userId, setServiceDatesforBooking, ServiceDatesforBooking, setDetailOfServ, campiegnsAccordingServiceId, setCampiegnsAccordingServiceId,
        selectDateforSearch, selectMonthforSearch, requestedDate, setrequestedDate, requestInfo, setRequestInfo, setReachCampaignfrom } = useContext(SearchContext);

    const [select, setSelect] = useState(false)

    const getDatesfromApi = () => {
        getbookingDates({ service_ID: data?.service_id }).then(res => {
            setServiceDatesforBooking(res)
        })
    }
    const getDetailFromApi = () => {
        getServiceDetail({ SDserviceID: data?.service_id }).then(res => {
            setDetailOfServ(res)
        })
    }
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
        getDatesfromApi()
        // getDetailFromApi()
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
        if (!checkIfInEvent()) {
            props.navigation.navigate(ScreenNames.ClientRequest, { data: { ...data, requestedDate } })
        } else {
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
        }

    }

    const SelectDatePressed = (dat) => {
        setSelect(true)
        setrequestedDate(dat)
    }

    const queryfirstDates = () => {
        const requestedDate = moment(new Date())
        const DateFiltered = ServiceDatesforBooking.filter(datee => {
            const { bookDate, serviceStutes } = datee;
            const bookDateMoment = moment(bookDate);
            const res1 = bookDateMoment.isAfter(requestedDate)
            const res2 = serviceStutes == 'true'
            return res1 && res2
        });
        const firstDateAvailable = DateFiltered[0]
        return firstDateAvailable;
    };

    const queryDatesAccorMonth = () => {
        const requestedMonth = selectMonthforSearch;
        return ServiceDatesforBooking.filter(datee => {
            const { bookDate, serviceStutes } = datee;
            const wholeDate = moment(bookDate);
            const gittingMonth = wholeDate.format('M')
            const res1 = gittingMonth == requestedMonth
            return res1 && serviceStutes == 'true'
        })
    }
    const querySpacificDate = () => {
        const requestedDate = moment(new Date(selectDateforSearch)).startOf('day')
        return ServiceDatesforBooking.filter(datee => {
            const { bookDate, serviceStutes } = datee;
            const bookDateMoment = moment(bookDate).startOf('day');
            const res1 = bookDateMoment.isSame(requestedDate)
            const res2 = serviceStutes == 'true'
            return res1 && res2
        })
    }

    const renderDates = () => {

        if (selectMonthforSearch) {
            //const pressableStyle = isPressed ? styles.pressablePressed : styles.pressableDefault;
            moment.locale('ar-dz');
            const DatesAvailable = queryDatesAccorMonth()
            const dateArray = DatesAvailable?.map(dat => {

                return <View style={styles.dateView}>
                    <Pressable style={({ pressed }) =>
                        [styles.viewselectdate, pressed ? styles.viewselectdatepress : styles.viewselectdate]}
                        onPress={() => SelectDatePressed(dat.bookDate)}

                    >
                        <Text style={styles.tex}>{moment(dat.bookDate).format('dddd')}</Text>
                        <Text style={styles.tex}>{moment(dat.bookDate).format('LL')}</Text>
                    </Pressable>
                </View>;
            });
            return dateArray;
        }
        if (selectDateforSearch) {
            const DatesAvailable = querySpacificDate()
            const dateArray = DatesAvailable?.map(dat => {
                setrequestedDate(dat.bookDate)
                return <View style={styles.dateView}>
                    <Text style={styles.tex}>{`${moment(dat.bookDate).format('LL')}`}</Text>
                    <Text style={styles.tex}>{`${moment(dat.bookDate).format('dddd')}`}</Text>
                </View>;
            });
            return dateArray;
        } else {
            const firstAvilableDate = queryfirstDates()
            setrequestedDate(firstAvilableDate?.bookDate)
            return <View style={styles.dateView}>
                <Text style={styles.tex}>{`${moment(firstAvilableDate?.bookDate).format('dddd')}`}</Text>
                <Text style={styles.tex}>{`${moment(firstAvilableDate?.bookDate).format('LL')}`}</Text>
            </View>;

        }
    };

    const renderImg = () => {
        const imageArray = data.images.map(photos => {
            return photos.image;
        });
        return imageArray;
    };

    const renderHederInfo = () => {
        return <View style={styles.headerInfo}>
            <Text style={styles.title}>{data?.title || 'no event'}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.feedback}>5★</Text>
                <Text style={styles.address}>{data.address}</Text>
                {/* <Text style={styles.feedback}>التغذيه الراجعة 13</Text> */}
            </View>
            <View>
                <Text style={styles.descText}>تحتوي هذة الخانة على شرح  عن المزود </Text>
            </View>
        </View>
    }

    const renderServiceDetail = () => {
        return (
            <View style={styles.HallView}>
                <DetailComp service_id={data.service_id} />
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
                    color={"blue"}
                    size={35} />
            </Pressable>

            <Pressable
            //onPress={() => onPressModalHandler()}
            >
                <Entypo
                    name={"instagram"}
                    color={"blue"}
                    size={35} />
            </Pressable>

            <Pressable
            //onPress={() => onPressModalHandler()}
            >
                <FontAwesome
                    name={"phone-square"}
                    color={"blue"}
                    size={35} />
            </Pressable>
        </View>
    }
    const seperator = () => {
        return (
            <View style={styles.seperaView}></View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.home}>
                <View style={styles.screenView}>

                    <SliderBox
                        sliderBoxHeight={300}
                        images={renderImg()}
                        dotColor="blue"
                        dotStyle={{ width: 8, height: 8, borderRadius: 50 }}
                        autoplay={true}
                    />
                    {/* <View style={styles.InfoView}> */}
                    <View style={styles.logo}></View>
                    {renderHederInfo()}

                    {seperator()}

                    <View style={{ height: 100, margin: 20 }}>
                        <Text style={styles.text}>{selectMonthforSearch ? 'التواريخ المتاحة' : 'التاريخ المتاح'}</Text>
                        {renderDates()}
                        <Pressable
                            style={{ position: 'absolute', bottom: 0, justifyContent: 'center' }}
                            //onPress={}
                        >
                            <Text style={styles.changDatetext}>تغيير التاريح</Text>
                        </Pressable>
                    </View>

                    {seperator()}

                    <View style={styles.ditailView}>
                        <Text style={styles.text}>تفاصيل الخدمات لتحديد تكلفة الحجز</Text>
                        {renderServiceDetail()}
                        {renderCampeigns()}
                    </View >

                    {seperator()}

                    <View style={styles.ReviewView}>
                        <Text style={styles.text}>عرض التغذية الراجعة عن الخدمة المختارة</Text>
                    </View>

                    {seperator()}

                    <View style={styles.locationView}>
                        <Image
                            style={styles.mapImage}
                            source={require('../assets/photos/location.png')} />
                    </View>
                    {seperator()}

                    {renderSoialMedia()}
                    {/* </View> */}
                </View >
            </ScrollView>

            <View style={styles.foter}>
                <Pressable style={styles.btnview} onPress={() => onPressHandler()}>
                    <Text style={styles.btntext}>طلب حجز</Text>
                </Pressable>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'white'
    },
    screenView: {

    },
    InfoView: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: 'snow',
        //position: 'absolute',
        //top: 200
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logo: {
        borderRadius: 50,
        width: 70,
        height: 70,
        position: 'absolute',
        top: 260,
        left: 50,
        backgroundColor: 'blue',
    },
    seperaView: {
        borderWidth: 0.5,
        borderColor: 'lightgray'
    },
    headerInfo: {
        height: 150,
        margin: 20,
    },
    ditailView: {
        margin: 20
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    changDatetext: {
        fontSize: 15,
        color: 'blue',
        fontWeight: 'bold'
    },
    ReviewView: {
        height: 150,
        margin: 20,
    },
    locationView: {
        height: 150,
        margin: 20,
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
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 50
    },
    insicon: {
        width: 40,
        height: 40,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    feedback: {
        fontSize: 12,
        color: 'black',
    },

    descText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },

    address: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
    },

    foter: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#fffaf0',
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    btnview: {
        backgroundColor: 'white',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 20,
        elevation: 5
    },
    viewselectdate: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 2

    },
    viewselectdatepress: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
    tex: {
        fontSize: 15,
        margin: 5,
        color: 'black',
        fontWeight: 'bold'
    },
    priceView: {
        backgroundColor: 'snow',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 5
    },
    HallView: {
        marginTop: 20,
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
