
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useState,useContext } from 'react'
import { colors } from '../../assets/AppColors'
import Entypo from "react-native-vector-icons/Entypo";
import { AppStyles } from '../../assets/res/AppStyles';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';

const SetUserStatus = (props) => {
  const { userSpecialDate, setUserSpecialDate } = useContext(SearchContext);
  const [eventTitle, setEventTitle] = useState('');
  const [eventFields, setEventFields] = useState(0)

  const onPressBack = () => {
    props.navigation.goBack();
  }

  const RenderFooter = () => {
    return <View>
      <View style={styles.footer}>
        {renderDots()}
        <View style={AppStyles.footerPart}>
          {RenderBackButton()}
          {RenderNextButton()}
        </View>

      </View>
    </View>;
  };
  const renderDots = () => {
    return (
      <View style={AppStyles.createuserDots}>
        <View style={AppStyles.dots}></View>
        <View style={AppStyles.dots}></View>
        <View style={AppStyles.pressDot}></View>
        <View style={AppStyles.dots}></View>
      </View>
    )
  }
  const RenderNextButton = () => {
    return (
      <Pressable
        style={AppStyles.createUserNext}
        onPress={() => onNextPress()}
      >
        <Text style={AppStyles.createUserNextTxt}>التالي</Text>
      </Pressable>
    );
  };
  const RenderBackButton = () => {
    return (
      <Pressable
        style={AppStyles.createUserBack}
        onPress={() => onPressBack()}>
        <Text style={AppStyles.createUserBackTxt}>رجوع</Text>
      </Pressable>
    );
  };

  const onNextPress = () => {
    true
      ? props.navigation.navigate(ScreenNames.CreatePassword
        , {
          data: { ...props },
        })
      : missingData();
  };
  const addNewSpcialEvent = () => {
    if (eventTitle.trim().length > 0 && doesntExists()) {
      const AddNewEvent = {
        Eventitle: eventTitle,
        EventDate: []
      };
      setUserSpecialDate([...userSpecialDate, AddNewEvent]);
      setEventTitle('');
    }
  };
  const doesntExists = () => {
    let exists = userSpecialDate.findIndex(
      val => val?.detailTitle.toLowerCase() === eventTitle.toLowerCase(),
    );
    return exists == -1 ? true : false;
  };

  const checkStrings = val => {
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
    setEventFields(eventFields + 1)
  }

  const renderEventItems = () => {
    const fiedls = []
    for (let index = 0; index < eventFields; index++) {
      fiedls.push(renderAddevent())
    }
    return fiedls
  }

  const renderUserSpecialDates = () => {
    return (<View>
      <Text style={styles.basicInfo}>هل ترغب في اضافة تواريخ لمناسبات عائلية خاصة ؟</Text>
      <View >
        <Pressable style={styles.item} onPress={addEvent}>
          <Text style={styles.basicInfo}>اضافة</Text>

          <View style={styles.IconView}>
            <Entypo
              style={styles.icon}
              name={"plus"}
              color={colors.puprble}
              size={30} />
          </View>
        </Pressable>
      </View>

      <View style={styles.eventScroll}>
        <ScrollView>
          {renderEventItems()}
        </ScrollView>
      </View>

    </View>)

  }
  const renderAddevent = () => {
    return (
      <View style={styles.eventItem}>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='أسم المناسبة '
        // onChangeText={setFirstPassword}
        />
        <View style={styles.Bdate}>
          <Text>DD/MM/YYYY</Text>
          <Pressable>
            <Entypo
              style={styles.logoDate}
              name={"calendar"}
              color={"black"}
              size={30} />
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.titleText}>تواريخ خاصة</Text>
        {renderUserSpecialDates()}
      </View>

      {RenderFooter()}
    </View>
  )
}

export default SetUserStatus

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 250,
  },
  footer: {
    paddingVertical: 30,
    marginRight: 40,
    alignItems: 'center',
    position: 'absolute',
    bottom: -110,
  },
})