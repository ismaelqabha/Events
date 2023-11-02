
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ScreenNames } from "./ScreenNames";
import ProviderWaitingReply from '../src/screens/ProviderScreens/ProviderWaitingReply';
import ProviderWaitingPay from '../src/screens/ProviderScreens/ProviderWaitingPay';

const TopTapNotificaNavig = () => {

    const Tap = createMaterialTopTabNavigator();
    return (
        <Tap.Navigator>
            <Tap.Screen name={ScreenNames.ProviderWaitingReply} component={ProviderWaitingReply}
                options={{
                    title: 'حجوزات بأنتظار الرد',
                }}
            />
            <Tap.Screen name={ScreenNames.ProviderWaitingPay} component={ProviderWaitingPay}
             options={{
                title: 'حجوزات بأنتظار الدفع',
            }}
            />
        </Tap.Navigator>
    )
}

export default TopTapNotificaNavig