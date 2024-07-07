import { StyleSheet, Text, View, Pressable, ScrollView, Alert, Modal, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import UsersContext from '../../../store/UsersContext';
import { updateUserData } from '../../resources/API';
import { colors } from '../../assets/AppColors';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


const ClientSpecialDates = (props) => {
  const { userInfo, userId } = useContext(UsersContext);
  const userData = userInfo

  const [spcialEvents, setSpcialEvents] = useState(userData.SpecialDates)
  const [showSpecialDMoodal, setShowSpecialDMoodal] = useState(false)
  const [showEditingMoodal, setShowEditingMoodal] = useState(false)
  const [isAdding, setIsAdding] = useState(true)

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState(null);
  const [eventdate, setEventDate] = useState(null);
  const [eventId, setEventId] = useState();

  let SDid = uuidv4();

  const backPress = () => {
    props.navigation.goBack();
  }
  const closeModalPress = () => {
    setShowSpecialDMoodal(false)
  }
  const whenPressMoretoUpdate = (id) => {
    //console.log(id);
    setIsAdding(false)
    setShowEditingMoodal(true)
    setEventId(id)
  }
  const whenPressAdd = () => {
    setIsAdding(true)
    setShowSpecialDMoodal(true)
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
  const renderSpecialEvents = () => {
    return (<View>
      <Pressable style={styles.item} onPress={whenPressAdd}>
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
  const specialDatesItem = () => {
    return spcialEvents.map(item => {
      return (
        <View>
          <View style={styles.item}>

            <View style={styles.supItem}>
              <Pressable onPress={() => whenPressMoretoUpdate(item.id)}
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
          {moreModal()}
        </View>
      )
    })
  }
  const renderSpecialDModal = () => {
    return (
      <Modal
        transparent
        visible={showSpecialDMoodal}
        animationType='fade'
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
              {renderSpecialDateFields()}
            </View>
            <Pressable style={styles.modalFooter} onPress={checkProcess}>
              <Text style={styles.titleTxt}>حفظ</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  }
  const checkProcess = () => {
    if (isAdding) {

      onAddNewSE()

    } else {

      if (checkAllFields()) {
        updatedSEvent()
      } else {
        Alert.alert(
          'تنبية',
          ' الرجاء ادخال معلومات جميع الحقول !',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
          { cancelable: false } // Prevent closing the alert by tapping outside
        );
      }
    }

  }
  const renderSpecialDateFields = () => {
    return (
      <View style={{ width: '90%', alignSelf: 'center', marginTop: 50 }}>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='أسم المناسبة '
          value={eventTitle}
          onChangeText={(val) => setEventTitle(val)}
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
              display='spinner'
              onChange={onChange}
            />
          )}
        </Pressable>
      </View>
    )
  }
  const checkAllFields = () => {
    if (eventTitle !== null && eventdate !== null) {
      return true
    } else {
      return false
    }
  }



  /// Removing special Event
  const onRemovePress = () => {
    Alert.alert(
      'تأكيد',
      'هل انت متأكد من الحذف ؟ ',
      [
        {
          text: 'لا',
          style: 'cancel',
        },
        {
          text: 'نعم',
          onPress: () => removeSpecialEvent(),
          style: 'destructive', // Use 'destructive' for a red-colored button
        },
      ],
      { cancelable: false } // Prevent closing the alert by tapping outside
    );
  }
  const removeSpecialEvent = () => {
    const SEitem = spcialEvents.filter(elme => elme.id !== eventId)


    const newData = {
      USER_ID: userId,
      SpecialDates: [...SEitem]
    }

    updateUserData(newData).then(res => {

      if (res.message === 'Updated Successfully') {

        setSpcialEvents([...SEitem])
        setShowEditingMoodal(false)
        ToastAndroid.showWithGravity(
          'تم التعديل بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }

    })

  }


  /// Adding New Special Event
  const onChange = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();

    setEventDate(fDate);
    // onSetEventDate(eventTitle, fDate)
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  const onAddNewSE = () => {
    if (checkAllFields()) {
      addNewSpecialEvent()
    } else {
      Alert.alert(
        'تنبية',
        ' الرجاء ادخال معلومات جميع الحقول !',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        { cancelable: false } // Prevent closing the alert by tapping outside
      );
    }
  }
  const addNewSpecialEvent = () => {
    const addNewSEvent = {
      id: SDid,
      eventDate: eventdate,
      eventName: eventTitle
    }
    const newRecord = spcialEvents || []
    newRecord.push(addNewSEvent)

    updateUserSDates(newRecord)
  }
  const updateUserSDates = (newRecord) => {
    const newData = {
      USER_ID: userId,
      SpecialDates: [...newRecord]
    }
    updateUserData(newData).then(res => {
      if (res.message === 'Updated Successfully') {

        setSpcialEvents([...newRecord])
        setShowSpecialDMoodal(false)
        setEventTitle(null)
        setEventDate(null)
        ToastAndroid.showWithGravity(
          'تم التعديل بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }

    })
  }


  /// updating special Event
  const moreModal = () => {
    return (
      <Modal
        transparent
        visible={showEditingMoodal}
        animationType='slide'
        onRequestClose={() => setShowEditingMoodal(false)}>
        <View style={styles.centeredMoreView}>
          <View style={styles.moreModal}>

            <Pressable style={styles.modalHeader} onPress={() => setShowEditingMoodal(false)}>
              <Text style={styles.modalHeaderTxt}>...</Text>
            </Pressable>

            <View style={styles.modalbody}>
              {moreOperation()}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  const moreOperation = () => {
    return (
      <View style={styles.moreChoice}>
        <Pressable style={styles.moreItem} onPress={onEditingPress}>
          <Feather
            name={"edit"}
            color={colors.silver}
            size={40} />
          <Text style={styles.moreTxt}>تعديل</Text>
        </Pressable>

        <Pressable style={styles.moreItem} onPress={onRemovePress}>
          <AntDesign
            name={"delete"}
            color={colors.silver}
            size={40} />
          <Text style={styles.moreTxt}>حذف</Text>
        </Pressable>
      </View>
    )
  }
  const onEditingPress = () => {
    const SEitemIndex = spcialEvents.findIndex(elme => elme.id === eventId)
    const SE = spcialEvents
    if (SEitemIndex > -1) {

      setEventTitle(SE[SEitemIndex].eventName)
      setEventDate(SE[SEitemIndex].eventDate)
    }
    setShowEditingMoodal(false)
    setShowSpecialDMoodal(true)
  }
  const updatedSEvent = () => {
    const SEitemIndex = spcialEvents.findIndex(elme => elme.id === eventId)
    const SE = spcialEvents
    if (SEitemIndex > -1) {
      SE[SEitemIndex].eventName = eventTitle
      SE[SEitemIndex].eventDate = eventdate
    }

    const newData = {
      USER_ID: userId,
      SpecialDates: [...SE]
    }

    updateUserData(newData).then(res => {

      if (res.message === 'Updated Successfully') {

        setSpcialEvents([...SE])
        setShowSpecialDMoodal(false)

        setEventTitle(null)
        setEventDate(null)
        ToastAndroid.showWithGravity(
          'تم التعديل بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }

    })
  }


  return (
    <View style={styles.container}>
      {header()}
      <ScrollView>
        <View style={styles.body}>
          {renderSpecialEvents()}</View>
      </ScrollView>
    </View>

  )
}

export default ClientSpecialDates

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    // borderWidth: 1,
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
  },
  detailModal: {
    width: '90%',
    height: 250,
    backgroundColor: '#ffffff',
    borderRadius: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    position: 'absolute',
    top: 0,
  },
  modalFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
  },
  input: {
    alignSelf: 'center',
    textAlign: 'center',
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderColor: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
    backgroundColor: 'lightgray',
  },
  Bdate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderColor: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
    backgroundColor: 'lightgray',
  },
  logoDate: {
    marginHorizontal: 30,
    marginLeft: 20
  },
  icon: {
    width: 30,
    height: 30
  },
  centeredMoreView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  moreModal: {
    width: '95%',
    height: 120,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalbody: {
    position: 'absolute',
    bottom: 10,
    width: '100%'
  },
  modalHeaderTxt: {
    fontSize: 18
  },
  moreItem: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  moreChoice: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  moreTxt: {
    fontSize: 18
  },
})