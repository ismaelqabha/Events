import { NavigationContainer } from '@react-navigation/native';
import React from "react";


import ClientHomeAds from "../src/screens/ClientHomeAds";
import ProviderServiceShow from '../src/screens/ProviderScreens/ProviderServiceShow';
import ProviderCreateListing from '../src/screens/ProviderScreens/ProviderCreateListing';



import { ScreenNames } from "./ScreenNames";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

import TabNavigator from './tabNavigator';
import TopTapNotificaNavig from './topTapNotificaNavig';
import ProviderTapNav from './ProviderTapNav';
import UserProfile from '../src/screens/UserProfile';



const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerType="front"
            drawerPoistion="Right"
            edgewidth={100}
            overlayColor='#ffffff'
            drawerStyle={{
                backgroundColor: '#f0f8ff',
                width: 250,
            }}
            screenOptions={{
                headerShown: true,
                swipeEnabled: false,
                gestureEnapled: true,
                headerTitleAlign: 'center',
                headerStyle: {
                    //backgroundColor: '#fffaf0'
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                },
            }}
        >
            <Drawer.Screen name={ScreenNames.UserProfile} component={UserProfile}
                options={{
                    title: 'بروفايل',
                    drawerIcon: () => (
                        <AntDesign
                            name='profile'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />

            <Drawer.Screen name="ClientHome" component={TabNavigator}
                options={{
                    title: 'استخدام التطبيق كزبون',
                    drawerIcon: () => (
                        <FontAwesome5
                            name='home'
                            style={{ fontSize: 20, color: '#1e90ff', fontFamily: 'Cairo-VariableFont_slnt,wght', }}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="ProviderHome" component={ProviderTapNav}
                options={{
                    title: 'استخدام التطبيق كمزود خدمة',
                    drawerIcon: () => (
                        <FontAwesome5
                            name='home'
                            style={{ fontSize: 20, color: '#1e90ff', fontFamily: 'Cairo-VariableFont_slnt,wght', }}
                        />
                    ),
                }}
            />

        </Drawer.Navigator>
    )
}

export default DrawerNavigator;