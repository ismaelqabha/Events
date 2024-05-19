import { StyleSheet, Text, View, ScrollView, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';
import { colors } from '../../assets/AppColors';
import SearchContext from '../../../store/SearchContext';

const CalenderDayCard = (props) => {

    const { bookingDates, requestInfoByService } = useContext(SearchContext);
    const [date, setDate] = useState(new Date())
    const [currentMonth, setcurrentMonth] = useState(date.getMonth() + 1)
    const [currentYear, setcurrentYear] = useState(date.getFullYear())

    //const [numBooking, setNumBooking] = useState()
   // console.log("requestInfoByService", requestInfoByService);

    var isDayFull = false
var numBooking = 0
    const navigation = useNavigation();
    const daysInMonth = moment(currentYear + '-' + currentMonth).daysInMonth()

    const pressNextMonth = () => {
        if (currentMonth >= 12) {
            setcurrentMonth(1)
            setcurrentYear(currentYear + 1)
        } else {
            setcurrentMonth(currentMonth + 1)
        }

    }
    const pressBackMonth = () => {
        if (currentMonth <= 1) {
            setcurrentMonth(12)
            setcurrentYear(currentYear - 1)
        } else {
            setcurrentMonth(currentMonth - 1)
        }
    }
    const fillMonthDays = () => {
        const fullDate = []

        for (var day = 1; day <= daysInMonth; day++) {
            const completeDate = currentYear + '-' + currentMonth + '-' + day

            fullDate.push(
                {
                    currentDay: day,
                    dayInWord: moment(completeDate).format('dddd'),
                    wholeDate: completeDate
                    //monthInWord: moment(currentYear + '-' + currentMonth).format('MMMM')
                }
            )
        }

        return fullDate;
    }

    const oneDay = fillMonthDays();

    useEffect(() => {
    }, [])


    const onDayPress = (fulDate) => {
        navigation.navigate(ScreenNames.ProviderBookingRequest, { fulDate, bookingDates })
    }

    ///// get how many reservation per date 
    const getBookingInfo = () => {
        if (requestInfoByService.message !== "no Request") {
            const reqInfo = requestInfoByService.filter(item => {
                return item.requestInfo.ReqStatus === 'partally paid'
            })
            return reqInfo
        } else {
            return []
        }
    }
    const getNumOfBooking = (fDate) => {
        const data = getBookingInfo()
        const reqNum = data.filter(item => {
            if (item.requestInfo.reservationDetail.length > 1) {
                //if reservation detail has more than one date
                let result = item.requestInfo.reservationDetail.find(multiItem => {
                    return multiItem.reservationDate == fDate
                })
                return result

            } else {

                //if reservation detail has one date
                return item.requestInfo.reservationDetail[0].reservationDate == fDate
            }
        })
        return reqNum
    }

    //// return which date is full and not 
    const filterBookingDate = (fDate) => {
        const numBookingResult = getNumOfBooking(fDate)
        numBooking = numBookingResult.length

        const bookDate = bookingDates[0].dates.filter(element => {
            return element.time == fDate
        })

        if (bookDate.length >= 1) {
            isDayFull = true
        } else {
            isDayFull = false
        }
    }


    const renderDaysInMonth = ({ item }) => (

        <Pressable
            style={styles.card}
            onPress={() => onDayPress(item.wholeDate)}
        >
            {bookingDates && filterBookingDate(item.wholeDate)}
            <View style={[styles.head, isDayFull ? styles.closeDayHead : styles.head]}>
                <Text style={styles.datetxt}>
                    {item.dayInWord}
                </Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.text}>
                    {item.currentDay}
                </Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.resText}>{"(" + numBooking + ")"}</Text>
            </View>
        </Pressable>
    )

    const renderTitle = () => {
        return (<View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
            <Pressable style={({ pressed }) =>
                [styles.viewYear, pressed ? styles.viewYearpress : styles.viewYear]}
                onPress={pressBackMonth}>
                <AntDesign
                    style={styles.iconNext}
                    name={"left"}
                    color={"gray"}
                    size={25} /></Pressable>
            <Pressable style={{ flexDirection: 'row' }}>
                <Text style={styles.txtYear}>{currentMonth + '/'}</Text>
                <Text style={styles.txtYear}>{currentYear}</Text>
            </Pressable>
            <Pressable style={({ pressed }) =>
                [styles.viewYear, pressed ? styles.viewYearpress : styles.viewYear]}
                onPress={pressNextMonth}>
                <AntDesign
                    style={styles.iconBack}
                    name={"right"}
                    color={"gray"}
                    size={25} />
            </Pressable>
        </View>);
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                {renderTitle()}
            </View>
            <FlatList
                data={oneDay}
                renderItem={renderDaysInMonth}
                numColumns={4}
            />
            {/* <ScrollView contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                {renderDaysInMonth()}
            </ScrollView> */}
        </View>
    )
}

export default CalenderDayCard

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        width: 85,
        height: 85,
        // backgroundColor: 'snow',
        borderRadius: 8,
        elevation: 5,
        margin: 5
    },
    monthcardPress: {
        width: 85,
        height: 85,
        backgroundColor: 'red',
        borderRadius: 8,
        elevation: 5,
        margin: 5
    },
    title: {
        backgroundColor: 'snow',
    },
    head: {
        alignItems: 'center',
        backgroundColor: 'green',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: '30%'
    },
    closeDayHead: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: '30%'
    },
    body: {
        alignItems: 'center',
        backgroundColor: colors.silver,
        height: '40%',
        justifyContent: 'center',
        //borderWidth: 1
    },
    footer: {
        alignItems: 'flex-end',
        backgroundColor: colors.silver,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: '30%'
        //borderWidth: 1
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    resText: {
        fontSize: 15,
    },
    datetxt: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    iconNext: {
        //marginRight: 20,
    },
    iconBack: {
        // marginLeft: 20,
    },
    txtYear: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble
    },
    viewYear: {
        //backgroundColor: 'white'
    },
    viewYearpress: {
        backgroundColor: '#00bfff',
        borderRadius: 5
    },
    home: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})