import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import SignUp from "../src/screens/SignUp";
import SignIn from "../src/screens/SignIn";
import ClientHomeAds from "../src/screens/ClientHomeAds";
import ClientSearch from "../src/screens/ClientSearch";
import FileFavoritesShow from "../src/screens/FileFavoritesShow";
import FileFavorites from '../src/screens/FileFavorites';
import ClientEvents from '../src/screens/ClientEvents';

import ProviderServiceListing from '../src/screens/ProviderScreens/ProviderServiceListing';
import ProviderCreateListing from '../src/screens/ProviderScreens/ProviderCreateListing';


import { ScreenNames } from "./ScreenNames";
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
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
                    backgroundColor: '#fffaf0'
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold',
                }
            }}
        >
            <Drawer.Screen name={ScreenNames.ProviderHomeAds} component={ClientHomeAds}
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

            <Drawer.Screen name={ScreenNames.ClientEvents} component={ClientEvents}
                options={{
                    title: 'مناسباتي',
                    drawerIcon: () => (
                        <MaterialIcons
                            name='emoji-events'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />
            <Drawer.Screen name={ScreenNames.FileFavorites} component={FileFavorites}
                options={{
                    title: 'المفضلة',
                    drawerIcon: () => (
                        <Fontisto
                            name='favorite'
                            style={{ fontSize: 30, color: '#1e90ff' }}
                        />
                    )
                }}
            />
            <Drawer.Screen name={ScreenNames.ProviderCreateListing} component={ProviderCreateListing} 
             options={{
                title: 'أنشاء خدمة جديدة',
                drawerIcon: () => (
                    <Fontisto
                        name='favorite'
                        style={{ fontSize: 30, color: '#1e90ff' }}
                    />
                )
            }}
            />

            <Drawer.Screen name={ScreenNames.ProviderServiceListing} component={ProviderServiceListing} />
            <Drawer.Screen name={ScreenNames.SignUp} component={SignUp} />
            <Drawer.Screen name={ScreenNames.SignIn} component={SignIn} />

        

            {/* <Drawer.Screen name={ScreenNames.ClientSearch} component={ClientSearch} />
            <Drawer.Screen name={ScreenNames.SignUp} component={SignUp} />
            <Drawer.Screen name={ScreenNames.SignIn} component={SignIn} />
            <Drawer.Screen name={ScreenNames.FileFavoritesShow} component={FileFavoritesShow} /> */}
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;