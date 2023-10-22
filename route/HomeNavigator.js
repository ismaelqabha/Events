
import React from 'react';
import {StyleSheet } from 'react-native';
import TabNavigator from "./tabNavigator";
import { createDrawerNavigator } from '@react-navigation/drawer';
import TopTapNotificaNavig from './topTapNotificaNavig';

const HomeNavigator = () => {
    const Drawer = createDrawerNavigator() ;
    return (
            <Drawer.Navigator>
                <Drawer.Screen name="Tap" component={TabNavigator} />
                <Drawer.Screen name="Tapp" component={TopTapNotificaNavig} />
            </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({})

export default HomeNavigator;
