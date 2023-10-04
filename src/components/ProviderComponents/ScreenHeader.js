import React from 'react';
import { Text, View } from 'react-native';

const ScreenHeader = props => {
    const {ScreenHeader} = props
    return(
  <View style={ScreenHeader.HeaderStyle}>
    <Text style={ScreenHeader.HeaderTextStyle}>{ScreenHeader.Text}</Text>
  </View>
    )
};

export default ScreenHeader;
