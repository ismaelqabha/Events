import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';

const ProviderClientScreen = (props) => {

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>قائمة الزبائن</Text>
            </View>
        )
    }
    const renderClients = () => {
        return (
            <View style={styles.clientView}>
                <View style={styles.client}>
                    <Text style={styles.clientName}>أحمد كبها</Text>
                    <View style={styles.ImgView}>
                        <Image style={styles.clientImg} source={require('../../assets/photos/user.png')} />
                    </View>
                </View>
                <View style={styles.client}>
                    <Text style={styles.clientName}>خالد احمد</Text>
                    <View style={styles.ImgView}>
                        <Image style={styles.clientImg} source={require('../../assets/photos/user.png')} />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {header()}
            {renderClients()}
        </View>
    )
}

export default ProviderClientScreen

const styles = StyleSheet.create({
    container: {

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
    clientView: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5
    },
    client: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'flex-end',
        margin: 10,
    },
    ImgView:{
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: colors.puprble,
        borderRadius: 30,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    clientImg: {
        width: 50,
        height: 50,
        
    },
    clientName: {
        fontSize: 20,
        color: colors.puprble,
        marginRight: 20,
        alignSelf: 'flex-end'
    }
})