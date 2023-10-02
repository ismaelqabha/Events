import React, {useContext, useEffect, useState} from 'react';
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
import {regionData} from '../../resources/data';
import strings from '../../assets/res/strings';
import ServiceProviderContext from '../../../store/ServiceProviderContext';

const ProviderAddInfo = props => {
  const language = strings.arabic.ProviderScreens.ProviderAddInfo;

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
  };

  const onNextPress = () => {
    props.navigation.navigate(ScreenNames.ProviderSetPhotos, { data: { ...props } });

  };

  const onBackPress = () => {
    props.navigation.goBack();
  };


  const RenderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headText}>{language.HeadText}</Text>
      </View>
    );
  };

  const RenderHeaderTitle = () => {
    return <Text style={styles.headText}>{language.HeaderTitle}</Text>;
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
          value={title}
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
          value={SuTitle}
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
          value={description}
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
          placeholder={serviceRegion || language.chooseLocation}
          boxStyles={styles.dropdown}
          inputStyles={styles.droptext}
          dropdownTextStyles={styles.dropstyle}
        />
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder={language.address}
          onChangeText={value => setserviceAddress(value)}
          value={serviceAddress || null}
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
