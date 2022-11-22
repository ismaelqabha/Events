import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import SignUp from "../src/screens/SignUp";
import SignIn from "../src/screens/SignIn";
import ClientHomeAds from "../src/screens/ClientHomeAds";
import ClientBook from "../src/screens/ClientBook";
import ClientInfo from "../src/screens/ClientInfo";
import ClientSearch from "../src/screens/ClientSearch";


import { ScreenNames } from "./ScreenNames";
import { createDrawerNavigator } from '@react-navigation/drawer';

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return(
            <Drawer.Navigator>
                <Drawer.Screen name={ScreenNames.SignUp} component={SignUp}/>
                <Drawer.Screen name={ScreenNames.ClientHomeAds} component={ClientHomeAds}/>
                <Drawer.Screen name={ScreenNames.ClientBook} component={ClientBook}/>
                <Drawer.Screen name={ScreenNames.SignIn} component={SignIn}/>
                <Drawer.Screen name={ScreenNames.ClientInfo} component={ClientInfo}/>
                <Drawer.Screen name={ScreenNames.ClientSearch} component={ClientSearch}/>
            </Drawer.Navigator>
    )
}

export default DrawerNavigator ;