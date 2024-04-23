import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard';
import { colors } from '../../assets/AppColors';
import moment from "moment";
import SearchContext from '../../../store/SearchContext';

const ProviderBookingRequest = (props) => {
  const { fulDate, mutibleReservation, filterdRequestAccUser } = props.route?.params || {}
  const { requestInfoByService } = useContext(SearchContext);

  const [fromReservationScreen, setfromReservationScreen] = useState(true)
  const selectedDate = moment(fulDate).format('L')
  const manageArrayDates = []

  const onPressHandler = () => {
    props.navigation.goBack();
  }

  const header = () => {
    return (
      <View style={styles.title}>
        <Pressable onPress={onPressHandler}
        >
          <Ionicons
            style={styles.icon}
            name={"arrow-back"}
            color={"black"}
            size={25} />
        </Pressable>
        <Text style={styles.txt}>الحجوزات</Text>
      </View>
    )
  }

  ///// searching according spacific data

  const getBookingInfo = () => {
    const reqInfo = requestInfoByService.filter(item => {
      return item.requestInfo.ReqStatus === 'paid' && item.requestInfo.reservationDetail[0].reservationDate === fulDate
    })
    return reqInfo
  }

  const renderBookingCard = () => {
    const data = getBookingInfo()
    return data.map(item => {
      return (
        <ProviderReservationCard fromReservationScreen={fromReservationScreen} {...item} />
      )
    })
  }

  const renderSelectedDate = () => {
    return (
      <View>
        <View style={styles.dateView}>
          <Text style={styles.txt}>{moment(fulDate).format('dddd')}</Text>
          <Text style={styles.txt}>{selectedDate}</Text>
        </View>
        {renderBookingCard()}
      </View>
    )
  }


 
//////// Searching by Client Name

  const manageDatesusingSearchbyName = () => {
    let requestBookingDate = ''
    const data = filterdRequestAccUser

    return data.map(item => {

      if (item.requestInfo.reservationDetail.length > 1) {
        return item.requestInfo.reservationDetail.map(multiItem => {
          requestBookingDate = multiItem.reservationDate

          if (!(manageArrayDates.includes(requestBookingDate))) {
            manageArrayDates.push(requestBookingDate)
          }
        })
      } else {
        requestBookingDate = item.requestInfo.reservationDetail[0].reservationDate

        if (!(manageArrayDates.includes(requestBookingDate))) {
          manageArrayDates.push(requestBookingDate)
        }
      }
      manageArrayDates.sort();
    })
  }

  const filterReqAccUserId = (resDate) => {
    const data = filterdRequestAccUser
   
    const reqInfo = data.filter(item => {
      if (item.requestInfo.reservationDetail.length > 1) {
        return item.requestInfo.reservationDetail.find(multiItem => {
          return  multiItem.reservationDate === resDate
        })
      } else {
        return item.requestInfo.reservationDetail[0].reservationDate === resDate
      }

    })
    return reqInfo
  }


  const renderBookingCardforSearch = (resDate) => {
    const data = filterReqAccUserId(resDate)

    return data.map(item => {
      return (
        <ProviderReservationCard fromReservationScreen={fromReservationScreen}  {...item} resDate={resDate} />
      )
    })
  }

  const renderRequestAccUserName = () => {
    manageDatesusingSearchbyName()
    return manageArrayDates.map(item => {
      return (
        <View>
          <View style={styles.dateView}>
            <Text style={styles.txt}>{moment(item).format('dddd')}</Text>
            <Text style={styles.txt}>{moment(item).format('L')}</Text>
          </View>
          {renderBookingCardforSearch(item)}
        </View>
      )
    })
  }


  return (
    <View style={styles.container}>
      {header()}
      {mutibleReservation ? renderRequestAccUserName() : renderSelectedDate()}
    </View>
  )
}


export default ProviderBookingRequest

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  txt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 20,
    color: 'black'
  },
  dateView: {
    backgroundColor: colors.silver,
    height: 30,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  }
})