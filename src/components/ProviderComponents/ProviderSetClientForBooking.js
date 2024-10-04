import { StyleSheet, Text, View, TextInput,TouchableOpacity,ScrollView,Dimensions } from 'react-native'
import React, { useState,useRef,useContext ,useEffect} from 'react'
import { colors } from '../../assets/AppColors'
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from "react-native-vector-icons/Feather";
import SearchContext from '../../../store/SearchContext';

const ProviderSetClientForBooking = (props) => {
    const {serviceData} = props

    const { campInfo, setCampInfo } = useContext(SearchContext);

    const [startTimeText, setstartTimeText] = useState()
    const [endTimeText, setendTimeText] = useState()
    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const [selectedSupDet, setSelectedSupDet] = useState([]);
    const [multiSelected, setMultiSelected] = useState(false)
    const [bgColorDate, setColorDate] = useState('white');
    const [isCampaign, setIsCampaign] = useState(true)

    const [offer, setOffer] = useState();

    const scrollViewRef = useRef(null);
    const firstPageRef = useRef(null);
    const secondPageRef = useRef(null);


 useEffect(() => {
        setIsCampaign(campInfo && campInfo.length > 0);
    }, []);

    //console.log("serviceData>>", serviceData[0].additionalServices);

/// Time Functions
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
                'الرجاء اختيار وقت نهاية الحجز',
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
        setstartTimeText(startTime);

    }
    const onEndTimeChange = (event, selectedDate) => {
        setShowEnd(false)
        const currentDate = selectedDate || date1;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let endTime = tempDate.getHours() + ':' + tempDate.getMinutes();
        if (endTime > startTimeText) {
            setendTimeText(endTime);

        } else {
            console.log("Not valid time");
        }
    }
    const renderReservStartingTime = () => {
        return <View>
            <TouchableOpacity onPress={() => checkStartTime()}>
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{startTimeText || "00:00"}</Text>

                    <MaterialCommunityIcons name={'clock-time-five'} color={colors.puprble} size={25} />
                </View>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => checkEndTime()}>
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{endTimeText || "00:00"}</Text>
                    <MaterialCommunityIcons name={'clock-time-eight'} color={colors.puprble} size={25} />
        
                </View>
            </TouchableOpacity>
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

    ///// Service detail Functions
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
    const whenSupDetailPress = (SubId) => {
        if (!SubId) {
            return
        }
    }
    const renderServiceDetail = () => {
        const detail = serviceData[0].additionalServices
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
                            <TouchableOpacity style={styles.subPressable} onPress={() => whenSupDetailPress(item.id)}>
                                {found && <Entypo
                                    style={{ alignSelf: 'center', position: 'absolute' }}
                                    name={"check"}
                                    color={colors.puprble}
                                    size={25} />}
                            </TouchableOpacity>
                        </View>
                    )
                })
                }
            </View>
            )
        })
    }
    const renderCampaighn = () => {
        const CampData = campInfo || [];

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
    const onCampPress = (campId) => {

    }
    const renderCampaighnHeader = (camp, index) => {
        var found = offer?.find((det) => det === camp?.CampId)
        return (
            <TouchableOpacity onPress={() => onCampPress(camp?.CampId || index)} style={!found ? styles.offerTitle : styles.offerTitleSelected}>
                <Text style={styles.campText}>{camp.campTitle}</Text>
                {camp.priceInclude == 'حسب الشخص' ?
                    <Text style={styles.campText}>{camp.campCost + '₪  للشخص الواحد '}</Text> :
                    <Text style={styles.campText}>{camp.campCost + '₪  لكل طاولة '}</Text>}
            </TouchableOpacity>
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
    const getServiceDetail = (id) => {
        const serData = serviceData[0].additionalServices.filter(element => {
            return element.subDetailArray.find(itemId => {
                return itemId.id === id
            })
        })
        return serData
    }
    const getSerSubDet = (id) => {
        const data = getServiceDetail(id)
        const subDetInfo = data[0].subDetailArray.filter(item => {
            return item.id === id
        })
        return subDetInfo
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
    const renderCheckSelectedOffer = () => {
        return (
            <View style={styles.checkDataView}>
                <Text style={styles.text}>تنبية !! لقد تم اختيار عروض تحتوي على تفاصيل متشابة</Text>
            </View>
        )
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
                    <TouchableOpacity style={pressed === 0 ? styles.detailLabelPressed : styles.detailLabel} onPress={() => {
                        handlePressFirstPage()
                        setPressed(0)
                    }}>
                        <Text style={styles.detailViewText}>الخدمات</Text>
                    </TouchableOpacity>
                    {isCampaign && <TouchableOpacity style={pressed === 1 ? styles.detailLabelPressed : styles.detailLabel} onPress={() => {
                        handlePressSecondPage()
                        setPressed(1)
                    }}>
                        <Text style={styles.detailViewText}>العروض</Text>
                    </TouchableOpacity>}
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

    const renderHallInfoForBooking = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='عدد الزوار'
                    value={{}}
                    onChangeText={{}} />
            </View>
        )
    }

    const renderBiookingFields = () => {
        return (<View>
            <View style={styles.input}>
                <Text >2024/5/8</Text>
            </View>
            <View style={styles.Time}>
                {renderReservStartingTime()}
                <Text style={styles.subDetText}>من الساعة</Text>
            </View>
            <View style={styles.Time}>
                {renderReservEndingTime()}
                <Text style={styles.subDetText}>الى الساعة</Text>
            </View>
            {renderHallInfoForBooking()}
            {campInfo && renderReservationDet()}
        </View>)
    }
    return (
        <View>
            {renderBiookingFields()}
           
        </View>
    )
}

export default ProviderSetClientForBooking

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1.5,
        borderColor: colors.silver,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    viewDate: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '70%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: colors.silver,
        justifyContent: 'space-evenly',
    },
    Time: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        // marginBottom: 20
    },
    subDetText: {
        fontSize: 15,
        color: colors.puprble,
        // marginRight: 10
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
    detailViewText: {
        fontSize: 18,
        color: colors.darkGold,
        fontWeight: 'bold',
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
    checkDataView: {
        backgroundColor: colors.silver,
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 10
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
    campaignView: {
        width: '100%',
        alignSelf: 'center',
        padding: 5,
        marginTop: 10,
        //borderWidth: 1
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
    subPressable: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: colors.silver,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subDetail: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 5
    },
    subDetText: {
        fontSize: 15,
        color: colors.puprble,
        marginRight: 10
    },
   
})