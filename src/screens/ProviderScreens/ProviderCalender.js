import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { ScreenNames } from '../../../route/ScreenNames';

const ProviderCalender = (props) => {
    return (
        <View style={styles.container}>
            <Calendar
                style={{
                    
                    borderColor: 'gray',
                    height: 400,
                    width: 350,
                    borderRadius: 20,
                    padding: 10,
                    backgroundColor: '#ffff',
                    elevation: 5,

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
                    width: 300
                }}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2012-05-01'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                    props.navigation.navigate(ScreenNames.ProviderServiceListing)
                    console.log('selected day', day);
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={day => {
                    console.log('selected day', day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MM yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={subtractMonth => subtractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                 // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                 // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
})

export default ProviderCalender;
