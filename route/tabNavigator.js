
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import ClientHomeAds from "../src/screens/ClientHomeAds";
import ClientEvents from "../src/screens/ClientEvents";
import FileFavorites from "../src/screens/FileFavorites";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScreenNames } from "./ScreenNames";

const TabNavigator = () => {
    const Tap = createMaterialBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tap.Navigator
                // activeColor="red"
                // inactiveColor="green"
                // barStyle={{ backgroundColor: 'blue' }}
                // shifting={false}

                screenOptions = {({ScreenNames}) => ({
                    tapBarIcon: ({focused, size, color}) => {
                        let iconName;
                        let iconLibrary;
                        if(ScreenNames.name === ClientHomeAds){
                            iconLibrary = FontAwesome5;
                            iconName = 'home';
                            size = focused ? 25 : 20;
                            color = focused ? 'red' : 'green';
                        }else if (ScreenNames.name === ClientEvents){
                            iconLibrary = MaterialIcons;
                            iconName = 'emoji-events';
                            size = focused ? 25 : 20;
                            color = focused ? 'red' : 'green';
                        }else if (ScreenNames.name === FileFavorites){
                            iconLibrary = Fontisto;
                            iconName = 'favorite';
                            size = focused ? 25 : 20;
                            color = focused ? 'red' : 'green';
                        }
                        return(
                            <iconLibrary name={iconName} size={sise} color={color}/> 
                        )
                    }
                })}
            >
                <Tap.Screen name={ScreenNames.ClientHomeAds} component={ClientHomeAds}
                    // options={{
                    //     title: 'الرئيسيه',
                    //     tapBarIcon: () => (
                    //         <FontAwesome5
                    //             name='home'
                    //             style={{ fontSize: 20, color: '#1e90ff', fontFamily: 'Cairo-VariableFont_slnt,wght', }}
                    //         />
                    //     ),
                    // }}
                />

                <Tap.Screen name={ScreenNames.ClientEvents} component={ClientEvents}
                    // options={{
                    //     title: 'مناسباتي',
                    //     tapBarIcon: () => (
                    //         <MaterialIcons
                    //             name='emoji-events'
                    //             style={{ fontSize: 30, color: '#1e90ff' }}
                    //         />
                    //     )
                    // }}
                />
                <Tap.Screen name={ScreenNames.FileFavorites} component={FileFavorites}
                    // options={{
                    //     title: 'المفضلة',
                    //     tapBarIcon: () => (
                    //         <Fontisto
                    //             name='favorite'
                    //             style={{ fontSize: 30, color: '#1e90ff' }}
                    //         />
                    //     )
                    // }}
                />
            </Tap.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigator; 