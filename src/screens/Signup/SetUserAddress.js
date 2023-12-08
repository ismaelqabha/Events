import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import Entypo from "react-native-vector-icons/Entypo";
import { AppStyles } from '../../assets/res/AppStyles';
import { ScreenNames } from '../../../route/ScreenNames';
import { SelectList } from 'react-native-dropdown-select-list';
import { regionData } from '../../resources/data';
import { getCities } from '../../resources/API';
import { ScrollView } from 'react-native-gesture-handler';
import ScrollWrapper from '../../components/ProviderComponents/ScrollView/ScrollWrapper';

const SetUserAddress = (props) => {
  const { userCity,
    setUserCity,
    createUserRegion,
    setCreateUserRegion,
    town, setTown } = useContext(UsersContext);
  const [addressError, setAddressError] = useState(false);

  const onPressBack = () => {
    props.navigation.goBack();
  }

  const getCityFromApi = () => {
    getCities().then(res => {
      setTown(res)
    })
  }

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


  const RenderFooter = () => {
    return (
      <View style={AppStyles.footer}>
        {renderDots()}
        <View style={AppStyles.footerPart}>
          {RenderBackButton()}
          {RenderNextButton()}
        </View>
      </View>);
  };
  const renderDots = () => {
    return (
      <View style={AppStyles.createuserDots}>
        <View style={AppStyles.dots}></View>
        <View style={AppStyles.pressDot}></View>
        <View style={AppStyles.dots}></View>
        <View style={AppStyles.dots}></View>
      </View>
    )
  }
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
    checkStrings(userCity) ? showMissingCity() : null;
  };

  const showMissingCity = () => { };

  useEffect(() => {
    getCityFromApi()
    setAddressError(!checkStrings(userCity));
  }, [userCity]);

  const RenderLocationDetails = () => {
    return (
      <View>
        <View style={styles.region}>
          <Text>المنطقة</Text>
        </View>
        <View style={styles.cityView}>
          {addressError && (
            <Text style={{ color: 'red', marginLeft: 300 }}>*</Text>
          )}
          <SelectList
            data={regionData}
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
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
      </View>
      <ScrollWrapper onNextPress={onNextPress} dotPlace={1} amountDots={4}
      >
        <View style={styles.body}>
          <Text style={styles.titleText}>العنوان</Text>
          {RenderLocationDetails()}
        </View>
      </ScrollWrapper>

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
    textAlign: 'right',
    height: 50,
    width: '80%',
    fontSize: 16,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray'
  },
  dropdown: {
    height: 50,
    maxWidth: '70%',
    minWidth: '70%',
    fontSize: 17,
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 25,
  },
  dropstyle: {
    textAlign: 'right',
    color: 'black',
    fontSize: 15,
  },
  droptext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right'
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
  
  cityView: {
    marginVertical: 30,
    //alignItems: 'flex-end'
  }

})