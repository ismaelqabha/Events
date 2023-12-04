import { StyleSheet, Text, View, TextInput } from 'react-native'
import React,{useContext, useState} from 'react'
import { colors } from '../../assets/AppColors'
import strings from '../../assets/res/strings';
import ScreenHeader from '../../components/ProviderComponents/ScreenHeader';
import Foundation from 'react-native-vector-icons/Foundation';
import ScreenBack from '../../components/ProviderComponents/ScreenBack';
import ScreenNext from '../../components/ProviderComponents/ScreenNext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import SearchContext from '../../../store/SearchContext';
import { addService, addServiceImages } from '../../resources/API';
import { showMessage } from '../../resources/Functions';
import { ActivityIndicator } from 'react-native';


const ProviderContantPrice = (props) => {
  const {
    serviceAddress,
    price,
    serviceRegion,
    title,
    SuTitle,
    description,
    selectServiceType,
    workAreas,
    additionalServices,
    photoArray
  } = useContext(ServiceProviderContext);
  const { userId } = useContext(SearchContext);
  const [loading , setLoading] = useState(false)
  const langauge = strings.arabic.ProviderScreens.ProviderContantPrice;

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
    setLoading(true)
    await addService(body)
    .then(async res => {
      console.log(' service res ->', res);

      await addServiceImages(photoArray).then((res)=>{
        setLoading(false)
        console.log("images res -> ",res );
        showMessage("تم حفظ البيانات")
      })
    })
      .catch(e => {
        console.log('create new event error : ', e);
      });
  };
  const onBackPress = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      <ScreenHeader ScreenHeader={params.ScreenHeader} />
      <View style={styles.body}>
        <View style={styles.price}>
          <Text style={styles.descText}>{langauge.setPrice}</Text>
          <View style={styles.IconView}>
            <Foundation
              name="price-tag"
              color={colors.puprble}
              size={25}
            />
          </View>
        </View>
        <TextInput
          style={styles.titleInput}
          keyboardType="numeric"
          maxLength={5}
          onChangeText={value => {

          }}
        />
      </View>
      <View style={styles.footer}>
        <ScreenBack ScreenBack={params.ScreenBack} />
        <ScreenNext ScreenNext={params.ScreenNext} />
      </View>

    </View>
  )
}

export default ProviderContantPrice

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BGScereen
  },
  header: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginVertical: 40
  },
  headText: {
    fontSize: 20,
    color: colors.puprble,
    fontWeight: 'bold'
  },
  body: {
    width: '90%',
    height: 200,
    //borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    //alignItems: 'center',
    justifyContent: 'center'
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //marginRight: 20
  },
  IconView: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
  },
  descText: {
    fontSize: 20,
    color: colors.puprble,
    marginRight: 20

  },
  titleInput: {
    textAlign: 'center',
    height: 50,
    width: '80%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    //justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 10
  },
  next: {
    width: 130,
    height: 40,
    backgroundColor: colors.puprble,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    right: -350
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: -50
  },
  nextText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.darkGold
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})