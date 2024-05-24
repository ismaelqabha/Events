import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { ScreenNames } from '../../route/ScreenNames';
import DateTimePicker from '@react-native-community/datetimepicker';

import SearchContext from '../../../store/SearchContext';
import UsersContext from '../../../store/UsersContext';
import { colors } from '../../assets/AppColors';

const ClientPayment = (props) => {
  const { userId } = useContext(UsersContext);
  const { requestInfoAccUser } = useContext(SearchContext);

  console.log("requestInfoAccUser", requestInfoAccUser[0].payments);
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
        <Text style={styles.headerTxt}>دفعاتي</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {header()}
      <ScrollView>
        {/* {renderRequestData()} */}

        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  )
}

export default ClientPayment

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