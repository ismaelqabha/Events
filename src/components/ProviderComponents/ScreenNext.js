import React from 'react';
import {Text} from 'react-native';
import {Pressable} from 'react-native';

const ScreenNext = props => {
  const {ScreenNext} = props;

  return (
    <Pressable style={ScreenNext.nextStyle} onPress={ScreenNext.onPress}>
      <Text style={ScreenNext.nextTextStyle}>{ScreenNext.Text}</Text>
    </Pressable>
  );
};

export default ScreenNext;
