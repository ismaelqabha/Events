import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../assets/AppColors'
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppStyles } from '../../assets/res/AppStyles';
import { ScreenNames } from '../../../route/ScreenNames';

const SetUserAddress = (props) => {

  const onPressBack = () => {
    props.navigation.goBack();
  }

  const RenderFooter = () => {
    return <View style={AppStyles.createUserfooter}>
      {RenderBackButton()}
      {RenderNextButton()}
    </View>;
  };
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
      ? props.navigation.navigate(ScreenNames.SetUserStatus
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
    checkStrings() ? showMissingTitle() : null;
    checkStrings() ? showMissingSubTitle() : null;
    checkStrings() ? showMissingDescription() : null;
  };

  const showMissingTitle = () => { };

  const showMissingSubTitle = () => { };

  const showMissingDescription = () => { };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
      </View>

      {RenderFooter()}
    </View>
  )
}

export default SetUserAddress

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
})