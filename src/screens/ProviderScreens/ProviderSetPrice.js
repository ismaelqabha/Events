import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScreenNames} from '../../../route/ScreenNames';
import ScreenHeader from '../../components/ProviderComponents/ScreenHeader';
import strings from '../../assets/res/strings';
import ScreenBack from '../../components/ProviderComponents/ScreenBack';
import ScreenNext from '../../components/ProviderComponents/ScreenNext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import SearchContext from '../../../store/SearchContext';
import {addService} from '../../resources/API';

const ProviderSetPrice = props => {
  const langauge = strings.arabic.ProviderScreens.ProviderSetPrice;
  const {
    serviceAddress,
    price,
    setPrice,
    serviceRegion,
    title,
    SuTitle,
    description,
    selectServiceType,
    photoArray,
    workAreas,
    additionalServices,
  } = useContext(ServiceProviderContext);
  const {userId} = useContext(SearchContext);

  const params = {
    ScreenHeader: {
      HeaderStyle: styles.header,
      HeaderTextStyle: styles.headText,
      Text: langauge.Header,
    },
    ScreenBack: {
      backStyle: styles.back,
      backTextStyle: styles.backText,
      Text: langauge.Back,
      onPress: () => onBackPress(),
    },
    ScreenNext: {
      nextStyle: styles.next,
      nextTextStyle: styles.nextText,
      Text: langauge.Next,
      onPress: () => onPublishPress(),
    },
  };

  const onPublishPress = async () => {
    const body = {
      userID: userId,
      servType: selectServiceType,
      title: title,
      subTitle: SuTitle,
      desc: description,
      region: serviceRegion,
      address: serviceAddress,
      servicePrice: price,
      workingRegion: workAreas,
      additionalServices: additionalServices,
    };
    await addService(body)
      .then(res => {
        console.log('res ->', res);
      })
      .catch(e => {
        console.log('create new event error : ', e);
      });
    // console.log('--------------------------------------');
    // console.log('Service detailes -> ');
    // console.log('User ID -> ', userId);
    // console.log('Price -> ', price);
    // console.log('address -> ', serviceAddress);
    // console.log('Region -> ', serviceRegion);
    // console.log('title -> ', title);
    // console.log('subTitle -> ', SuTitle);
    // console.log('description -> ', description);
    // console.log('selectServiceType -> ', selectServiceType);
    // console.log('photoArray -> ', photoArray);
    // console.log('workAreas -> ', workAreas);
    // console.log('additional services  -> ', additionalServices);
    // console.log('--------------------------------------');
  };

  const onAddSerPress = () => {
    props.navigation.navigate(ScreenNames.ProviderAddServiceDetail, {
      data: {...props},
    });
  };
  const onBackPress = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ScreenHeader ScreenHeader={params.ScreenHeader} />
      <View style={styles.body}>
        <TextInput
          style={styles.titleInput}
          keyboardType="numeric"
          maxLength={5}
          onChangeText={value => {
            setPrice(value);
          }}
        />
        <View
          style={{
            borderWidth: 2,
            borderColor: '#dcdcdc',
            marginTop: 50,
            width: '90%',
            borderRadius: 15,
          }}>
          <Text style={styles.descText}>{langauge.description}</Text>

          <TouchableOpacity
            style={styles.AddButton}
            onPress={onAddSerPress}
            //activeOpacity={0.2} underlayColor={supmeted ? 'white' : 'gray'}
          >
            <AntDesign
              name="plussquareo"
              style={{fontSize: 30, alignSelf: 'center', marginRight: 30}}
            />
            <Text style={styles.footText}>{langauge.addServDetailes}</Text>
            <FontAwesome5
              name="less-than"
              style={{fontSize: 20, alignSelf: 'center', marginLeft: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <ScreenBack ScreenBack={params.ScreenBack} />
        <ScreenNext ScreenNext={params.ScreenNext} />
      </View>
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
    marginTop: 40,
    marginBottom: 10,
  },
  headText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  body: {
    height: '75%',
    marginTop: 20,
    alignItems: 'center',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
  next: {
    width: 90,
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
  titleInput: {
    textAlign: 'right',
    height: 50,
    width: '90%',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#dcdcdc',
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  AddButton: {
    flexDirection: 'row-reverse',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    marginTop: 50,
  },
  footText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 60,
  },
  descText: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginRight: 20,
  },
});

export default ProviderSetPrice;
