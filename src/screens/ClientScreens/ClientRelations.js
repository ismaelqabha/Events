import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { ScreenNames } from '../../route/ScreenNames';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import SearchContext from '../../../store/SearchContext';
import UsersContext from '../../../store/UsersContext';
import { colors } from '../../assets/AppColors';
import { images } from '../../assets/photos/images';


const ClientRelations = (props) => {
  const { userId } = useContext(UsersContext);
  const { } = useContext(SearchContext);


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
        <Text style={styles.headerTxt}>قائمة العلاقات</Text>
      </View>
    )
  }

  const searchBar = () => {
    return (
      <View style={styles.searchbar}>
        <TextInput
          style={styles.searchinput}
          keyboardType="default"
          placeholder='بحث الخدمات'
          onChangeText={(value) => setSearched(value)}
        />
        <Image style={styles.img} source={images.search} />
      </View>
    )
  }

  const renderRelation = () => {
    return (<View style={{width: '90%', alignSelf: 'center'}}>
      <View style={styles.item}>
        <Pressable>
          <Text style={styles.basicInfo}>فادي</Text>
          <Text style={styles.basicInfoTitle}>صديق</Text>
        </Pressable>
        <View style={styles.ImageView}>
        </View>
      </View>
      <View style={styles.item}>
        <Pressable>
          <Text style={styles.basicInfo}>أحمد</Text>
          <Text style={styles.basicInfoTitle}>أخ</Text>
        </Pressable>
        <View style={styles.ImageView}>
        </View>
      </View>
    </View>)
  }
  return (
    <View style={styles.container}>
      {header()}
      {searchBar()}
      <ScrollView>
        {renderRelation()}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  )
}

export default ClientRelations

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
  searchbar: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.silver,
    height: 50,
    width: '90%',
    borderRadius: 8,
  },
  searchinput: {
    alignContent: 'center',
    textAlign: 'right',
    height: 40,
    width: 250,
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  img: {
    width: 30,
    height: 30,
    marginLeft: 7,
    alignSelf: 'center'
  },
  basicInfo: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold'
  },
  basicInfoTitle: {
    fontSize: 12,
    textAlign: 'right'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10
  },
  ImageView: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginLeft: 15
  },

})