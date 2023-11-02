import React from "react";
import { StyleSheet } from "react-native";
import { Animated,Text } from "react-native";

const Header_Max_Height = 100;
const Header_Min_Height = 40;
const Scroll_Distance = Header_Max_Height - Header_Min_Height

const DynamicHeader=({value , text ,textStyle})=>{

    const animatedHeaderHeight = value.interpolate({
        inputRange:[0,Scroll_Distance],
        outputRange:[Header_Max_Height,Header_Min_Height],
        extrapolate:'clamp'
    })

    return(
        <Animated.View style={[styles.Header,{height:animatedHeaderHeight}]}>
            <Text style={textStyle}>{text}</Text>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    Header:{
        justifyContent:'center',
        alignItems:'center',
    }
})

export default DynamicHeader