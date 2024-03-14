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
  Keyboard,
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
  const [selectHallType, setSelectHallType] = useState('')

  const [disableLocation, setDisbaleLocation] = useState(false);
  const [regionData, setRegionData] = useState([])
  const [regions, setRegions] = useState(null)
  const [address, setAddress] = useState(null)
  const translateY = useRef(new Animated.Value(0)).current;

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
    setSubTitleLengthError(!checkLength(SuTitle, 50));
    setTitleLengthError(!checkLength(title, 30));
  }, [title, SuTitle, description]);

  useEffect(() => {
    getRegionsfromApi()
  }, [])

  useEffect(() => {  // Keyboard Listeners 
    const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, () => {
      Animated.timing(translateY, {
        toValue: 100, // Adjust slide distance as needed
        duration: 200, // Adjust duration as needed
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200, // Adjust duration as needed
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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
  const checkStrings = val => {
    if (!val) {
      return false;
    } else if (val.length == 0) {
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

  const showMissingTitle = (val) => { };
  const showMissingSubTitle = (val) => { };
  const showMissingDescription = (val) => { };

  

  const getRegionsfromApi = async () => {
    getRegions().then((res) => {
      res?.message ? showMessage(res.message) : updateData(res?.regions)
    }).catch((e) => {
      console.log("error fetching -> ", e);
    })

  }
// region part
  const updateData = (regions) => {
    setRegions(regions)
    const allData = []
    regions?.forEach(region => {
      allData.push(...region?.regionCities)
    });
    allData.sort()
    setRegionData(allData)
  }
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
          setserviceRegion(region?.regionName)
        }
      })
    }
  }

  const checkRequestedData = () => {
    return checkStrings(title) &&
      checkStrings(SuTitle) &&
      checkLength(title, 30) &&
      checkLength(SuTitle, 50)
      ? true
      : false;
  };

  // Address and location part
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
  const RenderLocationDetails = () => {
    return (
      <View style={[styles.borderAddressView, AppStyles.shadow]}>
        <Text style={styles.headText}>{language.LocationHeadText}</Text>

        <View style={styles.region}>
          <Text> {address || language.address}</Text>
        </View>
        <SelectList
          data={regionData}
          setSelected={val => {
            setserviceAddress(val)
            searchRegion(val)
          }}
          placeholder={serviceAddress || language.chooseLocation}
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
          maxLength={50}
          onChangeText={value => {
            value.trim().length < 50 ?
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
        maxLength={25}
        multiline
        onChangeText={value => {
          value.trim().length < 25 ?
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
  const renderHallTyes = () => {
    return hallData?.map((item) => {
      return <HallTypeCard {...item} 
      isChecked={item.hallType === selectHallType}
      onHallTypePress={(value) => setSelectHallType(value)}/>
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
  const RenderInputNumofRequested = () => {
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
            <Text style={styles.text}>الحد الاقصى لاستقبال الحجوزات</Text>
          </View>
        </View>
        <TextInput
          style={styles.titleInput}
          keyboardType="default"
          maxLength={50}
          onChangeText={{}}
          //value={}
        />
      </View>
    );
  };

 // footer part
  const RenderFooter = () => {
    return (
        <Animated.View style={[styles.footer, { transform: [{ translateY: translateY }] }]}>
          <View style={styles.footer}>{RenderNextButton()}</View>
        </Animated.View>
    )
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
  const onNextPress = () => {
    true
      ? props.navigation.navigate(ScreenNames.ProviderSetPhotos, {
        data: { ...props },
      })
      : missingData();
  };

  // description part 
  const addDescrTextInput = () => {
    setDescription([...description, { empty: "empty" }])
  }
  const renderdescItem = () => {
    const fields = description?.map((val, index) => {
      return <DescrriptionComponent val={val} index={index} />
    })
    return fields
  }
  const removeDescription = (desToRemove) => {
    var i = description.findIndex((val) => val.descItem === desToRemove)
    if (i === -1) {
      console.log("there is no such desc to remove ");
      return
    } else {
      const updatedDescription = [...description];
      updatedDescription.splice(i, 1);
      setDescription(updatedDescription)
    }
  }
  const DescrriptionComponent = (props) => {
    const [descriptionItem, setDescriptionItem] = useState(null)

    useEffect(() => {
      if (props.val) {
        setDescriptionItem(props?.val?.descItem)
      }
    }, [])

    return (
      <View style={styles.contentItemView}>
        <Pressable onPress={() => removeDescription(descriptionItem)}>
          <AntDesign name='delete' size={15} color={'gray'} />
        </Pressable>
        <TextInput
          style={styles.descriptionInput}
          keyboardType='default'
          placeholder='أضف وصف جديد'
          value={descriptionItem}
          onChangeText={(val) => setDescriptionItem(val)}
          onEndEditing={(val) => {
            const data = {
              descItem: descriptionItem
            }
            updateDescrArray(data,props.index)
          }}
        />
      </View>)
  }
  const updateDescrArray = (data , index) => {
      setDescription(prevArray => {
          const newArray = [...prevArray];
          newArray[index] = data;
          return newArray;
      });
  }
  const Renderdescriptionr = () => {
    return (
      <View style={styles.description}>
        <View style={styles.viewwholeInput}>
          <View>
            <AntDesign
              name={"question"}
              color={colors.puprble}
              size={20} />
          </View>
          <View style={styles.itemView}>
            <Text style={styles.text}> {language.description}</Text>
          </View>
        </View>
        {renderdescItem()}
        <Pressable style={styles.descLabel} onPress={addDescrTextInput}>
          <Text style={styles.AddDesctxt}>اضافة شرح عن مصلحتك</Text>
          <View style={styles.IconAdd}>
            <Entypo
              name={"plus"}
              color={colors.puprble}
              size={25} />
          </View>
        </Pressable>
      </View>
    )
  }

  const RenderMainDetails = () => {
    return (
      <View style={[styles.borderTitleView, AppStyles.shadow]}>
        {RenderHeaderTitle()}
        {RenderTitleBox()}
        {RenderSubTitleBox()}
        {Renderdescriptionr()}
        {selectServiceType == 'قاعات' && RenderInputNumofRequested()}
      </View>
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
    // height: 520,
    width: "90%",
    borderRadius: 20,
    marginBottom: 30,
    // marginTop: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    paddingVertical: 20
  },
  borderAddressView: {
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
    height: 40,
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
  descriptionInput: {
    flex: 1,
    textAlign: 'right',
    fontSize: 18,
    color: 'black',
    height: 40,
    width: '90%',
    marginLeft: 10
  },
  contentItemView: {
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "darkgray",
    width: 315,
    padding: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
  description: {
    width: 315,
    marginVertical: 20
  },
  descLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    justifyContent: 'flex-end'
  },
  AddDesctxt: {
    fontSize: 15,
    textAlign: 'right',
    color: colors.puprble
  },
  IconAdd: {
    // width: 50,
    // height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'lightgray',
    // borderRadius: 30,
    // marginLeft: 15
  },
})

export default ProviderAddInfo;
