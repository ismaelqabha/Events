import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Modal, Alert, TextInput } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider'
import { SelectList } from 'react-native-dropdown-select-list'
import moment from "moment";
import { logProfileData } from 'react-native-calendars/src/Profiler';
import UsersContext from '../../../store/UsersContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import SearchContext from '../../../store/SearchContext';
import HallTypeCard from '../../components/HallTypeCard';
import { hallData } from '../../resources/data';
import { colors } from '../../assets/AppColors';
import HomeCards from '../../components/HomeCards';
import ClientCalender from '../../components/ClientCalender';
import { getProviderRequests } from '../../resources/API';



const Results = (props) => {
    const {
        cat,
        ServiceDataInfo,
        cityselected, regionselect,
        selectDateforSearch,
        selectMonthforSearch,
        yearforSearch,
        periodDatesforSearch, setperiodDatesforSearch,
        regionData, setRequestInfo,
        ProviderRequests, setProviderRequests
    } = useContext(SearchContext);

    const { hallType } = useContext(ServiceProviderContext)
    const { userId } = useContext(UsersContext);

    const [date, setDate] = useState(new Date());
    const [currentDate, setcurrentDate] = useState(date.getDate() + 1)
    const [currentMonth, setcurrentMonth] = useState(date.getMonth() + 1)
    const [currentYear, setcurrentYear] = useState(date.getFullYear())

    const [showModal, setShowModal] = useState(false);
    const [dataFilterd, setDataFilterd] = useState(false)

    const [citiesNames, setCitiesNames] = useState([])
    const [selectedPrice, setSelectedPrice] = useState();
    const [selectedCity, setSelectedCity] = useState("");
    const [selectRigon, setSelectRigon] = useState("");
    const [guestNum, setGuestNum] = useState(0)
    const [selectHallType, setSelectHallType] = useState('')



    const [sliding, setSliding] = useState('Inactive');

    //  console.log("ServiceDataInfo", ServiceDataInfo);

    const [chozenfilter, setchozenfilter] = useState({ ...objectFilter })
    var readyDates = ''
    const maxPrice = 10000
    const objectFilter = {
        selectRigon,
        selectedPrice,
        guestNum,
        hallType,
        selectedCity
    }
    const objectResult = {
        cityselected,
        regionselect,
        selectDateforSearch,
        // selectMonthforSearch
    }

    var requestDate
    var todayDate = new Date();

    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    todayDate.setMilliseconds(0);

    useEffect(() => {
        fillCities(regionData)
        // getProividerRequestsForDate("661059d64cc4ba7664305a1a","2024-8-10")
    }, [])

    const fillCities = (regions) => {
        const allData = []
        regions?.forEach(region => {
            allData.push(...region.regionCities)
        });
        allData.sort()
        setCitiesNames(allData)
    }
    const renderRegion = () => {
        const region = regionData.map(item => {
            return item.regionName
        })
        return region.sort()
    }

    const onBackPressHandler = () => {
        objectResult.cityselected = ''
        objectResult.regionselect = ''
        setperiodDatesforSearch(0)
        props.navigation.goBack();
    }
    const modalPress = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setDataFilterd(true);
        setShowModal(false);
    }

    const query = () => {
        if (!cat) {
            return ServiceDataInfo || [];
        }
        return ServiceDataInfo?.filter(nameItem => {
            return nameItem.serviceData.servType == cat;

        })
    }

    // check available date part 

    const getProividerRequestsForDate = (servicId, dataforReservation) => {

        const queryInfo = {
            ReqServId: servicId,
            reservationDetail: [{ reservationDate: dataforReservation }]
        }
        getProviderRequests(queryInfo).then(res => {
            //console.log("res", res);
            if (res.message !== 'No Request') {
                //setProviderRequests(res)
            }
            return res
        })

    }
    var serviceRequestsArray = []

    const countAllRequestDates = (servicId, dataforReservation) => {
        //const result = getProividerRequestsForDate(servicId, dataforReservation)
        var countAllReq = 0
        serviceRequestsArray = []

        const queryInfo = {
            ReqServId: servicId,
            reservationDetail: [{ reservationDate: dataforReservation }]
        }
        getProviderRequests(queryInfo).then(res => {

            if (res.message !== 'No Request') {

            }

            countAllReq = res.length
           
            serviceRequestsArray.push(res)
            console.log(countAllReq);
            console.log("00000",serviceRequestsArray[1]);
        })

        return countAllReq
    }


    const checkDate = (dataforReservation, source, servicId, maxNumOfReq) => {
        const countAllDates = countAllRequestDates(servicId, dataforReservation)
        const servicedate = source

        if (countAllDates < maxNumOfReq) {

            const DateFiltered = servicedate[0].dates?.find(dat => {
                if (servicedate[0].dates.length > 0) {
                    return dat.time === dataforReservation && (dat.status === 'full' || dat.status === 'holiday')
                } else {
                    return dataforReservation
                }
            });
            return !!DateFiltered

        } else {
            return true
        }
    }
    const comparingDates = (dateAviable, source, servicId, maxNumOfReq) => {
        if ((!!objectResult.selectDateforSearch)) {
            return dateAviable
        } else {
            return findFirstDateAvailable(source, servicId, maxNumOfReq)
        }
    }
    const findFirstDateAvailable = (serviceDates, servicId, maxNumOfReq) => {

        var daysInMonth = moment(currentYear + '-' + currentMonth).daysInMonth()
        let completeDate = ''

        if (currentDate > daysInMonth) {

            if ((currentMonth + 1) > 12) {
                daysInMonth = moment((currentYear + 1) + '-' + (currentMonth - 11)).daysInMonth()
            } else {
                daysInMonth = moment(currentYear + '-' + (currentMonth + 1)).daysInMonth()
            }

            for (var day = 1; day <= daysInMonth; day++) {

                completeDate = currentYear + '-' + (currentMonth + 1) + '-' + day

                if (!checkDate(completeDate, serviceDates, servicId, maxNumOfReq)) {
                    break
                }
            }

        } else {
            for (var day = currentDate; day <= daysInMonth; day++) {
                completeDate = currentYear + '-' + currentMonth + '-' + day
                if (!checkDate(completeDate, serviceDates, servicId, maxNumOfReq)) {
                    break
                }
            }
        }

        return completeDate
    };
    const checkDateIsAvilable = (serviceDates, servicId, maxNumOfReq) => {
        const requestedDate = moment(objectResult.selectDateforSearch, "YYYY-MM-DD")

        let startingDay = requestedDate.format('D')
        let month = requestedDate.format('M')
        let year = requestedDate.format('YYYY')
        let daysInMonth = 0

        let completeDate = year + '-' + month + '-' + startingDay
        let startingDate = ''
        const dateswithinPeriod = []
        let day = startingDay
        let period = (periodDatesforSearch * 2) + 1

        if (periodDatesforSearch < 1) {

            if (!checkDate(completeDate, serviceDates, servicId, maxNumOfReq)) {
                return completeDate
            }
        } else {
            for (var index = 0; index < periodDatesforSearch; index++) {
                if (day == 0) {
                    month--
                    if (month < 1) {
                        year--
                        month = 12
                    }
                    daysInMonth = moment(year + '-' + month).daysInMonth()
                    day = daysInMonth
                }
                startingDate = year + '-' + month + '-' + day
                day--
            }

            let Day = day
            let Month = month
            let Year = year
            for (var index = 0; index < period; index++) {
                daysInMonth = moment(Year + '-' + Month).daysInMonth()
                if (Day > daysInMonth) {
                    Month++
                    if (Month >= 12) {
                        Year++
                        Month = 1
                    }
                    daysInMonth = moment(Year + '-' + Month).daysInMonth()
                    Day = 1
                }
                completeDate = Year + '-' + Month + '-' + Day
                requestDate = new Date(completeDate)
                if (!checkDate(completeDate, serviceDates, servicId, maxNumOfReq)) {
                    if (requestDate > todayDate) {
                        dateswithinPeriod.push(completeDate)
                    }
                }
                Day++
            }

            return dateswithinPeriod
        }
    }

    const dataSearchResult = () => {
        const data = query()
        const filtered = data?.filter(item => {
            const avaiablespecificDate = checkDateIsAvilable(item.serviceDates, item.serviceData.service_id, item.serviceData.maxNumberOFRequest);
            // const AvilableDaysInMonth = checkMonthAvailableDate(item.serviceDates);
            const result = comparingDates(avaiablespecificDate, item.serviceDates, item.serviceData.service_id, item.serviceData.maxNumberOFRequest)

            const isCitySelect = objectResult.cityselected === '' ? true : item.serviceData.address == objectResult.cityselected
            const isRiogenSelect = objectResult.regionselect === '' ? true : item.serviceData.region == objectResult.regionselect

            const availableService = isCitySelect && isRiogenSelect && result

            item.readyDates = result
            return availableService;
        })
        return filtered

    }
    const renderCard = () => {
        const data = dataSearchResult();
        const cardsArray = data?.map((card, index) => {
            console.log(">>>>",index, serviceRequestsArray[index]);
            return <HomeCards  {...card.serviceData}
                images={card?.serviceImages}
                dates={card?.serviceDates}
                relatedCamp={card?.serviceCamp}
                serviceRequests={serviceRequestsArray[index]}
                availableDates={card?.readyDates}
            />;
        });
        return cardsArray;
    };

    // Check available services using Filter

    const filterData = () => {
        const data = query();
        return data?.filter(nameItem => {

            const selectedDate = checkDateIsAvilable(nameItem.serviceDates, nameItem.serviceRequests, nameItem.serviceData.maxNumberOFRequest);
            const dateResult = comparingDates(selectedDate, nameItem.serviceDates, nameItem.serviceRequests, nameItem.serviceData.maxNumberOFRequest)

            const isSeletedCity = objectFilter.selectedCity ? nameItem.serviceData.address == objectFilter.selectedCity : true
            const isRegonSelected = objectFilter.selectRigon == "" ? true : nameItem.serviceData.region == objectFilter.selectRigon
            const isCpicitInrange = objectFilter.guestNum ? nameItem.serviceData.maxCapasity >= objectFilter.guestNum : true
            const isPriceinRange = chozenfilter.selectedPrice ? nameItem.serviceData.servicePrice <= chozenfilter.selectedPrice : true
            const isHallType = objectFilter.hallType ? nameItem.serviceData.hallType == objectFilter.hallType : true

            const filterQury = dateResult && isPriceinRange && isRegonSelected && isCpicitInrange && isSeletedCity && isHallType
            nameItem.readyDates = dateResult

            return filterQury;
        })
    }
    const renderServCard = () => {
        const data = filterData();
        const cardsArray = data?.map(card => {
            return <HomeCards  {...card.serviceData}
                images={card?.serviceImages}
                dates={card?.serviceDates}
                relatedCamp={card?.serviceCamp}
                availableDates={card?.readyDates}
            />;
        });
        return cardsArray;
    };

    /// Filter Components
    const renderHallTypes = () => {
        return hallData?.map((item) => {
            return <HallTypeCard {...item}
                isChecked={item.hallType === selectHallType}
                onHallTypePress={(value) => setSelectHallType(value)}
            />
        })
    }
    const renderHallType = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* Num Of Guest */}
                {/* <Text style={styles.bodyText}> عدد المدعوين </Text> */}
                <View style={styles.insideView}>
                    <TextInput
                        style={styles.Capacityinput}
                        keyboardType="numeric"
                        placeholder='عدد المدعوين'
                        onChangeText={(value) =>
                            setGuestNum(parseInt(value))
                        }
                    />
                </View>
                {/* Hall Type */}
                {/* <Text style={styles.bodyText}>نوع القاعة</Text> */}
                <View style={styles.hallType}>{renderHallTypes()}</View>

            </View>
        )
    }
    const renderPricingFilter = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* <Text style={styles.bodyText}>ما هو نطاق السعر المتوقع</Text> */}
                <View style={styles.insideView}>
                    <TextInput
                        style={styles.Capacityinput}
                        keyboardType="numeric"
                        placeholder='السعر المتوقع'
                        onChangeText={(value) =>
                            setSelectedPrice(parseInt(value))
                        }
                    />


                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>₪</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{(parseInt(chozenfilter.range)) || 0}</Text>

                    </View>
                    <Slider
                        style={{ width: '100%', height: 40 }} s
                        minimumValue={50}
                        maximumValue={maxPrice}
                        minimumTrackTintColor="tomato"
                        maximumTrackTintColor="#000000"
                        value={.5}
                        // onValueChange={value => setRang(parseInt(value))}
                        onValueChange={value => {
                            setchozenfilter({ ...chozenfilter, range: value });

                            setRang(parseInt(value))
                        }
                        }
                        onSlidingStart={() => setSliding('Slider')}
                        onSlidingComplete={() => setSliding('Inactive')}
                    /> */}
                </View>
            </View>
        )
    }
    const addressComp = () => {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.insideView}>
                    <View style={styles.selectView}>
                        <SelectList
                            setSelected={(val) => setSelectedCity(val)}
                            data={citiesNames}
                            save="value"
                            placeholder='اختر المدينة'
                            boxStyles={styles.dropdown}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                    </View>
                    <View style={styles.selectView}>
                        <SelectList
                            setSelected={(val) =>
                                setSelectRigon(val)
                            }
                            data={renderRegion}
                            save="value"
                            label="المناطق المختارة"
                            placeholder='اختر المنطقة'
                            boxStyles={styles.dropdown}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                    </View>
                </View>
            </View>
        )
    }
    const datePicker = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* <Text style={styles.bodyText}>تاريخ المناسبة  </Text> */}
                <View style={styles.calenderView}>
                    <ClientCalender />
                </View>
            </View>
        )
    }

    const object = {
        قاعات: renderHallType(),
        تصوير: renderPricingFilter(),
    }
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onBackPressHandler}>
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Pressable onPress={() => modalPress()}>
                    <FontAwesome
                        name={"sliders"}
                        color={colors.puprble}
                        size={25} />
                </Pressable>
            </View>
        )
    }
    const renderFilterModal = () => {
        return (
            <Modal
                transparent
                visible={showModal}
                animationType='slide'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.AllModal}>
                    <View style={styles.dModal}>
                        <View style={styles.Modaltitle}>
                            <Text style={styles.text}>...</Text>
                        </View>
                        <View style={styles.body}>
                            <ScrollView>
                                {/* Date & Time */}
                                {datePicker()}
                                {/* Address */}
                                {addressComp()}
                                {/* Hall Type */}
                                {object[cat]}
                                <View style={{ height: 100, width: "100%" }}></View>
                            </ScrollView>
                        </View>
                        <View style={styles.searchButtonView}>
                            <Pressable onPress={() => closeModal()} style={styles.searchButton} >
                                <Text style={styles.text}>مشاهدة النتائج</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>

            </Modal>
        )
    }


    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView contentContainerStyle={styles.home}>
                {dataFilterd ? renderServCard() : renderCard()}
            </ScrollView>
            {renderFilterModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    hallType: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    calenderView: {
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'lightgray',
        borderRadius: 8,
        padding: 5,
        height: 470,
        marginVertical: 10
    },

    bodyText: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 10
    },
    dModal: {
        width: "100%",
        height: '100%',
        backgroundColor: colors.BGScereen,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    AllModal: {
        flex: 1,
        //justifyContent: 'flex-end',
        //alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Modaltitle: {
        // height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        width: '100%',
        padding: 10,
        // borderWidth: 1
    },

    insideView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 8,
    },
    dropdown: {
        fontSize: 17,
        borderRadius: 8,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'lightgray',
        height: 50,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dropstyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    searchButtonView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: colors.BGScereen,
        // borderWidth:1,
        padding: 5
    },
    searchButton: {
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 5,
        backgroundColor: colors.puprble
    },

    text: {
        color: colors.darkGold,
        fontWeight: 'bold',
        fontSize: 18
    },
    Capacityinput: {
        alignContent: 'center',
        textAlign: 'center',
        height: 50,
        width: '90%',
        fontSize: 18,
        borderRadius: 10,
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'lightgray'
    },
    selectView: {
        width: '90%'
    }

})

export default Results;
