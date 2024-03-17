import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../../assets/AppColors'
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SearchContext from '../../../store/SearchContext'
import moment from "moment";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard'

const ProviderWaitingReply = () => {
  const { requestInfoByService } = useContext(SearchContext);

  const getBookingInfo = () => {
    const reqInfo = requestInfoByService.filter(item => {
      return item.ReqStatus === 'waiting reply'
    })
    return reqInfo
  }

  const getBookingInfoByDate = (rseDate) => {
    const data = getBookingInfo()
    const reqInfo = data.filter(item => {
      return item.ReqStatus === 'waiting reply' && moment(item.reservationDetail[0].reservationDate).format('L') === rseDate
    })
    return reqInfo
  }

  const renderClientInfo = () => {
    return (
      <View style={styles.info}>
        <Image style={styles.profilImg} source={require('../../assets/photos/user.png')} />
        <Text style={styles.userName}>اسماعيل كبها</Text>
      </View>
    )
  }
  const renderRequestDate = () => {
    return (
      <View style={styles.dateview}>
        <View>
          <Text style={styles.dateTxt}>5/1/2024</Text>
          <Text style={styles.labelDateTxt}>تاريخ الطلب</Text>
        </View>
        <View style={styles.IconView}>
          <Fontisto
            name={"date"}
            color={colors.puprble}
            size={15} />
        </View>
      </View>
    )
  }
  const renderBookingDate = () => {
    return (
      <View style={styles.dateview}>
        <View>
          <Text style={styles.dateTxt}>10/8/2024</Text>
          <Text style={styles.labelDateTxt}>تاريخ الحجز</Text>
        </View>
        <View style={styles.IconView}>
          <Fontisto
            name={"date"}
            color={colors.puprble}
            size={15} />
        </View>
      </View>
    )
  }
  const renderPrice = () => {
    return (
      <View style={styles.dateview}>
        <View>
          <Text style={styles.dateTxt}>10000</Text>
        </View>
        <View style={styles.IconView}>
          <MaterialIcons
            name={"payments"}
            color={colors.puprble}
            size={15} />
        </View>
      </View>
    )
  }
  const renderRequestInfo = () => {
    return (
      <View style={styles.reqInfo}>
        {renderRequestDate()}
        {renderBookingDate()}
        {renderPrice()}
        <View style={styles.buttonView}>
          <Pressable><Text style={styles.buttonTxt}>رفض</Text></Pressable>
          <Pressable><Text style={styles.buttonTxt}>فحص الطلب</Text></Pressable>
          <Pressable><Text style={styles.buttonTxt}>قبول</Text></Pressable>
        </View>
      </View>
    )
  }

  const renderClientCard = () => {
    return (
      <View style={styles.card}>
        {renderRequestInfo()}
        {renderClientInfo()}
      </View>
    )
  }

  const renderBookingDates = () => {
    const data = getBookingInfo()
    return data.map(item => {
      return (
        <View>
          <View style={{ backgroundColor: colors.silver, width: '100%' }}>
            <Text>{moment(item.reservationDetail[0].reservationDate).format('L')}</Text>
          </View>
          {renderBookingCard(moment(item.reservationDetail[0].reservationDate).format('L'))}
        </View>
      )
    })
  }

  const renderBookingCard = (rseDate) => {
    const data = getBookingInfoByDate(rseDate)
    return data.map(item => {
      return (
        <ProviderReservationCard  {...item} />
      )
    })
  }

  return (
    <View>
      {/* {renderClientCard()} */}
      <ScrollView>
        {renderBookingDates()}
      </ScrollView>

    </View>
  )
}

export default ProviderWaitingReply

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '90%',
    height: 190,
    alignSelf: 'center',
    margin: 10
  },
  info: {
    width: '40%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: colors.darkGold,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reqInfo: {
    width: '60%',
    height: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 5,
    padding: 5
    //alignItems: 'center',
  },
  profilImg: {
    width: 70,
    height: 80,
    borderRadius: 10,
    backgroundColor: colors.BGScereen,
    marginBottom: 10
  },
  userName: {
    fontSize: 15,
    color: 'white'
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  buttonTxt: {
    fontSize: 17
  },
  dateview: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5
  },
  dateTxt: {
    color: colors.puprble,
    fontSize: 20
  },
  labelDateTxt: {
    fontSize: 15
  },
  IconView: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginLeft: 15
  },
})

