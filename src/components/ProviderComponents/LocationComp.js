import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';
import ServiceProviderContext from '../../../store/ServiceProviderContext';

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
      style={pressed ? styles.bodyActive : styles.body}
      onPress={() => onLocationPress()}>
      <Text style={pressed ? styles.textActive : styles.text}>
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
    color: 'black',
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
    borderWidth: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'white',
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
  },
});

export default LocationComp;
