import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { colors } from '../../assets/AppColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import strings from '../../assets/res/strings';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import CalenderServiceCard from '../../components/ProviderComponents/CalenderServiceCard';
import { useNavigation } from '@react-navigation/native';
import { getCampaignsByServiceId, getRegions } from '../../resources/API';

const ProviderProfile = props => {
  const language = strings.arabic.ProviderScreens.ProviderCreateListing;
  const { setIsfirst, isFirst, setserviceTitle, serviceCat, setServiceCat, campInfo, setCampInfo } =
    useContext(SearchContext);
  const { serviceInfoAccorUser } = useContext(ServiceProviderContext);

  const navigation = useNavigation();

  const [Region, SetRegion] = useState([])

  const renderMyService = () => {
    const data = serviceInfoAccorUser || [];
    const cardsArray = data?.map((card, index) => {
      if (index == 0 && !isFirst) {
        setIsfirst(card.service_id);
        setserviceTitle(card.title);
        setServiceCat(card.servType);
      }
      return <CalenderServiceCard {...card} />;
    });
    return cardsArray;
  };

  const getRegionsfromApi = () => {
    getRegions({}).then(res => {
      SetRegion(res)
    })
  }

  const getCampignsfromApi = () => {
    getCampaignsByServiceId({ serviceId: isFirst }).then(res => {
      setCampInfo(res);
    });
  };

  useEffect(() => {
    getRegionsfromApi()
    getCampignsfromApi()
  }, [isFirst])



  const filterService = () => {
    const service = serviceInfoAccorUser?.filter(item => {
      return item.service_id === isFirst;
    });
    return service
  };

  const seprator = () => {
    return <View style={styles.seprater}></View>;
  };
  const onCreatePress = () => {
    props.navigation.navigate(ScreenNames.ProviderCreateListing);
  };
  const createOfferPress = () => {
    props.navigation.navigate(ScreenNames.ProviderCreateOffer, {
      isFirst,
      serviceCat,
      Region
    });
  };

  const renderClients = () => {
    return (
      <View>
        <Pressable
          style={styles.item}
          onPress={() =>
            props.navigation.navigate(ScreenNames.ProviderClientScreen)
          }>
          <View>
            <Text style={styles.basicInfo}>الزبائن (10)</Text>
          </View>
          <View style={styles.IconView}>
            <FontAwesome5 name={'users'} color={colors.puprble} size={25} />
          </View>
        </Pressable>
      </View>
    );
  };
  const renderCampigns = () => {
    return (
      <View>
        <Pressable
          style={styles.item}
          onPress={() => props.navigation.navigate(ScreenNames.ProviderShowOffers)}
        >
          <View>
            <Text style={styles.basicInfo}>العروض</Text>
          </View>
          <View style={styles.IconView}>
            <MaterialIcons name={'campaign'} color={colors.puprble} size={25} />
          </View>
        </Pressable>
      </View>
    );
  };
  const renderCalender = () => {
    return (
      <View>
        <Pressable
          style={styles.item}
          onPress={() =>
            props.navigation.navigate(ScreenNames.ProviderCalender)
          }>
          <View>
            <Text style={styles.basicInfo}>التقويم</Text>
          </View>
          <View style={styles.IconView}>
            <AntDesign
              style={styles.icon}
              name={'calendar'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  const renderPayments = () => {
    return (
      <View>
        <Pressable style={styles.item}>
          <View>
            <Text style={styles.basicInfo}>دفعات الزبائن</Text>
          </View>
          <View style={styles.IconView}>
            <MaterialIcons
              style={styles.icon}
              name={'payments'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  const renderCreateService = () => {
    return (
      <View>
        <Pressable style={styles.item} onPress={() => onCreatePress()}>
          <View>
            <Text style={styles.basicInfo}>اٍنشاء خدمة جديدة</Text>
          </View>
          <View style={styles.IconView}>
            <Entypo
              style={styles.icon}
              name={'plus'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  const renderAddCampaign = () => {
    return (
      <View>
        <Pressable style={styles.item} onPress={() => createOfferPress()}>
          <View>
            <Text style={styles.basicInfo}>اٍنشاء عرض جديد</Text>
          </View>
          <View style={styles.IconView}>
            <Entypo
              style={styles.icon}
              name={'plus'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  const renderDetermineRegion = () => {
    return (
      <View>
        <Pressable
          style={styles.item}
          onPress={() =>
            props.navigation.navigate(ScreenNames.ProviderSetWorkingRegion)}>
          <View>
            <Text style={styles.basicInfo}>تحديد مناطق العمل</Text>
          </View>
          <View style={styles.IconView}>
            <AntDesign
              style={styles.icon}
              name={'select1'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
      </View>
    );
  };
  const renderSetEventsType = () => {
    return (
      <View>
        <Pressable
          style={styles.item}
          onPress={() =>
            props.navigation.navigate(ScreenNames.ProviderSetEventType)
          }>
          <View>
            <Text style={styles.basicInfo}>تحديد أنواع المناسبات </Text>
          </View>
          <View style={styles.IconView}>
            <AntDesign
              style={styles.icon}
              name={'select1'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
      </View>
    );
  };
 
  const renderFeedBack = () => {
    return (
      <View>
        <Pressable
          style={styles.reviewitem}
          onPress={() => props.navigation.navigate(ScreenNames.ReviewsScreen)}>
          <View>
            <Text style={styles.reviewtxt}>التغذية الراجعة (2)</Text>
          </View>
          <View style={styles.reviewIconView}>
            <MaterialIcons name={'notes'} color={colors.puprble} size={25} />
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>بروفايل</Text>
        <Pressable
          style={styles.drawer}
          onPress={() => navigation.openDrawer()}>
          <Entypo name={'menu'} color={colors.puprble} size={30} />
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.headView}>
          <Text style={styles.headtext}>
            {language.HeadText + 'اسماعيل كبها '}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.txt}>الخدمات المزودة</Text>
          {renderMyService()}
        </View>
        {seprator()}
        <View style={styles.viewSet}>
          {renderPayments()}
          {renderClients()}
          {renderFeedBack()}
          {campInfo.message !== 'No Campaigns' && renderCampigns()}
        </View>

        {/* <Text style={styles.txt}>قائمة العروض</Text>
        <View style={styles.viewSet}>{renderOffers()}</View> */}

        <Text style={styles.txt}>العمليات</Text>
        <View style={styles.viewSet}>
          {renderAddCampaign()}
          {renderDetermineRegion()}
          {renderSetEventsType()}
          {/* {renderSoialMedia1()} */}
        </View>

        <Text style={styles.txt}>جديد</Text>
        <View style={styles.viewSet}>{renderCreateService()}</View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
};

export default ProviderProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BGScereen,
    marginBottom: 70,
  },
  headView: {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 40,
  },
  headtext: {
    fontSize: 20,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  content: {
    //marginRight: 20,
  },
  viewSet: {
    backgroundColor: 'white',
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
  },
  txt: {
    fontSize: 20,
    color: colors.puprble,
    fontWeight: 'bold',
    marginVertical: 10,
    marginRight: 20,
  },
  basicInfo: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold',
  },
  
  IconView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginLeft: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
 
  seprater: {
    borderColor: colors.puprble,
    borderWidth: 0.2,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  drawer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  headerTxt: {
    fontSize: 18,
    marginLeft: 20,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  reviewitem: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  reviewtxt: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold',
  },
  reviewIconView: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginLeft: 15,
  },
 

});
