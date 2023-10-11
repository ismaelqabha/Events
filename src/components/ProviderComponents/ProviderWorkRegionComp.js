import React from 'react';
import {View} from 'react-native';
import LocationComp from './LocationComp';

const ProviderWorkRegionComp = props => {
  const RenderLocations = () => {
    return <LocationComp value={props.value} />;
  };
  return <View style={{flex: 1}}>{RenderLocations()}</View>;
};

export default ProviderWorkRegionComp;
