import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import strings from '../../assets/res/strings';
import { useNavigation } from '@react-navigation/native';
const HeaderComp = (props) => {
  const language = strings.arabic.ProviderScreens.ProviderAddInfo;
  const navigation = useNavigation()
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={!props?.noBackArrow ?styles.header : styles.noBackArrowHeader}>
     {!props?.noBackArrow && <Pressable onPress={() => onBackPress()}>
        <IonIcons name="chevron-back-outline" color={'black'} size={25} />
      </Pressable>}
      <Text style={styles.headText}>{language.HeadText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginRight: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  noBackArrowHeader: {
    marginRight: 30,
    marginTop: 20,
    paddingHorizontal: '5%',
  },
  headText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Cairo-VariableFont_slnt,wght',
    alignSelf: 'flex-end'
  },
})

export default HeaderComp;
