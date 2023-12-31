import { StyleSheet, Text, View, ScrollView, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';

const CalenderDayCard = (props) => {
    const [date, setDate] = useState(new Date())
    const [currentMonth, setcurrentMonth] = useState(date.getMonth() + 1)
    const [currentYear, setcurrentYear] = useState(date.getFullYear())


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
            //day = day + 1
            const completeDate = day + '-' + currentMonth + '-' + currentYear
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

    const onDayPress = (fulDate) => {
        navigation.navigate(ScreenNames.ProviderBookingRequest,  {fulDate})
        
    }
    const renderDaysInMonth = ({ item }) => (
        <Pressable
            style={({ pressed }) => [styles.card, pressed ? styles.monthcardPress : styles.card]}
            onPress={() => onDayPress(item.wholeDate)}
        >
            <View style={styles.body}>
                <Text style={styles.text}>
                    {item.currentDay}
                </Text>
                <Text style={styles.text}>
                    {item.dayInWord}
                </Text>
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
                    color={"black"}
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
                    color={"black"}
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
        backgroundColor: 'snow',
        borderRadius: 8,
        elevation: 5,
        margin: 5
    },
    monthcardPress: {
        width: 85,
        height: 85,
        backgroundColor: '#00bfff',
        borderRadius: 8,
        elevation: 5,
        margin: 5
    },
    title: {
        backgroundColor: 'snow',
    },
    body: {
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
        color: 'black',
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
        color: '#00bfff'
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