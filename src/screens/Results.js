import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Modal, Alert, TextInput } from 'react-native';
import SearchContext from '../../store/SearchContext';
import HomeCards from '../components/HomeCards';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider'
import { SelectList } from 'react-native-dropdown-select-list'
import moment from "moment";
import { colors } from '../assets/AppColors';
import { hallData } from '../resources/data';
import HallTypeCard from '../components/HallTypeCard';
import ClientCalender from '../components/ClientCalender';
import ServiceProviderContext from '../../store/ServiceProviderContext';
import { logProfileData } from 'react-native-calendars/src/Profiler';
import { getRequestbyUserId } from '../resources/API';
import UsersContext from '../../store/UsersContext';



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
    

    var countAllDates = 0



    const [sliding, setSliding] = useState('Inactive');

    // console.log("ServiceDataInfo", ServiceDataInfo);

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
        selectMonthforSearch
    }



    useEffect(() => {
        fillCities(regionData)
        // getRequestfromApi()
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


    const countAllRequestDates = (allRequests, dataforReservation) => {
        return allRequests.map(item => {
            return item.reservationDetail.forEach(element => {
                if (element.reservationDate == dataforReservation) {
                    countAllDates += 1
                }
            });
        })
    }

    const checkDate = (dataforReservation, source, allRequests, maxNumOfReq) => {
        countAllRequestDates(allRequests, dataforReservation)
        const servicedate = source

        // if (servicedate.length < 1) {


        if (countAllDates < maxNumOfReq) { }


        // } else {
        // console.log("servicedate[0].dates", servicedate[0].dates);
        const DateFiltered = servicedate[0].dates?.find(dat => {
            // console.log(dat.time, dataforReservation, dat.status, dat.status);
            // console.log(dat.time === dataforReservation && (dat.status === 'full' || dat.status === 'holiday'));
            // console.log("servicedate[0].dates.length", servicedate[0].dates.length);
            if (servicedate[0].dates.length > 1) {
                return dat.time === dataforReservation && (dat.status === 'full' || dat.status === 'holiday')
            } else {
                return dataforReservation
            }

        });
        //console.log("DateFiltered", !!DateFiltered);
        return !!DateFiltered



        // }
    }

    const comparingDates = (dateAviable, monthAvailble, source) => {
        if ((!!objectResult.selectDateforSearch)) {//|| !!objectResult.selectMonthforSearch
            return dateAviable
            // return !!objectResult.selectMonthforSearch ? monthAvailble : dateAviable
        } else {
            return findFirstDateAvailable(source)
        }
    }
    const findFirstDateAvailable = (serviceDates) => {
        var daysInMonth = moment(currentYear + '-' + currentMonth).daysInMonth()
        let completeDate = ''
        if (currentDate > daysInMonth) {
            if ((currentMonth + 1) > 12) {
                daysInMonth = moment((currentYear + 1) + '-' + (currentMonth - 11)).daysInMonth()
                for (var day = 1; day <= daysInMonth; day++) {
                    completeDate = day + '-' + (currentMonth + 1) + '-' + currentYear
                    if (!checkDate(completeDate, serviceDates)) {
                        break
                    }
                }
            } else {

                daysInMonth = moment(currentYear + '-' + (currentMonth + 1)).daysInMonth()
                for (var day = 1; day <= daysInMonth; day++) {
                    completeDate = day + '-' + (currentMonth + 1) + '-' + currentYear
                    if (!checkDate(completeDate, serviceDates)) {
                        break
                    }
                }
            }
        } else {
            for (var day = currentDate; day <= daysInMonth; day++) {
                completeDate = currentYear + '-' + currentMonth + '-' + day
                if (!checkDate(completeDate, serviceDates)) {
                    break
                }
            }
        }
        return completeDate
    };
    const checkMonthAvailableDate = (serviceDates) => {
        const requestedMonth = objectResult.selectMonthforSearch;
        const daysInMonth = moment(yearforSearch + '-' + requestedMonth).daysInMonth()
        let completeDate = ''
        const datesOfSelectedMonth = []
        for (var day = 1; day <= daysInMonth; day++) {
            completeDate = yearforSearch + '-' + requestedMonth + '-' + day
            if (!checkDate(completeDate, serviceDates)) {
                datesOfSelectedMonth.push(completeDate)
            }
        }
        return datesOfSelectedMonth
    }
    const checkDateIsAvilable = (serviceDates, allRequests, maxNumOfReq) => {
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
            if (!checkDate(completeDate, serviceDates, allRequests, maxNumOfReq)) {
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
                if (!checkDate(completeDate, serviceDates, allRequests, maxNumOfReq)) {
                    dateswithinPeriod.push(completeDate)
                }
                Day++
            }

            return dateswithinPeriod
        }
    }
    const dataSearchResult = () => {
        const data = query();
        const filtered = data?.filter(item => {

            const avaiablespecificDate = checkDateIsAvilable(item.serviceDates, item.serviceRequests, item.serviceData.maxNumberOFRequest);
            // const AvilableDaysInMonth = checkMonthAvailableDate(item.serviceDates);
            const result = comparingDates(avaiablespecificDate, item.serviceDates)

            const isCitySelect = objectResult.cityselected === '' ? true : item.serviceData.address == objectResult.cityselected
            const isRiogenSelect = objectResult.regionselect === '' ? true : item.serviceData.region == objectResult.regionselect

            const availableService = isCitySelect && isRiogenSelect && result
            console.log("readyDates", readyDates);
            item.readyDates = result
            return availableService;
        })
        console.log("filtered", filtered);

        return filtered

    }
    const renderCard = () => {
        const data = dataSearchResult();
        // console.log("data ", data);
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
    // Check available services using Filter
    const comparingDatesinFilter = (dateAviable, source) => {
        if ((!!objectResult.selectDateforSearch)) {
            return dateAviable
        } else {
            return findFirstDateAvailable(source)
        }
    }
    const filterData = () => {
        const data = query();
        return data?.filter(nameItem => {

            const selectedDate = checkDateIsAvilable(nameItem.serviceDates);
            const dateResult = comparingDatesinFilter(selectedDate, nameItem.serviceDates)
            const isSeletedCity = objectFilter.selectedCity ? nameItem.serviceData.address == objectFilter.selectedCity : true
            const isRegonSelected = objectFilter.selectRigon == "" ? true : nameItem.serviceData.region == objectFilter.selectRigon
            const isCpicitInrange = objectFilter.guestNum ? nameItem.serviceData.maxCapasity >= objectFilter.guestNum : true
            const isPriceinRange = chozenfilter.selectedPrice ? nameItem.serviceData.servicePrice <= chozenfilter.selectedPrice : true
            const isHallType = objectFilter.hallType ? nameItem.serviceData.hallType == objectFilter.hallType : true

            const filterQury = dateResult && isPriceinRange && isRegonSelected && isCpicitInrange && isSeletedCity && isHallType
            readyDates = dateResult

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
                availableDates={readyDates}
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
                {/* <Text style={styles.bodyText}>في أي مدينة او منطقة تبحث</Text> */}
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
                            // onSelect={() => console.log(select)}
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


    return (
        <View style={styles.container}>
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
            <ScrollView contentContainerStyle={styles.home}>
                {dataFilterd ? renderServCard() : renderCard()}
            </ScrollView>
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
        height: 450,
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
