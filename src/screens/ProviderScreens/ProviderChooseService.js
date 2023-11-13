import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { servicesCategory } from '../../resources/data';
import ServiceCard from '../../components/ServiceCard';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';
import strings from '../../assets/res/strings';
import { Platform } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { colors } from '../../assets/AppColors';
import HeaderComp from '../../components/ProviderComponents/HeaderComp';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/res/styles';

const ProviderChooseService = props => {
  const { isFromChooseServiceClick } = props.route?.params || {};
  const { ServId } = useContext(SearchContext);
  const {
    selectServiceType,
    setSelectServiceType,
    setserviceAddress,
    setserviceRegion,
    setTitle,
    setSuTitle,
    setDescription,
    setPhotoArray,
    setWorkAreas,
    setPrice,
    setAdditionalServices,
  } = useContext(ServiceProviderContext);
  const { saveData } = props;

  const navigation = useNavigation()

  const {ProviderChooseServiceStyles}=styles.ProviderScreensStyles

  // TODO: change depending on user specifid language
  const language = strings.arabic.ProviderScreens.ProviderChooseService;

  // console.log("ServId :", ServId);

  const onNextPress = () => {
    selectServiceType
      ? navigation.navigate(ScreenNames.ProviderAddInfo, {
        data: { ...props },
      })
      : showMessage();
  };

  const onBackPress = () => {
    selectServiceType
      ? RenderConfirmationBox()
      : props.navigation.navigate(ScreenNames.ProviderCreateListing, {
        data: { ...props },
      });
  };

  //   confirmation popup for leaving with out saving the progress
  const RenderConfirmationBox = () => {
    let warningButtons = [
      {
        text: language.cancelButton,
        onPress: () => null,
      },
      {
        text: language.confirmButton,
        onPress: () => {
          props.navigation.navigate(ScreenNames.ProviderCreateListing, {
            data: { ...props },
          });
          //   cleans the service data
          CleanData();
        },
      },
    ];
    return Alert.alert(language.warning, language.backWarning, warningButtons);
  };

  const CleanData = () => {
    setSelectServiceType(null);
    setserviceAddress(null);
    setserviceRegion(null);
    setTitle(null);
    setSuTitle(null);
    setDescription(null);
    setPhotoArray([])
    setWorkAreas([])
    setPrice(null)
    setAdditionalServices([])
  };

  const showMessage = () => {
    Platform.OS === 'android'
      ? ToastAndroid.show(language.showMessage, ToastAndroid.SHORT)
      : Alert.IOS.alert(language.showMessage);
  };

  const query = () => {
    return servicesCategory || [];
  };

  const renderCard = ({ item }) => {
    return (
      <ServiceCard
        {...item}
        isFromChooseServiceClick={isFromChooseServiceClick}
        isChecked={item.titleCategory === selectServiceType}
        onCatPress={value => setSelectServiceType(value)}
      />
    );
  };

  //   renders the Header text
  const RenderHeader = () => {
    return (
      <View style={[ProviderChooseServiceStyles.header]}>
        <Text style={ProviderChooseServiceStyles.headText}>{language.HeadText}</Text>
      </View>
    );
  };

  //   renders all the available service types in the app
  const RenderServiceTypes = () => {
    return (
      <View style={ProviderChooseServiceStyles.body}>
        <FlatList data={query()} renderItem={renderCard} numColumns={2} />

      </View>
    );
  };

  //   renders the back and next buttons
  const RenderFooter = () => {
    return (
      <View style={ProviderChooseServiceStyles.footer}>
        {RenderBackBotton()}
        {RenderNextButton()}
      </View>
    );
  };

  const RenderBackBotton = () => {
    return (
      <Pressable style={[styles.back, styles.shadow]} onPress={() => onBackPress()}>
        <Text style={styles.backText}>{language.back}</Text>
      </Pressable>
    );
  };

  const RenderNextButton = () => {
    return (
      <Pressable style={[styles.next, styles.shadow]} onPress={() => onNextPress()}>
        <Text style={styles.nextText}>{language.next}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderComp  noBackArrow={true}/>
      {RenderHeader()}
      {RenderServiceTypes()}
      {RenderFooter()}
    </View>
  );
};

export default ProviderChooseService;
