import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../assets/AppColors';

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
                    <Text style={styles.txt}>{'العنوان  ' + data.campTitle}</Text>


                    <Text style={styles.txt}>العرض يشمل</Text>
                    <Text style={styles.txt}>{'*  '  + data.campContents[0]}</Text>
                    <Text style={styles.txt}>{'*  '  + data.campContents[1]}</Text>
                    <Text style={styles.txt}>{data.campCost + ' ILS'}</Text>

                </View>
                <View style={styles.foter}>
                <Pressable style={styles.btnview} 
                //onPress={() => onPressHandler()}
                >
                    <Text style={styles.btntext}>فحص الامكانية </Text>
                </Pressable>
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
    txt:{
        fontSize: 20
    },
    foter: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: colors.BGScereen,
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGold,
    },
    btnview: {
        backgroundColor: colors.puprble,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 20,
        elevation: 5
    },
})