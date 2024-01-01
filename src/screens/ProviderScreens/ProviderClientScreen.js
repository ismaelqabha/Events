import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native'
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
    const renderNumOfClients = () => {
        return (
            <View style={styles.NumOfClients}>
                <Pressable style={styles.more}>
                    <Text style={styles.moretxt}>المزيد</Text>
                </Pressable>
                <Pressable style={styles.numclient}>
                    <Text style={styles.moretxt}> الزبائن(2)</Text>
                </Pressable>
            </View>
        )
    }
    const renderClients = () => {
        return (
            <View style={styles.clientView}>
                <View style={styles.client}>
                    <Pressable>
                        <Text style={styles.menuTxt}>...</Text>
                    </Pressable>
                    <Pressable style={styles.client}>
                        <Text style={styles.clientName}>أحمد كبها</Text>
                        <View style={styles.ImgView}>
                            <Image style={styles.clientImg} source={require('../../assets/photos/user.png')} />
                        </View>
                    </Pressable>

                </View>
                <View style={styles.client}>
                    <Pressable>
                        <Text style={styles.menuTxt}>...</Text>
                    </Pressable>
                    <Pressable style={styles.client}>
                        <Text style={styles.clientName}>خالد احمد</Text>
                        <View style={styles.ImgView}>
                            <Image style={styles.clientImg} source={require('../../assets/photos/user.png')} />
                        </View>
                    </Pressable>
                </View>
            </View>
        )
    }
    const renderSearch = () => {
        return (
            <View style={styles.search}>
                <TextInput
                    style={styles.searchinput}
                    keyboardType="default"
                    placeholder='بحث'
                // onChangeText={(value) => setSearched(value)}
                />
                <AntDesign
                    style={styles.icon}
                    name={"search1"}
                    size={20}
                />

            </View>
        )
    }
    return (
        <View style={styles.container}>
            {header()}
            {renderSearch()}
            {renderNumOfClients()}
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
        height: 70,
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center'
    },
    ImgView: {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: colors.puprble,
        borderRadius: 50,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'

    },
    clientImg: {
        width: 65,
        height: 65,
    },
    clientName: {
        fontSize: 20,
        color: colors.puprble,
        marginRight: 20,
        // alignSelf: 'flex-end'
    },
    NumOfClients: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30
    },
    more: {
        marginLeft: 20
    },
    numclient: {
        marginRight: 20
    },
    moretxt: {
        fontSize: 15,
        color: colors.puprble
    },
    menuTxt: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    search: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20,
        borderRadius: 10
    }
})