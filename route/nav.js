import React from "react";
import { ScreenNames } from "../route/ScreenNames";
import SignIn from "../src/screens/SignIn";
import SignUp from "../src/screens/SignUp";

import ClientHomeAds from "../src/screens/ClientHomeAds";
import ClientBook from "../src/screens/ClientBook";
import ServiceDescr from "../src/screens/ServiceDescr";

import ClientRequest from "../src/screens/ClientRequest";
import Favorites from "../src/screens/Favorites";
import ClientSearch from "../src/screens/ClientSearch";

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
import HomeNavigator from "./HomeNavigator";
import Splash from "../src/screens/Splash";
import Results from "../src/screens/Results";
import SearchServcies from "../src/screens/SearchServcies";

import SubDetailPrices from "../src/screens/SubDetailPrices";
import ServiceDetail from "../src/screens/ServiceDetail";
import Campaigns from "../src/screens/Campaigns";
import ProviderCalender from "../src/screens/ProviderScreens/ProviderCalender";
import ProviderBookingRequest from "../src/screens/ProviderScreens/ProviderBookingRequest";
import TopTapNotificaNavig from "./topTapNotificaNavig";
import CreateUser from "../src/screens/CreateUser";
import ProviderTapNav from "./ProviderTapNav";
import ProviderCreateListing from "../src/screens/ProviderScreens/ProviderCreateListing";



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
                initialRouteName={"Splash"}
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
                <Stack.Screen name="TapNoti" component={TopTapNotificaNavig} />
                <Stack.Screen name="TapProvider" component={ProviderTapNav} />
                <Stack.Screen name={ScreenNames.Splash} component={Splash} />

               

                <Stack.Screen name={ScreenNames.ClientBook} component={ClientBook} />
                <Stack.Screen name={ScreenNames.ServiceDescr} component={ServiceDescr} />
                <Stack.Screen name={ScreenNames.Favorites} component={Favorites} />
                <Stack.Screen name={ScreenNames.ClientSearch} component={ClientSearch} />
                <Stack.Screen name={ScreenNames.ClientRequest} component={ClientRequest} />
                <Stack.Screen name={ScreenNames.Results} component={Results} />
                <Stack.Screen name={ScreenNames.SearchServcies} component={SearchServcies} />
                <Stack.Screen name={ScreenNames.ServiceDetail} component={ServiceDetail} />
                <Stack.Screen name={ScreenNames.SubDetailPrices} component={SubDetailPrices} />
                <Stack.Screen name={ScreenNames.Campaigns} component={Campaigns} />
                <Stack.Screen name={ScreenNames.CreateUser} component={CreateUser} />
                

               
                <Stack.Screen name={ScreenNames.ProviderChooseService} component={ProviderChooseService} />
                <Stack.Screen name={ScreenNames.ProviderAddInfo} component={ProviderAddInfo} />
                <Stack.Screen name={ScreenNames.ProviderSetPhotos} component={ProviderSetPhotos} />
                <Stack.Screen name={ScreenNames.ProviderSetWorkingRegion} component={ProviderSetWorkingRegion} />
                <Stack.Screen name={ScreenNames.ProviderAddSubDetail} component={ProviderAddSubDetail} />
                <Stack.Screen name={ScreenNames.ProviderAddServiceDetail} component={ProviderAddServiceDetail} />
                <Stack.Screen name={ScreenNames.ProviderSetPrice} component={ProviderSetPrice} />
                <Stack.Screen name={ScreenNames.ProviderCalender} component={ProviderCalender} />
                <Stack.Screen name={ScreenNames.ProviderBookingRequest} component={ProviderBookingRequest} />
                <Stack.Screen name={ScreenNames.ProviderCreateListing} component={ProviderCreateListing}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default MainNavigation;





