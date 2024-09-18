import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { findRequestsByUserId } from '../../resources/API';
import { ScreenNames } from '../../../route/ScreenNames';


const ProviderClientScreen = (props) => {

    const { isFirst } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);
    const [userData, setUserData] = useState([])

    const filterService = () => {
        const service = serviceInfoAccorUser?.filter(item => {
            return item.service_id === isFirst;
        });
        return service
    };

    const getuserfromApi = () => {

        const service = filterService()
        const allclients = service[0].clients

        findRequestsByUserId({ clients: allclients, service_id: isFirst }).then(res => {
            setUserData(res)

        })
    }

    useEffect(() => {
        getuserfromApi()
    }, [])

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
                <Pressable style={styles.numclient}>
                    <Text style={styles.moretxt}>{'الزبائن' + ' ' + '(' + userData.length + ')'}</Text>
                </Pressable>
            </View>
        )
    }
   

    const renderClients = () => {

        return userData.map(item => {
            const requests = item.clientReqPay
            return (
                <Pressable style={styles.clientView} onPress={() => props.navigation.navigate(ScreenNames.ProviderClientRequestShow, {requests })}>
                    <Text style={styles.clientName}>{item.client.User_name}</Text>
                    <View style={styles.ImgView}>
                        <Image style={styles.clientImg} source={{ uri: item.client.UserPhoto }} />
                    </View>
                </Pressable>
            )
        })
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 5,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
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
        borderRadius: 50,
    },
    clientName: {
        fontSize: 20,
        color: colors.puprble,
        marginRight: 20,
        // alignSelf: 'flex-end'
    },
    NumOfClients: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginVertical: 20
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
    },
    servDetailModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    bodyModal: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
})