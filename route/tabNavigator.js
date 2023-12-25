
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useEffect,useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ClientHomeAds from "../src/screens/ClientHomeAds";
import ClientEvents from "../src/screens/ClientEvents";
import FileFavorites from "../src/screens/FileFavorites";

import { ScreenNames } from "./ScreenNames";
import { colors } from '../src/assets/AppColors';
import ClientProfile from '../src/screens/ClientProfile';
import Icon, { Icons } from "../src/components/Icons"
import * as Animatable from 'react-native-animatable';

const TabArr = [
    { route: ScreenNames.ClientHomeAds, label: 'الرئيسيه', type: Icons.AntDesign, activeIcon: 'home', inActiveIcon: 'home', component: ClientHomeAds },
    { route: ScreenNames.FileFavorites, label: 'المفضلة', type: Icons.MaterialIcons, activeIcon: 'favorite', inActiveIcon: 'favorite-border', component: FileFavorites },
    { route: ScreenNames.ClientEvents, label: 'مناسباتي', type: Icons.MaterialIcons, activeIcon: 'event', inActiveIcon: 'event', component: ClientEvents },
    { route: ScreenNames.ClientProfile, label: 'بروفايل', type: Icons.FontAwesome, activeIcon: 'user', inActiveIcon: 'user-circle-o', component: ClientProfile },
];
const Tap = createBottomTabNavigator();

const TapButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) {
          viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}});
        } else {
          viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1: {scale: 1, rotate: '0deg'}});
        }
      }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}
        >
            <Animatable.View
                ref={viewRef}
                duration={1000}
                style={styles.container}
            >
                <Icon type={item.type} name={item.activeIcon} color={focused ? colors.puprble : 'lightgray'} />
            </Animatable.View>
        </TouchableOpacity>
    )
}

const TabNavigator = () => {
    return (
        <Tap.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    left: 16,
                    borderRadius: 16,
                    backgroundColor: colors.BGScereen
                }
            }}

        >
            {TabArr.map((item, index) => {
                return (
                    <Tap.Screen name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            //tabBarLabel: item.label,
                            tabBarIcon: ({ color, focused }) => (
                                <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={color} />
                            ),
                            tabBarButton: (props) => <TapButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tap.Navigator>

        // <Tap.Navigator
        //     initialRouteName='ClientHomeAds'
        //     activeColor={colors.puprble}
        //     inactiveColor={colors.darkGold}
        //     barStyle={{ backgroundColor: 'snow' }}
        // //shifting={false}

        // // screenOptions = {({ScreenNames}) => ({
        // //     tapBarIcon: ({focused, size, color}) => {
        // //         let iconName;
        // //         let iconLibrary;
        // //         if(ScreenNames.name === ClientHomeAds){
        // //             iconLibrary = FontAwesome5;
        // //             iconName = 'home';
        // //             size = focused ? 25 : 20;
        // //             color = focused ? 'red' : 'green';
        // //         }else if (ScreenNames.name === ClientEvents){
        // //             iconLibrary = MaterialIcons;
        // //             iconName = 'emoji-events';
        // //             size = focused ? 25 : 20;
        // //             color = focused ? 'red' : 'green';
        // //         }else if (ScreenNames.name === FileFavorites){
        // //             iconLibrary = Fontisto;
        // //             iconName = 'favorite';
        // //             size = focused ? 25 : 20;
        // //             color = focused ? 'red' : 'green';
        // //         }
        // //         return(
        // //             <iconLibrary name={iconName} size={sise} color={color}/> 
        // //         )
        // //     }
        // // })}
        // >
        //     <Tap.Screen name={ScreenNames.ClientHomeAds} component={ClientHomeAds}
        //         options={{
        //             title: 'الرئيسيه',
        //             tapBarIcon: () => (
        //                 <FontAwesome5
        //                     name='home'
        //                     style={{ fontSize: 25, color: '#1e90ff', fontFamily: 'Cairo-VariableFont_slnt,wght', fontWeight: 'bold' }}
        //                 />
        //             ),
        //         }}
        //     />

        //     <Tap.Screen name={ScreenNames.FileFavorites} component={FileFavorites}
        //         options={{
        //             title: 'المفضلة',
        //             tapBarIcon: () => (
        //                 <Fontisto
        //                     name='favorite'
        //                     style={{ fontSize: 30, color: '#1e90ff' }}
        //                 />
        //             )
        //         }}
        //     />

        //     <Tap.Screen name={ScreenNames.ClientEvents} component={ClientEvents}
        //         options={{
        //             title: 'مناسباتي',
        //             tapBarIcon: () => (
        //                 <MaterialIcons
        //                     name='emoji-events'
        //                     style={{ fontSize: 30, color: '#1e90ff', fontFamily: 'Cairo-VariableFont_slnt,wght', fontWeight: 'bold' }}
        //                 />
        //             )
        //         }}
        //     />
        //     <Tap.Screen name={ScreenNames.ClientProfile} component={ClientProfile}
        //         options={{
        //             title: 'بروفايل',
        //             tapBarIcon: () => (
        //                 <AntDesign
        //                     name='profile'
        //                     style={{ fontSize: 30, color: '#1e90ff' }}
        //                 />
        //             )
        //         }}
        //     />


        // </Tap.Navigator>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TabNavigator; 