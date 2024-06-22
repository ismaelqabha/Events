import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { colors } from '../../assets/AppColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppStyles } from '../../assets/res/AppStyles';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';
import { addUser } from '../../resources/API';
import ScrollWrapper from '../../components/ProviderComponents/ScrollView/ScrollWrapper';
import UsersContext from '../../../store/UsersContext';
import { getProfileImageSource, showMessage } from '../../resources/Functions';
import { passwordRegex } from '../../resources/Regex';
import Icon from 'react-native-vector-icons/Feather';

const CreatePassword = props => {
  const { userId } = useContext(SearchContext);

  const {
    password,
    setPassword,
    confirmPassword,
    setconfirmPassword,
    userInfo,
    setUserInfo,
    userName,
    userEmail,
    userPhone,
    userBD,
    userGender,
    userStatus,
    userCity,
    createUserRegion,
    userSpecialDate,
    profilePhoto,
  } = useContext(UsersContext);

  const [firstPasswordError, setFirstPasswordError] = useState();
  const [secondPasswordError, setSecondPasswordError] = useState();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConPasswordVisible, setIsConPasswordVisible] = useState(false);

  const isRTL = I18nManager.isRTL;

  const onPressBack = () => {
    props.navigation.goBack();
  };

  const checkPassword = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const chickIfExist = () => {

    const isChecked = userInfo.user.find(item => item.Email === userEmail);
    console.log(!!isChecked);
    return !!isChecked;
  };

  const addNewUser = () => {
    const AddNewUser = {
      Email: userEmail,
      Password: password,
      PasswordConfirmation: confirmPassword,
      User_name: userName,
      UserPhone: userPhone,
      UserType: 'client',
      Usergender: userGender,
      UserbirthDate: userBD,
      UserRegion: createUserRegion,
      UserCity: userCity,
      Userstatus: userStatus,
      SpecialDates: userSpecialDate,
      Userstatus: userStatus,
    };
    addUser(AddNewUser, getProfileImageSource(profilePhoto, userGender)).then(res => {
      setUserInfo([...UsersArr]);
      let UsersArr = userInfo || [];
      if (res.message === 'User Created') {
        UsersArr.push(AddNewUser);
        ToastAndroid.showWithGravity(
          'تم اٍنشاء المستخدم بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        props.navigation.navigate(ScreenNames.ClientHomeAds);
      } else {
        ToastAndroid.showWithGravity(
          'there has been an error' + res.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    });
  };
  const passwordRegCheck = () => {
    return passwordRegex.test(password)
  }

  const onCreateUser = () => {
    if (passwordRegCheck()) {
      if (checkPassword()) {
        if (!chickIfExist()) {
          addNewUser();
        } else {
          showMessage('لديك حساب مسبقا')
        }
      } else {
        showMessage('لا يوجد تطابق بين كلمات المرور المكتوبة')
      }
    } else {
      showMessage('كلمة المرور يجب أن تحتوي على الأقل 7 أحرف وأرقام')
    }
  };

  // const RenderFooter = () => {
  //   return (
  //     <View style={AppStyles.footer}>
  //       {renderDots()}
  //       <View style={AppStyles.footerPart}>
  //         {RenderBackButton()}
  //         {RenderNextButton()}
  //       </View>

  //     </View>);
  // };
  // const renderDots = () => {
  //   return (
  //     <View style={AppStyles.createuserDots}>
  //       <View style={AppStyles.dots}></View>
  //       <View style={AppStyles.dots}></View>
  //       <View style={AppStyles.dots}></View>
  //       <View style={AppStyles.pressDot}></View>
  //     </View>
  //   )
  // }
  // const RenderNextButton = () => {
  //   return (
  //     <Pressable
  //       style={AppStyles.createUserNext}
  //       onPress={() => onNextPress()}
  //     >
  //       <Text style={AppStyles.createUserNextTxt}>تم</Text>
  //     </Pressable>
  //   );
  // };
  // const RenderBackButton = () => {
  //   return (
  //     <Pressable
  //       style={AppStyles.createUserBack}
  //       onPress={() => onPressBack()}>
  //       <Text style={AppStyles.createUserBackTxt}>رجوع</Text>
  //     </Pressable>
  //   );
  // };

  const onNextPress = () => {
    true ? onCreateUser() : missingData();
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

    return (
      <View>
        <View style={styles.inputView}>
          {firstPasswordError && <Text style={styles.textRequired}>*</Text>}
          <TextInput
            style={styles.input}
            placeholder="كلمة المرور"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={[styles.icon, isRTL ? { left: 30, right: "auto" } : { right: 30, left: "auto" }, firstPasswordError ? { top: "45%" } : { top: "28%" }]}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          {secondPasswordError && <Text style={styles.textRequired}>*</Text>}
          <TextInput
            style={styles.input}
            placeholder="تأكيد كلمة المرور"
            onChangeText={setconfirmPassword}
            secureTextEntry={!isConPasswordVisible}
          />
          <TouchableOpacity
            style={[styles.icon, isRTL ? { left: 30, right: "auto" } : { right: 30, left: "auto" }, secondPasswordError ? { top: "45%" } : { top: "28%" }]}
            onPress={() => setIsConPasswordVisible(!isConPasswordVisible)}
          >
            <Icon name={isConPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
      </View>
      <ScrollWrapper
        onNextPress={onNextPress}
        onPressBack={onPressBack}
        dotPlace={3}
        amountDots={4}>
        <View style={styles.body}>
          <Text style={styles.titleText}>تعيين كلمة المرور</Text>
          {renderPassword()}
        </View>
      </ScrollWrapper>
    </View>
  );
};

export default CreatePassword;

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
    marginRight: 20,
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
    right: 10,
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
  inputView: {
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  textRequired: {
    fontSize: 14,
    marginRight: 40,
    color: 'red',
  },
  icon: {
    position: "absolute",
  }
});
