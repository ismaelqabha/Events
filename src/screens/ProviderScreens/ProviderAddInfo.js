import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScreenNames } from '../../../route/ScreenNames';
import { hallData } from '../../resources/data';
import strings from '../../assets/res/strings';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import DynamicHeader from '../../components/ProviderComponents/ScrollView/DynamicHeader';
import HeaderComp from '../../components/ProviderComponents/HeaderComp';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import HallTypeCard from '../../components/HallTypeCard';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { showMessage } from '../../resources/Functions';
import Geolocation from '@react-native-community/geolocation';
import { getRegions } from '../../resources/API';

const ProviderAddInfo = props => {
  const language = strings.arabic.ProviderScreens.ProviderAddInfo;

  const [titleError, setTitleError] = useState(null);
  const [subTitleError, setSubTitleError] = useState(null);
  const [desError, setDesError] = useState(null);
  const [titleLengthError, setTitleLengthError] = useState(null);
  const [subTitleLengthError, setSubTitleLengthError] = useState(null);
  const [desLengthError, setDesLengthError] = useState(null);
  const [disableLocation, setDisbaleLocation] = useState(false);
  const [regionData, setRegionData] = useState([])
  const [regions, setRegions] = useState(null)
  const [address, setAddress] = useState(null)
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
    selectServiceType,
    hallCapacity,
    setHallCapacity,
    hallType,
    setHallType,
    setLatitude,
    setLongitude
  } = useContext(ServiceProviderContext);

  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSubTitleError(!checkStrings(SuTitle));
    setTitleError(!checkStrings(title));
    setDesError(!checkStrings(description));
    setSubTitleLengthError(!checkLength(SuTitle, 50));
    setTitleLengthError(!checkLength(title, 30));
    setDesLengthError(!checkLength(description, 300));

  }, [title, SuTitle, description]);

  useEffect(() => {
    getRegionsfromApi()
  }, [])

  const getRegionsfromApi = async () => {

    getRegions().then((res) => {
      res?.message ? showMessage(res.message) : updateData(res?.regions)
    }).catch((e) => {
      console.log("error fetching -> ", e);
    })

  }

  const updateData = (regions) => {
    setRegions(regions)
    const allData = []
    regions?.forEach(region => {
      allData.push(...region?.regionCities)
    });
    allData.sort()
    setRegionData(allData)
  }

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

  const checkLength = (text, length) => {
    if (text) {
      return text.trim().length <= length
    } else {
      return true
    }
  }

  const onNextPress = () => {
    true
      ? props.navigation.navigate(ScreenNames.ProviderSetPhotos, {
        data: { ...props },
      })
      : missingData();
  };

  const searchRegion = (val) => {
    if (!regions) {
      return;
    } else {
      regions.forEach((region) => {
        var index = region?.regionCities?.findIndex(city => {
          return city === val
        })
        if (!(index === -1)) {
          setAddress(region?.regionName)
        }
      })
    }
  }

  const checkRequestedData = () => {
    return checkStrings(title) &&
      checkStrings(SuTitle) &&
      checkStrings(description) &&
      checkLength(title, 30) &&
      checkLength(SuTitle, 50) &&
      checkLength(description, 300)
      ? true
      : false;
  };

  const requestLocationPermission = async () => {
    setDisbaleLocation(true)
    if (Platform.OS === 'android') {
      const permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permission === RESULTS.GRANTED) {
        getLocation()
      } else {
        showMessage("permission denide")

      }
    } else if (Platform.OS === 'ios') {
      const permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (permission === RESULTS.GRANTED) {
        getLocation()
      } else {
        showMessage("permission denide")

      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setDisbaleLocation(false)
        showMessage("location have been saved")
      },
      (err) => showMessage(err.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
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
    checkLength(title, 30) ? null : showMissingTitle("length")
    checkLength(SuTitle, 50) ? null : showMissingSubTitle("length")
    checkLength(description, 300) ? null : showMissingTitle("length")
  };

  const showMissingTitle = (val) => {

  };

  const showMissingSubTitle = (val) => { };

  const showMissingDescription = (val) => { };



  const RenderHeaderTitle = () => {
    return <Text style={styles.headText}>{language.SubHeader}</Text>;
  };

  const RenderTitleBox = () => {
    return (
      <View>
        <View style={styles.viewwholeInput}>
          <View>
            <AntDesign
              name={"question"}
              color={colors.puprble}
              size={20} />
          </View>
          <View style={styles.itemView}>
            {(titleError || titleLengthError) && (
              <Text style={styles.textRequired}>
                {titleError ? language.titleRequired : language.titleLengthError}
              </Text>
            )}
            <Text style={styles.text}>{language.title}</Text>
          </View>
        </View>
        <TextInput
          style={styles.titleInput}
          keyboardType="default"
          maxLength={30}
          onChangeText={value => {
            value.trim().length < 30 ?
              setTitle(value) &&
              setTitleLengthError(false)
              :
              setTitleLengthError(true)
          }}
          value={title}
        />
      </View>
    );
  };

  const RenderSubTitleBox = () => {
    return (<View>
      <View style={styles.viewwholeInput}>
        <View>
          <AntDesign
            name={"question"}
            color={colors.puprble}
            size={20} />
        </View>
        <View style={styles.itemView}>
          {(subTitleError || subTitleLengthError) && (
            <Text style={styles.textRequired}>
              {subTitleError ? language.titleRequired : language.titleLengthError}
            </Text>
          )}
          <Text style={styles.text}>{language.subTitle}</Text>
        </View>
      </View>
      <TextInput
        style={styles.subtitleInput}
        keyboardType="default"
        maxLength={50}
        multiline
        onChangeText={value => {
          value.trim().length < 50 ?
            setSuTitle(value) &&
            setSubTitleLengthError(false)
            :
            setSubTitleLengthError(true)
        }}
        value={SuTitle}
      />
    </View>
    );
  };

  const RenderDescription = () => {
    return (
      <View>
        <View style={styles.viewwholeInput}>
          <View>
            <AntDesign
              name={"question"}
              color={colors.puprble}
              size={20} />
          </View>
          <View style={styles.itemView}>
            {(desError || desLengthError) && (
              <Text style={styles.textRequired}>
                {desError ? language.titleRequired : language.titleLengthError}
              </Text>
            )}
            <Text style={styles.text}> {language.description}</Text>
          </View>
        </View>
        <TextInput
          style={styles.descInput}
          keyboardType="default"
          maxLength={300}
          multiline
          onChangeText={value => {
            value.trim().length < 300 ?
              setDescription(value) &&
              setDesLengthError(false)
              :
              setDesLengthError(true)
          }}
          value={description}
        />
      </View>
    );
  };

  const renderHallCapacity = () => {
    return (
      <View style={{ marginBottom: 30 }}>
        <View style={styles.viewwholeInput}>
          <View>
            <AntDesign
              name={"question"}
              color={colors.puprble}
              size={20} />
          </View>
          <View style={styles.itemView}>
            {(titleError || titleLengthError) && (
              <Text style={styles.textRequired}>
                {titleError ? language.titleRequired : language.titleLengthError}
              </Text>
            )}
            <Text style={styles.text}>{language.HallCapacity}</Text>
          </View>
        </View>
        <TextInput
          style={styles.titleInput}
          keyboardType="numeric"
          maxLength={7}
          onChangeText={value => {
            setHallCapacity(value)
          }}
          value={hallCapacity}
        />
      </View>
    )
  }


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
  const renderHallTyes = () => {
    return hallData?.map((item) => {
      return <HallTypeCard {...item} />
    })
  }
  const RenderHallDetails = () => {
    return (
      <View style={[styles.borderAddressView, AppStyles.shadow]}>
        <Text style={styles.headText}>{language.HallHeadText}</Text>

        {renderHallTypesHeader()}
        <View style={styles.hallType}>{renderHallTyes()}</View>

        {renderHallCapacity()}
      </View>
    )
  }



  const renderHallTypesHeader = () => {
    return (
      <View style={styles.HallTypesView}>
        {(titleError || titleLengthError) && (
          <Text style={styles.textRequired}>
            {titleError ? language.titleRequired : language.titleLengthError}
          </Text>
        )}
        <Text style={styles.text}>{language.HallType}</Text>
      </View>
    )
  }

  const RenderLocationDetails = () => {
    return (
      <View style={[styles.borderAddressView, AppStyles.shadow]}>
        <Text style={styles.headText}>{language.LocationHeadText}</Text>
        <View style={styles.region}>
          <Text> {address || language.address}</Text>
        </View>

        {/* <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder={language.address}
          onChangeText={value => setserviceAddress(value)}
          value={serviceAddress || null}
          editable={false}
        /> */}
        {/* {(titleError || titleLengthError) && (
          <Text style={{ color: 'red', marginLeft: 100 }}>
            {titleError ? language.titleRequired : language.titleLengthError}
            </Text>
        )} */}
        <SelectList
          data={regionData}
          setSelected={val => {
            setserviceRegion(val)
            searchRegion(val)
          }}
          placeholder={serviceRegion || language.chooseLocation}
          boxStyles={styles.dropdown}
          inputstyles={styles.droptext}
          dropdownTextstyles={styles.dropstyle}
        />

        <Pressable disabled={disableLocation} style={styles.location} onPress={requestLocationPermission}>
          <Text style={styles.locationTitle}>أضف موقع</Text>
          <View style={styles.IconView}>
            <Entypo
              name={"location-pin"}
              color={colors.puprble}
              size={25} />
          </View>
        </Pressable>
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
          {selectServiceType == 'قاعات' ? RenderHallDetails() : null}
          {RenderLocationDetails()}
        </ScrollView>
      </View>
      {RenderFooter()}
    </View>
  );
};


const styles = StyleSheet.create({
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
    textAlign: 'center'
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  viewwholeInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  body: {
    height: '80%',
    alignItems: 'center',

  },
  HallTypesView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 15
  },
  hallType: {
    flexDirection: 'row',
  },

  borderTitleView: {
    height: 520,
    width: "90%",
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5
  },
  borderAddressView: {
    //height: 350,
    width: "90%",
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 50,
    paddingHorizontal: '10%',
    position: 'absolute',
    bottom: 0

  },

  dropdown: {
    height: 50,
    maxWidth: '60%',
    minWidth: '60%',
    fontSize: 17,

  },
  dropstyle: {
    textAlign: 'left',
    //color: colors.darkGold,
    fontWeight: 'bold',
    fontSize: 20,
  },
  droptext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.darkGold,
    textAlign: 'right'
  },
  region: {
    textAlign: 'right',
    height: 50,
    width: '60%',
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'darkgray',
    alignSelf: 'center',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    color: colors.puprble,
    fontWeight: '500',

  },
  titleInput: {
    textAlign: 'right',
    height: 40,
    width: 315,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "darkgray",
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  subtitleInput: {
    textAlign: 'right',
    height: 60,
    width: 315,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "darkgray",
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },

  descInput: {
    textAlign: 'right',
    height: 200,
    width: 315,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "darkgray",
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  capsityInput: {
    textAlign: 'right',
    height: 40,
    width: 315,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "darkgray",
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  textRequired: {
    fontSize: 14,
    marginRight: 5,
    color: 'red',
  },
  location: {
    flexDirection: 'row',
    marginVertical: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  locationTitle: {
    fontSize: 15,
    textAlign: 'right',
    color: colors.puprble
  },
  IconView: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginLeft: 15
  },
})

export default ProviderAddInfo;
