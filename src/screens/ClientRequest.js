import React, { useContext, useEffect, useRef, useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, Pressable, ScrollView } from 'react-native';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';
import moment from 'moment';
import { addNewRequest, updateEvent, updateRequest } from '../resources/API';
import { colors } from '../assets/AppColors';
import RequestDetail from '../components/RequestDetail';
import { calculateTotalPrice, showMessage } from '../resources/Functions'
import Recipt from '../components/ProviderComponents/recipt';
import SetEventForRequest from '../components/SetEventForRequest';
import { ScreenNames } from '../../route/ScreenNames';


const ClientRequest = (props) => {
    const { data, isfromClientShowRequest } = props?.route.params
    const { userId } = useContext(UsersContext);
    const {
        requestedDate, setrequestedDate, setRequestInfoAccUser, requestInfoAccUser,
        resDetail,
        eventInfo, setEventInfo,
        eventTypeInfo, totalPrice, setTotalPrice,
        evTiltleId, EVENTID, updatedEventDate, eventTotalCost, fileEventName, setResDetail
    } = useContext(SearchContext);
    const [showDetailRecipt, setShowDetailRecipt] = useState(false)
    const [selectTime, setSelectTime] = useState(true);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState()
    const [pressed, setPressed] = useState([])
    const [IveEvent, setIveEvent] = useState(false);
    const scrollViewRef = useRef();
    const targetComponentRef = useRef();
    let eventItemIndex
    useEffect(() => {
        if (isfromClientShowRequest) {
            const dates = data.reservationDetail.map((res) => res.reservationDate)
            setrequestedDate([...dates])
            setSelectedDate(requestedDate[0])
            setResDetail([...data.reservationDetail])
        }
    }, [])

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const getEventsfromApi = () => {
        if (eventInfo.message == 'No Event') {
            setIveEvent(false)
        } else {
            setIveEvent(true)
        }
    }

    const handleScrollToPosition = () => {
        if (targetComponentRef.current) {
            targetComponentRef.current.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                    // Scroll to the position of the component
                    scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
                }
            );
        }
    };
    const checkAllDetails = () => {
        if (typeof totalPrice !== 'number' || totalPrice <= 0) {
            showMessage("Please choose proper services.");
            return false;
        }

        if (!data || !data._id) {
            showMessage("Invalid service data.");
            return false;
        }

        if (!userId) {
            showMessage("Invalid user ID.");
            return false;
        }

        if (!Array.isArray(resDetail) || resDetail.length === 0) {
            showMessage("Please provide reservation details.");
            return false;
        }

        // Iterate through each reservation detail and perform checks
        for (const detail of resDetail) {
            if (!detail.reservationDate || !detail.startingTime || !detail.EndTime ||
                detail.numOfInviters === null || !Array.isArray(detail.subDetailId) ||
                !Array.isArray(detail.offerId) || (detail.subDetailId.length === 0 &&
                    detail.offerId.length === 0)) {
                showMessage("Please fill all reservation details.");
                return false;
            }
        }

        return true;
    };

    const filterRequestAccService = () => {
        if (requestInfoAccUser.message !== "no Request") {
            const searchReq = requestInfoAccUser.filter(item => {
                return item.serviceData.find(element => {
                    return element.service_id === data.service_id
                })
            })
            return searchReq
        } else {
            return []
        }
    }

    const updateRequestInfoState = (requestBody) => {

        const searchReq = filterRequestAccService()
        //console.log("searchReq", searchReq);

        const RequestsArray = []
        const requestsinfo = []
        const serviceBookingDates = data.dates
        const servicePhotos = data.images
        const serviceCampiagns = data.relatedCamp
        const serviceInfo = {
            service_id: data.service_id,
            userID: data.userID,
            servType: data.servType,
            title: data.title,
            subTitle: data.subTitle,
            desc: data.desc,
            region: data.region,
            address: data.address,
            serviceLocation: data.serviceLocation,
            servicePrice: data.servicePrice,
            workingRegion: data.workingRegion,
            maxCapasity: data.maxCapasity,
            hallType: data.hallType,
            additionalServices: data.additionalServices,
            socialMedia: data.socialMedia,
            eventWorkWith: data.eventWorkWith,
            servicePhone: data.servicePhone,
            serviceEmail: data.serviceEmail,
            clients: data.clients,
            serviceStutes: data.serviceStutes,
            paymentPolicy: data.paymentPolicy,
            maxNumberOFRequest: data.maxNumberOFRequest
        }


        if (searchReq.length > 0) {
            const requestInfo = searchReq[0].requestInfo
            const requestStateIndex = requestInfoAccUser?.findIndex(item => item.serviceData[0].service_id === data.service_id)
            if (requestInfo.length > 0) {
                requestInfo.forEach(element => {
                    requestsinfo.push(element)
                });
            }

            const serRequests = {
                serviceRequest: [requestBody],
                requestPayment: []
            }
            requestsinfo.push(serRequests)

            const req = requestInfoAccUser || [];
            if (requestStateIndex > -1) {
                req[requestStateIndex].requestInfo = requestsinfo;
            }
            //console.log("req", req);
            setRequestInfoAccUser([...req])

        } else {
            // const requestInfo = []
            const serRequests = {
                serviceRequest: [requestBody],
                requestPayment: []
            }
            requestsinfo.push(serRequests)

            const allRequestdata = {
                requestInfo: requestsinfo,
                BookDates: serviceBookingDates,
                serviceCamp: serviceCampiagns,
                serviceData: [serviceInfo],
                serviceImage: servicePhotos,
            }
            if (requestInfoAccUser.length > 0) {
                requestInfoAccUser.forEach(element => {
                    RequestsArray.push(element)
                });
            }
            RequestsArray.push(allRequestdata)
            //console.log("RequestsArray", RequestsArray);
            setRequestInfoAccUser([...RequestsArray])
        }


    }
    const UpdateEventInfo = () => {

        eventItemIndex = eventInfo?.findIndex(item => item.EventId === EVENTID && item.userId === userId)

        console.log(EVENTID, userId);
        const newEventItem = {
            EventId: EVENTID,
            eventName: fileEventName,
            eventCost: eventTotalCost,
            eventDate: updatedEventDate,
            eventTitleId: evTiltleId,
            userId: userId
        }

        //console.log("newEventItem", newEventItem);
        updateEvent(newEventItem).then(res => {

            const ev = eventInfo || [];
            if (eventItemIndex > -1) {
                ev[eventItemIndex] = newEventItem;
            }

            if (res.message === 'Updated Sucessfuly') {
                setEventInfo([...ev])
                showMessage("تم التعديل")
            } else {
                showMessage("لم يتم التعديل")
            }

        }).catch((E) => {
            console.error("error creating request E:", E);
        })

    }
    const onServiceRequest = () => {
        if (!checkAllDetails()) {
            return;
        }
        delete resDetail["campaigns"];

        const requestBody = {
            ReqDate: moment(date).format('YYYY-MM-DD, h:mm a'),
            ReqStatus: 'waiting reply',
            ReqEventId: EVENTID,
            Cost: totalPrice,
            ReqServId: data?.service_id,
            ReqUserId: userId,
            ReqEventTypeId: evTiltleId,
            reservationDetail: resDetail,
            paymentInfo: []
        };

        if (isfromClientShowRequest) {
            console.log("data.requestId", data.RequestId);
            requestBody.RequestId = data.RequestId
            updateRequest(requestBody).then((res) => {
                if (res.message === 'Updated Sucessfuly') {
                    updateRequestInfoState(res?.request);
                    showMessage("Request updated successfully");
                    UpdateEventInfo();
                } else {
                    showMessage("Failed to update request");
                    return;
                }
            }).catch((E) => {
                console.error("Error updating request:", E);
                return;
            });
        } else {
            addNewRequest(requestBody).then((res) => {
                if (res.message === 'Request Created') {
                    updateRequestInfoState(res?.request);
                    showMessage("Request created successfully");
                    UpdateEventInfo();
                } else {
                    showMessage("Failed to create request");
                    return;
                }
            }).catch((E) => {
                console.error("Error creating request:", E);
                return;
            });
        }

        props.navigation.navigate(ScreenNames.ClientEvents);
    };


    useEffect(() => {
        getEventsfromApi()
    }, [])

    useEffect(() => {
        setSelectedDate(requestedDate[0])
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
    const renderFoter = () => {
        var buttonText = isfromClientShowRequest ? "تحديث الطلب" : "ارسال طلب"

        return (
            <View style={styles.foter}>
                <Pressable onPress={() => onServiceRequest()}
                    disabled={selectTime ? false : true}
                    style={[styles.btnview, selectTime ? styles.btnview : styles.btnRequestApproved]}
                >
                    <Text style={styles.btntext}>{buttonText}</Text>
                </Pressable>
            </View>
        )
    }

    // render service logo and title
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
    const renderServiceImage = () => {
        const index = data.images[0].logoArray?.findIndex((val) => val === true)
        const image = data.images[0]?.serviceImages[index]
        return <Image
            source={{ uri: image }}
            style={styles.img}
        />
    }


    // render reservation Dates
    const handleDatePress = (item) => {
        setSelectedDate(item)
    }
    const renderDate = (item, index) => {
        return (
            <Pressable ref={targetComponentRef} onPress={() => handleDatePress(item)} key={index} style={selectedDate === item ? styles.dateItemPressed : styles.dateItem}
            >
                <Text style={selectedDate === item ? styles.dateTxtPressed : styles.dateTxt}>
                    {moment(item).format('dddd')}</Text>
                <Text style={selectedDate === item ? styles.dateTxtPressed : styles.dateTxt}>
                    {moment(item).format('L')}
                </Text>
            </Pressable>
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
                <View style={styles.dateItem1}>
                    <Text style={styles.dateTxtPressed}>{moment(requestedDate).format('dddd')}</Text>
                    <Text style={styles.dateTxtPressed}>{moment(requestedDate).format('L')}</Text>
                </View>
            )
        }
    }

    /// request information and reservation detail
    const renderRequestInfo = () => {
        return <View style={styles.requestDetailView}>
            <RequestDetail {...data} isfromClientShowRequest={isfromClientShowRequest} selectedDate={selectedDate} setSelectedDate={setSelectedDate} handleScrollToPosition={handleScrollToPosition} pressed={pressed} setPressed={setPressed} />
        </View>
    }

    // Call the function to calculate the initial total price

    useEffect(() => {
        calculateTotalPrice(resDetail, requestedDate, data, setTotalPrice);
    }, [requestedDate, resDetail]);

    return (
        <View style={styles.container}>
            {renderHeader()}

            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.home}>
                {renderServiceinfo()}
                <View style={styles.DateView}>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        {renderRequestedDates()}
                    </ScrollView>
                </View>
                {renderRequestInfo()}

                <View style={styles.eventView}>
                    <SetEventForRequest serviceType={data?.servType} isfromClientShowRequest selectedEvent={data.eventData} />
                </View>

                <Recipt
                    totalPrice={totalPrice}
                    requestedDate={requestedDate}
                    resDetail={resDetail}
                    showDetailRecipt={showDetailRecipt}
                    setShowDetailRecipt={setShowDetailRecipt}
                    data={data}
                />
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
        backgroundColor: colors.silver,
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
        marginVertical: 5,
        width: '95%',
        height: 150,
        alignSelf: 'center',
        alignItems: 'center',
        paddingRight: 10,
        borderRadius: 15
    },
    DateView: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        marginBottom: 5,
        width: "95%",
        height: 80,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        //borderWidth: 1
    },

    dateItem: {
        width: 120,
        height: 50,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'lightgray',
        marginRight: 20,
        borderRadius: 5,
    },
    dateItemPressed: {
        width: 120,
        height: 50,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: colors.puprble,
        marginRight: 20,
        borderRadius: 5,
    },
    dateItem1: {
        borderRadius: 5,
        width: 120,
        height: 50,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: colors.silver,
    },
    dateTxt: {
        fontSize: 15,
        color: colors.puprble,
        textAlign: 'center'
    },
    dateTxtPressed: {
        fontSize: 15,
        color: colors.puprble,
        textAlign: 'center'
    },

    requestDetailView: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 5,
    },

    detailText: {
        fontSize: 20,
        color: colors.puprble,
        marginRight: 20
    },
    titleText: {
        fontSize: 16,
        color: colors.puprble,

    },
    eventView: {
        backgroundColor: 'white',
        marginBottom: 5,
        width: '95%',
        paddingRight: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        borderRadius: 15
    },

    myEvents: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "70%",
        height: 60,
        alignSelf: 'center',
        marginVertical: 5,
        backgroundColor: 'lightgray',
        elevation: 5,
        borderRadius: 10
    },

    text: {
        fontSize: 15,
        marginRight: 10,
        color: colors.puprble
    },
    txt: {
        fontSize: 20,
        marginRight: 20,
        color: colors.puprble
    },

    body: {
        backgroundColor: 'white',
        width: '95%',
        height: 100,
        marginBottom: 5,
        paddingHorizontal: 5,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },

    icon: {
        marginLeft: 10,
    },
    img: {
        width: 150,
        height: 120,
        borderRadius: 15,
        justifyContent: 'flex-end'
    },

    foter: {
        alignItems: 'flex-end',
        width: '100%'
    },
    btntext: {
        fontSize: 20,
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
