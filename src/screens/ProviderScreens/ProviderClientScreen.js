import { StyleSheet, Text, View, Pressable, Image, TextInput,Animated } from 'react-native'
import React, { useContext, useState, useEffect,useRef } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { findRequestsByUserId } from '../../resources/API';
import { ScreenNames } from '../../../route/ScreenNames';
import { ActivityIndicator } from 'react-native-paper';



const ProviderClientScreen = (props) => {

    const { isFirst } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);
    const [userData, setUserData] = useState([])
    const [searched, setSearched] = useState('')
    const [loading, setLoading] = useState(true)

    const slideInAnimation = useRef(new Animated.Value(0)).current;


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
            setLoading(false)
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
                <Pressable style={styles.more}>
                    <Text style={styles.moretxt}>المزيد</Text>
                </Pressable>
                <Pressable style={styles.numclient}>
                    <Text style={styles.moretxt}> الزبائن(2)</Text>
                </Pressable>
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

    const ResultsComp = ({ data, index = 0 }) => {
        const translateX = slideInAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
        });

        useEffect(() => {
            Animated.timing(slideInAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, []);

        // return userData.map(item => {
            const requests = data.clientReqPay
            const clientName = data.client.User_name

            return (
                <Animated.View key={index} style={{ ...styles.item, opacity: slideInAnimation, transform: [{ translateX }] }}>
                    <Pressable style={styles.clientView} onPress={() => props.navigation.navigate(ScreenNames.ProviderClientRequestShow, { requests, clientName })}>
                        <Text style={styles.clientName}>{data.client.User_name}</Text>
                        <View style={styles.ImgView}>
                            <Image style={styles.clientImg} source={{ uri: data.client.UserPhoto }} />
                        </View>
                    </Pressable>
                </Animated.View >
            )
        // })

    }

    const renderResults = () => {
        if (searched.trim().length > 0) {
            const filteredServices = userData.filter(item => item.client.User_name.toLowerCase().includes(searched.toLowerCase()));

            const filteredServicesCount = filteredServices.length;

            if (filteredServicesCount === 0) {
                return (
                    <View style={{ alignSelf: "center" }}>
                        <Text style={styles.relationLabelText}>لا يوجد نتائج </Text>
                    </View>
                );
            }

            return (
                <View>
                    {filteredServicesCount > 0 && (
                        <View>
                            {renderClients(filteredServices, true)}
                        </View>
                    )}
                </View >
            );
        } else{
            return userData && userData.length > 0 ? renderClients(userData, false) : noFriends();
        }

    }
    
    const renderClients = (serData, isSearch = false) => {
        if (serData && Array.isArray(serData)) {
            if (serData.length > 0) {
                const relationJSX = serData.map((data, index) => {
                    return <ResultsComp data={data} index={index} />;
                });
                return relationJSX;
            }
        }
    };
    const noFriends = () => {
        return (
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.relationLabelText}>لا يوجد علاقات قائمة حاليا</Text>
            <Text style={styles.relationLabelText}>ابحث عن علاقات جديدة</Text>
          </View>
        );
      };

    const renderAll = () => {
        return (
            <View style={{ width: '100%', alignSelf: 'center' }}>
                {loading && <ActivityIndicator style={{ alignSelf: 'center', marginTop: '50%' }} size={50} />}
                {!loading && renderResults()}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {header()}
            {renderSearch()}
            {renderNumOfClients()}
            {renderAll()}
            {/* {renderResults()} */}
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