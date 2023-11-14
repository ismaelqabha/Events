import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';

const LocationComp = props => {
  const [pressed, setPressed] = useState(false);
  const {workAreas, setWorkAreas} = useContext(ServiceProviderContext);


  const onLocationPress = () => {
    setPressed(!pressed);
    addToSelected();
  };

  const addToSelected = () => {
    var list = workAreas;
    list.push(props.value);
    setWorkAreas(list);
  };

  return (
    <TouchableOpacity
      style={pressed ? [styles.bodyActive,AppStyles.shadow] : [styles.body,AppStyles.shadow]}
      onPress={() => onLocationPress()}>
      <Text style={pressed ? [styles.textActive,AppStyles.shadow] : [styles.text,,AppStyles.shadow]}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
};


const styles=StyleSheet({
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.puprble,
  },
  textActive: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f9ea0',
  },
  body: {
    height: 70,
    width: 220,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1.5,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: colors.darkGold,
    backgroundColor: colors.BGScereen
  },
  bodyActive: {
    height: 70,
    width: 220,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#5f9ea0',
    backgroundColor: colors.BGScereen

  },
})

export default LocationComp;
