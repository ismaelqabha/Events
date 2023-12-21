
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from "react";
import ClientHomeAds from "../src/screens/ClientHomeAds";
import ClientEvents from "../src/screens/ClientEvents";
import FileFavorites from "../src/screens/FileFavorites";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScreenNames } from "./ScreenNames";
import { colors } from '../src/assets/AppColors';
import ClientProfile from '../src/screens/ClientProfile';


const TabNavigator = () => {
    const Tap = createMaterialBottomTabNavigator();

    return (

        <Tap.Navigator
            initialRouteName='ClientHomeAds'
            activeColor={colors.puprble}
            inactiveColor={colors.darkGold}
            barStyle={{ backgroundColor: 'snow' }}
        //shifting={false}

        // screenOptions = {({ScreenNames}) => ({
        //     tapBarIcon: ({focused, size, color}) => {
        //         let iconName;
        //         let iconLibrary;
        //         if(ScreenNames.name === ClientHomeAds){
        //             iconLibrary = FontAwesome5;
        //             iconName = 'home';
        //             size = focused ? 25 : 20;
        //             color = focused ? 'red' : 'green';
        //         }else if (ScreenNames.name === ClientEvents){
        //             iconLibrary = MaterialIcons;
        //             iconName = 'emoji-events';
        //             size = focused ? 25 : 20;
        //             color = focused ? 'red' : 'green';
        //         }else if (ScreenNames.name === FileFavorites){
        //             iconLibrary = Fontisto;
        //             iconName = 'favorite';
        //             size = focused ? 25 : 20;
        //             color = focused ? 'red' : 'green';
        //         }
        //         return(
        //             <iconLibrary name={iconName} size={sise} color={color}/> 
        //         )
        //     }
        // })}
        >
            <Tap.Screen name={ScreenNames.ClientHomeAds} component={ClientHomeAds}
                options={{
                    title: 'الرئيسيه',
                    tapBarIcon: () => (
                        <FontAwesome5
                            name='home'
                            style={{ fontSize: 25, color: '#1e90ff', fontFamily: 'Cairo-VariableFont_slnt,wght', fontWeight: 'bold' }}
                        />
                    ),
                }}
            />

            <Tap.Screen name={ScreenNames.FileFavorites} component={FileFavorites}
                options={{
                    title: 'المفضلة',
                    tapBarIcon: () => (
                        <Fontisto
                            name='favorite'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />

            <Tap.Screen name={ScreenNames.ClientEvents} component={ClientEvents}
                options={{
                    title: 'مناسباتي',
                    tapBarIcon: () => (
                        <MaterialIcons
                            name='emoji-events'
                            style={{ fontSize: 30, color: '#1e90ff', fontFamily: 'Cairo-VariableFont_slnt,wght', fontWeight: 'bold' }}
                        />
                    )
                }}
            />
            <Tap.Screen name={ScreenNames.ClientProfile} component={ClientProfile}
                options={{
                    title: 'بروفايل',
                    tapBarIcon: () => (
                        <AntDesign
                            name='profile'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />


        </Tap.Navigator>

    )
}

export default TabNavigator; 