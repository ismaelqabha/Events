import React from "react";
import { ScreenNames } from "../route/ScreenNames";
import SignIn from "../src/screens/SignIn";
import SignUp from "../src/screens/SignUp";
import VideoPlayer from "../src/screens/VideoPlayer";
import ClientHomeAds from "../src/screens/ClientHomeAds";
import ClientBook from "../src/screens/ClientBook";
import ServiceDescr from "../src/screens/ServiceDescr";
import ClientResult from "../src/screens/ClientResult";
import ClientInfo from "../src/screens/ClientInfo";
import ClientRequest from "../src/screens/ClientRequest";
import Favorites from "../src/screens/Favorites";

import ProviderChooseService from '../src/screens/ProviderScreens/ProviderChooseService';
import ProviderSetPhotos from "../src/screens/ProviderScreens/ProviderSetPhotos";
import ProviderSetWorkingRegion from "../src/screens/ProviderScreens/ProviderSetWorkingRegion";
import ProviderAddInfo from '../src/screens/ProviderScreens/ProviderAddInfo';
import ProviderAddSubDetail from "../src/screens/ProviderScreens/ProviderAddSubDetail";
import ProviderAddServiceDetail from "../src/screens/ProviderScreens/ProviderAddServiceDetail";
import ProviderSetPrice from "../src/screens/ProviderScreens/ProviderSetPrice";

import FileFavorites from "../src/screens/FileFavorites";
import ClientEvents from "../src/screens/ClientEvents";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./drawerNavigator";
import TabNavigator from "./tabNavigator";
import { Easing } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";

const MainNavigation = (props) => {
    const Stack = createNativeStackNavigator();
    const config = {
        Animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 50,
            mass: 3,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        }
    }
    const closeConfig = {
        Animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear,
        }
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Drawr'}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    CardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen name="Drawr" component={DrawerNavigator} />
                <Stack.Screen name="Tap" component={TabNavigator} />

                {/* <Stack.Screen name={ScreenNames.SignIn} component={SignIn} /> */}
                {/* <Stack.Screen name={ScreenNames.SignUp} component={SignUp} /> */}
                
                <Stack.Screen name={ScreenNames.ClientHomeAds} component={ClientHomeAds} />
                <Stack.Screen name={ScreenNames.VideoPlayer} component={VideoPlayer} />
                <Stack.Screen name={ScreenNames.ClientBook} component={ClientBook} />
                <Stack.Screen name={ScreenNames.ServiceDescr} component={ServiceDescr} />
                <Stack.Screen name={ScreenNames.ClientResult} component={ClientResult} />
                <Stack.Screen name={ScreenNames.Favorites} component={Favorites} />
                {/* <Stack.Screen name={ScreenNames.FileFavorites} component={FileFavorites} /> */}
                <Stack.Screen name={ScreenNames.ClientInfo} component={ClientInfo} />
                <Stack.Screen name={ScreenNames.ClientRequest} component={ClientRequest} />
                {/* <Stack.Screen name={ScreenNames.ClientEvents} component={ClientEvents} /> */}
                
                <Stack.Screen name={ScreenNames.ProviderChooseService} component={ProviderChooseService} />
                <Stack.Screen name={ScreenNames.ProviderAddInfo} component={ProviderAddInfo} />
                <Stack.Screen name={ScreenNames.ProviderSetPhotos} component={ProviderSetPhotos} />
                <Stack.Screen name={ScreenNames.ProviderSetWorkingRegion} component={ProviderSetWorkingRegion} />
                <Stack.Screen name={ScreenNames.ProviderAddSubDetail} component={ProviderAddSubDetail} />
                <Stack.Screen name={ScreenNames.ProviderAddServiceDetail} component={ProviderAddServiceDetail} />
                <Stack.Screen name={ScreenNames.ProviderSetPrice} component={ProviderSetPrice} />

            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default MainNavigation;





