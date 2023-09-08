import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Modal, ScrollView } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import ServiceDetailComp from '../components/ServiceDetailComp';
import DateTPicker from '../components/DateTPicker'
import 'react-native-get-random-values'
import { SliderBox } from 'react-native-image-slider-box';
import { getbookingDates } from '../resources/API';
import moment from 'moment';

const ServiceDescr = (props) => {
    const { data } = props?.route.params

    const { setServId, setServiceDatesforBooking, ServiceDatesforBooking, setisFromServiceDescription,
        selectDateforSearch, selectMonthforSearch, requestedDate, setrequestedDate, isDateAvailable, setRequestIdState } = useContext(SearchContext);

    const [select, setSelect] = useState(false)

    const getDatesfromApi = () => {
        getbookingDates({ service_ID: data?.service_id }).then(res => {
            setServiceDatesforBooking(res)
        })
    }
    useEffect(() => {
        getDatesfromApi()
        setisFromServiceDescription(true)
    }, [])


    const onPressHandler = () => {
        setisFromServiceDescription(false)
        props.navigation.navigate(ScreenNames.ClientRequest, { data: { ...data, requestedDate } })
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
            const DatesAvailable = queryDatesAccorMonth()
            const dateArray = DatesAvailable?.map(dat => {
                return <View>
                    <Pressable style={[styles.viewselectdate, select ? styles.viewselectdatepress : styles.viewselectdate]}
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
                return <View><Text style={styles.tex}>{`${moment(dat.bookDate).format('LL')}`}</Text>
                    <Text style={styles.tex}>{`${moment(dat.bookDate).format('dddd')}`}</Text>
                </View>;
            });
            return dateArray;
        } else {
            const firstAvilableDate = queryfirstDates()

            return <View><Text style={styles.tex}>{`${moment(firstAvilableDate?.bookDate).format('dddd')}`}</Text>
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
        return <View style={styles.descView}>
            <Text style={styles.desc1}>قائمة الخدمات </Text>
            <View style={styles.HallView}>
                <ServiceDetailComp service_id={data.service_id}  />
            </View>
        </View>
    }
    const renderSoialMedia = () => {
        return <View style={styles.icon}>
            <Image style={styles.insicon} source={require('../assets/facebook--v2.png')} />
            <Image style={styles.insicon} source={require('../assets/instagram-new.png')} />
            <Image style={styles.insicon} source={require('../assets/apple-phone.png')} />
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
                    <Text style={styles.descText}>تحتوي هذة الخانة على شرح  عن الخدمة المعروضة </Text>
                </View>

                {renderServiceDetail()}

                <View style={styles.descView}>
                    <Text style={styles.desc1}>تاريخ المناسبة</Text>
                    <Text style={styles.desc1}>{requestedDate || '2023/9/15'}</Text>

                </View>
                <View style={styles.descView}>
                    <Image
                        style={styles.mapImage}
                        source={require('../assets/location.png')} />
                </View>
                <View style={styles.descView}>
                    <Text style={styles.descText}>عرض التغذية الراجعة عن الخدمة المختارة</Text>
                </View>

                {renderSoialMedia()}

            </ScrollView>
            {/* <Modal
                transparent
                visible={showModal}
                animationType='slide'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.Motitle}>
                            <Text style={styles.text}>...</Text>
                        </View>
                        <View style={styles.body}>
                            <DateTPicker />
                        </View>
                        {checkDateResult()}
                    </View>
                </View>

            </Modal> */}

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
        flex: 1
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
        margin: 10,
        padding: 20
    },
    descView: {
        borderWidth: 1,
        margin: 10,
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
        backgroundColor: '#f0ffff',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginRight: 20,
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
        color: 'black'
    },
    // input: {
    //     textAlign: 'center',
    //     height: 50,
    //     width: 200,
    //     borderWidth: 1,
    //     borderRadius: 30,
    //     borderColor: 'black',
    //     fontSize: 15,
    //     fontWeight: 'bold',
    //     marginTop: 20,
    //     marginRight: 10,
    //     color: 'black',
    //     backgroundColor: '#fffaf0',
    // },
    // detailModal: {
    //     width: "100%",
    //     height: 500,
    //     backgroundColor: '#ffffff',
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20,
    // },
    // centeredView: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    //     backgroundColor: '#00000099',
    // },
    // Motitle: {
    //     height: 50,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20,
    // },
    // body: {
    //     height: '80%',
    //     alignItems: 'center',
    //     marginTop: 10,
    // },
    // text: {
    //     textAlign: 'center',
    //     fontSize: 20,
    //     color: 'black',
    // },
    // Modalbtn: {
    //     marginBottom: 20,
    // },
})

export default ServiceDescr;
