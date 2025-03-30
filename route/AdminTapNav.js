import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {useState, useRef, useEffect} from 'react'
import { ScreenNames } from './ScreenNames';
import Icon, { Icons } from "../src/components/Icons"
import { colors } from '../src/assets/AppColors';
import { ActivityIndicator } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import AdminHome from '../src/screens/adminScreens/AdminHome';
import AdminClients from '../src/screens/adminScreens/AdminClients';
import AdminVisits from '../src/screens/adminScreens/AdminVisits';


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

const AdminTapNav = () => {
    const [isLoading, setIsLoading] = useState(false);
   

    const TabArr = [
        { route: ScreenNames.AdminHome, label: 'الرئيسية', type: Icons.AntDesign, icon: 'home', component: AdminHome, color: colors.puprble, alphaClr: colors.BGScereen },
        { route: ScreenNames.AdminClients, label: 'الزبائن', type: Icons.Entypo, icon: 'users', component: AdminClients, color: colors.puprble, alphaClr: colors.BGScereen },
        { route: ScreenNames.AdminVisits, label: 'الزبائن', type: Icons.Entypo, icon: 'eye', component: AdminVisits, color: colors.puprble, alphaClr: colors.BGScereen },
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
    )
}

export default AdminTapNav

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