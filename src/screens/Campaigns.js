import { StyleSheet, Text, View, Pressable, Image,ScrollView } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../assets/AppColors';

import Feather from "react-native-vector-icons/Feather";


const Campaigns = (props) => {
    const { data } = props?.route.params

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const renderHeader = () => {
        return (
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
        )
    }

    const renderImg = () => {
        return (
            <View style={styles.image}>
                <Image style={{ flex: 1 }} source={{ uri: data.campImag }} />
            </View>
        )
    }

    const renderBody = () => {
        return (
            <View style={styles.body}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={styles.titletxt}>{data.campCost + ' ILS'}</Text>
                    <Text style={styles.titletxt}>{data.campTitle}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.titletxt}>العرض يشمل</Text>
                    {data.campContents.map(content => {
                        return (<View style={styles.contentItem}>
                            <Text style={styles.itemtxt}>{content}</Text>
                            <Feather
                                style={{ alignSelf: 'center' }}
                                name={"corner-down-left"}
                                color={colors.puprble}
                                size={25} /></View>
                        )
                    })}
                </View>
            </View>
        )
    }
    const renderFooter = () => {
        return (
            <View style={styles.foter}>
                <Pressable style={styles.btnview}
                //onPress={() => onPressHandler()}
                >
                    <Text style={styles.btntext}>فحص الامكانية </Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            
                {renderImg()}
                {renderBody()}
           
            {renderFooter()}
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
        alignItems:  'center',
        height: 40
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 8,
        marginBottom: 8,
        // borderWidth:1
    },
    titletxt: {
        fontSize: 18,
        color: colors.puprble
    },
    itemtxt: {
        fontSize: 15,
        color: colors.puprble,
        marginRight: 10,
    },
    body: {
        backgroundColor: colors.BGScereen,
        //borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        position: 'absolute',
        width: '100%',
        height: 420,
        top: 280
    },
    contentView: {
        marginVertical: 20,
        //marginRight: 20
    },
    contentItem: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 5,
        height: 30,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    foter: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGold,
    },
    btnview: {
        backgroundColor: colors.puprble,
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 20,
        elevation: 5
    },
})