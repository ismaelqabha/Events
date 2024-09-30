import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const ProviderSetNewBooking = (props) => {

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.title}>
                <TouchableOpacity onPress={onPressHandler}>
                    <AntDesign
                        style={styles.iconback}
                        name={"left"}
                        color={"black"}
                        size={25} />
                </TouchableOpacity>
                <Text style={styles.titletxt}>اٍنشاء حجز</Text>
            </View>
        )
    }


    const renderHeadLines = () => {
        return (
            <View style={styles.head}>
                <View style={styles.headShape}>
                    <View style={styles.circle}>
                        <Text style={styles.numberTxt}>3</Text>
                    </View>

                    <View style={styles.line}></View>
                    <View style={styles.circlePassed}>
                        <Text style={styles.numberTxtPassed}>2</Text>
                    </View>

                    <View style={styles.linePassed}></View>
                    <View style={styles.circlePassed}>
                        <Text style={styles.numberTxtPassed}>1</Text>
                    </View>

                </View>
                <View style={styles.headTitle}>
                    <View style={styles.headItem}>
                        <Text style={styles.headTxt}>الدفع</Text>
                    </View>
                    <View style={styles.headItem}>
                        <Text style={styles.headTxtSelected}>تفاصيل الحجز</Text>
                    </View>
                    <View style={styles.headItem}>
                        <Text style={styles.headTxt}>معلومات الزبون</Text>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            {header()}
            {renderHeadLines()}
        </View>
    )
}

export default ProviderSetNewBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    titletxt: {
        fontSize: 20,
        color: colors.puprble
    },
    headTitle: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
        height: '50%',
        //   borderWidth: 1
    },
    headShape:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        // borderWidth: 1
    },
    head: {
        width: '90%',
        height: 100,
        alignSelf: 'center',
        marginVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.puprble,
        // borderWidth: 1
    },
    headItem: {
        // borderWidth: 1,
        alignItems: 'center',
        width: '20%',
    },
    circle: {
        borderWidth: 1,
        width: '12%',
        height: '85%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.silver
    },
    circlePassed: {
        width: '12%',
        height: '85%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BGScereen
    },
    line: {
        borderWidth: 1,
        width: "22%",
        borderColor: colors.silver
    },
    linePassed: {
        borderWidth: 2,
        width: "22%",
        borderColor: colors.BGScereen
    },
    headTxt:{
        fontSize: 15,
        textAlign: 'center',
        color: colors.silver
    },
    headTxtSelected:{
        fontSize: 15,
        color: colors.BGScereen,
        fontWeight: 'bold',
        textAlign: 'center',  
    },
    numberTxt:{
        fontSize: 15,
        textAlign: 'center',
        color: colors.silver
    },
    numberTxtPassed:{
        fontSize: 15,
        textAlign: 'center',
        color: colors.puprble,
        fontWeight: 'bold',
    },
})