import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useContext} from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard';
import { colors } from '../../assets/AppColors';
import moment from "moment";
import SearchContext from '../../../store/SearchContext';

const ProviderBookingRequest = (props) => {
  const { fulDate } = props.route?.params || {}

  const { requestInfoByService } =useContext(SearchContext);

  const selectedDate = moment(fulDate).format('L')

  const onPressHandler = () => {
    props.navigation.goBack();
  }
  
  const getBookingInfo = () => {
    const reqInfo =  requestInfoByService.filter(item => {
      return item.ReqStatus === 'paid' && moment(item.reservationDetail[0].reservationDate).format('L') === selectedDate
    })
    return reqInfo
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

  const renderSelectedDate = () => {
    return (
      <View style={styles.dateView}>
        <Text style={styles.txt}>{moment(fulDate).format('dddd')}</Text>
        <Text style={styles.txt}>{selectedDate}</Text>
      </View>
    )
  }


  const renderBookingCard = () => {
    const data = getBookingInfo()
    return data.map(item => {
      return (
        <ProviderReservationCard  {...item} />
      )
    })
  }

  return (
    <View style={styles.container}>
      {header()}
      {renderSelectedDate()}
      {renderBookingCard()}

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