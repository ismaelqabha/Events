import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppStyles } from '../../assets/res/AppStyles';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';


const CreatePassword = (props) => {

  const { password,
    setPassword,
    confirmPassword,
    setconfirmPassword } = useContext(SearchContext);

  const [firstPasswordError, setFirstPasswordError] = useState()
  const [secondPasswordError, setSecondPasswordError] = useState()

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
        <View style={AppStyles.dots}></View>
        <View style={AppStyles.pressDot}></View>
      </View>
    )
  }
  const RenderNextButton = () => {
    return (
      <Pressable
        style={AppStyles.createUserNext}
      //onPress={() => onNextPress()}
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
      ? props.navigation.navigate(ScreenNames.SetUserAddress
        , {
          data: { ...props },
        })
      : missingData();
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
    checkStrings(password) ? showMissingPasswrd() : null;
    checkStrings(confirmPassword) ? showMissingConfirmPassword() : null;
  };

  const showMissingPasswrd = () => { };
  const showMissingConfirmPassword = () => { };

  useEffect(() => {
    setFirstPasswordError(!checkStrings(password));
    setSecondPasswordError(!checkStrings(confirmPassword));

  }, [password, confirmPassword]);

  const renderPassword = () => {
    return (<View>
      <View style={styles.inputView}>
        {firstPasswordError && (
          <Text style={styles.textRequired}>*</Text>
        )}
        <TextInput
          style={styles.input}
          keyboardType='visible-password'
          placeholder='كلمة المرور'
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputView}>
        {secondPasswordError && (
          <Text style={styles.textRequired}>*</Text>
        )}
        <TextInput
          style={styles.input}
          keyboardType='visible-password'
          placeholder='تأكيد كلمة المرور'
          onChangeText={setconfirmPassword}
        />
      </View>
    </View>)

  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.titleText}>تعيين كلمة المرور</Text>
        {renderPassword()}
      </View>

      {RenderFooter()}
    </View>
  )
}

export default CreatePassword

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
  body: {
    marginVertical: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '95%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: colors.BGScereen,
    width: 123,
    position: 'absolute',
    top: -13,
    right: 10
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
    color: 'black',
    backgroundColor: 'lightgray',
  },
  footer: {
    paddingVertical: 30,
    marginRight: 40,
    alignItems: 'center',
    position: 'absolute',
    bottom: -250,
  },
  inputView: {
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  textRequired: {
    fontSize: 14,
    marginRight: 40,
    color: 'red',
  },
})