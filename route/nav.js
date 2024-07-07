import React from "react";
import { ScreenNames } from "../route/ScreenNames";
import SignIn from "../src/screens/SignIn";
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


import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./drawerNavigator";
import TabNavigator from "./tabNavigator";
import { Easing } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import HomeNavigator from "./HomeNavigator";
import Splash from "../src/screens/Splash";

import SubDetailPrices from "../src/screens/SubDetailPrices";
import Campaigns from "../src/screens/Campaigns";
import ProviderCalender from "../src/screens/ProviderScreens/ProviderCalender";
import ProviderBookingRequest from "../src/screens/ProviderScreens/ProviderBookingRequest";
import TopTapNotificaNavig from "./topTapNotificaNavig";
import ProviderTapNav from "./ProviderTapNav";
import ProviderCreateListing from "../src/screens/ProviderScreens/ProviderCreateListing";
import ProviderSocialMediaScreen from "../src/screens/ProviderScreens/ProviderSocialMediaScreen";
import ProviderInitialWithDetailPrice from "../src/screens/ProviderScreens/ProviderInitialWithDetailPrice";
import ProviderContantPrice from "../src/screens/ProviderScreens/ProviderContantPrice";
import CreateUpersonalInfo from "../src/screens/Signup/CreateUpersonalInfo";
import CreatePassword from "../src/screens/Signup/CreatePassword";
import SetUserAddress from "../src/screens/Signup/SetUserAddress";
import SetUserStatus from "../src/screens/Signup/SetUserStatus";
import ProviderCreateOffer from "../src/screens/ProviderScreens/ProviderCreateOffer";
import ProviderSetEventType from "../src/screens/ProviderScreens/ProviderSetEventType";
import UserProfile from "../src/screens/UserProfile";
import ProviderNotification from "../src/screens/ProviderScreens/ProviderNotification";
import ProviderClientScreen from "../src/screens/ProviderScreens/ProviderClientScreen";

import ProviderShowOffers from "../src/screens/ProviderScreens/ProviderShowOffers";
import ProviderOfferDesc from "../src/screens/ProviderScreens/ProviderOfferDesc";

import ProviderShowRequest from "../src/screens/ProviderScreens/ProviderShowRequest";
import ClientShowRequest from "../src/screens/ClientShowRequest";
import ForgotPassword from "../src/screens/ForgotPassword";
import ProviderDuePayments from "../src/screens/ProviderScreens/ProviderDuePayments";
import ClientDuePayments from "../src/screens/ClientScreens/ClientDuePayments";
import ClientPayment from "../src/screens/ClientScreens/ClientPayment";
import ClientOldEvents from "../src/screens/ClientScreens/ClientOldEvents";
import ClientRelations from "../src/screens/ClientScreens/ClientRelations";
import RequestDuePaymentsShow from "../src/screens/Payment Screens/RequestDuePaymentsShow";
import PaymentDetail from "../src/screens/Payment Screens/PaymentDetail";
import MakePayment from "../src/screens/Payment Screens/MakePayment";
import ClientBook from "../src/screens/ClientScreens/ClientBook";
import ClientSpecialDates from "../src/screens/ClientScreens/ClientSpecialDates";
import ReviewsScreen from "../src/screens/ReviewsScreen";
import ClientSearch from "../src/screens/ClientScreens/ClientSearch";
import Results from "../src/screens/ClientScreens/Results";
import ServiceDescr from "../src/screens/ClientScreens/ServiceDescr";
import SearchServcies from "../src/screens/ClientScreens/SearchServcies";





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
                <Stack.Screen name={ScreenNames.SignIn} component={SignIn} />
                <Stack.Screen name={ScreenNames.ForgotPassword} component={ForgotPassword} />


                <Stack.Screen name={ScreenNames.ClientBook} component={ClientBook} />
                <Stack.Screen name={ScreenNames.ServiceDescr} component={ServiceDescr} />
                <Stack.Screen name={ScreenNames.Favorites} component={Favorites} />
                <Stack.Screen name={ScreenNames.ClientSearch} component={ClientSearch} />
                <Stack.Screen name={ScreenNames.ClientRequest} component={ClientRequest} />
                <Stack.Screen name={ScreenNames.Results} component={Results} />
                <Stack.Screen name={ScreenNames.SearchServcies} component={SearchServcies} />
                <Stack.Screen name={ScreenNames.SubDetailPrices} component={SubDetailPrices} />
                <Stack.Screen name={ScreenNames.Campaigns} component={Campaigns} />
                <Stack.Screen name={ScreenNames.UserProfile} component={UserProfile} />
                <Stack.Screen name={ScreenNames.ReviewsScreen} component={ReviewsScreen} />
                <Stack.Screen name={ScreenNames.ClientSpecialDates} component={ClientSpecialDates} />
                <Stack.Screen name={ScreenNames.ClientRelations} component={ClientRelations} />
                <Stack.Screen name={ScreenNames.ClientShowRequest} component={ClientShowRequest} />
                <Stack.Screen name={ScreenNames.ClientDuePayments} component={ClientDuePayments} />
                <Stack.Screen name={ScreenNames.ClientPayment} component={ClientPayment} />
                <Stack.Screen name={ScreenNames.ClientOldEvents} component={ClientOldEvents} />
                <Stack.Screen name={ScreenNames.RequestDuePaymentsShow} component={RequestDuePaymentsShow} />
                <Stack.Screen name={ScreenNames.PaymentDetail} component={PaymentDetail} />
                <Stack.Screen name={ScreenNames.MakePayment} component={MakePayment} />
                
               
                <Stack.Screen name={ScreenNames.ProviderChooseService} component={ProviderChooseService} />
                <Stack.Screen name={ScreenNames.ProviderAddInfo} component={ProviderAddInfo} />
                <Stack.Screen name={ScreenNames.ProviderSetPhotos} component={ProviderSetPhotos} />
                <Stack.Screen name={ScreenNames.ProviderSetWorkingRegion} component={ProviderSetWorkingRegion} />
                <Stack.Screen name={ScreenNames.ProviderSocialMediaScreen} component={ProviderSocialMediaScreen} />
                <Stack.Screen name={ScreenNames.ProviderAddSubDetail} component={ProviderAddSubDetail} />
                <Stack.Screen name={ScreenNames.ProviderAddServiceDetail} component={ProviderAddServiceDetail} />
                <Stack.Screen name={ScreenNames.ProviderSetPrice} component={ProviderSetPrice} />
                <Stack.Screen name={ScreenNames.ProviderCalender} component={ProviderCalender} />
                <Stack.Screen name={ScreenNames.ProviderBookingRequest} component={ProviderBookingRequest} />
                <Stack.Screen name={ScreenNames.ProviderCreateListing} component={ProviderCreateListing}/>
                <Stack.Screen name={ScreenNames.ProviderInitialWithDetailPrice} component={ProviderInitialWithDetailPrice} />
                <Stack.Screen name={ScreenNames.ProviderContantPrice} component={ProviderContantPrice} />
                <Stack.Screen name={ScreenNames.ProviderCreateOffer} component={ProviderCreateOffer} />
                <Stack.Screen name={ScreenNames.ProviderSetEventType} component={ProviderSetEventType} />
                <Stack.Screen name={ScreenNames.ProviderNotification} component={ProviderNotification} />
                <Stack.Screen name={ScreenNames.ProviderClientScreen} component={ProviderClientScreen} />
                <Stack.Screen name={ScreenNames.ProviderShowOffers} component={ProviderShowOffers} />
                <Stack.Screen name={ScreenNames.ProviderOfferDesc} component={ProviderOfferDesc} />
                <Stack.Screen name={ScreenNames.ProviderDuePayments} component={ProviderDuePayments} />
                <Stack.Screen name={ScreenNames.ProviderShowRequest} component={ProviderShowRequest} />
                
                
                <Stack.Screen name={ScreenNames.CreateUpersonalInfo} component={CreateUpersonalInfo} />
                <Stack.Screen name={ScreenNames.CreatePassword} component={CreatePassword} />
                <Stack.Screen name={ScreenNames.SetUserAddress} component={SetUserAddress} />
                <Stack.Screen name={ScreenNames.SetUserStatus} component={SetUserStatus} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default MainNavigation;





