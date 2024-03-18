import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../../assets/AppColors'
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SearchContext from '../../../store/SearchContext'
import moment from "moment";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard'

const ProviderWaitingReply = () => {
  const { requestInfoByService } = useContext(SearchContext);
  const [fromWaitingScreen, setFromWaitingScreen] = useState(true)
  const allRequestingDates = []

  const getBookingInfo = () => {
    const reqInfo = requestInfoByService.filter(item => {
      return item.ReqStatus === 'waiting reply'
    })
    return reqInfo
  }

  const getBookingInfoByDate = (rseDate) => {
    const data = getBookingInfo()
    const reqInfo = data.filter(item => {
      return item.ReqStatus === 'waiting reply' && item.reservationDetail[0].reservationDate === rseDate
    })
    return reqInfo
  }

  const collectAllRequestDates = () => {
    const data = getBookingInfo()
    return data.map(item => {
      const requestBookingDate = moment(item.reservationDetail[0].reservationDate, "YYYY-MM-DD")
      let startingDay = requestBookingDate.format('D')
      let month = requestBookingDate.format('M')
      let year = requestBookingDate.format('YYYY')
      let completeDate = year + '-' + month + '-' + startingDay

      if (!(allRequestingDates.includes(completeDate))) {
        allRequestingDates.push(completeDate)
      }
      allRequestingDates.sort();
    })
  }

  const renderBookingCard = (rseDate) => {
    const data = getBookingInfoByDate(rseDate)
    return data.map(item => {
      return (
        <ProviderReservationCard fromWaitingScreen={fromWaitingScreen}  {...item} />
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
      <ScrollView>
        {renderBookingDates()}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  )
}

export default ProviderWaitingReply

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white'
  },

  dateTxt: {
    color: colors.puprble,
    fontSize: 20
  },

  dateView: {
    backgroundColor: colors.silver,
    width: '100%',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    marginVertical: 20
  },

})

