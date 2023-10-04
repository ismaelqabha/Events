import React from 'react';
import { Pressable, Text } from 'react-native';

const ScreenBack = props => {
    const {ScreenBack} = props

  return (
    <Pressable style={ScreenBack.backStyle} onPress={ScreenBack.onPress}>
      <Text style={ScreenBack.backTextStyle}>{ScreenBack.Text}</Text>
    </Pressable>
  );
};

export default ScreenBack;
