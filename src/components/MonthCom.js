import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import moment from "moment";
import 'moment/locale/ar-ly'
import { SelectList } from 'react-native-dropdown-select-list';

const MonthCom = (props) => {
    const { setselectMonthforSearch, setYearforSearch, yearforSearch } = useContext(SearchContext);
    const { onMonthSelected } = props
    const [date, setDate] = useState(new Date())

    const [monthsData, setmonthsData] = useState()
    const [selectedMonth, setSelectedMonth] = useState()
    const MonthItem = []



    const onCardPress = (year, month, monthPressed, setMonthPress) => {
        setMonthPress(!monthPressed)
        onMonthSelected(month)
        setYearforSearch(year)

    }
    const cleanSearchState = () => {
        setselectMonthforSearch(null)
    }





    const createMonth = () => {
        const today = moment(date, "YYYY-MM-DD")
        let month = today.format('M')
        let year = today.format('YYYY')
        for (var i = 0; i < 3; i++) {
            for (var index = month; index <= 12; index++) {
                let completeDate = year + '-' + index + '-' + 1
                const MInword = moment(completeDate, "YYYY-MM-DD")
                let MWord = MInword.format('MMMM')
                MonthItem.push(
                    {
                        M: index,
                        Y: year,
                        monthInWord: MWord
                    }
                )
            }
            month = 1
            year++
        }
        
    }

    const x = () => {
        createMonth()
        // setmonthsData(MonthItem)
    }

    const renderM = () => {
        //createMonth()
        const monthArray = MonthItem.map(item => {
            const [monthPressed, setMonthPress] = useState(false)
            return (<Pressable style={[styles.monthView, monthPressed ? styles.monthViewPress : styles.monthView]}
                onPress={() => { onCardPress(item.Y, item.M, monthPressed, setMonthPress) }}>
                <View style={styles.MView}>
                    <Text style={styles.yearText}>
                        {item.Y}
                    </Text>
                </View>
                <View style={styles.m2View}>
                    <Text style={styles.monthText}>
                        {item.monthInWord}
                    </Text>
                    <Text style={styles.monthText}>
                        {item.M}
                    </Text>
                </View>
            </Pressable>
            )
        })

        return monthArray

    }

    

    const renderMoYe = () => {
        x()
        return (
            <View>
                <SelectList
                    data={MonthItem}
                    setSelected={val => {
                        setSelectedMonth(val);
                    }}
                    placeholder={"أختر الشهر"}
                    boxStyles={styles.dropdown}
                    inputStyles={styles.droptext}
                    dropdownTextStyles={styles.dropstyle}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                {/* {renderMonth()} */}
                {renderM()}
                {renderMoYe()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    monthView: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: 100,
        height: 90,
        elevation: 5,
        borderRadius: 8,
        margin: 5
    },
    monthViewPress: {
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.darkGold,
        backgroundColor: 'white',
        width: 100,
        height: 90,
        elevation: 5,
        borderRadius: 11,
        margin: 5
    },
    monthText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
    },
    yearText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.BGScereen,
    },
    monthText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
    },
    MView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.puprble,
        width: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 35
    },
    m2View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 40,
        height: 40
    }
})

export default MonthCom;
