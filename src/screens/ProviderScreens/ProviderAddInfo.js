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
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';

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
      style: styles.ScrollView,
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
    return <Text style={styles.headText}>{language.SubHeader}</Text>;
  };

  const RenderTitleBox = () => {
    return (
      <View>
        <View style={{flexDirection:'row' , alignItems:'center'  }}>
        <Text style={styles.text}>{language.title}</Text>
        {titleError && (
          <Text style={styles.textRequired}>{language.titleRequired}</Text>
        )}
        </View>
        <TextInput
          style={styles.titleInput}
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
        <Text style={styles.text}>{language.subTitle}</Text>
        {subTitleError && (
          <Text style={styles.textRequired}>{language.titleRequired}</Text>
        )}

        <TextInput
          style={styles.subtitleInput}
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
        <Text style={styles.text}> {language.description}</Text>
        {desError && (
          <Text style={styles.textRequired}>{language.titleRequired}</Text>
        )}
        <TextInput
          style={styles.descInput}
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
      <View style={[styles.borderTitleView, AppStyles.shadow]}>
        {RenderHeaderTitle()}
        {RenderTitleBox()}
        {RenderSubTitleBox()}
        {RenderDescription()}
      </View>
    );
  };

  const RenderLocationDetails = () => {
    return (
      <View style={[styles.borderAddressView, AppStyles.shadow]}>
        <Text style={styles.headText}>{language.LocationHeadText}</Text>
        <SelectList
          data={regionData}
          setSelected={val => {
            let cityObj = regionData.find(city => city.key == val);
            setserviceRegion(cityObj.value);
          }}
          placeholder={serviceRegion || language.chooseLocation}
          boxstyles={styles.dropdown}
          inputstyles={styles.droptext}
          dropdownTextstyles={styles.dropstyle}
        />
        <TextInput
          style={styles.input}
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
    return <View style={styles.footer}>{RenderNextButton()}</View>;
  };
  const RenderNextButton = () => {
    return (
      <Pressable
        style={[AppStyles.next, AppStyles.shadow]}
        onPress={() => onNextPress()}>
        <Text style={AppStyles.nextText}>{language.next}</Text>
      </Pressable>
    );
  };

  return (
    <View style={AppStyles.container}>
      <HeaderComp />
      <View style={styles.body}>
        <DynamicHeader
          text={language.HeaderTitle}
          textStyle={styles.headText}
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


const styles= StyleSheet.create({
  ScrollView: {
    width: '100%',
  },
  header: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  headText: {
    fontSize: 20,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  body: {
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderTitleView: {
    height: 560,
    width: 340,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  borderAddressView: {
    height: 250,
    width: 340,
    borderWidth: 1,
    borderColor: colors.darkGold,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
    alignSelf: 'flex-end',
  },

  dropdown: {
    height: 50,
    width: 300,
    fontSize: 17,
    borderRadius: 10,
    fontWeight: 'bold',
    marginTop: 30,
  },
  dropstyle: {
    textAlign: 'center',
    color: colors.darkGold,
    fontWeight: 'bold',
    fontSize: 15,
  },
  droptext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.darkGold,
  },
  input: {
    textAlign: 'center',
    height: 50,
    width: '90%',
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dcdcdc',
    marginTop: 30,
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    marginRight: 20,
    color: colors.darkGold,
    fontWeight: '500'
  },
  titleInput: {
    textAlign: 'auto',
    height: 50,
    width: 315,
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: "darkgray",
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  subtitleInput: {
    textAlign: 'auto',
    height: 100,
    width: 315,
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: "darkgray",
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  descInput: {
    textAlign: 'auto',
    height: 150,
    width: 315,
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: "darkgray",
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  textRequired: {
    textAlign: 'auto',
    fontSize: 14,
    marginRight: 20,
    color: 'red',
  },
})

export default ProviderAddInfo;
