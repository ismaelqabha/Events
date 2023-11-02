import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from "react";
import { ScreenNames } from "./ScreenNames";
import ProviderCreateListing from '../src/screens/ProviderScreens/ProviderCreateListing';
import TopTapNotificaNavig from './topTapNotificaNavig';
import ProviderServiceShow from '../src/screens/ProviderScreens/ProviderServiceShow';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProviderHome from '../src/screens/ProviderScreens/ProviderHome';


const ProviderTapNav = () => {
    const Tap = createMaterialBottomTabNavigator();

    return (
        <Tap.Navigator
            activeColor="red"
            inactiveColor="green"
            barStyle={{ backgroundColor: 'snow' }}>

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


            <Tap.Screen name="Notification" component={TopTapNotificaNavig}
                options={{
                    title: 'الاشعارات',
                    drawerIcon: () => (
                        <AntDesign
                            name='notification'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />
            <Tap.Screen name={ScreenNames.ProviderServiceShow} component={ProviderServiceShow}
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
        </Tap.Navigator>

    )
}

export default ProviderTapNav