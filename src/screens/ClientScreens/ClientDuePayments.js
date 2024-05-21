import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import SearchContext from '../../../store/SearchContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import BookingCard from '../../components/BookingCard'
import UsersContext from '../../../store/UsersContext'
import { showMessage } from '../../resources/Functions'

const ClientDuePayments = (props) => {
    const { requestInfoAccUser } = useContext(SearchContext);
    const { } = useContext(UsersContext);


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
                <Text style={styles.headerTxt}>الحجوزات المستحقة الدفع</Text>
            </View>
        )
    }

    const queryRequest = () => {
        if (requestInfoAccUser.message !== "no Request") {
            const clientReq = requestInfoAccUser.filter(item => {
                return item.requestInfo.ReqStatus === 'partally paid' && item.requestInfo.reservationDetail[0].reservationDate < todayDate
            })
            return clientReq
        } else {
            return []
        }
    }

    const renderRequestData = () => {
        const reqData = queryRequest()
        return reqData.map(item => {
            return <BookingCard {...item.requestInfo}
            services={item?.serviceData}
            images={item?.serviceImage}
            relatedCamp={item?.serviceCamp} />
        })
    }

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
            {renderRequestData()}

                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default ClientDuePayments

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
})