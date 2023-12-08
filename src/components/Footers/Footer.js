import React, { useEffect } from 'react'
import { Keyboard } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { AppStyles } from '../../assets/res/AppStyles';
import { View } from 'react-native';
import { Pressable } from 'react-native';
import { Text } from 'react-native';

const Footer = ({
    footerVisibility,
    onScrollDirectionChange,
    onKeyboardVisibilityChange,
    style,
    onNextPress,
}) => {

    const animatedFooterStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(footerVisibility.value * 150) }], // Adjust value for slide distance
        };
    });

    const RenderFooter = () => {

        return <Animated.View
            style={[style , animatedFooterStyle]}
        >
            {renderDots()}
            {RenderNextButton()}
        </Animated.View>;
    };

    const RenderNextButton = () => {
        return (
            <Pressable
                style={AppStyles.createUserNext}
                onPress={() => onNextPress()}>
                <Text style={AppStyles.createUserNextTxt}>التالي</Text>
            </Pressable>
        );
    };

    const renderDots = () => {
        return (
            <View style={AppStyles.createuserDots}>
                <View style={AppStyles.pressDot}></View>
                <View style={AppStyles.dots}></View>
                <View style={AppStyles.dots}></View>
                <View style={AppStyles.dots}></View>
            </View>
        )
    }

    return  RenderFooter() 



}


export default Footer