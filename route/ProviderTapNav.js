import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from "react";
import { ScreenNames } from "./ScreenNames";
import ProviderCreateListing from '../src/screens/ProviderScreens/ProviderCreateListing';
import TopTapNotificaNavig from './topTapNotificaNavig';
import ProviderServiceShow from '../src/screens/ProviderScreens/ProviderServiceShow';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProviderHome from '../src/screens/ProviderScreens/ProviderHome';
import { colors } from '../src/assets/AppColors';
import ProviderProfile from '../src/screens/ProviderScreens/ProviderProfile';
import ProviderCalender from '../src/screens/ProviderScreens/ProviderCalender';


const ProviderTapNav = () => {
    const Tap = createMaterialBottomTabNavigator();

    return (
        <Tap.Navigator
            // initialRouteName='ProviderHome'
            activeColor={colors.puprble}
            inactiveColor={colors.darkGold}
            barStyle={{ backgroundColor: 'snow' }}>

            <Tap.Screen name={ScreenNames.ProviderProfile} component={ProviderProfile}
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
            <Tap.Screen name={ScreenNames.ProviderHome} component={ProviderHome}
                options={{
                    title: 'خدماتي',
                    drawerIcon: () => (
                        <Ionicons
                            name='create-outline'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />
            <Tap.Screen name={ScreenNames.ProviderCalender} component={ProviderCalender}
                options={{
                    title: 'التقويم',
                    drawerIcon: () => (
                        <AntDesign
                            name='calendar'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />

            <Tap.Screen name="Notification" component={TopTapNotificaNavig}
                options={{
                    title: 'الحجوزات',
                    drawerIcon: () => (
                        <AntDesign
                            name='book'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />



        </Tap.Navigator>

    )
}

export default ProviderTapNav