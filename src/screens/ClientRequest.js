import React, { useContext, useEffect, useRef, useState } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, Alert, Modal, ToastAndroid } from 'react-native';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';
import { ScreenNames } from '../../route/ScreenNames';
import moment from 'moment';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { addNewRequest, createNewEvent, deleteRequestbyId, getEventList, getEventsInfo } from '../resources/API';
import { colors } from '../assets/AppColors';
import RequestDetail from '../components/RequestDetail';
import { SelectList } from 'react-native-dropdown-select-list';
import { v4 as uuidv4 } from 'uuid';
import { showMessage } from '../resources/Functions'



const ClientRequest = (props) => {
    const { data } = props?.route.params
    const { userId } = useContext(UsersContext);
    const {
        requestedDate,
        resDetail,
        setResDetail,
        requestInfo, setRequestInfo,
        eventInfo, setEventInfo,
        eventTypeInfo, setEventTypeInfo } = useContext(SearchContext);


    const [date, setDate] = useState(new Date());
    const [IveEvent, setIveEvent] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDetailRecipt, setShowDetailRecipt] = useState(false)
    const [selectTime, setSelectTime] = useState(true);

    const [fileEventName, setfileEventName] = useState();
    const [requestStatus, setRequestStatus] = useState('')
    const [requestCost, setRequestCost] = useState()
    const [requestDiscount, setRequestDiscount] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [choosenEvents, setChoosenEvents] = useState([])

    const [eventTypeName, setEventTypeName] = useState()
    const [eventName, setEventName] = useState()
    const [eventTypeId, setEventTypeId] = useState()

    const scrollViewRef = useRef();
    const targetComponentRef = useRef();

    const [pressed, setPressed] = useState([])
    const [selectedEvent, setSelectedEvent] = useState('');

    // price calculation states 
    const [totalPrice, setTotalPrice] = useState(0)


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

    const creatNewRequest = () => {
        const newRequestItem = {
            ReqServId: data?.service_id,
            ReqUserId: userId,
            ReqStatus: requestStatus,
            ReqDate: moment(date).format('DD/MM/YYYY, h:mm:ss a'),
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
    const onModalCancelPress = () => {
        setShowModal(false)
    }
    const onModalSavePress = () => {
        if (fileEventName !== undefined) {
            if (eventName !== undefined) {
                getEventTypeID(eventName)
                creatNewEvent()
                ToastAndroid.showWithGravity('تم اٍنشاء مناسبة بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )

            } else {
                Alert.alert(
                    'تنبية',
                    'الرجاء اختيار نوع المناسبة',
                    [
                        {
                            text: 'Ok',
                            // style: 'cancel',
                        },
                    ],
                    { cancelable: false } // Prevent closing the alert by tapping outside
                );
            }
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء اختيار اسم المناسبة',
                [
                    {
                        text: 'Ok',
                        // style: 'cancel',
                    },
                ],
                { cancelable: false } // Prevent closing the alert by tapping outside
            );
        }

    }
    const creatNewEvent = () => {
        const newEventItem = {
            userId: userId,
            eventName: fileEventName,
            eventTitleId: eventTypeId
        }
        createNewEvent(newEventItem).then(res => {
            const evnt = eventInfo || [];
            evnt.push(newEventItem)
            setEventInfo([...evnt])
        })
    }


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
                !Array.isArray(detail.offerId) || detail.subDetailId.length === 0 ||
                detail.offerId.length === 0) {
                showMessage("Please fill all reservation details.");
                return false;
            }
        }

        return true;
    };


    const onServiceRequest = () => {
        if (!checkAllDetails()) {
            return
        }
        const requestBody = {
            ReqDate: moment(date).format('YYYY-MM-DD, h:mm a'),
            ReqStatus: 'waiting reply',
            ReqEventId: selectedEvent,
            Cost: totalPrice,
            ReqServId: data?.service_id,
            ReqUserId: userId,
            reservationDetail: resDetail,
        }


        addNewRequest(requestBody).then((res) => {
            if (res.message && res.message === 'Request Created') {
                showMessage("Request Created successfully")
            } else {
                showMessage("failed to create request")
            }
        }).catch((E) => {
            console.error("error creating request E:", E);
        })
        // setrequestedDate([])
        // props.navigation.navigate(ScreenNames.ClientEvents, { data: { ...data }, isFromAddEventClick: true })
    }

    const onPressHandler = () => {
        props.navigation.goBack();
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

    const getEventsType = () => {
        getEventList({}).then(res => {
            setEventTypeInfo(res)

        })
    }

    const getEventTypeInfo = () => {
        const eventList = []
        eventTypeInfo.forEach(element => {
            eventList.push(element?.eventTitle)
        })
        eventList.sort()
        setEventTypeName(eventList)
    }
    const getEventTypeID = (val) => {
        const eventTypeIndex = eventTypeInfo.findIndex(item => item.eventTitle === val)
        const eventTypeId = eventTypeInfo[eventTypeIndex].Id
        setEventTypeId(eventTypeId)
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

    // render reservation Dates
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
    const handleDatePress = (item) => {
        setSelectedDate(item)
    }
    useEffect(() => {
        setSelectedDate(requestedDate[0])
    }, [])
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

    // render service logo and title
    const renderServiceImage = () => {
        const index = data.images[0].logoArray?.findIndex((val) => val === true)
        const image = data.images[0]?.serviceImages[index]
        return <Image
            source={{ uri: image }}
            style={styles.img}
        />
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
            <RequestDetail {...data} selectedDate={selectedDate} setSelectedDate={setSelectedDate} handleScrollToPosition={handleScrollToPosition} pressed={pressed} setPressed={setPressed} />
        </View>
    }
    const renderFoter = () => {
        return (
            <View style={styles.foter}>
                <Pressable onPress={() => onServiceRequest()}
                    disabled={selectTime ? false : true}
                    style={[styles.btnview, selectTime ? styles.btnview : styles.btnRequestApproved]}
                >
                    <Text style={styles.btntext}>ارسال طلب</Text>
                </Pressable>
            </View>
        )
    }
    const handleEventChoosen = (eventId) => {
        setChoosenEvents(prevEvents => {
            // Check if eventId exists in prevEvents array
            const eventIndex = prevEvents.indexOf(eventId);

            // If eventId is not in prevEvents, add it
            if (eventIndex === -1) {
                return [...prevEvents, eventId];
            } else {
                // If eventId is in prevEvents, remove it
                const updatedEvents = [...prevEvents];
                updatedEvents.splice(eventIndex, 1);
                return updatedEvents;
            }
        });
    }
    // Event Section
    const onPressModalHandler = () => {
        getEventsType()
        setShowModal(true);
        getEventTypeInfo()
    }
    const renderEvents = () => {
        return (<View style={styles.eventView}>
            <Text style={styles.text}>اِختر او قم باٍنشاء مناسبة</Text>
            {IveEvent &&
                renderEventInfo()
            }
            <Pressable style={styles.eventItem} onPress={onPressModalHandler}>
                <Text style={styles.text}>اِنشاء مناسبة جديدة</Text>
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
    const whenEventPress = (eventId) => {
        setSelectedEvent(eventId || '');
    }
    const renderEventInfo = () => {
        const eventData = filtereventInfo()
        return eventData.map((item, index) => {
            const isSelected = selectedEvent === item.EventId;
            return (
                <Pressable key={index} style={styles.eventItem} onPress={() => handleEventChoosen(item.EventId)}>
                    <View >
                        <Text style={styles.text}>{item.eventName}</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Pressable style={styles.selectEvent}
                            onPress={() => whenEventPress(item.EventId)}
                        >
                            {isSelected && (
                                <Entypo
                                    style={{ alignSelf: 'center' }}
                                    name={"check"}
                                    color={colors.puprble}
                                    size={20}
                                />
                            )}
                        </Pressable>
                        {/* <Image style={styles.iconImg} source={{ uri: document[0].eventImg }} /> */}
                    </View>

                </Pressable>
            )
        })

    }
    const setModal = () => {
        return (
            <Modal
                transparent
                visible={showModal}
                animationType='fade'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.Motitle}>
                            <Text style={styles.modaltext}>انشاء مناسبة</Text>
                        </View>
                        <View style={styles.body}>
                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='ادخل اسم المناسبة '
                                onChangeText={setfileEventName}
                            />
                            <View style={{ width: '100%', marginVertical: 20 }}>
                                <SelectList
                                    data={eventTypeName}
                                    setSelected={val => {
                                        setEventName(val);
                                    }}
                                    placeholder={"أختر نوع المناسبة"}
                                    boxStyles={styles.dropdown}
                                    inputStyles={styles.droptext}
                                    dropdownTextStyles={styles.dropstyle}
                                />
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <Pressable onPress={() => onModalCancelPress()} >
                                <Text style={styles.modaltext}>الغاء الامر</Text>
                            </Pressable>
                            <Pressable onPress={() => onModalSavePress()} >
                                <Text style={styles.modaltext}>حفظ</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }

    // pricing 

    const calculateTotalPrice = () => {
        let total = 0;

        // Check if requestedDate is an array
        if (Array.isArray(requestedDate)) {
            requestedDate.forEach((date) => {
                // For each date in the array, calculate the total price
                const detailIndex = resDetail.findIndex((item) => item.reservationDate === date);
                if (detailIndex !== -1) {
                    const { subDetailId, numOfInviters } = resDetail[detailIndex];
                    const filteredSubDetails = filterSubDetails(subDetailId);
                    let dateTotal = 0; // Initialize total price for this date
                    filteredSubDetails.forEach((subDetail) => {
                        const additionType = subDetail.additionType ? subDetail.additionType : subDetail?.isPerPerson ? 'perPerson' : 'perRequest';
                        const numberPerTable = subDetail.numberPerTable
                        subDetail.subDetailArray.forEach((detail) => {
                            const price = parseInt(detail.detailSubtitleCost) * ((additionType === "perPerson" ? numOfInviters || 0 : additionType === "perRequest" ? 1 : Math.ceil(numOfInviters / numberPerTable)));
                            dateTotal += price; // Add price to total for this date
                        });
                    });
                    // Update reservation object with price for this date
                    resDetail[detailIndex].datePrice = dateTotal;
                    total += dateTotal; // Add date total to overall total
                }
            });
        } else {
            // If requestedDate is a string, calculate the total price for that single date
            if (resDetail.length > 0) {
                const { subDetailId, numOfInviters } = resDetail[0];
                const filteredSubDetails = filterSubDetails(subDetailId);
                let dateTotal = 0; // Initialize total price for this date
                filteredSubDetails.forEach((subDetail) => {
                    const additionType = subDetail.additionType ? subDetail.additionType : subDetail?.isPerPerson ? 'perPerson' : 'perRequest';
                    const numberPerTable = subDetail.numberPerTable
                    subDetail.subDetailArray.forEach((detail) => {
                        const price = parseInt(detail.detailSubtitleCost) * ((additionType === "perPerson" ? numOfInviters || 0 : additionType === "perRequest" ? 1 : Math.ceil(numOfInviters / numberPerTable)));
                        dateTotal += price; // Add price to total for this date
                    });
                });
                // Update reservation object with price for this date
                resDetail[0].datePrice = dateTotal;
                total += dateTotal; // Add date total to overall total
            }
        }

        // Update the totalPrice state
        setTotalPrice(total);
    };


    // Call the function to calculate the initial total price
    useEffect(() => {
        calculateTotalPrice();
    }, [requestedDate, resDetail]);

    const showDetaiPress = () => {
        setShowDetailRecipt(!showDetailRecipt)
    }
    const renderFinalPrice = () => {
        return (
            <View style={styles.reciptDetail}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Pressable onPress={showDetaiPress} >
                        <Image style={styles.iconImg} source={require('../assets/photos/invoice.png')} />
                    </Pressable>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={styles.text}>السعر النهائي   {totalPrice} ₪</Text>
                        <View style={styles.IconView}>
                            <Entypo
                                style={{ alignSelf: 'center' }}
                                name={"price-tag"}
                                color={colors.puprble}
                                size={30} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const createRecipt = () => {
        return (
            <View style={styles.reciptView}>
                {renderFinalPrice()}
                {Array.isArray(requestedDate) ? requestedDate.map((date, index) => renderFullReciptDate(date, index)) : renderFullReciptDate(requestedDate)}
            </View >

        )
    }

    const filterSubDetails = (subDetailId) => {
        return data.additionalServices.map(service => {
            // Filter sub details based on whether their id exists in subDetailId array
            const filteredSubDetailArray = service.subDetailArray.filter(subDetail =>
                subDetailId.includes(subDetail.id)
            );

            // Return the service object with modified subDetailArray
            return {
                ...service,
                subDetailArray: filteredSubDetailArray
            };
        });
    };
    const renderFullReciptDate = (date, index = 0) => {
        // common states

        const [showSupDetRecipt, setShowSupDetRecipt] = useState(false)
        if (!showDetailRecipt) {
            return null
        }

        // sub details 
        var detailIndex = resDetail.findIndex(item => item.reservationDate === date)

        if (Array.isArray(requestedDate)) {
            if (detailIndex === -1) {
                return
            }
        } else {
            detailIndex = 0
        }
        const { subDetailId, numOfInviters } = resDetail[detailIndex]
        const filteredSubDetials = filterSubDetails(subDetailId)
        const showList = filteredSubDetials.some(item => item.subDetailArray && item.subDetailArray.length > 0);
        const campaigns = resDetail[detailIndex].campaigns || [];
        const showCamp = campaigns && campaigns.length > 0 ? true : false
        // details 
        const details = {
            setShowSupDetRecipt: setShowSupDetRecipt,
            showSupDetRecipt: showSupDetRecipt,
            filteredSubDetials: showList ? filteredSubDetials : false,
            numOfInviters: numOfInviters,
        }

        console.log(" campaigns ", campaigns);
        return (
            // showDetailRes
            <View key={index}>
                {/* shows the date */}
                {!(showList === false && showCamp === false) && renderReciptDate(date)}
                {/* shows the services choosen */}
                <View style={styles.reciptDetail}>
                    {showList && renderReciptServices()}
                    {renderMainReciptDetails(details)}
                </View>
                {/* shows the deals choosen */}
                {showCamp && renderDeals(campaigns, numOfInviters)}
            </View>
        )
    }
    const renderSubDetRecipt = (subArray) => {
        return (
            <View style={styles.reciptLabel}>
                {subDetReciptHeader()}
                { }
                {subArray.map((detail, index) => {
                    return (
                        renderSubDetailSingleService(detail.detailSubtitleCost, detail.detailSubtitle, index)
                    )
                })}
            </View>
        )
    }
    const subDetReciptHeader = () => {
        return (
            <View style={styles.reciptSupDet}>
                <View style={{ alignItems: 'center', width: '50%' }}><Text>السعر</Text></View>
                <View style={{ alignItems: 'center', width: '50%' }}><Text >التفاصيل</Text></View>
            </View>
        )
    }
    const renderSubDetailSingleService = (price = 0, title = 'random', index) => {
        return (
            <View key={index} style={styles.reciptSupDet}>
                {subDetailReciptPrice(price)}
                {subDetailTitle(title)}
            </View>
        )
    }
    const subDetailReciptPrice = (price) => {
        return (
            <View style={{ alignItems: 'center', width: '50%' }}>
                <Text style={styles.text}>{price}</Text>
            </View>
        )
    }
    const subDetailTitle = (title) => {
        return (
            <View style={{ alignItems: 'center', width: '50%' }}>
                <Text style={styles.text}>{title}</Text>
            </View>
        )
    }
    const renderReciptServices = () => {
        return (
            <View style={styles.reciptLabel}>
                <Text style={styles.text}>الخدمات</Text>
            </View>
        )
    }
    const renderMainReciptDetails = (details) => {
        return (
            details.filteredSubDetials ?
                details.filteredSubDetials.map((subDetail, index) => renderSingleReciptService(subDetail, index, details))
                :
                null
        )
    }
    const renderSingleReciptService = (subDetail, index, details) => {
        const additionType = subDetail.additionType ? subDetail.additionType : subDetail?.isPerPerson ? 'perPerson' : 'perRequest';
        let price = 0;
        subDetail.subDetailArray.forEach((detail) => price += parseInt(detail.detailSubtitleCost));
        return (
            <>
                <View key={index} style={styles.reciptDetailItem}>
                    {renderFinalReciptPrice(price * (additionType === "perPerson" ? details.numOfInviters || 0 : additionType === "perRequest" ? 1 : Math.ceil(details.numOfInviters / subDetail.numberPerTable)))}
                    {renderReciptComponent(additionType, price, details.numOfInviters || 0, subDetail.numberPerTable)}
                    <Pressable onPress={() => details.setShowSupDetRecipt(!details.showSupDetRecipt)} style={styles.reciptClom}>
                        <Text style={styles.text}>{subDetail?.detailTitle || ''}</Text>
                    </Pressable>

                </View>
                {details.showSupDetRecipt && renderSubDetRecipt(subDetail.subDetailArray)}
            </>
        );
    };

    const renderReciptDate = (date) => {
        return (
            <View style={styles.reciptDateLabel}>
                <Text style={styles.text}>{moment(date).format('L')}</Text>
            </View>
        )
    }
    const renderPerPerson = (price = 0, invited = 0) => {
        return (
            <View style={styles.reciptMidClom}>
                <Text>السعر للشخص الواحد</Text>
                <Text style={styles.text}>{`₪ ${price}  X  ${invited || 0}`}</Text>
            </View>
        )
    }
    const renderPerTable = (price = 0, invited = 0, perTable = 1) => {
        if (perTable == 0) {
            perTable = 1;
        }
        const tables = Math.ceil((invited / perTable))
        return (
            <View style={styles.reciptMidClom}>
                <Text>السعر للطاولة الواحدة</Text>
                <Text style={styles.text}>{`₪ ${price}  X  ${(tables)}`}</Text>
            </View>
        )
    }
    const renderRequest = (price = 0) => {
        return (
            <View style={styles.reciptMidClom}>
                <Text>السعر للحجز</Text>
                <Text style={styles.text}>{`₪ ${price}  X  ${1}`}</Text>
            </View>
        )
    }

    /**
    * Renders the appropriate receipt component based on the addition type.
    * 
    * @param additionType - The type of addition ('perPerson', 'perTable', 'perRequest').
    * @param price - The price of the component.
    * @param invited - The number of invited persons (optional).
    * @param perTable - The number of persons per table (optional).
    * @returns The rendered component.
    */
    const renderReciptComponent = (additionType, price, invited, perTable) => {
        switch (additionType) {
            case 'perPerson':
                return renderPerPerson(price, invited);
            case 'perTable':
                return renderPerTable(price, invited, perTable);
            case 'perRequest':
                return renderRequest(price);
            default:
                return null;
        }
    };

    const renderDeals = (campaigns, numOfInviters) => {
        return (
            <View style={styles.reciptDetail}>
                {renderDealsHeader()}
                {campaigns.map((camp, index) => renderSingleDealRecipt({ ...camp, numOfInviters }, index))}
            </View>
        )
    }
    const renderSingleDealRecipt = (camp, index) => {
        console.log("camp ", camp);
        return (
            <View key={index} style={styles.reciptDetailItem}>
                {renderFinalReciptPrice(camp?.campCost * (camp?.priceInclude === "perPerson" ? camp?.numOfInviters || 0 : camp?.priceInclude === "perRequest" ? 1 : Math.ceil(camp?.numOfInviters / camp?.numberPerTable)))}
                {renderReciptComponent(camp?.priceInclude, camp?.campCost, camp?.numOfInviters)}
                {renderDealTitle(camp?.campTitle)}
            </View>
        )
    }
    const renderDealTitle = (title) => {
        return (
            <Pressable style={styles.reciptClom}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        )
    }
    const renderDealsHeader = () => {
        return (
            <View style={styles.reciptLabel}>
                <Text style={styles.text}>العروض</Text>
            </View>
        )
    }

    const renderFinalReciptPrice = (price) => {
        return (
            <View style={styles.reciptClom}>
                <Text>السعر النهائي</Text>
                <Text style={styles.text}>{price || 0}</Text>
            </View>
        )
    }
    const renderPrice = () => {
        return (
            <View style={styles.priceView}>
                {createRecipt()}
            </View>
        )
    }

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
                {renderEvents()}

                {renderPrice()}
                <View style={styles.body}>
                    <Text style={styles.text}>لن يتم تأكيد الحجز حتى يقوم صاحب الخدمة بقبول الطلب خلال 24 ساعة</Text>
                </View>
                {renderFoter()}
            </ScrollView>
            {setModal()}
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
        //justifyContent: 'center',
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
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: "100%",
        marginVertical: 5,
    },
    selectEvent: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: 'white'
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

    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 10
    },
    iconImg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30
    },

    modaltext: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
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
    detailModal: {
        width: '90%',
        height: 450,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Motitle: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    // body: {
    //     width: '90%',
    //     alignSelf: 'center',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    input: {
        textAlign: 'center',
        height: 50,
        width: '100%',
        borderWidth: 0.6,
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 15,
        color: 'black',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        bottom: 0
    },
    dropdown: {
        height: 50,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'right',
        borderWidth: 0.6
    },
    dropstyle: {
        color: 'black',
        fontSize: 18,
    },
    droptext: {
        fontSize: 18,
        color: 'black',
    },
    // priceLabel: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    //     marginVertical: 10
    //     //borderWidth: 1

    // },
    priceView: {
        width: '95%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 5,
        borderRadius: 15,
    },

    reciptView: {
        width: '100%',
        marginVertical: 10,
        alignSelf: 'center',
        // borderWidth: 1
    },
    reciptDetail: {
        width: '100%',
        alignSelf: 'flex-end',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    reciptDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    reciptClom: {
        alignItems: 'center',
        width: '30%'
    },
    reciptMidClom: {
        alignItems: 'center',
        width: '40%'
    },
    reciptSupDet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    reciptLabel: {
        width: '90%',
        backgroundColor: colors.silver,
        alignSelf: 'center',
        borderRadius: 10
    },
    reciptDateLabel: {
        width: '90%',
        backgroundColor: colors.silver,
        alignSelf: 'center',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ClientRequest;
