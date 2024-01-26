import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Modal, Image, TextInput } from 'react-native';
import SearchContext from '../../store/SearchContext';
import HomeCards from '../components/HomeCards';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider'
import { SelectList } from 'react-native-dropdown-select-list'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { getCities } from '../resources/API';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from "moment";
import { colors } from '../assets/AppColors';



const Results = (props) => {
    const {
        cat,
        ServiceDataInfo,
        town, setTown, DateText,
        setDateText, TimeText, setTimeText,
        cityselected, regionselect,
        setselectDateforSearch, selectDateforSearch,
        selectMonthforSearch,
        yearforSearch,
        periodDatesforSearch,setperiodDatesforSearch
    } = useContext(SearchContext);

    const [date, setDate] = useState(new Date());
    const [currentDate, setcurrentDate] = useState(date.getDate() + 1)
    const [currentMonth, setcurrentMonth] = useState(date.getMonth() + 1)
    const [currentYear, setcurrentYear] = useState(date.getFullYear())
    var readyDates = ''

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataFilterd, setDataFilterd] = useState(false)

    const [typeClicked, settypeClicked] = useState("");
    const [range, setRang] = useState('50');
    const [sliding, setSliding] = useState('Inactive');
    const [selectedCity, setSelectedCity] = useState("");
    const [selectRigon, setSelectRigon] = useState("");
    const [guestNum, setGuestNum] = useState(0)

    const [chozenfilter, setchozenfilter] = useState({ ...objectFilter })
    const maxPrice = 10000
    const objectFilter = {
        selectRigon,
        range,
        guestNum,
        typeClicked,
        selectedCity
    }
    const objectResult = {
        cityselected,
        regionselect,
        selectDateforSearch,
        selectMonthforSearch
    }
    const regionData = [
        { key: '2', value: 'الجليل' },
        { key: '3', value: 'النقب ' },
        { key: '5', value: 'الساحل' },
        { key: '0', value: 'المثلث الشمالي' },
        { key: '1', value: 'المثلث الجنوبي' },
        { key: '4', value: 'الضفة الغربية' },
    ]

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();

        setDateText(fDate);
        setTimeText(fTime);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const getCityFromApi = () => {
        getCities().then(res => {
            setTown(res)
        })
    }
    useEffect(() => {


    }, [])

    const renderCity = () => {
        const data = town;

        const cityName = data.map(Cname => {
            return Cname.city;
        });
        return cityName;
    };

    const onPressHandler = () => {
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
    const checkDate = (dataforReservation, source) => {
        const servicedata = source
        // console.log("servicedata[0].dates", servicedata[0].dates);
        const DateFiltered = servicedata[0].dates?.find(dat => {

            // console.log("dat.time", dat.time);
            // console.log("dataforReservation", dataforReservation);

            return dat.time === dataforReservation
        });
        return !!DateFiltered
    }
    const comparingData = (dateAviable, monthAvailble, source) => {
        if ((!!objectResult.selectDateforSearch || !!objectResult.selectMonthforSearch)) {
            return !!objectResult.selectMonthforSearch ?  monthAvailble : dateAviable
        } else {
            return findFirstDateAvailable(source)
        }
    }
    const findFirstDateAvailable = (serviceDates) => {
        const daysInMonth = moment(currentYear + '-' + currentMonth).daysInMonth()
        let completeDate = ''
        for (var day = currentDate; day <= daysInMonth; day++) {
            completeDate = day + '-' + currentMonth + '-' + currentYear
            if (!checkDate(completeDate, serviceDates)) {
                break
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
            completeDate = day + '-' + requestedMonth + '-' + yearforSearch
            if (!checkDate(completeDate, serviceDates)) {
                datesOfSelectedMonth.push(completeDate)
            }
        }
        return datesOfSelectedMonth
    }
    const checkDateIsAvilable = (serviceDates) => {
        const requestedDate = moment(objectResult.selectDateforSearch, "YYYY-MM-DD")
        
        let startingDay = requestedDate.format('D')
        let month = requestedDate.format('M')
        let year = requestedDate.format('YYYY')
        let daysInMonth = 0

        let completeDate = startingDay + '-' + month + '-' + year
        let startingDate = ''
        const dateswithinPeriod = []
        let day = startingDay
        let period = (periodDatesforSearch * 2) + 1

        if (periodDatesforSearch < 1) {
            if (!checkDate(completeDate, serviceDates)) {
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
                startingDate = day + '-' + month + '-' + year
                day--
            }
        
            let Day =  day 
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
                completeDate = Day + '-' + Month + '-' + Year
                if (!checkDate(completeDate, serviceDates)) {
                    dateswithinPeriod.push(completeDate)
                }
                Day++
            }
            return dateswithinPeriod
        }
    }


    const checkSelect = (nameItem) => {
        return objectFilter.selectRigon == "" ? true : nameItem.serviceData.region == objectFilter.selectRigon
    }
    const filterData = () => {
        const data = query();
        return data?.filter(nameItem => {
            const isPriceinRange = chozenfilter.range ? nameItem.serviceData.servicePrice <= chozenfilter.range : true
            const isRegonSelected = checkSelect(nameItem)
            const isCpicitInrange = objectFilter.guestNum ? nameItem.serviceData.maxCapasity >= objectFilter.guestNum : true
            const isHallType = objectFilter.typeClicked ? nameItem.serviceData.hallType == objectFilter.typeClicked : true
            const isSeletedCity = objectFilter.selectedCity ? nameItem.serviceData.address == objectFilter.selectedCity : true
            const filterQury = isPriceinRange && isRegonSelected && isCpicitInrange && isHallType && isSeletedCity
            return filterQury;
        })
    }
    const renderServCard = () => {
        const data = filterData();
        const cardsArray = data?.map(card => {
            return <HomeCards  {...card.serviceData}
                images={card?.serviceImages}
                dates={card?.serviceDates}
            />;
        });
        return cardsArray;
    };




    const dataSearchResult = () => {
        const data = query();
        const filtered = data?.filter(item => {
            //console.log("item.serviceDates", item.serviceDates);
            const avaiablespecificDate = checkDateIsAvilable(item.serviceDates);
            
            const AvilableDaysInMonth = checkMonthAvailableDate(item.serviceDates);
            
            const result = comparingData(avaiablespecificDate, AvilableDaysInMonth, item.serviceDates)


            const isCitySelect = objectResult.cityselected == '' ? true : item.serviceData.address == objectResult.cityselected
            const isRiogenSelect = objectResult.regionselect == '' ? true : item.serviceData.region == objectResult.regionselect

            const datesAvailable = isCitySelect && isRiogenSelect && result
             console.log("datesAvailable", datesAvailable);
            readyDates = datesAvailable
            return datesAvailable;
        })

        return filtered

    }
    const renderCard = () => {
        const data = dataSearchResult();
        //console.log("data ", data);
        const cardsArray = data?.map(card => {
            return <HomeCards  {...card.serviceData}
                images={card?.serviceImages}
                dates={card?.serviceDates}
                availableDates={readyDates}
            />;
        });
        return cardsArray;
    };


    ///////////////
    const OutClicked = () => {
        settypeClicked('قاعة خارجية')
    }
    const InClicked = () => {
        settypeClicked('قاعة داخلية')
    }
    const RestClicked = () => {
        settypeClicked('مطعم')
    }
    const HotClicked = () => {
        settypeClicked('فندق')
    }

    const hallType = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* Num Of Guest */}
                <Text style={styles.bodyText}> عدد المدعوين </Text>
                <View style={styles.insideView}>
                    <TextInput
                        style={styles.Capacityinput}
                        keyboardType="numeric"
                        //placeholder='عدد المدعوين'
                        onChangeText={(value) =>
                            setGuestNum(parseInt(value))
                        }
                    />
                </View>
                {/* Hall Type */}
                <Text style={styles.bodyText}>نوع القاعة</Text>
                <View style={styles.insideView}>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable
                            style={[styles.HallTypeView, typeClicked == 'قاعة خارجية' ? styles.HallTypeViewClicked : styles.HallTypeView]}
                            onPress={() => OutClicked()}>
                            <Text style={[styles.TypeText, typeClicked == 'قاعة خارجية' ? styles.TypeTextPressed : styles.TypeText]}>قاعه خارجية</Text>
                        </Pressable>
                        <Pressable style={[styles.HallTypeView, typeClicked == 'قاعة داخلية' ? styles.HallTypeViewClicked : styles.HallTypeView]}
                            onPress={() => InClicked()}>
                            <Text style={[styles.TypeText, typeClicked == 'قاعة داخلية' ? styles.TypeTextPressed : styles.TypeText]}>قاعه داخلية</Text>
                        </Pressable>
                        <Pressable style={[styles.HallTypeView, typeClicked == 'مطعم' ? styles.HallTypeViewClicked : styles.HallTypeView]}
                            onPress={() => RestClicked()}>
                            <Text style={[styles.TypeText, typeClicked == 'مطعم' ? styles.TypeTextPressed : styles.TypeText]}>مطعم</Text>
                        </Pressable>
                        <Pressable style={[styles.HallTypeView, typeClicked == 'فندق' ? styles.HallTypeViewClicked : styles.HallTypeView]}
                            onPress={() => HotClicked()}>
                            <Text style={[styles.TypeText, typeClicked == 'فندق' ? styles.TypeTextPressed : styles.TypeText]}>فندق</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    const priceComp = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.bodyText}>ما هو نطاق السعر المتوقع</Text>
                <View style={styles.insideView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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

                            // setRang(parseInt(value))
                        }

                        }
                    // onSlidingStart={() => setSliding('Slider')}
                    // onSlidingComplete={() => setSliding('Inactive')}
                    />
                </View>
            </View>
        )
    }

    const addressComp = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.bodyText}>في أي مدينة او منطقة تبحث</Text>
                <View style={styles.insideView}>
                    <SelectList
                        setSelected={(val) => setSelectedCity(val)}
                        //data={renderCity()}
                        save="value"
                        placeholder='اختر المدينة'
                        boxStyles={styles.dropdown}
                        inputStyles={styles.droptext}
                        dropdownTextStyles={styles.dropstyle}
                    />
                    <SelectList
                        setSelected={(val) =>
                            setSelectRigon(val)
                        }
                        data={regionData}
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
        )
    }

    const datePicker = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.bodyText}>تاريخ المناسبة  </Text>
                <View style={styles.insideView}>
                    <Pressable onPress={() => showMode('date')} >
                        <View style={styles.viewDate}>
                            <View style={styles.Date}>
                                <Text style={styles.text}>{DateText || "dd/mm/yyyy"}</Text>
                            </View>
                            <Fontisto
                                name='date'
                                style={{ fontSize: 30, color: colors.puprble, alignSelf: 'center' }}
                            />
                        </View>
                    </Pressable>
                    {/* <Pressable onPress={() => showMode('time')} >
                        <View style={styles.viewDate}>
                            <Text style={styles.text}>{TimeText || "00:00"}</Text>

                            <Image
                                style={styles.icoon}
                                source={require('../assets/photos/time.png')}
                            />
                        </View>
                    </Pressable> */}
                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                        />
                    )}
                </View>
            </View>
        )
    }

    const object = {
        قاعات: hallType(),
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}>
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
                            <ScrollView contentContainerStyle={styles.home}>
                                {/* Date & Time */}
                                {datePicker()}
                                {/* Hall Type */}
                                {object[cat]}
                                {/* end pf hall type */}

                                {/* Address */}
                                {addressComp()}
                                {/* Price */}
                                {priceComp()}

                                {/* <View style={styles.insideView}>

                                </View> */}
                            </ScrollView>
                        </View>
                        <View style={styles.searchButtonView}>
                            <Pressable onPress={() => closeModal()} style={styles.searchButton} >
                                <Text style={{ color: colors.darkGold, fontWeight: 'bold', fontSize: 18 }}>مشاهدة النتائج</Text>
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
        alignItems: 'center',
    },
    header: {
        width: '90%',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 10
    },

    Ftext: {
        fontSize: 20,
    },
    bodyText: {
        fontSize: 18,
        color: colors.puprble,
        marginBottom: 5
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Modaltitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        width: '100%',
        padding: 20,
    },
    insideView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        //borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    dropdown: {
        fontSize: 17,
        borderRadius: 8,
        width: 300,
        marginBottom: 20,
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
        height: 70,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        backgroundColor: colors.BGScereen
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
    viewDate: {
        flexDirection: 'row',
        width: '90%',
        height: 50,
        // borderRadius: 10,
        // alignItems: 'center',
        // backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignSelf: 'center'
    },
    Date: {
        width: '85%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
    icoon: {
        width: 35,
        height: 35,
        // marginLeft: 50
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
    },
    HallTypeView: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.puprble,
        backgroundColor: 'white',
    },
    HallTypeViewClicked: {
        width: 60,
        height: 60,
        backgroundColor: colors.puprble,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
        borderRadius: 5,

    },
    TypeText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.puprble
    },
    TypeTextPressed: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.darkGold
    },
})

export default Results;
