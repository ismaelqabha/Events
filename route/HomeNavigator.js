
import React from 'react';
import {StyleSheet } from 'react-native';
import TabNavigator from "./tabNavigator";
import { createDrawerNavigator } from '@react-navigation/drawer';

const HomeNavigator = () => {
    const Drawer = createDrawerNavigator() ;
    return (
            <Drawer.Navigator>
                <Drawer.Screen name="Tap" component={TabNavigator} />
            </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({})

export default HomeNavigator;
