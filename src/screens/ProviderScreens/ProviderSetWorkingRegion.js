import React from 'react';
import {View, StyleSheet, Text, Pressable, ScrollView} from 'react-native';
import {regionData} from '../../resources/data';
import ProviderWorkRegionComp from '../../components/ProviderComponents/ProviderWorkRegionComp';
import {ScreenNames} from '../../../route/ScreenNames';
import ScreenHeader from '../../components/ProviderComponents/ScreenHeader';
import strings from '../../assets/res/strings';
import ScreenNext from '../../components/ProviderComponents/ScreenNext';
import HeaderComp from '../../components/ProviderComponents/HeaderComp';
import { AppStyles } from '../../assets/res/AppStyles';

const ProviderSetWorkingRegion = props => {
  const langauge = strings.arabic.ProviderScreens.ProviderWorkingRegion;


  const params = {
    ScreenHeader: {
      HeaderStyle: styles.header,
      HeaderTextStyle: styles.headText,
      Text: langauge.Header,
    },
    ScreenNext: {
      nextStyle: AppStyles.next,
      nextTextStyle: AppStyles.nextText,
      Text: langauge.Next,
      onPress: () => onNextPress(),
    },
  };

  const onNextPress = () => {
    props.navigation.navigate(ScreenNames.ProviderSocialMediaScreen, {data: {...props}});
  };
  const query = () => {
    return regionData || [];
  };
  const renderCard = () => {
    const data = query();
    const cardsArray = data.map(card => {
      return <ProviderWorkRegionComp {...card} />;
    });
    return cardsArray;
  };



  return (
    <View style={styles.container}>
      <HeaderComp />
      <ScreenHeader ScreenHeader={params.ScreenHeader} />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.home}>
          {renderCard()}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <ScreenNext ScreenNext={params.ScreenNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  headText: {
    fontSize: 20,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
    fontWeight: 'bold'
  },
  body: {
    height: '70%',
    marginTop: 10,
    // marginLeft: '18%',
  },
  footer: {
    //alignSelf: 'flex-end',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginLeft: 20,
  },
})



export default ProviderSetWorkingRegion;
