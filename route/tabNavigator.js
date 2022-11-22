import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import ClientBook from "../src/screens/ClientBook";
import ClientInfo from "../src/screens/ClientInfo";
import ClientNeeds from "../src/screens/ClientNeeds";
import ClientResult from "../src/screens/ClientResult";
import ClientSearch from "../src/screens/ClientSearch";
import ClientServiceDetail from "../src/screens/ClientServiceDetail";
import { ScreenNames } from "./ScreenNames";

const TabNavigator = () => {
    const Tap = createMaterialBottomTabNavigator();
    // const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Tap.Navigator
            activeColor="red"
            inactiveColor="green"
            barStyle={{ backgroundColor: 'black' }}
            shifting={false}
            >
                <Tap.Screen name={ScreenNames.ClientBook} component={ClientBook} />
                <Tap.Screen name={ScreenNames.ClientInfo} component={ClientInfo} />
                <Tap.Screen name={ScreenNames.ClientNeeds} component={ClientNeeds} />
                <Tap.Screen name={ScreenNames.ClientResult} component={ClientResult} />
                <Tap.Screen name={ScreenNames.ClientSearch} component={ClientSearch} />
                <Tap.Screen name={ScreenNames.ClientServiceDetail} component={ClientServiceDetail} />
            </Tap.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigator; 