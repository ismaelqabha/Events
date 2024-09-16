import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, ToastAndroid } from 'react-native';
import ProviderWorkRegionComp from '../../components/ProviderComponents/ProviderWorkRegionComp';
import ScreenHeader from '../../components/ProviderComponents/ScreenHeader';
import strings from '../../assets/res/strings';
import ScreenNext from '../../components/ProviderComponents/ScreenNext';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';
import { getRegions, updateService } from '../../resources/API';
import IonIcons from 'react-native-vector-icons/Ionicons';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import SearchContext from '../../../store/SearchContext';

const ProviderSetWorkingRegion = props => {
  const langauge = strings.arabic.ProviderScreens.ProviderWorkingRegion;
  
  const { workAreas, serviceInfoAccorUser, setServiceInfoAccorUser, Region, SetRegion } = useContext(ServiceProviderContext);
  const { isFirst } = useContext(SearchContext);

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
    getRegions({}).then(res => {
      SetRegion(res)
    })
  }

  const updateWorkingRegions = () => {
    const selectedServiceIndex = serviceInfoAccorUser?.findIndex(item => item.service_id === isFirst)

    const newData = {
      service_id: isFirst,
      workingRegion: workAreas
    }
    updateService(newData).then(res => {
      const data = serviceInfoAccorUser || [];
      if (selectedServiceIndex > -1) {
        data[selectedServiceIndex] = newData;
      }
      if (res.message === 'Updated Sucessfuly') {
        setServiceInfoAccorUser([...data])
        ToastAndroid.showWithGravity(
          'تم التعديل بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        props.navigation.goBack();
      }
    })

  }

  useEffect(() => {

  }, [])

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const renderCard = () => {
    const cardsArray = Region.regions.map(card => {
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

      <Pressable style={styles.footer} onPress={updateWorkingRegions}>
        <View style={styles.btn}>
          <Text style={styles.itemText}>حفظ</Text>
        </View >
      </Pressable>
    </View >
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  headText: {
    fontSize: 18,
    color: colors.puprble,
  },
  body: {
    height: '85%',
  },
  footer: {
    width: '100%',
    height: 70,
    paddingHorizontal: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    color: colors.puprble,
  },
  btn: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 8,
    marginVertical: 10

  },
})



export default ProviderSetWorkingRegion;
