import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import SignUp from "../src/screens/SignUp";
import SignIn from "../src/screens/SignIn";
import ClientHomeAds from "../src/screens/ClientHomeAds";
import ClientBook from "../src/screens/ClientBook";
import ClientInfo from "../src/screens/ClientInfo";
import ClientSearch from "../src/screens/ClientSearch";
import ClientResult from "../src/screens/ClientResult";
import ServiceDescr from "../src/screens/ServiceDescr";
import {  Image } from 'react-native';
import { ScreenNames } from "./ScreenNames";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            drawerType="front"
            drawerPoistion="left"
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
                    backgroundColor: '#fffaf0'
                },
                headerTintColor: '#1e90ff',
                headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                }

            }}
        >
            <Drawer.Screen name={ScreenNames.ClientHomeAds} component={ClientHomeAds}
                options={{
                    title: 'الرئيسيه',
                    drawerIcon: () => (
                        <FontAwesome5
                            name='home'
                            style={{ fontSize: 20, color: '#1e90ff' }}
                        />
                    )
                }}

            />
            <Drawer.Screen name={ScreenNames.ClientSearch} component={ClientSearch}
                options={{
                    title: 'بحث الخدمات',
                    drawerIcon: () => (
                        
                        <FontAwesome5
                            name='search'
                            style={{ fontSize: 20, color: '#1e90ff' }}
                        />
                    )
                }} />
            <Drawer.Screen name={ScreenNames.ServiceDescr} component={ServiceDescr} />
            <Drawer.Screen name={ScreenNames.ClientResult} component={ClientResult} />
            <Drawer.Screen name={ScreenNames.SignUp} component={SignUp} />
            {/* <Drawer.Screen name={ScreenNames.ClientBook} component={ClientBook} /> */}
            <Drawer.Screen name={ScreenNames.SignIn} component={SignIn} />
            <Drawer.Screen name={ScreenNames.ClientInfo} component={ClientInfo} />

        </Drawer.Navigator>
    )
}

export default DrawerNavigator;