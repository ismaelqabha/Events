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
import { AppStyles } from '../../assets/res/AppStyles';
import { v4 as uuidv4 } from 'uuid';
import { addDraftToAPI } from '../../resources/API';


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
    SuTitle,
    title,
    description,
    serviceRegion,
    serviceAddress,
    workAreas,
    price,
    photoArray,
    additionalServices,
    draftServices,
    setDraftServices,
    draftID,
    socialMediaArray
  } = useContext(ServiceProviderContext);
  const { userId } = useContext(SearchContext);

  const { saveData } = props;

  const navigation = useNavigation()

  // TODO: change depending on user specifid language
  const language = strings.arabic.ProviderScreens.ProviderChooseService;

  // console.log("ServId :", ServId);

  const onNextPress = () => {
    selectServiceType
      ? navigation.navigate(ScreenNames.ProviderAddInfo, {
        data: { ...props },
      })
      : showMessage(language.showMessage);
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
          // makes a draft service 
          !draftID ? createDraft() : null
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

  const createDraft = async () => {
    var draftID = uuidv4()
    const draft = {
      userID: userId,
      servType: selectServiceType,
      title: title,
      subTitle: SuTitle,
      desc: description,
      region: serviceRegion,
      address: serviceAddress,
      servicePrice: price,
      workingAreas: workAreas,
      photoArray:photoArray,
      additionalServices: additionalServices,
      socialMedia:socialMediaArray,
      ID:draftID
    };
    setDraftServices([...draftServices,draft])
    await addDraftToAPI(draft) .then((res)=>{
      showMessage(res?.message);
    }).catch(e => console.log("add draft error ->",e))
  }


  const showMessage = (msg) => {
    Platform.OS === 'android'
      ? ToastAndroid.show(msg, ToastAndroid.SHORT)
      : Alert.IOS.alert(msg);
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
      <View style={[styles.header]}>
        <Text style={styles.headText}>{language.HeadText}</Text>
      </View>
    );
  };

  //   renders all the available service types in the app
  const RenderServiceTypes = () => {
    return (
      <View style={styles.body}>
        <FlatList data={query()} renderItem={renderCard} numColumns={2} />

      </View>
    );
  };

  //   renders the back and next buttons
  const RenderFooter = () => {
    return (
      <View style={styles.footer}>
        {RenderBackBotton()}
        {RenderNextButton()}
      </View>
    );
  };

  const RenderBackBotton = () => {
    return (
      <Pressable style={[AppStyles.back]} onPress={() => onBackPress()}>
        <Text style={AppStyles.backText}>{language.back}</Text>
      </Pressable>
    );
  };

  const RenderNextButton = () => {
    return (
      <Pressable style={[AppStyles.next]} onPress={() => onNextPress()}>
        <Text style={AppStyles.nextText}>{language.next}</Text>
      </Pressable>
    );
  };
  return (
    <View style={AppStyles.container}>
      <HeaderComp noBackArrow={true} />
      {RenderHeader()}
      {RenderServiceTypes()}
      {RenderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: 40,
    marginBottom: 10,
  },
  headText: {
    fontSize: 20,
    color: colors.TitleFont,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
    fontWeight: 'bold'
  },
  body: {
    height: '61%',
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 12,
    // borderWidth: 0.5,
    // backgroundColor: 'white'
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    paddingHorizontal: '10%',
    position:'absolute',
    bottom:0
  },

})

export default ProviderChooseService;
