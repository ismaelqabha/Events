import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScreenNames } from '../../../route/ScreenNames';
import { regionData } from '../../resources/data';
import strings from '../../assets/res/strings';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import DynamicHeader from '../../components/ProviderComponents/ScrollView/DynamicHeader';
import HeaderComp from '../../components/ProviderComponents/HeaderComp';
import { styles } from '../../assets/res/styles';

const ProviderAddInfo = props => {
  const language = strings.arabic.ProviderScreens.ProviderAddInfo;

  const [titleError, setTitleError] = useState(false);
  const [subTitleError, setSubTitleError] = useState(false);
  const [desError, setDesError] = useState(false);

  //   service Data
  const {
    serviceAddress,
    setserviceAddress,
    serviceRegion,
    setserviceRegion,
    title,
    setTitle,
    SuTitle,
    setSuTitle,
    description,
    setDescription,
  } = useContext(ServiceProviderContext);

  const [detailesHeight, setDetailesHeight] = useState(500);
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSubTitleError(!checkStrings(SuTitle));
    setTitleError(!checkStrings(title));
    setDesError(!checkStrings(description));
  }, [title, SuTitle, description]);

  const {ProviderAddInfoStyles} = styles.ProviderScreensStyles

  //   to save data on leaving, on return user can continue where he left off
  const params = {
    saveData: {
      serviceAddress: serviceAddress,
      serviceRegion: serviceRegion,
      title: title,
      SuTitle: SuTitle,
      description: description,
      isFromChooseServiceClick: true,
    },
    ScrollView: {
      contentContainerStyle: { alignItems: 'center' },
      style: ProviderAddInfoStyles.ScrollView,
      onScroll: Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
        { useNativeDriver: false },
      ),
    },
  };

  const onNextPress = () => {
    checkRequestedData()
      ? props.navigation.navigate(ScreenNames.ProviderSetPhotos, {
        data: { ...props },
      })
      : missingData();
  };

  const checkRequestedData = () => {
    return checkStrings(title) &&
      checkStrings(SuTitle) &&
      checkStrings(description)
      ? true
      : false;
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
    checkStrings(title) ? showMissingTitle() : null;
    checkStrings(SuTitle) ? showMissingSubTitle() : null;
    checkStrings(description) ? showMissingDescription() : null;
  };

  const showMissingTitle = () => { };

  const showMissingSubTitle = () => { };

  const showMissingDescription = () => { };



  const RenderHeaderTitle = () => {
    return <Text style={ProviderAddInfoStyles.headText}>{language.SubHeader}</Text>;
  };

  const RenderTitleBox = () => {
    return (
      <View>
        <Text style={ProviderAddInfoStyles.text}>{language.title}</Text>
        {titleError && (
          <Text style={ProviderAddInfoStyles.textRequired}>{language.titleRequired}</Text>
        )}
        <TextInput
          style={ProviderAddInfoStyles.titleInput}
          keyboardType="default"
          maxLength={60}
          onChangeText={value => {
            setTitle(value);
          }}
          value={title}
        />
      </View>
    );
  };

  const RenderSubTitleBox = () => {
    return (
      <View>
        <Text style={ProviderAddInfoStyles.text}>{language.subTitle}</Text>
        {subTitleError && (
          <Text style={ProviderAddInfoStyles.textRequired}>{language.titleRequired}</Text>
        )}

        <TextInput
          style={ProviderAddInfoStyles.subtitleInput}
          keyboardType="default"
          maxLength={150}
          multiline
          onChangeText={value => {
            setSuTitle(value);
          }}
          value={SuTitle}
        />
      </View>
    );
  };

  const RenderDescription = () => {
    return (
      <View>
        <Text style={ProviderAddInfoStyles.text}> {language.description}</Text>
        {desError && (
          <Text style={ProviderAddInfoStyles.textRequired}>{language.titleRequired}</Text>
        )}
        <TextInput
          style={ProviderAddInfoStyles.descInput}
          keyboardType="default"
          maxLength={300}
          multiline
          onChangeText={value => {
            setDescription(value);
          }}
          value={description}
        />
      </View>
    );
  };

  const RenderMainDetails = () => {
    return (
      <View style={[ProviderAddInfoStyles.borderTitleView, styles.shadow]}>
        {RenderHeaderTitle()}
        {RenderTitleBox()}
        {RenderSubTitleBox()}
        {RenderDescription()}
      </View>
    );
  };

  const RenderLocationDetails = () => {
    return (
      <View style={[ProviderAddInfoStyles.borderAddressView, styles.shadow]}>
        <Text style={ProviderAddInfoStyles.headText}>{language.LocationHeadText}</Text>
        <SelectList
          data={regionData}
          setSelected={val => {
            let cityObj = regionData.find(city => city.key == val);
            setserviceRegion(cityObj.value);
          }}
          placeholder={serviceRegion || language.chooseLocation}
          boxProviderAddInfoStyles={ProviderAddInfoStyles.dropdown}
          inputProviderAddInfoStyles={ProviderAddInfoStyles.droptext}
          dropdownTextProviderAddInfoStyles={ProviderAddInfoStyles.dropstyle}
        />
        <TextInput
          style={ProviderAddInfoStyles.input}
          keyboardType="default"
          placeholder={language.address}
          onChangeText={value => setserviceAddress(value)}
          value={serviceAddress || null}
          editable={false}

        />
      </View>
    );
  };

  const RenderFooter = () => {
    return <View style={ProviderAddInfoStyles.footer}>{RenderNextButton()}</View>;
  };
  const RenderNextButton = () => {
    return (
      <Pressable
        style={[styles.next, styles.shadow]}
        onPress={() => onNextPress()}>
        <Text style={styles.nextText}>{language.next}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComp />
      <View style={ProviderAddInfoStyles.body}>
        <DynamicHeader
          text={language.HeaderTitle}
          textStyle={ProviderAddInfoStyles.headText}
          value={scrollOffsetY}
        />
        <ScrollView {...params.ScrollView}>
          {RenderMainDetails()}
          {RenderLocationDetails()}
        </ScrollView>
      </View>
      {RenderFooter()}
    </View>
  );
};


export default ProviderAddInfo;
