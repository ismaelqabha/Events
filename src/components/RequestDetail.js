import { View, StyleSheet, Text, Image, Pressable, ScrollView, TextInput, TouchableOpacity, Dimensions, Modal } from 'react-native';
import React, { useState, useContext, useEffect, useRef } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RequestDetail = (props) => {
    const { additionalServices, maxCapasity, servicePrice } = props
    const { selectedDate, setSelectedDate, relatedCamp,
        handleScrollToPosition, pressed, setPressed } = props
    const { cat, setResDetail, resDetail, requestedDate, campiegnsAccordingServiceId } = useContext(SearchContext);

    const resivedDate = Array.isArray(requestedDate) ? requestedDate.map((date) => {
        return date
    }) : [requestedDate]


    const [invitersValueError, setInvitersValueError] = useState(false);
    const [selectedSupDet, setSelectedSupDet] = useState([]);
    const [detailViewPressed, setDetailViewPressed] = useState(false);
    const [campaignViewPressed, setCampaignViewPressed] = useState(false);
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);


    const [selectTime, setSelectTime] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [startTimeText, setstartTimeText] = useState()
    const [endTimeText, setendTimeText] = useState()
    const [invitersValue, setInvitersValue] = useState('');
    const [offer, setOffer] = useState();

    const [similarity, setSimilarity] = useState(false);
    const [multiSelected, setMultiSelected] = useState(false)

    const [isCampaign, setIsCampaign] = useState(true)

    useEffect(() => {
        setIsCampaign(relatedCamp && relatedCamp.length > 0);
        if (props?.isfromClientShowRequest) {
            setSelectedDate(requestedDate?.[0])
        }
    }, []);

    useEffect(() => {
        const reservation = resDetail.find((detail) => detail.reservationDate === selectedDate);
        if (reservation) {
            const subDetailId = reservation.subDetailId || [];
            const campaigns = reservation.campaigns || [];

            const similarity = campaigns.some(campaign => {
                const contentFromSubDet = campaign.contentFromSubDet || [];
                return contentFromSubDet.some(id => subDetailId.includes(id));
            });

            setSimilarity(similarity);

            const moreThanOneCampaign = campaigns.length > 1;
            setMultiSelected(moreThanOneCampaign);
        }
    }, [resDetail, selectedDate]);

    ///// descripe the creation of set of colors related ->
    const [bgColorDate, setColorDate] = useState('white');
    const mainColor = 'EBE4F7'; // Main color theme
    const [colors, setColors] = useState([]);

    useEffect(() => {
        createColors();
    }, [requestedDate]); // Recreate colors array when requestedDate changes

    useEffect(() => {
        if (typeof requestedDate === 'string') {
            setColorDate(colors[0]);
        } else {
            const index = requestedDate.findIndex((date) => date === selectedDate);
            if (index !== -1) {
                setColorDate(colors[index]);
            }
        }
    }, [selectedDate, colors]); // Update bgColorDate when selectedDate or colors change

    const createColors = () => {
        let generatedColors = [];
        if (Array.isArray(requestedDate)) {
            generatedColors = requestedDate.map(date => generateRandomColor());
        } else {
            generatedColors = [generateRandomColor()];
        }
        setColors(generatedColors);
    }
    const generateRandomColor = () => {
        // Generate random values to add/subtract to each RGB component
        const randomDelta = 5; // Adjust this value as needed
        const mainColorRGB = hexToRgb(mainColor);
        const randomR = Math.floor(Math.random() * randomDelta * 2) - randomDelta;
        const randomG = Math.floor(Math.random() * randomDelta * 2) - randomDelta;
        const randomB = Math.floor(Math.random() * randomDelta * 2) - randomDelta;

        // Calculate the new RGB values
        const newR = clamp(mainColorRGB.r + randomR, 0, 255);
        const newG = clamp(mainColorRGB.g + randomG, 0, 255);
        const newB = clamp(mainColorRGB.b + randomB, 0, 255);

        // Convert the new RGB values back to hex format
        return rgbToHex(newR, newG, newB);
    }
    const hexToRgb = (hex) => {
        // Remove '#' if present
        hex = hex.replace(/^#/, '');

        // Parse the hex string into its RGB components
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return { r, g, b };
    }
    const rgbToHex = (r, g, b) => {
        // Convert RGB components to hex format
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    const clamp = (value, min, max) => {
        // Ensure a value stays within a specified range
        return Math.min(Math.max(value, min), max);
    }
    // end of colors related 

    useEffect(() => {
        try {
            if (!offer) {
                return
            }
            let result1 = offer.map(id => relatedCamp?.find((camp) => camp.CampId === id));
            updateReservationDet(result1, 'campaigns')
        } catch (error) {
            console.log("error ", error);
        }

    }, [offer])

    const scrollViewRef = useRef(null);
    const firstPageRef = useRef(null);
    const secondPageRef = useRef(null);

    const handlePressFirstPage = () => {
        if (scrollViewRef.current && firstPageRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        }
    };

    const handlePressSecondPage = () => {
        if (scrollViewRef.current && secondPageRef.current) {
            scrollViewRef.current.scrollTo({
                x: Dimensions.get('screen').width,
                y: 0,
                animated: true
            });
        }
    };



    const checkStrings = val => {
        if (!val) {
            return false;
        } else if (val.trim().length <= 0) {
            return false;
        }
        return true;
    };

    const missingData = () => {
        checkStrings(invitersValue) ? showMissingInviters() : null;
    };

    useEffect(() => {
        setInvitersValueError(!checkStrings(invitersValue));

    }, [invitersValue]);


    useEffect(() => {
        if (Array.isArray(resDetail)) {
            const reservation = resDetail.find((detail) => detail.reservationDate === selectedDate);
            if (reservation) {
                setstartTimeText(reservation.startingTime)
                setendTimeText(reservation.EndTime)
                setInvitersValue(reservation.numOfInviters)
                setOffer(reservation.offerId)
                setSelectedSupDet(reservation.subDetailId)
            }
        } else {
            const reservation = resDetail;
            if (reservation) {
                setstartTimeText(reservation.startingTime)
                setendTimeText(reservation.EndTime)
                setInvitersValue(reservation.numOfInviters)
                setOffer(reservation.offerId)
                setSelectedSupDet(reservation.subDetailId)
            }
        }
    }, [selectedDate]);

    useEffect(() => {
        newReservationDetail()
    }, [])

    const showMissingInviters = () => { };



    const newReservationDetail = () => {
        // Create a set of unique reservation dates from resDetail
        const existingDatesSet = new Set(resDetail.map(detail => detail.reservationDate));

        // Filter resivedDate array to remove dates already existing in resDetail
        const newDates = Array.isArray(resivedDate) ? resivedDate.filter(date => !existingDatesSet.has(date))
            : resivedDate

        // Remove any reservation detail from resDetail that doesn't exist in resivedDate
        const updatedResDetail = resDetail.filter(detail => resivedDate.includes(detail.reservationDate));

        // Add new reservation details for the remaining dates in newDates
        const newReservationDetails = Array.isArray(newDates) ? newDates.map(date => ({
            reservationDate: date,
            startingTime: null,
            EndTime: null,
            numOfInviters: null,
            subDetailId: [],
            offerId: []
        })) :
            {
                reservationDate: newDates,
                startingTime: null,
                EndTime: null,
                numOfInviters: null,
                subDetailId: [],
                offerId: []
            }

        // Update resDetail with the updated reservation details
        setResDetail([...updatedResDetail, ...newReservationDetails]);
    };

    /**
     * Update function.
     * @param {'startingTime' | 'endTime' | 'invited' | 'subDetail' | 'offerId' | 'campaigns'} type - The type of update.
     */
    const updateReservationDet = (val, type) => {
        var detailIndex = resDetail.findIndex(item => item.reservationDate === selectedDate)
        if (Array.isArray(requestedDate)) {
            if (detailIndex === -1) {
                console.log("no res found ");
                return
            }
        } else {
            detailIndex = 0
        }
        const detail = resDetail
        switch (type) {
            case 'startingTime':
                detail[detailIndex].startingTime = val
                setResDetail([...detail])
                break;
            case 'endTime':
                detail[detailIndex].EndTime = val
                setResDetail([...detail])
                break;
            case 'invited':
                detail[detailIndex].numOfInviters = val
                setResDetail([...detail])
                break;
            case 'subDetail':
                const subDetails = detail[detailIndex].subDetailId;
                const index = subDetails.findIndex((id) => id === val);
                if (index === -1) {
                    detail[detailIndex].subDetailId.push(val);
                } else {
                    detail[detailIndex].subDetailId = subDetails.slice(0, index).concat(subDetails.slice(index + 1));
                }
                setSelectedSupDet(detail[detailIndex].subDetailId)
                setResDetail([...detail]);
                break;
            case 'offerId':
                const offerIdArray = detail[detailIndex].offerId || []; // Ensure offerId is initialized as an array
                const idx = offerIdArray.indexOf(val); // Check if val exists in the offerId array
                let newOF
                if (idx === -1) {
                    // If val doesn't exist, add it to the array
                    newOF = [...offerIdArray, val];
                } else {
                    // If val exists, remove it from the array
                    newOF = offerIdArray.filter(item => item !== val);
                }
                detail[detailIndex].offerId = newOF;
                setOffer(newOF)
                setResDetail([...detail]);
                break;
            case 'campaigns':
                detail[detailIndex].campaigns = val
                setResDetail([...detail])
                break;

            default:
                break;
        }
    }

    const detailPress = () => {
        setDetailViewPressed(true)
        setCampaignViewPressed(false)
        setShowModal(true)
    }
    const campaignPress = () => {
        setDetailViewPressed(false)
        setCampaignViewPressed(true)
    }
    const handleClosePress = () => {
        setDetailViewPressed(false)
        setCampaignViewPressed(false)
        setShowModal(false)
    }
    const onInvitersInputChange = (val) => {
        // Ensure the value is not empty
        if (val === '') {
            setInvitersValue('');
            updateReservationDet('', 'invited'); // Clear the value in reservation detail
        } else {
            // Parse the value as an integer and apply limits
            let intValue = parseInt(val);
            if (isNaN(intValue)) {
                // If the value is not a number, do not update the state and reservation detail
                return;
            } else {
                intValue = Math.min(intValue, maxCapasity || 0);
                // Update the state with the sanitized value
                setInvitersValue(intValue.toString());
                // Update reservation detail with the sanitized value
                updateReservationDet(intValue.toString(), 'invited');
            }
        }
    };



    //// set start and end time
    const checkStartTime = () => {
        showStartMode('time')
        if (startTimeText != "00:00") {
            //setSelectTime(true)
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء اختيار وقت بداية الحجز',
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
    const checkEndTime = () => {
        showEndMode('time')
        if (endTimeText != "00:00") {
            //setSelectTime(true)
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء اختيار وقت بداية الحجز',
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
    const renderReservStartingTime = () => {
        return <View>
            <Pressable onPress={() => checkStartTime()}
            >
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{startTimeText || "00:00"}</Text>
                    <Image
                        style={styles.icoon}
                        source={require('../assets/photos/time.png')}
                    />
                </View>
            </Pressable>
            {showStart && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='clock'
                    onChange={onStartTimeChange}
                />
            )}
        </View>
    }
    const renderReservEndingTime = () => {
        return <View>
            <Pressable onPress={() => checkEndTime()}
            >
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{endTimeText || "00:00"}</Text>
                    <Image
                        style={styles.icoon}
                        source={require('../assets/photos/time.png')}
                    />
                </View>
            </Pressable>
            {showEnd && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='clock'
                    onChange={onEndTimeChange}
                />
            )}
        </View>
    }
    const showStartMode = (currentMode) => {
        setShowStart(true);
        setMode(currentMode);
    }
    const showEndMode = (currentMode) => {
        setShowEnd(true);
        setMode(currentMode);
    }
    const onStartTimeChange = (event, selectedDate) => {
        setShowStart(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let startTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        // if (startTime < endTimeText && endTimeText != '00:00') {
        updateReservationDet(startTime, 'startingTime')
        setstartTimeText(startTime);
        // } else {
        //     console.log("Not valid time");
        // }

    }
    const onEndTimeChange = (event, selectedDate) => {
        setShowEnd(false)
        const currentDate = selectedDate || date1;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let endTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        if (endTime > startTimeText) {
            setendTimeText(endTime);
            updateReservationDet(endTime, 'endTime')
        } else {
            console.log("Not valid time");
        }
    }


    const CatOfService = {
        'قاعات': [{
            style: styles.input,
            placeholder: 'ادخل عدد المدعوين',
        }],
        'تصوير': [{
            style: styles.input,
            placeholder: 'ادخل عدد الكاميرات',
        }],
        'Makeup': [{
            style: styles.input,
            placeholder: 'ادخل عدد الايام',
        }],
        'شيف': [{
            style: styles.input,
            placeholder: 'ادخل عدد الايام',
        }],
        'تصفيف شعر': [{
            style: styles.input,
            placeholder: 'ادخل عدد الايام',
        }],
        'حلويات': [{
            style: styles.input,
            placeholder: 'ادخل الكمية',
        }]
    }
    const renderInput = () => {
        return CatOfService[cat].map(type => {
            return (<TextInput
                style={styles.input}
                {...type}
                value={invitersValue}
                keyboardType='numeric'
                onChangeText={onInvitersInputChange}
            />)
        })
    }
    const renderInviters = () => {
        return (
            <View style={styles.invitView}>
                {invitersValueError && (
                    <Text style={styles.textRequired}>*</Text>
                )}
                {renderInput()}
            </View>
        )
    }



    //// show service detail and sub detail
    const whenSupDetailPress = (SubId) => {
        if (!SubId) {
            return
        }
        updateReservationDet(SubId, 'subDetail')
    }
    const renderServiceDetail = () => {
        const detail = props.additionalServices
        return detail.map(element => {
            return (<View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailText}>{element.detailTitle}</Text>
                </View>
                {element.subDetailArray.map(item => {
                    // console.log("item.id", item.id);
                    const found = selectedSupDet?.find((det) => det === item.id)
                    return (
                        <View style={styles.subDetail}>
                            <Text style={styles.subDetText}>{item.detailSubtitle}</Text>
                            <Pressable style={styles.subPressable} onPress={() => whenSupDetailPress(item.id)}>
                                {found && <Entypo
                                    style={{ alignSelf: 'center', position: 'absolute' }}
                                    name={"check"}
                                    color={colors.puprble}
                                    size={25} />}
                            </Pressable>
                        </View>
                    )
                })
                }
            </View>
            )
        })
    }
    const renderReservationDet = () => {

        const [pressed, setPressed] = useState(0)
        const handleScroll = (event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const screenWidth = Dimensions.get('screen').width;
            const pageIndex = Math.round(contentOffsetX / screenWidth);
            if (pageIndex !== pressed) {
                setPressed(pageIndex);
            }
        };
        return (
            <View style={{ backgroundColor: bgColorDate }}>
                <Text style={styles.text}>قم بتحديد تفاصيل الحجز اِما من الخدمات او العروض</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
                    <Pressable style={pressed === 0 ? styles.detailLabelPressed : styles.detailLabel} onPress={() => {
                        handlePressFirstPage()
                        setPressed(0)
                    }}>
                        <Text style={styles.detailViewText}>الخدمات</Text>
                    </Pressable>
                    {isCampaign && <Pressable style={pressed === 1 ? styles.detailLabelPressed : styles.detailLabel} onPress={() => {
                        handlePressSecondPage()
                        setPressed(1)
                    }}>
                        <Text style={styles.detailViewText}>العروض</Text>
                    </Pressable>}
                </View>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal={true}
                    pagingEnabled
                    nestedScrollEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={'fast'}
                    snapToInterval={Dimensions.get('screen').width}
                    snapToAlignment={'start'}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <View ref={firstPageRef} style={{ width: Dimensions.get('screen').width }} >
                        <View style={styles.serviceDetBooking}>
                            {renderServiceDetail()}
                        </View>
                    </View>
                    {isCampaign && <View ref={secondPageRef} style={{ width: Dimensions.get('screen').width }}>
                        <View style={[styles.serviceOfferBooking]}>
                            {pressed === 1 && renderCampaighn()}
                            {multiSelected && renderCheckSelectedOffer()}
                        </View>
                    </View>}
                </ScrollView>
            </View>

        )
    }
    const getServiceDetail = (id) => {

        const serviceData = additionalServices.filter(element => {
            return element.subDetailArray.find(itemId => {
                return itemId.id === id
            })
        })
        return serviceData
    }
    const getSerSubDet = (id) => {
        const data = getServiceDetail(id)
        const subDetInfo = data[0].subDetailArray.filter(item => {
            return item.id === id
        })
        return subDetInfo
    }

    ///// descripe the the service campighns

    const onCampPress = (campId) => {
        updateReservationDet(campId, 'offerId');

    }
    const renderCampaighnHeader = (camp, index) => {
        var found = offer?.find((det) => det === camp?.CampId)
        return (
            <Pressable onPress={() => onCampPress(camp?.CampId || index)} style={!found ? styles.offerTitle : styles.offerTitleSelected}>
                <Text style={styles.campText}>{camp.campTitle}</Text>
                {camp.priceInclude == 'حسب الشخص' ?
                    <Text style={styles.campText}>{camp.campCost + '₪  للشخص الواحد '}</Text> :
                    <Text style={styles.campText}>{camp.campCost + '₪  لكل طاولة '}</Text>}
            </Pressable>
        );
    }
    const renderCampaighnSubHeader = () => {
        return (
            <View style={styles.offerContentView}>
                <Text style={styles.campText}>محتويات العرض</Text>
                <View style={styles.IconView}>
                    <MaterialCommunityIcons
                        style={{ alignSelf: 'center' }}
                        name={"table-of-contents"}
                        color={colors.puprble}
                        size={30} />
                </View>
            </View>
        )
    }
    const renderCampaighnContentFromSub = (camp) => {
        return (
            camp.contentFromSubDet.map(itemID => {
                const titleInfo = getSerSubDet(itemID)
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5 }}>
                        <Text style={styles.subDetText}>{titleInfo[0].detailSubtitle}</Text>
                        <Feather
                            style={{ alignSelf: 'center' }}
                            name={"corner-down-left"}
                            color={colors.puprble}
                            size={30} />
                    </View>
                )
            })

        )
    }
    const renderCampaighnContent = (camp) => {
        return (
            camp.campContents.map(elment => {
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5 }}>
                        <Text style={styles.subDetText}>{elment.contentItem}</Text>
                        <Feather
                            style={{ alignSelf: 'center' }}
                            name={"corner-down-left"}
                            color={colors.puprble}
                            size={30} />
                    </View>
                )
            })
        )
    }
    const renderCampaighn = () => {
        const CampData = relatedCamp || [];

        const campArray = CampData?.map((camp, index) => {

            return <View key={index} style={styles.campaignView}>
                {renderCampaighnHeader(camp, index)}
                {renderCampaighnSubHeader()}

                {renderCampaighnContentFromSub(camp)}
                {renderCampaighnContent(camp)}

            </View >
        });
        return campArray;

    }

    // this function will be show when there are some similer offers detail 
    const renderCheckSelectedOffer = () => {
        return (
            <View style={styles.checkDataView}>
                <Text style={styles.text}>تنبية !! لقد تم اختيار عروض تحتوي على تفاصيل متشابة</Text>
            </View>
        )
    }


    const renderModal = () => {
        return (
            <Modal
                transparent
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        {renderServiceDetail()}
                    </View>
                </View>
            </Modal>
        )
    }
    const renderDetail = () => {
        return (
            <View style={[styles.detailView, detailViewPressed ? styles.detailView : styles.pressDetailView]}>
                <TouchableOpacity onPress={detailPress}>
                    <Text style={styles.detailViewText}>تحديد التفاصيل</Text>
                </TouchableOpacity>
                {/* {detailViewPressed && */}
                <View style={{ flex: 1 }}>
                    {/* <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <ScrollView>
                                <DetailComp service_id={data.service_id} />
                            </ScrollView>
                        </View> */}
                    <TouchableOpacity onPress={handleClosePress} style={styles.closeView}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>اغلاق</Text>
                    </TouchableOpacity>
                </View>
                {/* } */}
            </View>
        )
    }

    const handlePreviousDate = () => {
        const currentIndex = resivedDate.findIndex(date => date === selectedDate);
        if (currentIndex !== -1) {
            const previousIndex = (currentIndex === 0) ? resivedDate.length - 1 : currentIndex - 1;
            setSelectedDate(resivedDate[previousIndex]);
        }
        handleScrollToPosition()
    };

    const handleNextDate = () => {
        const currentIndex = resivedDate.findIndex(date => date === selectedDate);
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % resivedDate.length;
            setSelectedDate(resivedDate[nextIndex]);
        }
        handleScrollToPosition()
    };

    /// show the next and back button
    const renderNextBack = () => {
        return (
            <View style={styles.nextBackView}>
                <Pressable style={styles.backView} onPress={() => handlePreviousDate()}>
                    <Text style={styles.nextBackText}>رجوع</Text>
                </Pressable>
                <Pressable style={styles.nextView} onPress={() => handleNextDate()}>
                    <Text style={styles.nextBackText} >التالي</Text>
                </Pressable>
            </View>
        )
    }
    const renderSaveButton = () => {
        return (
            <View style={styles.SaveView}>
                <Pressable style={styles.nextView} onPress={() => newReservationDetail()}>
                    <Text style={styles.nextBackText}>حفظ</Text>
                </Pressable>
            </View>
        )
    }
    const chooseButton = () => {
        if (Array.isArray(requestedDate) && requestedDate.length > 1) {
            { return renderNextBack() }
        } else {
            { renderSaveButton() }
        }
    }

    // this function will be show when there are some similer detail between services detail and service offer 
    const renderCheckSelectedResDetail = () => {
        return (
            <View style={styles.checkDataView}>
                <Text style={styles.text}>تنبية !! لقد تم اختيار تفاصيل الحجز متشابه في العروض والخدمات</Text>
            </View>
        )
    }

    const renderRequestInfo = () => {
        return <View style={[styles.requestDetailView, { backgroundColor: bgColorDate }]}>
            <View style={styles.Time}>
                {renderReservStartingTime()}
                <Text style={styles.subDetText}>من الساعة</Text>
            </View>
            <View style={styles.Time}>
                {renderReservEndingTime()}
                <Text style={styles.subDetText}>الى الساعة</Text>
            </View>
            {renderInviters()}
            {relatedCamp && renderReservationDet()}
            {similarity && renderCheckSelectedResDetail()}
            {chooseButton()}

        </View>
    }

    return (
        <View >
            {renderRequestInfo()}
            {/* {renderModal()} */}
        </View>
    )
}

export default RequestDetail

const styles = StyleSheet.create({
    requestDetailView: {
        width: '100%',
        padding: 10,
        borderRadius: 10
    },
    scroll: {
        // flex: 1,
        // height: 300,
        // width: '100%'
    },
    serviceDetBooking: {
        width: Dimensions.get('screen').width * 0.9,
        flex: 1,
        minHeight: 150,
        padding: 5,
        marginTop: 10,
        // backgroundColor: 'white',
    },
    serviceOfferBooking: {
        width: Dimensions.get('screen').width * 0.9,
        // backgroundColor: 'white',
    },

    detailView: {
        width: '90%',
        height: 500,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center',

    },
    pressDetailView: {
        width: 350,
        height: 60,
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center',
    },
    detailViewText: {
        fontSize: 18,
        color: colors.darkGold,
        fontWeight: 'bold',
    },
    detailLabel: {
        borderWidth: 2,
        borderColor: 'lightgray',
        borderRadius: 15,
        width: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailLabelPressed: {
        borderWidth: 2,
        borderColor: colors.puprble,
        borderRadius: 15,
        width: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailText: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold',
    },
    subDetText: {
        fontSize: 15,
        color: colors.puprble,
        marginRight: 10
    },
    closeView: {
        height: 30,
        width: 80,
        borderRadius: 5,
        backgroundColor: '#ffff',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    invitersView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 10,
    },
    invitView: {
        alignSelf: 'center',
        width: '90%',
    },
    input: {
        textAlign: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgray',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: colors.BGScereen,
        color: colors.puprble,
    },
    viewDate: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '70%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: colors.BGScereen,
        justifyContent: 'space-evenly',
        elevation: 5
    },
    text: {
        fontSize: 15,
        color: 'black'
    },
    icoon: {
        width: 35,
        height: 35,
    },
    detailItem: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        height: 40,
        width: '100%',
        marginVertical: 10,
        justifyContent: 'center',
        paddingRight: 10,
        // elevation: 5,
        alignSelf: 'flex-end'

    },
    subDetail: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 5
    },
    subPressable: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: colors.silver,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Time: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20
    },
    textRequired: {
        fontSize: 14,
        color: 'red',
        alignSelf: 'flex-end'
    },
    nextBackView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
        // borderWidth: 1
    },
    nextView: {
        width: 100,
        height: 40,
        borderWidth: 1.5,
        borderColor: colors.silver,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    nextBackText: {
        fontSize: 15,
        color: colors.puprble
    },
    detailModal: {
        width: '100%',
        height: 400,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    SaveView: {
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-end'
    },
    campaignView: {
        width: '100%',
        alignSelf: 'center',
        padding: 5,
        marginTop: 10,
        //borderWidth: 1
    },
    offerTitle: {
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: colors.silver,
        alignItems: 'center'
    },
    offerTitleSelected: {
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: colors.silver,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.darkGold
    },
    offerContentView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 10
    },
    campText: {
        fontSize: 18,
        color: colors.puprble,
    },
    campImg: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 10
    },
    checkDataView: {
        backgroundColor: colors.silver,
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 10
    }

})