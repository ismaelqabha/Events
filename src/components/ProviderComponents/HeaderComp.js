import React from 'react';
import {View, Text, Pressable} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../assets/res/styles';
import strings from '../../assets/res/strings';
import { useNavigation } from '@react-navigation/native';
const HeaderComp = (props) => {
  const language = strings.arabic.ProviderScreens.ProviderAddInfo;
  const {HeaderCompStyle} = styles.ProviderScreensStyles;
  const navigation = useNavigation()
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={!props?.noBackArrow ?HeaderCompStyle.header : HeaderCompStyle.noBackArrowHeader}>
     {!props?.noBackArrow && <Pressable onPress={() => onBackPress()}>
        <IonIcons name="chevron-back-outline" color={'black'} size={25} />
      </Pressable>}
      <Text style={HeaderCompStyle.headText}>{language.HeadText}</Text>
    </View>
  );
};

export default HeaderComp;
