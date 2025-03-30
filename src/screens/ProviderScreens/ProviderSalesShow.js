import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../assets/AppColors';
import AntDesign from "react-native-vector-icons/AntDesign";

const ProviderSalesShow = (props) => {
    const { data, label } = props.route?.params || {}
    //console.log(data[0].userInfo);
    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={onPressHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </TouchableOpacity>
                <Text style={styles.headerTxt}>{label}</Text>
            </View>
        )
    }

    const renderSales = () => {
        return data.map(item => {
            return (
                <View style={styles.card}>
                    <View style={styles.infoView}>
                        <Text style={styles.infoText}>{item.userInfo[0].User_name}</Text>
                        <Text style={styles.infoText}>{item.requestInfo.Cost}</Text>
                    </View>

                    <Image style={styles.clieImg} source={{ uri: item.userInfo[0].UserPhoto }} />
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
            {renderSales()}
            </ScrollView>
            
        </View>
    )
}

export default ProviderSalesShow

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },

    headerTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    clieImg: {
        width: "20%",
        height: "100%",
        borderRadius:20
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "90%",
        height: 80,
        alignSelf: 'center',
        marginVertical: 5
    },
    infoText:{
        fontSize: 18,
        color: colors.puprble,

    },
    infoView:{
        width: "80%",
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        
    }
})