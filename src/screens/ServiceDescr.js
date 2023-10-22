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

const ServiceDescr = (props) => {
    const { data } = props?.route.params

    const { userId, setServiceDatesforBooking, ServiceDatesforBooking, setDetailOfServ, campiegnsAccordingServiceId, setCampiegnsAccordingServiceId,
        selectDateforSearch, selectMonthforSearch, requestedDate, setrequestedDate, requestInfo, setRequestInfo,setReachCampaignfrom } = useContext(SearchContext);

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

                return <View>
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
                return <View><Text style={styles.tex}>{`${moment(dat.bookDate).format('LL')}`}</Text>
                    <Text style={styles.tex}>{`${moment(dat.bookDate).format('dddd')}`}</Text>
                </View>;
            });
            return dateArray;
        } else {
            const firstAvilableDate = queryfirstDates()
            setrequestedDate(firstAvilableDate?.bookDate)
            return <View style={{ flexDirection: 'row' }}><Text style={styles.tex}>{`${moment(firstAvilableDate?.bookDate).format('dddd')}`}</Text>
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
            <Text style={styles.address}>{data.address}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.feedback}>5★</Text>
                <Text style={styles.feedback}>التغذيه الراجعة 13</Text>

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
                return <View style={styles.HallView}><Text style={styles.txt}>أو يمكنك اختيار احد العروض التالية</Text>
                    < CampaignCard  {...camp} />
                </View>
            });
            return campArray;
        }
    }
    const renderSoialMedia = () => {
        return <View style={styles.icon}>
            <Image style={styles.insicon} source={require('../assets/photos/facebook.png')} />
            <Image style={styles.insicon} source={require('../assets/photos/instagram-new.png')} />
            <Image style={styles.insicon} source={require('../assets/photos/apple-phone.png')} />
        </View>
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.home}>
                <View >
                    <SliderBox
                        sliderBoxHeight={200}
                        images={renderImg()}
                        dotColor="blue"
                        dotStyle={{ width: 15, height: 15, borderRadius: 50 }}
                        autoplay={true}
                    />
                    <Image source={data.img} style={styles.logo} />
                </View>

                {renderHederInfo()}

                <View style={styles.descView}>
                    {renderDates()}
                </View>

                <View style={styles.descView}>
                    <Text style={styles.descText}>تحتوي هذة الخانة على شرح  عن المزود </Text>
                </View>

                <View style={styles.descView}>
                    <Text style={styles.desc1}>تفاصيل الخدمات لتحديد تكلفة الحجز</Text>
                    {renderServiceDetail()}
                    {renderCampeigns()}
                </View >

                <View style={styles.descView}>
                    <Image
                        style={styles.mapImage}
                        source={require('../assets/photos/location.png')} />
                </View>
                <View style={styles.descView}>
                    <Text style={styles.descText}>عرض التغذية الراجعة عن الخدمة المختارة</Text>
                </View>

                {renderSoialMedia()}

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

    },
    logo: {
        borderRadius: 50,
        width: 100,
        height: 100,
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 150,
    },
    headerInfo: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 20
    },
    descView: {
        backgroundColor: '#fffaf0',
        margin: 5,
        padding: 20,

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
        fontSize: 25,
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
    desc1: {
        fontSize: 20,
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
        // height: 100,
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
