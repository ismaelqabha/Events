import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Pressable } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import PoviderServiceListCard from '../../components/ProviderComponents/PoviderServiceListCard';
import { ScreenNames } from '../../../route/ScreenNames';
import 'react-native-get-random-values';
import strings from '../../assets/res/strings';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { getDraftFromAPI } from '../../resources/API';
import SearchContext from '../../../store/SearchContext';
import { colors } from '../../assets/AppColors';

const ProviderCreateListing = props => {


  const { draftServices, setDraftID, setDraftServices } = useContext(ServiceProviderContext)
  const { userId } = useContext(SearchContext)
  const language = strings.arabic.ProviderScreens.ProviderCreateListing

  useEffect(() => {
    updateDraftServices()
  }, [])

  const updateDraftServices = async () => {
    await getDraftFromAPI(userId).then((res) => {
      if (res?.drafts) {
        setDraftServices(res.drafts)
      }
    }).catch(e => console.log("error fetching draft services -> ", e))
  }

  const onStartPress = () => {
    setDraftID(null)
    props.navigation.navigate(ScreenNames.ProviderChooseService, {
      data: { ...props },
      isFromChooseServiceClick: true,
    });
  };


  const renderService = () => {
    const data = draftServices
    const cardsArray = data.map(draft => {
      return <PoviderServiceListCard body={draft} />;
    });
    return cardsArray //.length < 1 ? noDrafts() : cardsArray
  };

  const noDrafts = () => {
    return (
      <View style={styles.draft}>
        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 20 }}>
          there is no drafts currently
        </Text>
      </View>
    )
  }

  //   the head text
  const HeadText = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headText}>
          {language.HeadText}
        </Text>
      </View>
    );
  };

  //   seperator line
  const seperator = () => {
    return (
      <Text style={styles.line}>
        ____________________________________________________
      </Text>
    );
  };

  //   footer text component
  const footerText = () => {
    return (
      <Text style={styles.footerText}>
        {language.StartService}
      </Text>
    );
  };

  const onBackPress = () => {
    props.navigation.goBack();
  }
  const renderCreateService = () => {
    return <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
      onPress={() => onStartPress()}
    //activeOpacity={0.2} underlayColor={supmeted ? 'white' : 'gray'}
    >
      <Text style={styles.titleTxt}>البدء بخدمة جديدة</Text>
      <AntDesign name="plussquareo" style={styles.plusSquare} />
    </TouchableOpacity>
  }

  //   create a new service component
  const newService = () => {
    return (
      <View style={styles.title}>

        <Pressable onPress={onBackPress}
        >
          <Ionicons
            style={styles.icon}
            name={"arrow-back"}
            color={"black"}
            size={25} />
        </Pressable>
        <Text style={styles.titleTxt}>خدمة جديدة</Text>

      </View>
    );
  };

  const renderSubsicribeUser = () => {
    return (
      <View>
        <View style={styles.welcomingView}>
          <Text style={styles.welcomingtxt}>مرحبا بك اسماعيل كبها</Text>
          <Text style={styles.welcomingtxt}>نشكرك على اختيارك تطبيق مناسباتي لتسويق مصلحتك </Text>
        </View>
        <View style={styles.subscribesView}>
          <Text style={styles.DescTxt}>تطبيق مناسباتي يتيح لك الفرصة للوصول لاكبر عدد ممكن من الزبائن الباحثين عن خدمات للمناسبات </Text>
          <AntDesign name="check" style={styles.check} />
        </View>
        <View style={styles.subscribesView}>
          <Text style={styles.DescTxt}>التطبيق يمكنك من ادارة جميع عمليات الحجوزات في مصلحتك من قبل الزبائن</Text>
          <AntDesign name="check" style={styles.check} />
        </View>
        <View style={styles.subscribesView}>
          <Text style={styles.DescTxt}>عند انشائك حساب لمصلحتك على التطبيق ستصبح مستخدم مزود خدمات قابلا لاستقبال طلبات الحجز من قبل الزبائن </Text>
          <AntDesign name="check" style={styles.check} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {newService()}

      <View style={styles.body}>
        {renderSubsicribeUser()}
      </View>

      <View style={styles.footer}>
        <View>{renderCreateService()}</View>
        <View style={{ justifyContent: 'center' }}>{renderService()}</View>
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
  body: {
    height: '70%',
    marginTop: 20,
    paddingTop: 30
  },
  footer: {
    height: '20%',
    marginTop: 20,
    //borderWidth: 1
  },
  draft: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    marginTop: 60
  },
  headText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  footerText: {
    fontSize: 15,
    color: 'black',
    marginRight: 30,
    marginBottom: 10,
  },
  footText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 130,
  },
  line: {
    textAlign: 'center',
    color: '#d3d3d3',
  },
  lessThan: { fontSize: 20, alignSelf: 'center', marginLeft: 30 },
  check: { fontSize: 30, color: colors.puprble },
  plusSquare: { fontSize: 30, color: colors.puprble, marginRight: 20 },


  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center'
  },
  titleTxt: {
    fontSize: 22,
    color: colors.puprble,
    marginRight: 20,
  },
  DescTxt: {
    fontSize: 18,
    color: colors.puprble,
    marginRight: 20,
    width: '80%'
  },
  icon: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  welcomingView: {
    width: '90%',
    alignSelf: 'center'
  },
  welcomingtxt: {
    fontSize: 20,
    color: colors.puprble,
    marginBottom: 10,
  },
  subscribesView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',

  }

});

export default ProviderCreateListing;
