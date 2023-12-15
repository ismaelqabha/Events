import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../../assets/AppColors'
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchContext from '../../../store/SearchContext';

const ProviderNotification = () => {
  const { serviceTitle } = useContext(SearchContext);

  const onPressHandler = () => {
    props.navigation.goBack();
  }
  const header = () => {
    return (
      <View style={styles.header}>
        <Pressable onPress={onPressHandler}
        >
          <AntDesign
            name={"left"}
            color={"black"}
            size={20} />

        </Pressable>
        <Text style={styles.headerTxt}>الاشعارات</Text>

      </View>
    )
  }

  const renderNotfication = () => {
    return (
      <View style={styles.notifView}>
        <View style={styles.notiftxtView}>
          <Text style={styles.notiftxt}>أحمد كبها قام بطلب حجز وينتظر الرد </Text>
          <Text style={styles.timetxt}>قبل 3 ساعات</Text>
        </View>
        <Image source={require('../../assets/photos/ameer.png')} style={styles.img} />

      </View>
    )
  }
  const renderNotfication1 = () => {
    return (
      <View style={styles.notifView}>
        <View style={styles.notiftxtView}>
          <Text style={styles.notiftxt}>قام خالد بالدفع لتثبيت الحجز</Text>
          <Text style={styles.timetxt}>الاربعاء 15:06م</Text>
        </View>
        <Image source={require('../../assets/photos/almasa.png')} style={styles.img} />

      </View>
    )
  }
  const renderSeeAll = () => {
    return (
      <View style={styles.seeallview}>
        <Text style={styles.seeAlltxt}>مشاهدة الكل</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {header()}
      <Text style={styles.serviceTxt}>{serviceTitle}</Text>
      {renderNotfication()}
      {renderNotfication1()}
      {renderSeeAll()}
    </View>
  )
}

export default ProviderNotification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BGScereen
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,

  },
  headerTxt: {
    fontSize: 20,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  serviceTxt: {
    fontSize: 16,
    color: colors.puprble,
    padding: 20
  },
  notifView: {
    width: '90%',
    height: 70,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5
  },
  notiftxtView: {
    justifyContent: 'space-between'
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 20
  },
  timetxt: {
    marginTop: '5%'
  },
  notiftxt: {
    fontSize: 16,
  },
  seeallview: {
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 8,
    alignItems:'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 20
  },
  seeAlltxt:{
    fontSize: 16,
    color: colors.puprble,
  }
})