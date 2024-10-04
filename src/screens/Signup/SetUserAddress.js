import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { colors } from '../../assets/AppColors'
import Entypo from "react-native-vector-icons/Entypo";
import { AppStyles } from '../../assets/res/AppStyles';
import { ScreenNames } from '../../../route/ScreenNames';
import { SelectList } from 'react-native-dropdown-select-list';
// import { regionData } from '../../resources/data';
import { getCities, updateUserData } from '../../resources/API';
import { ScrollView } from 'react-native-gesture-handler';
import ScrollWrapper from '../../components/ProviderComponents/ScrollView/ScrollWrapper';
import UsersContext from '../../../store/UsersContext';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { showMessage } from '../../resources/Functions';
import Geolocation from '@react-native-community/geolocation';
import { getRegions } from '../../resources/API';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SetUserAddress = (props) => {
  const { userCity,
    setUserCity,
    createUserRegion,
    setCreateUserRegion,
    town, setTown,
    setLatitude,
    setLongitude, longitude, userId, setUserInfo } = useContext(UsersContext);
  const [addressError, setAddressError] = useState(false);
  const isFromGoogle = props?.route?.params?.isFromGoogleUser || false
  const [disableLocation, setDisbaleLocation] = useState(false);
  const [showMyLocation, setshowMyLocation] = useState(false);
  const [regionData, setRegionData] = useState([])
  const [regions, setRegions] = useState(null)
  const translateY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()

  
  const onPressBack = () => {
    props.navigation.goBack();
  }

  const getCityFromApi = () => {
    getCities().then(res => {
      setTown(res)
    })
  }
  useEffect(() => {
    getRegionsfromApi()
  }, [])

  const renderAddress = () => {
    const data = town;
    const address = data.map(Cname => {
      return (
        <View>
          <View style={styles.region}>
            <Text>{Cname.region}</Text>
          </View>
          <View style={styles.cityView}>
            {addressError && (
              <Text style={{ color: 'red', marginLeft: 300 }}>*</Text>
            )}
            <SelectList
              data={Cname.citiesOfRegion}
              setSelected={val => {
                let cityObj = regionData.find(city => city.key == val);
                setUserCity(cityObj.value);
              }}
              placeholder={'المدينة'}
              boxStyles={styles.dropdown}
              inputStyles={styles.droptext}
              dropdownTextStyles={styles.dropstyle}
            />
          </View>
          <Pressable style={styles.location}>
            <Text style={styles.locationTitle}>أضف موقع</Text>
            <View style={styles.IconView}>
              <Entypo
                name={"location-pin"}
                color={colors.puprble}
                size={25} />
            </View>
          </Pressable>
        </View>
      )
    });
    return address;
  };

  const onNextPress = () => {
    true
      ? props.navigation.navigate(ScreenNames.SetUserStatus
        , {
          isFromGoogleUser: isFromGoogle
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
    checkStrings(userCity) ? showMissingCity() : null;
  };

  const showMissingCity = () => { };

  useEffect(() => {
    //getCityFromApi()
    setAddressError(!checkStrings(userCity));
  }, [userCity]);

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

  const searchRegion = (val) => {
    if (!regions) {
      return;
    } else {
      regions.forEach((region) => {
        var index = region?.regionCities?.findIndex(city => {
          return city === val
        })
        if (!(index === -1)) {
          setCreateUserRegion(region?.regionName)
        }
      })
    }
  }

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
        setshowMyLocation(true)
        showMessage("location have been saved")
      },
      (err) => showMessage(err.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const myLocation = () => {
    return (
      <View style={styles.IconView}>
        <Text style={styles.locationTitle}>موقعي الحالي {longitude}</Text>
        <Entypo
          name={"location-pin"}
          color={colors.puprble}
          size={25} />
      </View>
    )
  }


  const RenderLocationDetails = () => {
    return (
      <View>
        <View style={styles.region}>
          <Text style={styles.locationTitle}> {createUserRegion || 'المنطقة'}</Text>
        </View>
        <View style={styles.cityView}>
          {addressError && (
            <Text style={{ color: 'red', marginLeft: 300 }}>*</Text>
          )}
          <SelectList
            data={regionData}
            setSelected={val => {
              setUserCity(val);
              searchRegion(val)
            }}
            placeholder={userCity || "أختر المدينة"}
            boxStyles={styles.dropdown}
            inputStyles={styles.droptext}
            dropdownTextStyles={styles.dropstyle}
          />
        </View>
      </View>
    );
  };

  const RenderInformation = () => {
    return (
      <ScrollWrapper onNextPress={onNextPress} onPressBack={onPressBack} dotPlace={1} amountDots={isFromGoogle ? 3 : 4}
      >
        <View style={styles.body}>
          <Text style={styles.titleText}>العنوان</Text>
          {RenderLocationDetails()}
        </View>
      </ScrollWrapper>
    )
  }

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
        onPress={() => onNextPressGoogle()}>
        <Text style={AppStyles.nextText}>{"حفظ"}</Text>
      </Pressable>
    );
  };
  const onNextPressGoogle = () => {
    true
      ? saveData()
      : missingData();
  };

  const saveData = async () => {
    //console.log("userId", userId);
    const body = {
      USER_ID: userId,
      UserRegion: createUserRegion,
      UserCity: userCity,
      isSetUpFinished: true,
    }
   // console.log("body ", body);
    await updateUserData(body)
      .then((response) => {
        if (response?.message === "Updated Successfully") {
          if (response && response.user) {
            console.log("Navigating to Splash screen..."); // Add debug statement
            setUserInfo(response.user);
            navigation.replace("Drawr");
          } else {
            console.log("User data not found in response"); // Add debug statement
          }
        } else {
          console.log("Response message is not 'Updated Sucessfuly'"); // Add debug statement
        }
      })
      .catch((e) => console.error("error updating ", e));

  }


  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
      </View>
      {RenderInformation()}
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
  titleText: {
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: colors.BGScereen,
    width: 60,
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
    paddingVertical: 20,
  },
  region: {
    height: 50,
    width: '80%',
    //fontSize: 18,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: 'lightgray',

  },
  dropdown: {
    height: 50,
    maxWidth: '80%',
    minWidth: '80%',
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    textAlign: 'right',
    borderWidth: 0.1
  },
  dropstyle: {
    //textAlign: 'right',
    color: 'black',
    fontSize: 18,

  },
  droptext: {
    fontSize: 18,
    color: 'black',
    //textAlign: 'right'
  },
  location: {
    //flexDirection: 'row',
    marginVertical: 20,
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    width: '80%',
    backgroundColor: 'lightgray',
    borderRadius: 10,
    justifyContent: 'center',
    elevation: 5
  },
  locationTitle: {
    fontSize: 15,
    textAlign: 'right',
    color: colors.puprble
  },
  IconView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    flexDirection: 'row'
  },

  cityView: {
    marginVertical: 30,
    //alignItems: 'flex-end'
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

  }

})