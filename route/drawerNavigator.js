import { NavigationContainer } from '@react-navigation/native';
import React from "react";


import ClientHomeAds from "../src/screens/ClientHomeAds";
import ProviderRequestNotifi from '../src/screens/ProviderScreens/ProviderRequestNotifi';

import ProviderCreateListing from '../src/screens/ProviderScreens/ProviderCreateListing';
import ProviderCalender from '../src/screens/ProviderScreens/ProviderCalender';


import { ScreenNames } from "./ScreenNames";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

import TabNavigator from './tabNavigator';


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
            <Drawer.Screen name="Home" component={TabNavigator}
                options={{
                    title: 'الرئيسيه',
                    drawerIcon: () => (
                        <FontAwesome5
                            name='home'
                            style={{ fontSize: 20, color: '#1e90ff', fontFamily: 'Cairo-VariableFont_slnt,wght', }}
                        />
                    ),
                }}
            />

            <Drawer.Screen name={ScreenNames.ProviderCreateListing} component={ProviderCreateListing}
                options={{
                    title: 'أنشاء خدمة جديدة',
                    drawerIcon: () => (
                        <Ionicons
                            name='create-outline'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />

            <Drawer.Screen name={ScreenNames.ProviderRequestNotifi} component={ProviderRequestNotifi}

                options={{
                    title: 'اشعارات الحجوزات',
                    drawerIcon: () => (
                        <AntDesign
                            name='notification'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />
            <Drawer.Screen name={ScreenNames.ProviderCalender} component={ProviderCalender}
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



        </Drawer.Navigator>
    )
}

export default DrawerNavigator;