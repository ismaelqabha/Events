import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import CalenderDayCard from '../../components/ProviderComponents/CalenderDayCard';
import SearchContext from '../../../store/SearchContext';
import { colors } from '../../assets/AppColors';
import UsersContext from '../../../store/UsersContext';
import { ScreenNames } from '../../../route/ScreenNames';

const ProviderCalender = (props) => {
    const { serviceTitle, requestInfoByService } = useContext(SearchContext);
    const { } = useContext(UsersContext);
    const [client, setClient] = useState(null)

    const [mutibleReservation, setMutibleReservation] = useState(true)


    const onPressHandler = () => {
        props.navigation.goBack();
    }

    useEffect(() => {
        setClient('بحث الزبائن')
    }, [])


    const getBookingInfo = () => {
        if (requestInfoByService.message !== "no Request") {
            const reqInfo = requestInfoByService.filter(item => {
                return item.requestInfo.ReqStatus === 'paid'
            })
            return reqInfo
        } else {
            return []
        }
    }

    const filterUsersAccName = () => {
        const data = getBookingInfo()
        const filterUsers = data.filter(item => {
            return item.userInfo.find(elem => {
                return elem.User_name.includes(client)
            })
        })
        return filterUsers
    }

    const renderSearchResult = () => {
        const filterdRequestAccUser = filterUsersAccName()
        props.navigation.navigate(ScreenNames.ProviderBookingRequest, { mutibleReservation, filterdRequestAccUser })
    }

    const renderInputClientName = () => {
        return (
            <View style={styles.searchView}>

                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='بحث الزبائن'
                    onChangeText={setClient}
                    onEndEditing={renderSearchResult}
                />
                <AntDesign
                    style={styles.iconSearch}
                    name={"search1"}
                    color={"black"}
                    size={25} />
            </View>
        )
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
                
                <Text style={styles.txt}>تقويم الحجوزات</Text>
            </View>

            <View style={styles.body}>
                {renderInputClientName()}
                <CalenderDayCard />
            </View>
            <View style={{ height: 100 }}></View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    body: {
        flex: 1,
    },
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 20,
        color: 'black'
    },
    searchView: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 50,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: colors.silver,
        borderWidth: 0.5,
        width: '80%',
        marginVertical: 20
    },
    iconSearch: {
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    input: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        // borderWidth: 1
    },
})