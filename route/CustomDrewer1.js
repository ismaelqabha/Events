import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon, { Icons } from "../src/components/Icons"
import { colors } from '../src/assets/AppColors'


const DrawerItem = ({ label, onPress, tapBarTestID, type, name, color, activeItemColor }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            testID={tapBarTestID}
            accessibilityRole='button'
            style={[styles.drawerItem, { backgroundColor: activeItemColor }]}
        >
            <Text style={[styles.label, { color }]}>{label}</Text>
            <Icon type={type} name={name} {...{ color }} />
        </TouchableOpacity>
    )
}


const CustomDrewer1 = (props) => {
    const { state, descriptors, navigation } = props


    return (
        <View style={styles.container}>
            <View style={[styles.dreView, styles.marginTop]}>
                <View style={styles.iconContainer}>
                    <FontAwesome
                        name='user-circle-o'
                        size={100}
                        style={styles.userIcon}
                    />
                    <Text style={styles.hederTxt}>IQ</Text>
                </View>

            </View>

            <DrawerContentScrollView {...props} style={[styles.dreView, styles.marginVertical]}>
                <View>
                    {state.routes.map((route, index) => {
                        const isFocused = state.index === index;
                        const { options } = descriptors[route.key];

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                            })
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name)
                            }
                        }

                        const color = isFocused ? 'white' : colors.puprble;
                        const activeItemColor = isFocused ? colors.puprble : null
                        const drawerItem = options.item;

                        return (
                            <DrawerItem key={index} label={drawerItem.label}
                                tapBarTestID={options.tapBarTestID}
                                onPress={onPress}
                                name={drawerItem.icon}
                                type={drawerItem.type}
                                color={color}
                                activeItemColor={activeItemColor}
                            />
                        )
                    })}
                </View>

            </DrawerContentScrollView>

        </View>
    )
}

export default CustomDrewer1

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dreView: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginHorizontal: 5,
        padding: 25
    },
    hederTxt: {
        textAlign: 'right',
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.puprble,
    },
    marginTop: {
        marginTop: 10,
    },
    marginVertical: {
        marginVertical: 10
    },
    iconContainer: {
        alignItems: 'center'
    },
    userIcon: {
        color: colors.puprble,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'flex-end',
        borderRadius: 8
    },
    label: {
        fontSize: 15,
        color: '#333',
        paddingHorizontal: 20,
        alignSelf: 'center'
    },
    iconContainer: {
        alignItems: 'center'
    }
})