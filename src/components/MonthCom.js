import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';

const MonthCom = (props) => {
    const { setselectMonthforSearch, setYearforSearch } = useContext(SearchContext);
    const { onMonthSelected } = props
    const [date, setDate] = useState(new Date())

    const [allMonths, setAllMonths] = useState[months]

    let nextMonth = date.getMonth() + 1
    let monthtext = ''

    const months = []

    let firstyear = 12 - (date.getMonth() + 1)
    let secondyear = 12
    let thirdyear = 24 - (firstyear + secondyear)
    let allyear = firstyear + secondyear + thirdyear

    useEffect(() => {
        for (var i = 0; i < allyear; i++) {
            if (firstyear >= 1) {
                nextMonth = nextMonth + 1
                firstyear = firstyear - 1
                if (nextMonth == 1) {
                    monthtext = 'كانون ثاني'
                }
                if (nextMonth == 2) {
                    monthtext = 'شباط'
                }
                if (nextMonth == 3) {
                    monthtext = 'أذار'
                }
                if (nextMonth == 4) {
                    monthtext = 'نيسان'
                }
                if (nextMonth == 5) {
                    monthtext = 'أيار'
                }
                if (nextMonth == 6) {
                    monthtext = 'حزيران'
                }
                if (nextMonth == 7) {
                    monthtext = 'تموز'
                }
                if (nextMonth == 8) {
                    monthtext = 'أب'
                }
                if (nextMonth == 9) {
                    monthtext = 'أيلول'
                }
                if (nextMonth == 10) {
                    monthtext = 'تشرين أول'
                }
                if (nextMonth == 11) {
                    monthtext = 'تشرين ثاني'
                }
                if (nextMonth == 12) {
                    monthtext = 'كانون أول'
                }
                months.push(
                    {
                        mon: monthtext,
                        year: date.getFullYear(),
                        monNum: nextMonth
                    }
                )
            } else if (firstyear == 0) {
                if (nextMonth == 12) {
                    nextMonth = 0
                }
                if (secondyear >= 1) {
                    nextMonth = nextMonth + 1
                    secondyear = secondyear - 1
                    if (nextMonth == 1) {
                        monthtext = 'كانون ثاني'
                    }
                    if (nextMonth == 2) {
                        monthtext = 'شباط'
                    }
                    if (nextMonth == 3) {
                        monthtext = 'أذار'
                    }
                    if (nextMonth == 4) {
                        monthtext = 'نيسان'
                    }
                    if (nextMonth == 5) {
                        monthtext = 'أيار'
                    }
                    if (nextMonth == 6) {
                        monthtext = 'حزيران'
                    }
                    if (nextMonth == 7) {
                        monthtext = 'تموز'
                    }
                    if (nextMonth == 8) {
                        monthtext = 'أب'
                    }
                    if (nextMonth == 9) {
                        monthtext = 'أيلول'
                    }
                    if (nextMonth == 10) {
                        monthtext = 'تشرين أول'
                    }
                    if (nextMonth == 11) {
                        monthtext = 'تشرين ثاني'
                    }
                    if (nextMonth == 12) {
                        monthtext = 'كانون أول'
                    }

                    months.push(
                        {
                            mon: monthtext,
                            year: date.getFullYear() + 1,
                            monNum: nextMonth
                        }
                    )
                }

            }
            if (secondyear == 0) {

                if (nextMonth == 12) {
                    nextMonth = 0
                }
                if (thirdyear >= 1) {
                    nextMonth = nextMonth + 1
                    thirdyear = thirdyear - 1
                    if (nextMonth == 1) {
                        monthtext = 'كانون ثاني'
                    }
                    if (nextMonth == 2) {
                        monthtext = 'شباط'
                    }
                    if (nextMonth == 3) {
                        monthtext = 'أذار'
                    }
                    if (nextMonth == 4) {
                        monthtext = 'نيسان'
                    }
                    if (nextMonth == 5) {
                        monthtext = 'أيار'
                    }
                    if (nextMonth == 6) {
                        monthtext = 'حزيران'
                    }
                    if (nextMonth == 7) {
                        monthtext = 'تموز'
                    }
                    if (nextMonth == 8) {
                        monthtext = 'أب'
                    }
                    if (nextMonth == 9) {
                        monthtext = 'أيلول'
                    }
                    if (nextMonth == 10) {
                        monthtext = 'تشرين أول'
                    }
                    if (nextMonth == 11) {
                        monthtext = 'تشرين ثاني'
                    }
                    if (nextMonth == 12) {
                        monthtext = 'كانون أول'
                    }

                    months.push(
                        {
                            mon: monthtext,
                            year: date.getFullYear() + 2,
                            monNum: nextMonth
                        }
                    )
                }
            }
        }
    }, [])




    const onCardPress = (mon, year, month , monthPressed, setMonthPress) => {
        if (monthPressed) {
            setMonthPress(false)

        } else {
            setYearforSearch(year)
            onMonthSelected?.(mon)
            setMonthPress(true)
        }


    }
    const cleanSearchState = () => {
        setselectMonthforSearch(null)
    }



    const renderMonth = () => months.map(month => {
        const [monthPressed, setMonthPress] = useState(false)
        return (
            <Pressable style={[styles.monthView, monthPressed ? styles.monthViewPress : styles.monthView]}
                //onPress={() => { onCardPress(month.monNum, month.year, month, monthPressed, setMonthPress) }}
                >
                <View style={styles.MView}>
                    <Text style={styles.yearText}>
                        {month.year}
                    </Text>
                </View>
                <View style={styles.m2View}>
                    <Text style={styles.monthText}>
                        {month.monNum}
                    </Text>
                    <Text style={styles.monthText}>
                        {month.mon}
                    </Text>
                </View>
            </Pressable>)
    })

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                {renderMonth()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    monthView: {
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        width: 110,
        height: 110,
        elevation: 5,
        borderRadius: 8,
        margin: 5
    },
    monthViewPress: {
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.darkGold,
        backgroundColor: 'white',
        width: 110,
        height: 110,
        elevation: 5,
        borderRadius: 8,
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
