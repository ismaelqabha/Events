import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {ScreenNames} from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';
import {regionData} from '../../resources/data';
import strings from '../../assets/res/strings';

const ProviderAddInfo = props => {
  const {ServiceDataInfo, setServiceDataInfo, ServId} =
    useContext(SearchContext);
  const [serviceAddress, setserviceAddress] = useState(null);
  const [serviceRegion, setserviceRegion] = useState(null);
  const [title, setTitle] = useState(null);
  const [SuTitle, setSuTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const language = strings.arabic.ProviderAddInfo;

  let serviceIndex = ServiceDataInfo.findIndex(
    ser => ser.service_id === ServId,
  );
  let serviceObj = ServiceDataInfo[serviceIndex];

  const onNextPress = () => {
    selectServiceType
      ? props.navigation.navigate(ScreenNames.ProviderAddInfo, {
          data: {...props},
        })
      : showMessage();
  };

//   const onNextPress = () => {
//     let service = ServiceDataInfo;

//     if (serviceIndex != -1) {
//       service[serviceIndex].region = serviceRegion;
//       service[serviceIndex].address = serviceAddress;
//       service[serviceIndex].title = title;
//       service[serviceIndex].subTitle = SuTitle;
//       service[serviceIndex].desc = description;
//     }

//     setServiceDataInfo([...service]);
//     console.log(ServiceDataInfo);
//     props.navigation.navigate(ScreenNames.ProviderSetPhotos, {
//       data: {...props},
//     });
//   };

  const onBackPress = () => {
    checkIfFilled() ? RenderConfirmationBox() : props.navigation.goBack();
  };

  const checkIfFilled=()=>{
    serviceAddress || serviceRegion || title || SuTitle || description ? true : false
  }

  //   confirmation popup for leaving with out saving the progress
  const RenderConfirmationBox = () => {
    let warningButtons = [
      {
        text: language.cancelButton,
        onPress: () => null,
      },
      {
        text: language.confirmButton,
        onPress: () =>
          props.navigation.navigate(ScreenNames.ProviderCreateListing, {
            data: {...props},
          }),
      },
    ];
    return Alert.alert(language.warning, language.backWarning, warningButtons);
  };

  const showMessage = () => {
    Platform.OS === 'android'
      ? ToastAndroid.show(language.showMessage, ToastAndroid.SHORT)
      : Alert.IOS.alert(language.showMessage);
  };

  const RenderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headText}>{language.HeadText}</Text>
      </View>
    );
  };

  const RenderHeaderTitle = () => {
    return <Text style={styles.headText}> عنوان الخدمة خاصتك؟</Text>;
  };

  const RenderTitleBox = () => {
    return (
      <View>
        <Text style={styles.text}>{language.title}</Text>
        <TextInput
          style={styles.titleInput}
          keyboardType="default"
          maxLength={60}
          onChangeText={value => {
            setTitle(value);
          }}
        />
      </View>
    );
  };

  const RenderSubTitleBox = () => {
    return (
      <View>
        <Text style={styles.text}>{language.subTitle}</Text>
        <TextInput
          style={styles.subtitleInput}
          keyboardType="default"
          maxLength={150}
          multiline
          onChangeText={value => {
            setSuTitle(value);
          }}
        />
      </View>
    );
  };

  const RenderDescription = () => {
    return (
      <View>
        <Text style={styles.text}> {language.description}</Text>
        <TextInput
          style={styles.descInput}
          keyboardType="default"
          maxLength={300}
          multiline
          onChangeText={value => {
            setDescription(value);
          }}
        />
      </View>
    );
  };

  const RenderMainDetails = () => {
    return (
      <View style={styles.borderTitleView}>
        {RenderHeaderTitle()}
        {RenderTitleBox()}
        {RenderSubTitleBox()}
        {RenderDescription()}
      </View>
    );
  };

  const RenderLocationDetails = () => {
    return (
      <View style={styles.borderAddressView}>
        <Text style={styles.headText}>{language.LocationHeadText}</Text>
        <SelectList
          data={regionData}
          setSelected={val => {
            let cityObj = regionData.find(city => city.key == val);
            setserviceRegion(cityObj.value);
          }}
          placeholder={serviceRegion || 'أختر المنطقة'}
          boxStyles={styles.dropdown}
          inputStyles={styles.droptext}
          dropdownTextStyles={styles.dropstyle}
        />
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="المدينة"
          onChangeText={value => setserviceAddress(value)}
          //value={serviceObj.address}
        />
      </View>
    );
  };

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
      <Pressable style={styles.back} onPress={() => onBackPress()}>
        <Text style={styles.backText}>{language.back}</Text>
      </Pressable>
    );
  };

  const RenderNextButton = () => {
    return (
      <Pressable style={styles.next} onPress={() => onNextPress()}>
        <Text style={styles.nextText}>{language.next}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {RenderHeader()}
      <View style={styles.body}>
        <ScrollView>
          {RenderMainDetails()}
          {RenderLocationDetails()}
        </ScrollView>
      </View>
      {RenderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  headText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  body: {
    height: '75%',
    marginTop: 30,
    alignItems: 'center',
  },
  borderTitleView: {
    height: 500,
    width: 340,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
  },
  borderAddressView: {
    height: 250,
    width: 340,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
  next: {
    width: 70,
    height: 40,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  droptext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
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
    color: 'black',
  },
  titleInput: {
    textAlign: 'right',
    height: 50,
    width: 315,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#dcdcdc',
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  subtitleInput: {
    textAlign: 'right',
    height: 100,
    width: 315,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#dcdcdc',
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  descInput: {
    textAlign: 'right',
    height: 150,
    width: 315,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#dcdcdc',
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
});

export default ProviderAddInfo;
