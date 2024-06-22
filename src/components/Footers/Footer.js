import React, { useEffect } from 'react'
import { Keyboard } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { AppStyles } from '../../assets/res/AppStyles';
import { View, Pressable, Text } from 'react-native';


const Footer = ({
    footerVisibility,
    style,
    onNextPress,
    onPressBack,
    dotPlace,
    amountDots,
    isBackButton = true,
    isNextButton = true
}) => {

    const animatedFooterStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(footerVisibility.value * 150) }], // Adjust value for slide distance
        };
    });

    const RenderFooter = () => {

        return <Animated.View
            style={[style, animatedFooterStyle]}
        >
            {renderDots()}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {isBackButton && RenderBackButton()}
                {isNextButton && RenderNextButton()}
            </View>
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
    const RenderBackButton = () => {
        return (
            <Pressable
                style={AppStyles.createUserBack}
                onPress={() => onPressBack()}>
                <Text style={AppStyles.createUserBackTxt}>رجوع</Text>
            </Pressable>
        );
    };

    const renderDots = () => {
        return (
            <View style={AppStyles.createuserDots}>
                {dots()}
            </View>
        )
    }

    const dots = () => {
        const allDots = []
        for (let index = 0; index < amountDots; index++) {
            allDots.push(<View style={dotPlace == index ? AppStyles.pressDot : AppStyles.dots}></View>)
        }
        return allDots
    }

    return RenderFooter()



}


export default Footer