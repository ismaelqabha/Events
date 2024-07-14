import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { colors } from '../../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import { AppStyles } from '../../assets/res/AppStyles';
import { ScreenNames } from '../../../route/ScreenNames';
import DateTimePicker from '@react-native-community/datetimepicker';
import ScrollWrapper from '../../components/ProviderComponents/ScrollView/ScrollWrapper';
import UsersContext from '../../../store/UsersContext';
import { updateUserData } from '../../resources/API';
import { showMessage } from '../../resources/Functions';

const SetUserStatus = (props) => {
  const {
    setUserInfo,
    userPhone,
    userBD,
    userGender,
    userStatus,
    userCity,
    createUserRegion,
    userSpecialDate,
    setUserSpecialDate,
    userId
  } = useContext(UsersContext);
  const isFromGoogle = props?.route?.params?.isFromGoogleUser || false;

  const onPressBack = () => {
    props.navigation.goBack();
  };

  const onNextPress = () => {
    true
      ? isFromGoogle ? saveData()
        : props.navigation.navigate(ScreenNames.CreatePassword, { data: { ...props } })
      : missingData();
  };

  const saveData = async () => {
    const body = {
      USER_ID: userId,
      UserRegion: createUserRegion,
      UserCity: userCity,
      isSetUpFinished: true,
      UserPhone: userPhone,
      UserType: 'client',
      Usergender: userGender,
      UserbirthDate: userBD,
      Userstatus: userStatus,
      SpecialDates: userSpecialDate,
      Userstatus: userStatus,
    };

    try {
      const response = await updateUserData(body);
      if (response?.message === "Updated Successfully") {
        if (response && response.user) {
          console.log("Navigating to Splash screen...");
          showMessage("set up finished successfuly")
          setUserInfo(response.user);
          props.navigation.replace("Drawr");
        } else {
          console.log("User data not found in response");
          showMessage("there has been an error")
        }
      } else {
        console.log("Response message is not 'Updated Successfully'");
        showMessage("there has been an error")
      }
    } catch (e) {
      console.error("Error updating", e);
      showMessage("there has been an error ")
    }
  };

  const checkStrings = (val) => {
    if (!val) {
      return false;
    } else if (val.trim().length <= 0) {
      return false;
    }
    return true;
  };

  const missingData = () => {
    checkStrings() ? showMissingTitle() : null;
    checkStrings() ? showMissingSubTitle() : null;
    checkStrings() ? showMissingDescription() : null;
  };

  const showMissingTitle = () => { };
  const showMissingSubTitle = () => { };
  const showMissingDescription = () => { };

  const addEvent = () => {
    setUserSpecialDate([...userSpecialDate, { empty: "empty" }]);
  };

  const renderEventItems = () => {
    return userSpecialDate?.map((val, index) => (
      <EventItemComponent val={val} index={index} key={index} />
    ));
  };

  const removeEvent = (index) => {
    const newArray = [...userSpecialDate];
    newArray.splice(index, 1);
    setUserSpecialDate(newArray);
  };

  const updateSpecialEventArray = (data, index) => {
    setUserSpecialDate((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = data;
      return newArray;
    });
  };

  const renderUserSpecialDates = () => {
    return (
      <View>
        <Text style={styles.basicInfo}>هل ترغب في اضافة تواريخ لمناسبات عائلية خاصة ؟</Text>
        <View>
          <Pressable style={styles.item} onPress={addEvent}>
            <Text style={styles.basicInfo}>اضافة</Text>
            <View style={styles.IconView}>
              <Entypo
                style={styles.icon}
                name={"plus"}
                color={colors.puprble}
                size={30}
              />
            </View>
          </Pressable>
        </View>
      </View>
    );
  };

  const EventItemComponent = (props) => {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState(null);
    const [eventDate, setEventDate] = useState('DD/MM/YYYY');

    useEffect(() => {
      if (props?.val && !props?.val?.empty) {
        setEventDate(props?.val?.specialEventDate);
        setEventTitle(props?.val?.specialEventTitle);
      }
    }, [props?.val]);

    const onChange = (event, selectedDate) => {
      setShow(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

      setEventDate(fDate);

      // Save the updated event date using updateSpecialEventArray
      const data = {
        specialEventTitle: eventTitle,
        specialEventDate: fDate,
      };
      updateSpecialEventArray(data, props?.index);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    return (
      <View key={props?.index} style={styles.eventItem}>
        <Pressable style={styles.trash} onPress={() => removeEvent(props?.index)}>
          <Entypo name='trash' size={20} />
        </Pressable>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='أسم المناسبة '
          value={eventTitle}
          onChangeText={(val) => setEventTitle(val)}
          onEndEditing={(event) => {
            const text = event.nativeEvent.text;
            const data = {
              specialEventDate: eventDate,
              specialEventTitle: text,
            };
            updateSpecialEventArray(data, props?.index);
          }}
        />
        <Pressable onPress={() => showMode('date')}>
          <View style={styles.Bdate}>
            <Text>{eventDate}</Text>
            <Entypo
              style={styles.logoDate}
              name={"calendar"}
              color={"black"}
              size={30} />
          </View>
        </Pressable>
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
      </View>
      <ScrollWrapper onNextPress={onNextPress} onPressBack={onPressBack} dotPlace={2} amountDots={isFromGoogle ? 3 : 4}>
        <View style={styles.body}>
          <Text style={styles.titleText}>تواريخ خاصة</Text>
          {renderUserSpecialDates()}
          <View style={styles.eventScroll}>
            <ScrollView nestedScrollEnabled={true}>
              {renderEventItems()}
            </ScrollView>
          </View>
        </View>
      </ScrollWrapper>
    </View>
  );
};

export default SetUserStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trash: {
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  head: {
    marginVertical: 20,
    paddingTop: 10,
  },
  titleTxt: {
    fontSize: 20,
    color: colors.puprble,
    fontWeight: 'bold',
    marginRight: 20
  },
  titleText: {
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: colors.BGScereen,
    width: 95,
    position: 'absolute',
    top: -13,
    right: 10
  },
  body: {
    marginVertical: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '95%',
    alignSelf: 'center',
    padding: 20
  },
  input: {
    alignSelf: 'center',
    textAlign: 'center',
    height: 50,
    width: '90%',
    borderRadius: 30,
    borderColor: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'black',
    backgroundColor: 'lightgray',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10
  },
  basicInfo: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold'
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
  Bdate: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    height: 50,
    width: '90%',
    borderRadius: 30,
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
  eventItem: {
    width: "100%",
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    marginVertical: 10,

  },
  eventScroll: {
    height: 350,
  },

})