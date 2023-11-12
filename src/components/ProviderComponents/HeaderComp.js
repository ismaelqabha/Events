import React from 'react';
import {View, Text, Pressable} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../assets/res/styles';
import strings from '../../assets/res/strings';
import { useNavigation } from '@react-navigation/native';
const HeaderComp = () => {
  const language = strings.arabic.ProviderScreens.ProviderAddInfo;
  const {HeaderComp} = styles.ProviderScreens;
  const navigation = useNavigation()
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={HeaderComp.header}>
      <Pressable onPress={() => onBackPress()}>
        <IonIcons name="chevron-back-outline" color={'black'} size={25} />
      </Pressable>
      <Text style={HeaderComp.headText}>{language.HeadText}</Text>
    </View>
  );
};

export default HeaderComp;
