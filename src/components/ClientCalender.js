import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ScreenNames } from '../../../route/ScreenNames';
import { useState } from 'react';
import SearchContext from '../../store/SearchContext';

const ClientCalender = (props) => {
    const {selectDateforSearch, setselectDateforSearch} = useContext(SearchContext);
    const [selected, setSelected] = useState('')
    const [date, setDate] = useState(new Date())


    useEffect(()=> {
         setselectDateforSearch(null)   
    },[])
    
    return (
        <View style={styles.container}>
            <Calendar
                
                style={{

                    borderColor: 'gray',
                    height: 250,
                    width: 300,
                    borderRadius: 20,
                    //padding: 10,
                    backgroundColor: 'snow',
                    // elevation: 5,

                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: 'red',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'red',
                    monthTextColor: 'black',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontSize: 20,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 14,
                    width: 200
                }}

                minDate={date}
                maxDate='2023-12-31'
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
})

export default ClientCalender;
