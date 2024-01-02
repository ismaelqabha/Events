import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../assets/AppColors'

const ProviderWaitingReply = () => {

  const renderClientInfo = () => {
    return (
      <View style={styles.info}>
        <Image style={styles.profilImg} source={require('../../assets/photos/user.png')} />
        <Text style={styles.userName}>اسماعيل كبها</Text>
      </View>
    )
  }
  const renderRequestInfo = () => {
    return (
      <View style={styles.reqInfo}>
        <Text style={styles.infoTxt}>تاريخ الطلب : 5/1/2024</Text>
        <Text style={styles.infoTxt}>تاريخ الحجز : 10/8/2024</Text>
        <Text style={styles.infoTxt}> السعر : 10000</Text>
        <View style={styles.buttonView}>
          <Pressable><Text>رفض</Text></Pressable>
          <Pressable><Text>قبول</Text></Pressable>
          <Pressable><Text>فحص الطلب</Text></Pressable>
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
    height: 150,
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
    height: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 5,
    //alignItems: 'center',
  },
  profilImg: {
    width: 60,
    height: 60,
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
  infoTxt:{
    marginVertical: 5,
    marginRight: 10,
    color: colors.puprble,
    fontSize: 15
  }
})

