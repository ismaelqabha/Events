import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import Entypo from "react-native-vector-icons/Entypo"
import SearchContext from '../../../store/SearchContext';
import { ScreenNames } from '../../../route/ScreenNames';

const ProviderSales = (props) => {
    const { requestInfoByService } = useContext(SearchContext);

    const [requestAccUserSelect, setRequestAccUserSelect] = useState([])
    const [selectedSpacificDate, setSelectedSpacificDate] = useState("YYYY/MM/DD")

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [spacificDate, setspacificDate] = useState(false)
    const [month, setMonth] = useState(true)
    const [year, setYear] = useState(false)

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={onPressHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </TouchableOpacity>
                <Text style={styles.headerTxt}>المبيعات</Text>
            </View>
        )
    }

    useEffect(() => {
        var todayDate = new Date();
        todayDate.setHours(0);
        todayDate.setMinutes(0);
        todayDate.setSeconds(0);
        todayDate.setMilliseconds(0);
        filterReqAccMonth(todayDate)
    }, [])

    const spacificDatePress = () => {
        setspacificDate(true)
        setMonth(false)
        setYear(false)
        filterReqAccDate()
    }
    const monthPress = () => {
        setspacificDate(false)
        setMonth(true)
        setYear(false)
        filterReqAccMonth(selectedSpacificDate)

    }
    const yearPress = () => {
        setspacificDate(false)
        setMonth(false)
        setYear(true)
        filterReqAccYear(selectedSpacificDate)

    }

    const filterReqAccDate = () => {
        const filterData = requestInfoByService.filter(item => {
            const resDetail = item.requestInfo.reservationDetail
            return resDetail.find(elem => {
                // console.log(elem.reservationDate , selectedSpacificDate, elem.reservationDate == selectedSpacificDate);
                return elem.reservationDate == selectedSpacificDate
            })
        })
        setRequestAccUserSelect(filterData)
    }
    const filterReqAccMonth = (Date) => {
        const SelectedDate = moment(Date, "YYYY-MM-DD")
        const selectMonth = SelectedDate.format('M')
        const selectYear = SelectedDate.format('YYYY')

        var requestBookingDate = ''
        var requestMonth = ''
        var requestYear = ''

        const reqInfo = requestInfoByService.filter(req => {
            const resDetail = req.requestInfo.reservationDetail
            const multiReqInfo = resDetail.find(multiItem => {

                requestBookingDate = moment(multiItem.reservationDate, "YYYY-MM-DD")
                requestMonth = requestBookingDate.format('M')
                requestYear = requestBookingDate.format('YYYY')

                return requestMonth === selectMonth && requestYear === selectYear
            })
            return multiReqInfo

        })
        setRequestAccUserSelect(reqInfo)
    }
    const filterReqAccYear = (Date) => {
        const SelectedDate = moment(Date, "YYYY-MM-DD")
        const selectYear = SelectedDate.format('YYYY')

        var requestBookingDate = ''
        var requestYear = ''

        const reqInfo = requestInfoByService.filter(req => {
            const resDetail = req.requestInfo.reservationDetail
            const multiReqInfo = resDetail.find(multiItem => {

                requestBookingDate = moment(multiItem.reservationDate, "YYYY-MM-DD")
                requestYear = requestBookingDate.format('YYYY')

                return requestYear === selectYear
            })
            return multiReqInfo

        })
        setRequestAccUserSelect(reqInfo)
    }

    const filterAllRequest = () => {
        const filterData = requestAccUserSelect.filter(item => {
            return item.requestInfo.ReqStatus === 'partially paid'
                || item.requestInfo.ReqStatus === 'completed' || item.requestInfo.ReqStatus === 'paid'
        })
        return filterData
    }
    const filterPaidRequest = () => {
        const filterData = requestAccUserSelect.filter(item => {
            return item.requestInfo.ReqStatus === 'completed' || item.requestInfo.ReqStatus === 'paid'
        })
        return filterData
    }
    const filterUnpaidAllRequest = () => {
        const filterData = requestAccUserSelect.filter(item => {
            return item.requestInfo.ReqStatus === 'partially paid'
        })
        return filterData
    }

    const whenDealPress = (data , label) => {
        if(data.length > 0){
            props.navigation.navigate(ScreenNames.ProviderSalesShow, { data, label })
        }
       
    }

    const allSales = () => {
        const data = filterAllRequest()
        var sum = 0
        data.forEach(element => {
            sum = sum + element.requestInfo.Cost
        });
        var label = 'كل الصفقات'

        return (
            <View style={styles.detailView}>
                <View style={styles.detailRow}>
                    <View style={styles.detailValue}>
                        <Text style={styles.textStyle} >{data.length}</Text>
                    </View>
                    <TouchableOpacity onPress={() => whenDealPress(data, label)} style={styles.detailLabel}>
                        <Text style={styles.textStyle}>العدد الكلي</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailRow}>
                    <View style={styles.detailValue}>
                        <Text style={styles.textStyle} >{sum}</Text>
                    </View>
                    <View style={styles.detailLabel}>
                        <Text style={styles.textStyle}>المجموع</Text>
                    </View>
                </View>
            </View>
        )
    }
    const completeSalesPaid = () => {
        const data = filterPaidRequest()
        var sum = 0
        data.forEach(element => {
            sum = sum + element.requestInfo.Cost
        });
        var label = 'الصفقات المكتملة الدفع'
        return (
            <View style={styles.detailView}>
                <View style={styles.detailRow}>
                    <View style={styles.detailValue}>
                        <Text style={styles.textStyle} >{data.length}</Text>
                    </View>
                    <TouchableOpacity onPress={() => whenDealPress(data, label)} style={styles.detailLabel}>
                        <Text style={styles.textStyle}>مكتمل الدفع</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailRow}>
                    <View style={styles.detailValue}>
                        <Text style={styles.textStyle} >{sum}</Text>
                    </View>
                    <View style={styles.detailLabel}>
                        <Text style={styles.textStyle}>المجموع</Text>
                    </View>
                </View>

            </View>
        )
    }
    const unCompleteSalesPaid = () => {
        const data = filterUnpaidAllRequest()

        var paidSum = 0
        var unPaidSum = 0

        data.forEach(element => {
            const payment = element.requestInfo.paymentInfo
            payment.forEach(itemPay => {
                const reqCost = element.requestInfo.Cost
                const paymentPers = itemPay.pers

                const fact = reqCost * paymentPers;
                const realAmount = fact / 100;

                if (itemPay.paymentStutes === 'paid') {
                    paidSum = paidSum + realAmount
                }
                if (itemPay.paymentStutes === 'not paid') {
                    unPaidSum = unPaidSum + realAmount
                }
            });
        });
        var label = 'الصفقات غير مكتملة الدفع'
        return (
            <View style={styles.unCompletView}>
                <View style={styles.unCompletRow}>
                    <View style={styles.detailValue}>
                        <Text style={styles.textStyle} >{data.length}</Text>
                    </View>
                    <TouchableOpacity onPress={() => whenDealPress(data, label)} style={styles.detailLabel}>
                        <Text style={styles.textStyle}>غير مكتمل الدفع</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.unCompletRow}>
                    <View style={styles.detailValue}>
                        <Text style={styles.textStyle} >{paidSum}</Text>
                    </View>
                    <View style={styles.detailLabel}>
                        <Text style={styles.textStyle}>المدفوع</Text>
                    </View>
                </View>
                <View style={styles.unCompletRow}>
                    <View style={styles.detailValue}>
                        <Text style={styles.textStyle} >{unPaidSum}</Text>
                    </View>
                    <View style={styles.detailLabel}>
                        <Text style={styles.textStyle}>بانتظار الدفع</Text>
                    </View>
                </View>

            </View>
        )
    }
    const renderSalesDetail = () => {
        return (
            <View style={styles.detail}>
                <Text style={styles.detailheaderText}>تفاصيل الصفقات</Text>
                {allSales()}
                {completeSalesPaid()}
                {unCompleteSalesPaid()}
            </View>
        )
    }

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        setSelectedSpacificDate(fDate);
        if (spacificDate) {
            filterReqAccDate()
        }
        if (month) {
            filterReqAccMonth(fDate)
        }
        if (year) {
            filterReqAccYear(fDate)
        }
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const renderCalender = () => {
        return (
            <View style={styles.selectDateView}>
                <TouchableOpacity onPress={() => showMode('date')} >
                    <View style={styles.viewDate}>
                        <Text style={styles.textStyle}>{selectedSpacificDate || "YYYY/MM/DD"}</Text>
                        <Entypo
                            name='calendar'
                            style={{ fontSize: 25, color: colors.puprble, paddingHorizontal: 20 }}
                        />
                    </View>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='spinner'
                        onChange={onChange}
                    />
                )}
            </View>
        )
    }
    const renderFilter = () => {
        return (
            <View style={styles.choicesView}>

                <TouchableOpacity style={[styles.Dview, year ? styles.DviewPress : styles.Dview]} onPress={yearPress}>
                    <Text style={[styles.filtertxt, year ? styles.filtertxtPress : styles.filtertxt]}>سنة</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Dview, month ? styles.DviewPress : styles.Dview]} onPress={monthPress}>
                    <Text style={[styles.filtertxt, month ? styles.filtertxtPress : styles.filtertxt]}>شهر</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Dview, spacificDate ? styles.DviewPress : styles.Dview]} onPress={spacificDatePress}>
                    <Text style={[styles.filtertxt, spacificDate ? styles.filtertxtPress : styles.filtertxt]}>تاريخ</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {header()}
            {renderCalender()}
            {renderFilter()}
            {renderSalesDetail()}
        </View>
    )
}

export default ProviderSales

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },

    headerTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    detail: {
        width: '100%',
    },
    detailView: {
        width: '90%',
        height: 120,
        borderWidth: 2,
        borderColor: colors.silver,
        alignSelf: 'center',
        margin: 10,
        borderRadius: 10
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        // borderWidth: 1,
    },
    detailLabel: {
        width: '50%',
        height: '100%',
        borderWidth: 2,
        borderColor: colors.silver,
        justifyContent: 'center',
        paddingRight: 10,
        backgroundColor: 'white',
    },
    detailValue: {
        width: '50%',
        height: '100%',
        borderWidth: 2,
        borderColor: colors.silver,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    unCompletView: {
        width: '90%',
        height: 170,
        borderWidth: 2,
        borderColor: colors.silver,
        alignSelf: 'center',
        margin: 10,
        borderRadius: 10
    },
    unCompletRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '33.33%',
        // borderWidth: 1,
    },

    textStyle: {
        fontSize: 18,
        color: colors.puprble
    },
    detailheaderText: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 20
    },
    selectDateView: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
    },
    viewDate: {
        flexDirection: 'row',
        height: 40,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'lightgray',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        elevation: 5
    },
    choicesView: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: colors.puprble,
        width: '60%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 20,

    },
    Dview: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '33%',
        height: 50,
        backgroundColor: colors.puprble,
        borderRadius: 10,
        //elevation: 5,
        margin: 5
    },
    DviewPress: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '33%',
        height: 50,
        backgroundColor: colors.darkGold,
        borderRadius: 10,
        elevation: 5,
        margin: 5
    },
    filtertxt: {
        color: colors.silver,
        fontSize: 20
    },
    filtertxtPress: {
        color: colors.puprble,
        fontSize: 20
    },

})