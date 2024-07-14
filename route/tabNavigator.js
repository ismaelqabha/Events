
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ClientHomeAds from "../src/screens/ClientHomeAds";
import { ScreenNames } from "./ScreenNames";
import { colors } from '../src/assets/AppColors';
import Icon, { Icons } from "../src/components/Icons"
import * as Animatable from 'react-native-animatable';
import ClientEvents from '../src/screens/ClientScreens/ClientEvents';
import ClientProfile from '../src/screens/ClientScreens/ClientProfile';
import FileFavorites from '../src/screens/ClientScreens/FileFavorites';

const TabArr = [
    { route: ScreenNames.ClientHomeAds, label: 'الرئيسيه', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home', component: ClientHomeAds },
    { route: ScreenNames.FileFavorites, label: 'المفضلة', type: Icons.MaterialIcons, activeIcon: 'favorite', inActiveIcon: 'favorite-border', component: FileFavorites },
    { route: ScreenNames.ClientEvents, label: 'مناسباتي', type: Icons.MaterialIcons, activeIcon: 'event', inActiveIcon: 'event', component: ClientEvents },
    { route: ScreenNames.ClientProfile, label: 'بروفايل', type: Icons.FontAwesome, activeIcon: 'user', inActiveIcon: 'user-circle-o', component: ClientProfile },
];
const Tap = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TapButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1);
            circleRef.current.animate(circle1);
            textRef.current.transitionTo({ scale: 1 });
        } else {
            viewRef.current.animate(animate2);
            circleRef.current.animate(circle2);
            textRef.current.transitionTo({ scale: 0 });
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
                style={styles.container}>
                <View style={styles.btn}>
                    <Animatable.View
                        ref={circleRef}
                        style={styles.circle} />
                    <Icon type={item.type} name={item.activeIcon} color={focused ? colors.BGScereen : 'lightgray'} />
                </View>
                <Animatable.Text
                    ref={textRef}
                    style={styles.text}>
                    {item.label}
                </Animatable.Text>
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
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: colors.BGScereen,
        backgroundColor: colors.BGScereen,
        justifyContent: 'center',
        alignItems: 'center'
      },
      circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.puprble,
        borderRadius: 25,
      },
      text: {
        fontSize: 10,
        textAlign: 'center',
        color: colors.puprble,
      }
})

export default TabNavigator; 