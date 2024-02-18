import React, { useContext, useEffect, useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';
import { ScreenNames } from '../../route/ScreenNames';
import moment from 'moment';
import Entypo from "react-native-vector-icons/Entypo";
import { addNewRequest, deleteRequestbyId, getEventLogo, getEventsInfo } from '../resources/API';
import { v4 as uuidv4 } from 'uuid';
import { colors } from '../assets/AppColors';
import RequestDetail from '../components/RequestDetail';




const ClientRequest = (props) => {
    const { data } = props?.route.params
    const { userId } = useContext(UsersContext);
    const {
        requestedDate,
        setrequestedDate,
        resDetail,
        setResDetail,
        requestInfo, setRequestInfo,
        eventInfo, setEventInfo,
        eventTypeInfo } = useContext(SearchContext);

    const [date, setDate] = useState(new Date());
    const [IveEvent, setIveEvent] = useState(false);
    const [selectTime, setSelectTime] = useState(true);

    const [requestStatus, setRequestStatus] = useState('')
    const [requestCost, setRequestCost] = useState()
    const [requestDiscount, setRequestDiscount] = useState()
    const [selectedDate, setSelectedDate] = useState()



    const creatNewRequest = () => {
        const newRequestItem = {
            ReqServId: data?.service_id,
            ReqUserId: userId,
            ReqStatus: requestStatus,
            ReqDate: moment(date).format('L'),
            Cost: requestCost,
            discountPercentage: requestDiscount,
            reservationDetail: resDetail
        }
        addNewRequest(newRequestItem).then(res => {
            const req = requestInfo || [];
            req.push(newRequestItem)
            setRequestInfo([...req])
        })
    }



    const onPressRequest = () => {
        // setrequestedDate([])
        console.log("res detail ", resDetail);
        console.log("res detail lenght ", resDetail.length);
        // props.navigation.navigate(ScreenNames.ClientEvents, { data: { ...data }, isFromAddEventClick: true })
    }

    const onPressHandler = () => {
        // setisFromRequestScreen(false)
        // removeRequest()
        props.navigation.goBack();
    }
    const removeRequest = () => {
        deleteRequestbyId({ RequestId: idReq }).then(res => {
            setRequestInfo(res)
        })
    }
    const getEventsfromApi = () => {
        getEventsInfo({ userId: userId }).then(res => {
            if (res.message == 'No Event') {
                setIveEvent(false)
            } else {
                setIveEvent(true)
                setEventInfo(res)
            }
        })
    }

    useEffect(() => {
        getEventsfromApi()
    }, [])


    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.txt}>طلب حجز</Text>
            </View>
        )
    }
    const renderRequestedDates = () => {
        if (Array.isArray(requestedDate)) {
            return requestedDate.map((item, index) => {
                return (
                    renderDate(item, index)
                )
            })
        } else {
            return (
                <View key={index} style={styles.dateItem1}>
                    <Text style={styles.dateTxtPressed}>{moment(requestedDate).format('dddd')}</Text>
                    <Text style={styles.dateTxtPressed}>{moment(requestedDate).format('L')}</Text>
                </View>
            )
        }
    }

    const handleDatePress = (item) => {
        setSelectedDate(item)
    }

    const renderDate = (item, index) => {
        return (
            <Pressable onPress={() => handleDatePress(item)} key={index} style={selectedDate === item ? styles.dateItemPressed : styles.dateItem}
            >
                <Text style={selectedDate === item ? styles.dateTxtPressed : styles.dateTxt}>
                    {moment(item).format('dddd')}</Text>
                <Text style={selectedDate === item ? styles.dateTxtPressed : styles.dateTxt}>
                    {moment(item).format('L')}
                </Text>
            </Pressable>
        )
    }

    const queryImg = () => {
        const imageArray = data.images[0].serviceImages.map(photos => {
            return photos;
        });
        return imageArray;
    };
    const renderServiceImage = () => {
        const logo = queryImg();
        const coverphoto = logo.map(img => {
            return <Image
                source={{ uri: img }}
                style={styles.img}
            />
        })

        return coverphoto
    }
    const renderServiceinfo = () => {
        return <View >
            <View style={styles.titleView}>
                <View style={{ margin: 10, alignItems: 'flex-end' }}>
                    <Text style={styles.titleText}>{data?.title}</Text>
                    <Text style={styles.titleText}>{data?.address}</Text>
                    <Text style={styles.titleText}>5★</Text>
                </View>
                {renderServiceImage()}
            </View>
        </View>;
    }
    const renderRequestInfo = () => {
        return <View style={styles.requestDetailView}>
            <RequestDetail {...data} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </View>
    }
    const renderFoter = () => {
        return (
            <View style={styles.foter}>
                <Pressable onPress={() => onPressRequest()}
                    disabled={selectTime ? false : true}
                    style={[styles.btnview, selectTime ? styles.btnview : styles.btnRequestApproved]}
                >
                    <Text style={styles.btntext}>ارسال طلب</Text>
                </Pressable>
            </View>
        )
    }
    // Event Section
    const renderEvents = () => {
        return (<View style={styles.eventView}>
            <Text style={styles.detailText}>اِضغط على المناسبة التي تنوي ارفاق الطلب لها</Text>
            {IveEvent &&
                <Pressable >
                    {renderEventInfo()}
                </Pressable>
            }
            <Pressable style={styles.eventItem}>
                <Text style={styles.detailText}>اِنشاء مناسبة جديدة</Text>
                <View style={styles.IconView}>
                    <Entypo
                        style={{ alignSelf: 'center' }}
                        name={"plus"}
                        color={colors.puprble}
                        size={30} />
                </View>
            </Pressable>
        </View>
        )
    }
    const getEventLogo = (id) => {
        const logo = eventTypeInfo.filter(item => item.Id === id)
        return logo
    }
    const filtereventInfo = () => {
        const currentDate = moment(date, "YYYY-MM-DD")
        let day = currentDate.format('D')
        let month = currentDate.format('M')
        let year = currentDate.format('YYYY')
        let completeDate = year + '-' + month + '-' + day
        return eventInfo.filter(item => {
            const EDate = item.eventDate
            const CDate = completeDate
            const result = EDate >= CDate
            return result
        })
    }
    const renderEventInfo = () => {
        const eventData = filtereventInfo()
        return eventData.map(item => {
            const document = getEventLogo(item.eventTitleId)
            return (<View style={styles.eventItem}>
                <View>
                    <Text style={styles.detailText}>{item.eventName}</Text>
                </View>
                <View style={styles.IconView}>
                    <Image style={styles.iconImg} source={{ uri: document[0].eventImg }} />
                </View>

            </View>
            )
        })

    }

    return (
        <View style={styles.container}>
            {renderHeader()}

            <ScrollView contentContainerStyle={styles.home}>
                {renderServiceinfo()}
                <View style={styles.DateView}>
                    <Text style={styles.detailText}>تفاصيل الحجز</Text>
                    <ScrollView horizontal={true}>
                        {renderRequestedDates()}
                    </ScrollView>
                </View>
                {renderRequestInfo()}
                {renderEvents()}
                <View style={styles.body}>
                    <Text style={styles.text}>لن يتم تأكيد الحجز حتى يقوم صاحب الخدمة بقبول الطلب خلال 24 ساعة</Text>
                </View>
                {renderFoter()}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
    },
    header: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        marginVertical: 2.5,
        height: 150,
        alignItems: 'center',
        paddingRight: 10
    },
    DateView: {
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: 2.5,
        width: "100%",
        height: 80,
        alignItems: 'flex-end',
    },
    dateItem: {
        width: 120,
        height: 50,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        backgroundColor: colors.BGScereen
    },
    dateItemPressed: {
        width: 120,
        height: 50,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        backgroundColor: colors.puprble
    },
    dateItem1: {
        borderTopLeftRadius: 5,
        //borderTopRightRadius:5,
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        backgroundColor: colors.puprble
    },
    dateTxt: {
        fontSize: 15,
        color: colors.puprble,
        textAlign: 'center'
    },
    dateTxtPressed: {
        fontSize: 15,
        color: colors.BGScereen,
        textAlign: 'center'
    },

    requestDetailView: {
        backgroundColor: colors.puprble,
        marginBottom: 2.5,
        width: '100%',
        paddingRight: 10,
        paddingVertical: 10
    },

    detailText: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 10
    },
    titleText: {
        fontSize: 16,
        color: colors.puprble,

    },
    eventView: {
        backgroundColor: 'white',
        marginVertical: 2.5,
        width: '100%',
        paddingRight: 10,
        paddingVertical: 10
    },
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%",
        marginVertical: 5
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
    iconImg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40
    },


    text: {
        fontSize: 20,
        color: 'black'
    },
    txt: {
        fontSize: 20,
        marginRight: 20,
        color: colors.puprble
    },

    body: {
        backgroundColor: 'white',
        width: '100%',
        marginVertical: 2.5,
        paddingHorizontal: 5
    },

    icon: {
        marginLeft: 10,
    },
    img: {
        width: 150,
        height: 120,
        borderRadius: 15,
        // backgroundColor: 'black',
        justifyContent: 'flex-end'
    },

    foter: {
        alignItems: 'flex-end',
        width: '100%'
    },
    btntext: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: 'white',
    },
    btnview: {
        backgroundColor: colors.puprble,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        margin: 10
    },
    btnRequestApproved: {
        backgroundColor: colors.puprble,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10,
        elevation: 5,
        opacity: 0.3
    },
})

export default ClientRequest;
