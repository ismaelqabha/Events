import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ScreenNames } from '../../../route/ScreenNames';
import { useState } from 'react';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import { Pressable } from 'react-native';

const ClientCalender = (props) => {
    const { selectDateforSearch, setselectDateforSearch } = useContext(SearchContext);
    const [selected, setSelected] = useState('')
    const [date, setDate] = useState(new Date())


    useEffect(() => {
        setselectDateforSearch(null)
    }, [])

    return (
        <View style={styles.container}>
            <View style={ styles.dayView}>
                <Pressable style={ styles.dayRange}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, lineHeight: 20 }}>+</Text>
                        <Text style={{ fontSize: 20, lineHeight: 12 }}>-</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>1 ايام</Text>
                </Pressable>
                <Pressable style={ styles.dayRange}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, lineHeight: 20 }}>+</Text>
                        <Text style={{ fontSize: 20, lineHeight: 12 }}>-</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>3 ايام</Text>
                </Pressable>
                <Pressable style={ styles.dayRange}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, lineHeight: 20 }}>+</Text>
                        <Text style={{ fontSize: 20, lineHeight: 12 }}>-</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>7 ايام</Text>
                </Pressable>
            </View>
            <Calendar
                style={{
                    borderColor: 'gray',
                    height: 240,
                    width: 300,
                    borderRadius: 20,
                    //padding: 10,
                    backgroundColor: 'white',
                    // elevation: 5,

                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: colors.puprble,
                    selectedDayTextColor: 'green',
                    todayTextColor: '#00adf5',
                    dayTextColor: colors.gold,
                    textDisabledColor: '#d9e1e8',
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
                    width: 200
                }}

                minDate={date}
                //maxDate='2023-12-31'
                onDayPress={day => {
                    setselectDateforSearch(day.dateString);
                    setSelected(day.dateString)
                    console.log('selected da **', day.dateString);
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
                    console.log('month changed', month);
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
        width: 80, height: 40,
        borderRadius: 15,
        marginHorizontal :10
    },
    dayRangeSelected: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: colors.puprble,
        alignItems: 'center',
        width: 80, height: 40,
        borderRadius: 15,
        marginHorizontal :10
    },
    dayView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', 
        marginTop: 10,
    }
})

export default ClientCalender;
