import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { regionData } from '../../resources/data';
import ProviderWorkRegionComp from '../../components/ProviderComponents/ProviderWorkRegionComp';
import { ScreenNames } from '../../../route/ScreenNames';
import ScreenHeader from '../../components/ProviderComponents/ScreenHeader';
import strings from '../../assets/res/strings';
import ScreenNext from '../../components/ProviderComponents/ScreenNext';
import HeaderComp from '../../components/ProviderComponents/HeaderComp';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';
import { getRegions } from '../../resources/API';
import IonIcons from 'react-native-vector-icons/Ionicons';

const ProviderSetWorkingRegion = props => {
  const langauge = strings.arabic.ProviderScreens.ProviderWorkingRegion;
  const [Region, SetRegion] = useState([])

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
  const getRegionsfromApi = () => {
    getRegions().then(res => {
      SetRegion(res)
      console.log("res", res);
    })
  }

  useEffect(() => {
    getRegionsfromApi()
  }, [])
  const onBackPress = () => {
    props.navigation.goBack();
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

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Pressable onPress={onBackPress}>
          <IonIcons name="chevron-back-outline" color={'black'} size={25} />
        </Pressable>
        <Text style={styles.headText}>تحديد اماكن العمل لمصلحتك </Text>
      </View>
    )
  }

  return (
    <View style={AppStyles.container}>
      {renderHeader()}
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.home}>
          {renderCard()}
        </ScrollView>
      </View>
      {/* <Pressable style={styles.footer}>
         <ScreenNext ScreenNext={params.ScreenNext} /> 
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  headText: {
    fontSize: 18,
    color: colors.puprble,
    marginRight: 10
    //fontFamily: 'Cairo-VariableFont_slnt,wght',
    //fontWeight: 'bold'
  },
  body: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 50,
    paddingHorizontal: '10%',
    position: 'absolute',
    bottom: 0,

  },
})



export default ProviderSetWorkingRegion;
