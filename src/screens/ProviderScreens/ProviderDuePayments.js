import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import SearchContext from '../../../store/SearchContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard'
import UsersContext from '../../../store/UsersContext'
import { showMessage } from '../../resources/Functions'


const ProviderDuePayments = (props) => {
    const { requestInfoByService } = useContext(SearchContext);
    const { } = useContext(UsersContext);

    const [fromProviderPartallyPaid, setFromProviderPartallyPaid] = useState(true)

    const allRequestingDates = []

    const today = moment(new Date(), "YYYY-MM-DD")
    const day = today.format('D')
    const month = today.format('M')
    const year = today.format('YYYY')
    const todayDate = year + '-' + month + '-' + day

    const onBackHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onBackHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>الحجوزات</Text>
            </View>
        )
    }

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

    const getRequestsAccDates = () => {
        const data = getBookingInfo()
        const reqInfo = data.filter(item => {
            if (item.requestInfo.reservationDetail.length > 1) {
                //if reservation detail has more than one date
                let result = item.requestInfo.reservationDetail.find(multiItem => {
                    return multiItem.reservationDate < todayDate
                })
                return result

            } else {

                //if reservation detail has one date
               // console.log(item.requestInfo.reservationDetail[0].reservationDate, todayDate, item.requestInfo.reservationDetail[0].reservationDate < todayDate);
                return item.requestInfo.reservationDetail[0].reservationDate < todayDate
            }
        })
        return reqInfo
    }
    const getBookingInfoByDate = (resDate) => {
        const data = getRequestsAccDates()

        const reqInfo = data.filter(req => {
            if (req.requestInfo.reservationDetail.length > 1) {
                const multiReqInfo = req.requestInfo.reservationDetail.find(multiItem => {
                    return multiItem.reservationDate.slice(0, 10) == resDate
                })
                return multiReqInfo
            } else {
                return req.requestInfo.reservationDetail[0].reservationDate.slice(0, 10) == resDate
            }
        })
        return reqInfo

    }
    const collectAllRequestDates = () => {
        const data = getRequestsAccDates()

        return data.map(item => {
            if (item.requestInfo.reservationDetail.length > 1) {
                //if reservation detail has more than one date
                return item.requestInfo.reservationDetail.map(multiItem => {

                    if (!(allRequestingDates.includes(multiItem.reservationDate))) {
                        allRequestingDates.push(multiItem.reservationDate)
                    }
                })
            } else {
                //if reservation detail has one date

                requestBookingDate = item.requestInfo.reservationDetail[0].reservationDate
                if (!(allRequestingDates.includes(requestBookingDate))) {
                    allRequestingDates.push(requestBookingDate)
                }
            }
            allRequestingDates.sort();
        })
    }
    const renderBookingCard = (resDate) => {
        const data = getBookingInfoByDate(resDate)
        //console.log("data", data);
        return data.map(item => {
            return (
                <ProviderReservationCard fromProviderPartallyPaid={fromProviderPartallyPaid}  {...item} resDate={resDate} />
            )
        })
    }
    const renderBookingDates = () => {
        collectAllRequestDates()
        return allRequestingDates.map(item => {
            return (
                <View>
                    <View style={styles.dateView}>
                        <Text style={styles.dateTxt}>{moment(item).format('dddd')}</Text>
                        <Text style={styles.dateTxt}>{moment(item).format('L')}</Text>
                    </View>
                    {renderBookingCard(item)}
                </View>
            )
        })
    }


    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderBookingDates()}

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default ProviderDuePayments

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    dateView: {
        backgroundColor: colors.silver,
        width: '100%',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 5,
        marginVertical: 20,

    },
    dateTxt: {
        color: colors.puprble,
        fontSize: 18
    },
})