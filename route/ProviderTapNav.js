import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef, useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ScreenNames } from "./ScreenNames";
import ProviderHome from '../src/screens/ProviderScreens/ProviderHome';
import ProviderProfile from '../src/screens/ProviderScreens/ProviderProfile';
import ProviderCalender from '../src/screens/ProviderScreens/ProviderCalender';
import TopTapNotificaNavig from './topTapNotificaNavig';

import { colors } from '../src/assets/AppColors';
import Icon, { Icons } from "../src/components/Icons"
import * as Animatable from 'react-native-animatable';
import { getServiceImages, getServiceInfoById } from '../src/resources/API';
import ServiceProviderContext from '../store/ServiceProviderContext';
import ProviderCreateListing from '../src/screens/ProviderScreens/ProviderCreateListing';
import UsersContext from '../store/UsersContext';
import { ActivityIndicator } from 'react-native-paper';



const Tap = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;


  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
    } else {
      viewRef.current.animate({ 0: { scale: 1, }, 1: { scale: 0, } });
      textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
    }
  }, [focused])


  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 }]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]} />
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
          <Icon type={item.type} name={item.icon} color={focused ? 'lightgray' : 'gray'} />
          <Animatable.View
            ref={textViewRef}>
            {focused && <Text style={{
              color: 'lightgray', paddingHorizontal: 8
            }}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}


const ProviderTapNav = () => {
  const { serviceInfoAccorUser, setServiceInfoAccorUser } = useContext(ServiceProviderContext);
  const { userId } = useContext(UsersContext);
  const [isLoading, setIsLoading] = useState(true);


  const getServiceInfofromApi = async () => {
    try {
      const res = await getServiceInfoById({ userID: userId });
      if (res.message) {
        setServiceInfoAccorUser([]);
      } else {
        const updatedServiceInfo = await Promise.all(res.map(async (item) => {
          // Call getServiceImages for each item
          const serviceImageRes = await getServiceImages(item.service_id);
          // Merge the result with the original item
          return { ...item, serviceImages: serviceImageRes._doc.serviceImages, logoArray: serviceImageRes._doc.logoArray };
        }));
        
        setServiceInfoAccorUser(updatedServiceInfo);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getServiceInfofromApi()
  }, [])

  const TabArr = [
    { route: ScreenNames.ProviderProfile, label: 'بروفايل', type: Icons.AntDesign, icon: 'profile', component: serviceInfoAccorUser.length < 1 ? ProviderCreateListing : ProviderProfile, color: colors.puprble, alphaClr: colors.BGScereen },
    { route: ScreenNames.ProviderHome, label: 'خدماتي', type: Icons.Ionicons, icon: 'create-outline', component: ProviderHome, color: colors.puprble, alphaClr: colors.BGScereen },
    { route: ScreenNames.ProviderCalender, label: 'التقويم', type: Icons.AntDesign, icon: 'calendar', component: ProviderCalender, color: colors.puprble, alphaClr: colors.BGScereen },
    { route: "Notification", label: 'الحجوزات', type: Icons.AntDesign, icon: 'book', component: TopTapNotificaNavig, color: colors.puprble, alphaClr: colors.BGScereen },
  ];

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) :
        (
          <Tap.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                height: 70,
                position: 'absolute',
                bottom: 16,
                right: 16,
                left: 16,
                borderRadius: 16,
                backgroundColor: colors.BGScereen
              }
            }}

          >
            {TabArr.map((item, index) => {
              return (
                <Tap.Screen key={index} name={item.route} component={item.component}
                  options={{
                    tabBarShowLabel: false,
                    //tabBarLabel: item.label,
                    // tabBarIcon: ({ color, focused }) => (
                    //     <Icon type={item.type} name={item.route} color={color} />
                    // ),
                    tabBarButton: (props) => <TabButton {...props} item={item} />
                  }}
                />
              )
            })}
          </Tap.Navigator>
        )}
    </>


    // <Tap.Navigator
    //     // initialRouteName='ProviderHome'
    //     activeColor={colors.puprble}
    //     inactiveColor={colors.darkGold}
    //     barStyle={{ backgroundColor: 'snow' }}>

    //     <Tap.Screen name={ScreenNames.ProviderProfile} component={ProviderProfile}
    //         options={{
    //             title: 'بروفايل',
    //             tapBarIcon: () => (
    //                 <AntDesign
    //                     name='profile'
    //                     style={{ fontSize: 30, color: '#1e90ff' }}
    //                 />
    //             )
    //         }}
    //     />
    //     <Tap.Screen name={ScreenNames.ProviderHome} component={ProviderHome}
    //         options={{
    //             title: 'خدماتي',
    //             drawerIcon: () => (
    //                 <Ionicons
    //                     name='create-outline'
    //                     style={{ fontSize: 30, color: '#1e90ff' }}
    //                 />
    //             )
    //         }}
    //     />

    //     <Tap.Screen name={ScreenNames.ProviderNotification} component={ProviderNotification}
    //         options={{
    //             title: 'الاشعارات',
    //             drawerIcon: () => (
    //                 <AntDesign
    //                     name='notification'
    //                     style={{ fontSize: 30, color: '#1e90ff' }}
    //                 />
    //             )
    //         }}
    //     />

    //     <Tap.Screen name="Notification" component={TopTapNotificaNavig}
    //         options={{
    //             title: 'الحجوزات',
    //             drawerIcon: () => (
    //                 <AntDesign
    //                     name='book'
    //                     style={{ fontSize: 30, color: '#1e90ff' }}
    //                 />
    //             )
    //         }}
    //     />



    // </Tap.Navigator>

  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  }
})

export default ProviderTapNav