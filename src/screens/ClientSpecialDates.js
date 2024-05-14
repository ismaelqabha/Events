import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { colors } from "../assets/AppColors"
import { ScreenNames } from '../../route/ScreenNames';
import UsersContext from '../../store/UsersContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateUserData } from '../resources/API';

const ClientSpecialDates = (props) => {
  const { userInfo, setUserInfo, userId } = useContext(UsersContext);
  const userData = userInfo
 
  const [spcialEvents, setSpcialEvents] = useState(userData.SpecialDates)

  const [showSpecialDMoodal, setShowSpecialDMoodal] = useState(false)
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState(null);
  const [eventdate, setEventDate] = useState();

  const backPress = () => {
    props.navigation.goBack();
  }

  const header = () => {
    return (
      <View style={styles.title}>
        <Pressable onPress={backPress}>
          <AntDesign
            name={"left"}
            color={"black"}
            size={25} />
        </Pressable>
        <Text style={styles.titleTxt}>المناسبات الخاصة</Text>
      </View>)
  }

  const closeModalPress = () => {
    setShowSpecialDMoodal(false)
  }
  // add new specail dates
  const onChange = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate();

    setEventDate(fDate);
    onSetEventDate(eventTitle, fDate)
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  const onSetEventDate = (evTitle, evDate) => {
    const data = {
      eventName: evTitle,
      eventDate: evDate,
    }
    addSpecialDateProcess(data)
  }
  const specialDatesItem = () => {
    return userData.SpecialDates.map(item => {
      return (
        <View style={styles.item}>

          <View style={styles.supItem}>
            <Pressable //onPress={() => setShowDescModal(true)}
            >
              <Feather
                name={'more-vertical'}
                color={colors.puprble}
                size={25} />
            </Pressable>
            <View>
              <Text style={styles.basicInfo}>{item.eventDate}</Text>
              <Text style={styles.basicInfoTitle}>{item.eventName}</Text>
            </View>
          </View>

          <View style={styles.IconView}>
            <MaterialIcons
              name={"event-note"}
              color={colors.puprble}
              size={25} />
          </View>
        </View>
      )
    })
  }
  const renderSpecialEvents = () => {
    return (<View>
      <Pressable style={styles.item} onPress={() => setShowSpecialDMoodal(true)}>
        <Text style={styles.basicInfo}>اضافة</Text>
        <View style={styles.IconView}>
          <Entypo
            name={"add-to-list"}
            color={colors.puprble}
            size={25} />
        </View>
      </Pressable>
      {specialDatesItem()}
      {renderSpecialDModal()}
    </View>)
  }
  const renderSpecialDModal = () => {
    return (
      <Modal
        transparent
        visible={showSpecialDMoodal}
        animationType="slide"
        onRequestClose={() => setShowSpecialDMoodal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.detailModal}>
            <Pressable onPress={closeModalPress} style={styles.modalHeader}>
              <Feather
                style={styles.menuIcon}
                name={'more-horizontal'}
                color={colors.puprble}
                size={25} />
            </Pressable>
            <View>
              {addNewSpecialDate()}
            </View>
            <Pressable style={styles.modalFooter} onPress={updateUserSDates}>
              <Text>حفظ</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  }
  const addSpecialDateProcess = (data) => {
    let newSDIndex = spcialEvents.length - 1
    setSpcialEvents(prevArray => {
      const newArray = [...prevArray];
      newArray[newSDIndex + 1] = data;
      return newArray;
    });
  };
  const updateUserSDates = () => {
    const selectedUserIndex = userData?.findIndex(item => item.USER_ID === userId)
    const newData = {
      USER_ID: userId,
      SpecialDates: spcialEvents
    }
    updateUserData(newData).then(res => {
      const data = userInfo || [];
      if (selectedUserIndex > -1) {
        data[selectedUserIndex] = { ...data[selectedUserIndex], ...newData };
      }
      if (res.message === 'Updated Sucessfuly') {
        setUserInfo([...data])
        setShowSpecialDMoodal(false)
        ToastAndroid.showWithGravity(
          'تم التعديل بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }

    })
  }
  const addNewSpecialDate = () => {
    return (
      <View style={{ width: '90%', alignSelf: 'center', marginTop: 50 }}>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='أسم المناسبة '
          value={eventTitle}
          onChangeText={(val) => setEventTitle(val)}
          onSubmitEditing={(val) => {
            const data = {
              eventName: eventTitle,
              eventDate: eventdate,
            }
            addSpecialDateProcess(data)
          }}
        />
        <Pressable onPress={() => showMode('date')}>
          <View style={styles.Bdate}>
            <Text >{eventdate}</Text>
            <Entypo
              style={styles.logoDate}
              name={"calendar"}
              color={"black"}
              size={30} />
          </View>
          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={true}
              display='calendar'
              onChange={onChange}
            />
          )}
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {header()}

      <View style={styles.body}>
        {renderSpecialEvents()}</View>
    </View>
  )
}

export default ClientSpecialDates

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  titleTxt: {
    fontSize: 18,
    color: colors.puprble,
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
  IconView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginLeft: 15
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10
  },
  supItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  }
})