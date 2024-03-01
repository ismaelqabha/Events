import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
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
  const [Region, SetRegion] = useState([])
  const { workAreas, serviceInfoAccorUser, setServiceInfoAccorUser } = useContext(ServiceProviderContext);
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
    getRegions().then(res => {
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
      }
    })

  }

  useEffect(() => {
    getRegionsfromApi()
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
        <Text style={styles.itemText}>حفظ</Text>
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
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    width: '100%',
    height: 50,
    paddingHorizontal: '10%',
    position: 'absolute',
    bottom: 0,
  },
  itemText: {
    fontSize: 18,
    color: colors.puprble,
    marginRight: 20
},
})



export default ProviderSetWorkingRegion;
