import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';
import SearchContext from '../../../store/SearchContext';

const LocationComp = props => {
  const [pressed, setPressed] = useState(false);
  const { isFirst } = useContext(SearchContext);
  const { serviceInfoAccorUser, workAreas, setWorkAreas } = useContext(ServiceProviderContext);

  const getSelectedEvents = () => {
    return serviceInfoAccorUser.filter(item => {
      return item.service_id === isFirst
    })
  }

  useEffect(() => {
    checkPressed()
  }, [])

  const checkPressed = () => {
    const data = getSelectedEvents()
    const selectedRegion = data[0].workingRegion
    setWorkAreas(selectedRegion)
    selectedRegion.includes(props.value) ? setPressed(true) : null
  }

  const onLocationPress = () => {
    setPressed(!pressed);
    checkExists()

  };

  const checkExists = () => {
    workAreas.includes(props.value) ? removeFromList() : addToSelected();
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

      <Text style={pressed ? [styles.textActive, AppStyles.shadow] : [styles.text, AppStyles.shadow]}>

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
    width: '70%',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.silver,
    padding: 10,
    margin: 10
  },
  bodyActive: {
    height: 70,
    width: '70%',
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
    borderWidth: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: colors.puprble,
    backgroundColor: colors.silver,
    margin: 10

  },
})

export default LocationComp;
