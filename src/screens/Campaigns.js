import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";

const Campaigns = (props) => {
    const { data } = props?.route.params

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
            </View>
            <View style={styles.image}>
                    <Image style={{ flex: 1 }} source={{ uri: data.campImag }} />
                </View>
                <View style={styles.body}>
                    <Text>{data.campTitle}</Text>
                    <Text>{data.campDesc}</Text>
                    <Text>{data.campCost + ' ILS'}</Text>
                </View>
           
        </View>
    )
}

export default Campaigns

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
        // borderWidth:1
    },
})