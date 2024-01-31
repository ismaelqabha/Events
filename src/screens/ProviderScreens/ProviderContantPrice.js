import { StyleSheet, Text, View, TextInput, Animated, Keyboard } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { colors } from '../../assets/AppColors'
import strings from '../../assets/res/strings';
import ScreenHeader from '../../components/ProviderComponents/ScreenHeader';
import Foundation from 'react-native-vector-icons/Foundation';
import ScreenBack from '../../components/ProviderComponents/ScreenBack';
import ScreenNext from '../../components/ProviderComponents/ScreenNext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { ActivityIndicator } from 'react-native';
import { onPublishPress } from '../../resources/Functions'



const ProviderContantPrice = (props) => {

   const context = useContext(ServiceProviderContext);
  const [loading, setLoading] = useState(false)
  const langauge = strings.arabic.ProviderScreens.ProviderContantPrice;
  const translateY = useRef(new Animated.Value(0)).current;
  const {
    setPrice,
  } = useContext(ServiceProviderContext);

  useEffect(() => {  // Keyboard Listeners 
    const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, () => {
      Animated.timing(translateY, {
        toValue: 100, // Adjust slide distance as needed
        duration: 200, // Adjust duration as needed
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200, // Adjust duration as needed
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
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
      onPress: () => onPublishPress(context.allData),
    },
  };

  const onBackPress = () => {
    props.navigation.goBack();
  };

  const RenderFooter = () => {
    return (
      <Animated.View style={[styles.footer, { transform: [{ translateY: translateY }] }]}>
        <ScreenBack ScreenBack={params.ScreenBack} />
        <ScreenNext ScreenNext={params.ScreenNext} />
      </Animated.View>
    )
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
            setPrice(value);
          }}
        />
      </View>
      {RenderFooter()}


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