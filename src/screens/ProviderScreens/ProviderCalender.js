import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import CalenderDayCard from '../../components/ProviderComponents/CalenderDayCard';

const ProviderCalender = (props) => {
    // const { data } = props?.route.params;

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                {/* <Text style={styles.txt}>{data?.title}</Text> */}
            </View>

            <View style={styles.body}>
                
                <CalenderDayCard />
            </View>
        </View>
    )
}

export default ProviderCalender

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    body: {
        flex: 1,
        marginTop: 40,
    },
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 20,
        color: 'black'
    }
})