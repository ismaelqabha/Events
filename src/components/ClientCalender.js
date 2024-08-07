import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import { getProviderRequests } from '../resources/API';

const ClientCalendar = (props) => {
    const {
        setselectDateforSearch,
        selectDateforSearch,
        periodDatesforSearch,
        setperiodDatesforSearch,
        dateFromCalender,
        setDateFromCalender,
        ProviderRequests, setProviderRequests
    } = useContext(SearchContext);

    const [selected, setSelected] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedPeriod, setSelectedPeriod] = useState(0); // 0: zero, 1: one day, 3: three days, etc.

    const todayDate = new Date().setHours(0, 0, 0, 0);

    var reqDate
    

    useEffect(() => {
        onScreenLoad();
    }, []);

    const onScreenLoad = () => {
        setSelectedPeriod(0);
    };

    const handlePeriodPress = (period) => {
        setSelectedPeriod(period);
        setperiodDatesforSearch(period);
    };

    const renderPeriod = () => (
        <View style={styles.dayView}>
            <View style={styles.rowView}>
                {renderPeriodButton(0, 'بدون')}
                {renderPeriodButton(1, '1 ايام')}
                {renderPeriodButton(3, '3 ايام')}
            </View>
            <View style={styles.rowView}>
                {renderPeriodButton(7, '7 ايام')}
                {renderPeriodButton(14, '14 يوم')}
            </View>
        </View>
    );

    const renderPeriodButton = (period, label) => (
        <Pressable
            style={[styles.dayRange, selectedPeriod === period && styles.dayRangeSelected]}
            onPress={() => handlePeriodPress(period)}>

            {period != 0 && <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, lineHeight: 20, color: colors.puprble }}>+</Text>
                <Text style={{ fontSize: 20, lineHeight: 12, color: colors.puprble }}>-</Text>
            </View>}

            <Text style={{ fontSize: 16, color: colors.puprble }}>{label}</Text>
        </Pressable>
    );

    const selectDate = (day) => {
        //console.log("day has been pressed");
        setselectDateforSearch(day.dateString);
        setSelected(day.dateString);
        const availableDates = checkDateIsAvailable(day.dateString);
        setDateFromCalender(availableDates);
    };

    const checkDateIsAvailable1 = (selectedDate) => {
        const SerID = props.service_id || ''
        const serviceDates = props.dates || [];
        const maxNumOfReq = props.maxNumberOFRequest || 0;

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

        if (periodDatesforSearch < 1) {
            if (!checkDate(completeDate, serviceDates, SerID, maxNumOfReq)) {
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
                reqDate = new Date(completeDate)
                if (!checkDate(completeDate, serviceDates, SerID, maxNumOfReq)) {
                    if (reqDate > todayDate) {
                        dateswithinPeriod.push(completeDate)
                    }
                }
                Day++
            }

            return dateswithinPeriod
        }
    }

    const checkDateIsAvailable = (selectedDate) => {
       // const allRequests = props.serviceRequests || [];
       const SerID = props.service_id || ''
        const serviceDates = props.dates || [];
        const maxNumOfReq = props.maxNumberOFRequest || 0;
        const requestedDate = moment(selectedDate, "YYYY-MM-DD");

        let day = requestedDate.format('D')
        let month = requestedDate.format('M')
        let year = requestedDate.format('YYYY')
        let completeDate = year + '-' + month + '-' + day

        if (periodDatesforSearch < 1) {
            if (checkDate(completeDate, serviceDates,SerID, maxNumOfReq)) {
                return completeDate
            }
        } else {
            const datesWithinPeriod = getDatesWithinPeriod(requestedDate, serviceDates,SerID, maxNumOfReq);
            if (datesWithinPeriod.length > 0) {
                return datesWithinPeriod
            }
        }
    };
    const getDatesWithinPeriod = (requestedDate, serviceDates,SerID, maxNumOfReq) => {
        const datesWithinPeriod = [];
        let period = (periodDatesforSearch * 2) + 1;
        let day = requestedDate.date();
        let month = requestedDate.month() + 1;
        let year = requestedDate.year();

        for (let i = 0; i < period; i++) {
            const completeDate = `${year}-${month}-${day}`;
            if (checkDate(completeDate, serviceDates,SerID, maxNumOfReq) && new Date(completeDate) > todayDate) {
                datesWithinPeriod.push(completeDate);
            }
            day++;
        }
        return datesWithinPeriod;
    };


    const getProividerRequestsForDate = (servicId, dataforReservation) => {
        const queryInfo = {
            ReqServId: servicId,
            reservationDetail: [{ reservationDate: dataforReservation }]
        }
        getProviderRequests(queryInfo).then(res => {
           // console.log(res);
            if (res.message !== 'No Request') {
                setProviderRequests(res)
            }
        })

    }
    const countAllRequestDates = (SerID,date) => {
       
        getProividerRequestsForDate(SerID, date)
        const countAllReq = ProviderRequests.length
        return countAllReq
    }

    const countAllRequestDates1 = (allRequests, date) => {
        return allRequests.reduce((count, request) =>
            count + request.reservationDetail.filter(detail => detail.reservationDate === date).length, 0);
    };

    const checkDate = (date, serviceDates,SerID, maxNumOfReq) => {
        const countAllDates = countAllRequestDates(SerID,date);
        if (countAllDates < maxNumOfReq) {
            const dateFiltered = serviceDates[0]?.dates.find(dat =>
                dat.time === date && (dat.status === 'full' || dat.status === 'holiday'));
            if (dateFiltered) {
                return false
            }
        }
        return true;
    };

    return (
        <View style={styles.container}>
            {renderPeriod()}
            <View>
                <Calendar
                    style={styles.calendar}
                    theme={calendarTheme}
                    minDate={date.toString()}
                    onDayPress={(day) => selectDate(day)}
                    markedDates={{ [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
                    hideExtraDays={false}
                    disableMonthChange={true}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableAllTouchEventsForDisabledDays={true}
                    enableSwipeMonths={false}
                />
            </View>
        </View>
    );
};

const calendarTheme = {
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    dayRange: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
        width: 90,
        height: 40,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    dayRangeSelected: {
        borderWidth: 2,
        borderColor: colors.puprble,
    },
    dayView: {
        width: '100%',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 3,
    },
    calendar: {
        borderColor: 'gray',
        height: 300,
        width: 300,
        borderRadius: 20,
        backgroundColor: 'white',
    },
});

export default ClientCalendar;
