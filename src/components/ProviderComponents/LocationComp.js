import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';

const LocationComp = props => {
  const [pressed, setPressed] = useState(false);
  const { workAreas, setWorkAreas } = useContext(ServiceProviderContext);

  useEffect(() => {
    checkPressed()
  }, [])

  const checkPressed = () => {
    workAreas.includes(props.value) ? setPressed(true) : null
  }

  const onLocationPress = () => {
    setPressed(!pressed);
    checkExists()

  };

  const checkExists = () => {
    workAreas.includes(props.value) ? removeFromList()
      : addToSelected();
  }

  const addToSelected = () => {
    var list = workAreas;
    list.push(props.value);
    setPressed(true)
    setWorkAreas(list);
  };

  const removeFromList = () => {
    const newList = workAreas.filter((area) => area !== props.value)
    setPressed(false)
    setWorkAreas(newList)

  }

  return (
    <TouchableOpacity
      style={pressed ? [styles.bodyActive, AppStyles.shadow] : [styles.body, AppStyles.shadow]}
      onPress={() => onLocationPress()}>
      <Text style={pressed ? [styles.textActive, AppStyles.shadow] : [styles.text, , AppStyles.shadow]}>
        {props.value}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
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
    color: colors.puprble
  },
  body: {
    height: 70,
    width: 220,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
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
    borderColor: colors.puprble,
    backgroundColor: colors.BGScereen

  },
})

export default LocationComp;
