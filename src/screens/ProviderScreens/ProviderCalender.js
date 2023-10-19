import React, { useState, useContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ScreenNames } from '../../../route/ScreenNames';
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../../store/SearchContext';
import CalenderServiceCard from '../../components/ProviderComponents/CalenderServiceCard';

const ProviderCalender = (props) => {
    const [date, setDate] = useState(new Date())
    const [selected, setSelected] = useState('');
    const { ServiceDataInfo, userId } = useContext(SearchContext);

    const onPressHandler = () => {
        props.navigation.goBack();
    }

     const getServiceName = () => {
    //     return ServiceDataInfo?.filter((item) => {
           
    //         console.log("item.userID", item.userID, "userId",userId);
    //         return item.userID == userId;
      //  })
    }


    const renderFiles = () => {
        const info = getServiceName();
        const ServiceInfo = info?.map(card => {
            console.log("card",card);
            return <CalenderServiceCard  {...card} />;
        });
        return ServiceInfo;
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>
            <View style={styles.body}>
                {renderFiles()}
            </View>
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
                minDate={date}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                    setSelected(day.dateString);
                    // props.navigation.navigate(ScreenNames.ProviderServiceListing)
                    console.log('selected day', selected);
                }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={day => {
                    console.log('selected day', day.year);
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
        // justifyContent: 'center',

    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    body: {
        //flex: 1,
        alignItems: 'center',
        marginTop: 40,
        borderWidth:1
    }
})

export default ProviderCalender;
