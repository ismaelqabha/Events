import React from "react";
import { ScreenNames } from "../route/ScreenNames";
import SignIn from "../src/screens/SignIn";
import SignUp from "../src/screens/SignUp";
import VideoPlayer from "../src/screens/VideoPlayer";
import ClientHomeAds from "../src/screens/ClientHomeAds";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./drawerNavigator";
import TabNavigator from "./tabNavigator";

const MainNavigation = (props) => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Drawr'}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Drawr" component={DrawerNavigator} />
                <Stack.Screen name={ScreenNames.SignIn} component={SignIn} />
                <Stack.Screen name={ScreenNames.SignUp} component={SignUp} />
                <Stack.Screen name={ScreenNames.ClientHomeAds} component={ClientHomeAds} />
                <Stack.Screen name={ScreenNames.VideoPlayer} component={VideoPlayer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default MainNavigation;





