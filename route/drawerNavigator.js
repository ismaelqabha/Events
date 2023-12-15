import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import { StyleSheet } from 'react-native';

import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import CustomDrewer1 from './CustomDrewer1';
import { ClientScreen, SharedScreen } from './ScreensArrayInfo';


const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrewer1 {...props} />}
            initialRouteName='ClientHome'
            //drawerType="front"
            //drawerPoistion="Right"
            //edgewidth={100}
            //overlayColor='#ffffff'
            // drawerStyle={{
            //     //backgroundColor: '#f0f8ff',
            //     width: 350,
            // }}

            screenOptions={{
                headerShown: false,
                swipeEnabled: true,
                gestureEnapled: true,
                headerTitleAlign: 'center',
                drawerPosition: 'right',
                headerLeft: false,
                headerRight: () => <DrawerToggleButton />,
                headerStyle: {
                    backgroundColor: 'transparent'
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontSize: 15,
                    fontWeight: 'bold',
                },

                drawerStyle: styles.drwaerStyle,
            }}
        >
            {SharedScreen.map((item, index) => (
                <Drawer.Screen key={index} name={item.route} component={item.component}
                    options={{
                        item: item,
                    }}
                />
            ))}
            {/* {ClientScreen.map((item, index) => (
                <Drawer.Screen key={index} name={item.route} component={item.component}
                    options={{
                        item: item,
                    }}
                />
            ))} */}


            {/* <Drawer.Screen name={ScreenNames.LogOut} component={LogOut}
                options={{
                    title: 'تسجيل الخروج',
                    drawerIcon: () => (
                        <Entypo
                            name='log-out'
                            style={styles.drewerIcon}
                        />
                    )
                }}
            /> */}

        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
const styles = StyleSheet.create({
    drewerIcon: {
        fontSize: 20,
        color: '#1e90ff',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        alignSelf: "center",
        position: "absolute",
        right: 5,
    },
    drwaerStyle: {
        width: 280,
        backgroundColor: 'transparent'
    }

})