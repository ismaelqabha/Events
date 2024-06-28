import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ScreenNames } from '../../../route/ScreenNames';
import { useState } from 'react';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import { Pressable } from 'react-native';
import moment from "moment";

const ClientCalender = (props) => {

    const { setselectDateforSearch,
        selectDateforSearch,
        periodDatesforSearch,
        setperiodDatesforSearch,
        dateFromCalender, setDateFromCalender } = useContext(SearchContext);

    const [selected, setSelected] = useState('')
    const [date, setDate] = useState(new Date())

    const [zeroDay, setZeroDay] = useState(true)
    const [oneDay, setOneDay] = useState(false)
    const [threeDay, setThreeDay] = useState(false)
    const [sevenDay, setSevenDay] = useState(false)
    const [forteenDay, setForteenDay] = useState(false)

    var requestDate
    var todayDate = new Date();

    todayDate.setHours(0);
    todayDate.setMinutes(0);
    todayDate.setSeconds(0);
    todayDate.setMilliseconds(0);

    useEffect(() => {
        onScreenLoad()
        const availableDates = checkDateIsAvilable()
        setDateFromCalender(availableDates)
    }, [])

    const onScreenLoad = () => {
        setZeroDay(true)
        setOneDay(false)
        setThreeDay(false)
        setSevenDay(false)
        setForteenDay(false)
        // setperiodDatesforSearch(0)
        // setselectDateforSearch(null)
    }
    const onZerodayPress = () => {
        setZeroDay(true)
        setOneDay(false)
        setThreeDay(false)
        setSevenDay(false)
        setForteenDay(false)
        setperiodDatesforSearch(0)
    }
    const onOnedayPress = () => {
        setOneDay(true)
        setThreeDay(false)
        setSevenDay(false)
        setForteenDay(false)
        setZeroDay(false)
        setperiodDatesforSearch(1)
    }
    const onThreedayPress = () => {
        setOneDay(false)
        setThreeDay(true)
        setSevenDay(false)
        setForteenDay(false)
        setZeroDay(false)
        setperiodDatesforSearch(3)
    }
    const onSevendayPress = () => {
        setOneDay(false)
        setThreeDay(false)
        setSevenDay(true)
        setForteenDay(false)
        setZeroDay(false)
        setperiodDatesforSearch(7)
    }
    const onForteendayPress = () => {
        setForteenDay(true)
        setOneDay(false)
        setThreeDay(false)
        setSevenDay(false)
        setZeroDay(false)
        setperiodDatesforSearch(14)
    }
    const renderPeriod = () => {
        return (
            <View style={styles.dayView}>
                <View style={styles.rowView}>
                    <Pressable style={[styles.dayRange, zeroDay ? styles.dayRangeSelected : styles.dayRange]}
                        onPress={() => onZerodayPress()}>
                        <Text style={{ fontSize: 16, color: colors.puprble }}>بدون</Text>
                    </Pressable>
                    <Pressable style={[styles.dayRange, oneDay ? styles.dayRangeSelected : styles.dayRange]}
                        onPress={() => onOnedayPress()}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, lineHeight: 20, color: colors.puprble }}>+</Text>
                            <Text style={{ fontSize: 20, lineHeight: 12, color: colors.puprble }}>-</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: colors.puprble }}>1 ايام</Text>
                    </Pressable>
                    <Pressable style={[styles.dayRange, threeDay ? styles.dayRangeSelected : styles.dayRange]}
                        onPress={() => onThreedayPress()}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, lineHeight: 20, color: colors.puprble }}>+</Text>
                            <Text style={{ fontSize: 20, lineHeight: 12, color: colors.puprble }}>-</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: colors.puprble }}>3 ايام</Text>
                    </Pressable>
                </View>
                <View style={styles.rowView}>
                    <Pressable style={[styles.dayRange, sevenDay ? styles.dayRangeSelected : styles.dayRange]}
                        onPress={() => onSevendayPress()}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, lineHeight: 20, color: colors.puprble }}>+</Text>
                            <Text style={{ fontSize: 20, lineHeight: 12, color: colors.puprble }}>-</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: colors.puprble }}>7 ايام</Text>
                    </Pressable>
                    <Pressable style={[styles.dayRange, forteenDay ? styles.dayRangeSelected : styles.dayRange]}
                        onPress={() => onForteendayPress()}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, lineHeight: 20, color: colors.puprble }}>+</Text>
                            <Text style={{ fontSize: 20, lineHeight: 12, color: colors.puprble }}>-</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: colors.puprble }}>14 يوم</Text>
                    </Pressable>
                </View>
            </View>
        )
    }



    const selectDate = (day) => {
        setselectDateforSearch(day.dateString);
        setSelected(day.dateString)
        const availableDates = checkDateIsAvilable(day.dateString)
        setDateFromCalender(availableDates)
        // console.log('selected da **', day.dateString);
    }

    //// when use the componet to change the date not set date
    const checkDateIsAvilable = (selectedDate) => {

        const allRequests = props.serviceRequests || []
        const serviceDates = props.dates || []
        const maxNumOfReq = props.maxNumberOFRequest || 0
        const requestedDate = moment(selectedDate, "YYYY-MM-DD")

        let startingDay = requestedDate.format('D')
        let month = requestedDate.format('M')
        let year = requestedDate.format('YYYY')
        let daysInMonth = 0

        let completeDate = year + '-' + month + '-' + startingDay
        let startingDate = ''
        const dateswithinPeriod = []
        let day = startingDay
        let period = (periodDatesforSearch * 2) + 1

        console.log("periodDatesforSearch", periodDatesforSearch);

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
                requestDate = new Date(completeDate)
                if (!checkDate(completeDate, serviceDates, allRequests, maxNumOfReq)) {
                    if (requestDate > todayDate) {
                        dateswithinPeriod.push(completeDate)
                    }
                }
                Day++
            }

            return dateswithinPeriod
        }
    }

    const countAllRequestDates = (allRequests, dataforReservation) => {
        var countAllDates = 0
        allRequests.forEach(item => {
            item.reservationDetail.forEach(element => {
                if (element.reservationDate == dataforReservation) {
                    countAllDates += 1
                }
            });
        })
        return countAllDates
    }
    const checkDate = (dataforReservation, source, allRequests, maxNumOfReq) => {
        //console.log("allRequests", allRequests);
        const countAllDates = countAllRequestDates(allRequests, dataforReservation)
        const servicedate = source
        if (countAllDates < maxNumOfReq) {

            const DateFiltered = servicedate[0].dates?.find(dat => {
                if (servicedate[0].dates.length > 1) {
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

    return (
        <View style={styles.container}>
            {renderPeriod()}
            <Calendar
                style={{
                    borderColor: 'gray',
                    height: 300,
                    width: 300,
                    borderRadius: 20,
                    //padding: 10,
                    backgroundColor: 'white',
                    // elevation: 5,

                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: colors.silver,
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: colors.puprble,
                    selectedDayTextColor: colors.silver,
                    todayTextColor: 'black',
                    dayTextColor: colors.puprble,
                    textDisabledColor: 'gray',
                    dotColor: 'red',
                    selectedDotColor: 'red',
                    arrowColor: colors.puprble,
                    monthTextColor: colors.puprble,
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontSize: 20,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 14,
                    width: 100,
                }}

                minDate={date}
                //maxDate='2023-12-31'
                onDayPress={day => {
                    selectDate(day)
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}


                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={day => {
                    // console.log('selected day', day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MM yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                    // console.log('month changed', month);
                }}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={false}
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',

    },
    dayRange: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
        width: 90, height: 40,
        borderRadius: 15,
        marginHorizontal: 5
    },
    dayRangeSelected: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 2,
        borderColor: colors.puprble,
        alignItems: 'center',
        width: 90, height: 40,
        borderRadius: 15,
        marginHorizontal: 10
    },
    dayView: {
        width: '100%',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 3
    }
})

export default ClientCalender;
