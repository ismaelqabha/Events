import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../assets/AppColors'
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const ProviderWaitingReply = () => {

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

  return (
    <View>
      {renderClientCard()}
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

