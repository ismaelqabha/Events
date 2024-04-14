import { StyleSheet, Text, View, Image, Pressable, Alert, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../../assets/AppColors'
import Fontisto from "react-native-vector-icons/Fontisto"
import UsersContext from '../../../store/UsersContext'
import { updateRequest } from '../../resources/API'
import SearchContext from '../../../store/SearchContext'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames'
import moment from "moment";


const ProviderReservationCard = (props) => {
    const { fromWaitingScreen, fromReservationScreen, fromWaitingPayScreen, reservationDetail , rseDate } = props
    const { allUserData } = useContext(UsersContext);
    const { setRequestInfoByService } = useContext(SearchContext);
    const navigation = useNavigation();
    const reqInfo = { ...props }



   

    var filteredRes = reservationDetail.filter((detail)=> detail.reservationDate.slice(0, 10) == rseDate)

    const filterUsersAccID = () => {
        const filterUsers = allUserData.user.filter(item => {
            return item.USER_ID === props.ReqUserId
        })
        return filterUsers
    }

    const renderClientInfo = () => {
        const data = filterUsersAccID()
        return (
            <Pressable style={styles.info} onPress={() => navigation.navigate(ScreenNames.UserProfile, { data })}>
                <Image style={styles.profilImg} source={{ uri: data[0].UserPhoto }} />
                <Text style={styles.userName}>{data[0].User_name}</Text>
            </Pressable>
        )
    }
    const renderRequestDate = () => {
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>{props.ReqDate}</Text>
                    <Text style={styles.labelDateTxt}>تاريخ الطلب</Text>
                </View>
                <View style={styles.IconView}>
                    <Fontisto
                        name={"date"}
                        color={colors.puprble}
                        size={15} />
                </View>
            </View>
        )
    }
    const renderBookingDate = () => {
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>10/8/2024</Text>
                    <Text style={styles.labelDateTxt}>تاريخ الحجز</Text>
                </View>
                <View style={styles.IconView}>
                    <Fontisto
                        name={"date"}
                        color={colors.puprble}
                        size={15} />
                </View>
            </View>
        )
    }
    const renderPrice = () => {
        return (
            <View style={styles.dateview}>
                <View>
                    <Text style={styles.dateTxt}>{props.Cost}</Text>
                </View>
                <Image style={styles.shekeImg} source={require('../../assets/photos/shekelSign.png')} />
            </View>
        )
    }
    const time = () => {
        return (
            <View style={styles.dateview}>
                <Text style={styles.dateTxt}>{'  الى  ' + props.reservationDetail[0].EndTime}</Text>
                <Text style={styles.dateTxt}>{'  من   ' + props.reservationDetail[0].startingTime}</Text>
            </View>
        )


    }


    const renderMultiReq = () => {
        return (<View>
            {MultiReqtime()}
        </View>
        )
    }
    const renderSingleReq = () => {
        return (<View>
            {renderPrice()}
            {time()}
        </View>
        )
    }
    const renderPayRemain = () => {
        return (
            <View style={styles.dateview}>
                <Text style={styles.Txt}>{'الباقي  ' + '5000'}</Text>
                <Text style={styles.Txt}>{'المدفوع  ' + '5000'}</Text>
            </View>
        )
    }
    const updateInfo = (infoData) => {
        updateRequest(infoData).then(res => {
            if (res.message === 'Updated Sucessfuly') {
                setRequestInfoByService([...data])

                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })
    }
    const accept = () => {
        const newData = {
            RequestId: props.RequestId,
            ReqStatus: 'waiting pay'
        }
        updateInfo(newData)
    }
    const refuse = () => {
        const newData = {
            RequestId: props.RequestId,
            ReqStatus: 'refuse'
        }
        updateInfo(newData)
    }
    const onAcceptReqPress = () => {
        Alert.alert(
            'تأكيد',
            'هل انت متأكد من قبول طلب الحجز ؟ ',
            [
                {
                    text: 'لا',
                    style: 'cancel',
                },
                {
                    text: 'نعم',
                    onPress: () => accept(),
                    style: 'destructive', // Use 'destructive' for a red-colored button
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    }
    const onRefuseReqPress = () => {
        Alert.alert(
            'تأكيد',
            'هل انت متأكد من رفض طلب الحجز ؟ ',
            [
                {
                    text: 'لا',
                    style: 'cancel',
                },
                {
                    text: 'نعم',
                    onPress: () => refuse(),
                    style: 'destructive', // Use 'destructive' for a red-colored button
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    }

    const requestWaitingReplyCard = () => {
        return (
            <View style={styles.card}>
                <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>
                    {renderRequestDate()}
                    {renderSingleReq()}
                    <View style={styles.buttonView}>
                        <Pressable onPress={onRefuseReqPress}>
                            <Text style={styles.buttonTxt}>رفض</Text>
                        </Pressable>
                        <Pressable onPress={onAcceptReqPress}>
                            <Text style={styles.buttonTxt}>قبول</Text>
                        </Pressable>
                    </View>
                </Pressable>
                {renderClientInfo()}
            </View>
        )
    }
    const multiRequestWaitingReplyCard = () => {
        return filteredRes.map(item => {
            return (
                <View style={styles.card}>
                    <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>
                    <Text style={styles.dateTxt}>حجز متعدد الايام</Text>
                        {renderRequestDate()}

                        <View style={styles.dateview}>
                            <View>
                                <Text style={styles.dateTxt}>{item.datePrice}</Text>
                            </View>
                            <Image style={styles.shekeImg} source={require('../../assets/photos/shekelSign.png')} />
                        </View>

                        <View style={styles.dateview}>
                            <Text style={styles.dateTxt}>{'  الى  ' + item.EndTime}</Text>
                            <Text style={styles.dateTxt}>{'  من   ' + item.startingTime}</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <Pressable onPress={onRefuseReqPress}>
                                <Text style={styles.buttonTxt}>رفض</Text>
                            </Pressable>
                            <Pressable onPress={onAcceptReqPress}>
                                <Text style={styles.buttonTxt}>قبول</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                    {renderClientInfo()}
                </View>
            )
        })
    }
    const requestWaitingPayCard = () => {
        return (
            <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>
                {renderRequestDate()}
                {renderPrice()}
                <View style={styles.buttonView}>
                    <Pressable><Text style={styles.buttonTxt}>اٍلغاء الطلب</Text></Pressable>
                    <Pressable><Text style={styles.buttonTxt}>اِجراء دفع</Text></Pressable>
                </View>
            </Pressable>
        )
    }
    const requestReservationCard = () => {
        return (
            <Pressable style={styles.reqInfo} onPress={() => navigation.navigate(ScreenNames.ProviderShowRequest, { reqInfo })}>
                {renderPrice()}
                {renderPayRemain()}
            </Pressable>
        )
    }

    const renderCard = () => {
        if (fromWaitingScreen) {
            return (
                <View>
                    {reservationDetail.length > 1 ?
                        multiRequestWaitingReplyCard()
                        :
                        requestWaitingReplyCard()
                    }
                </View>
            )
        }
        if (fromWaitingPayScreen) {
            return (
                <View style={styles.card}>
                    {requestWaitingPayCard()}
                    {renderClientInfo()}
                </View>
            )
        }
        if (fromReservationScreen) {
            return (
                <View style={styles.card1}>
                    {requestReservationCard()}
                    {renderClientInfo()}
                </View>
            )
        }
    }



    return (
        <View>
            {renderCard()}
        </View>
    )
}

export default ProviderReservationCard

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '90%',
        height: 170,
        alignSelf: 'center',
        margin: 10,
        // borderWidth: 1
    },
    card1: {
        flexDirection: 'row',
        width: '90%',
        height: 100,
        alignSelf: 'center',
        margin: 10,
        // borderWidth: 1
    },
    info: {
        width: '35%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: colors.darkGold,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reqInfo: {
        width: '65%',
        height: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 5,
        padding: 5
        //alignItems: 'center',
    },
    profilImg: {
        width: 70,
        height: 60,
        borderRadius: 10,
        backgroundColor: colors.BGScereen,
        marginBottom: 10,
    },
    userName: {
        fontSize: 15,
        color: 'white'
    },
    buttonView: {
        flexDirection: 'row',
        width: '100%',
        height: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    infoTxt: {
        marginVertical: 5,
        marginRight: 10,
        color: colors.puprble,
        fontSize: 15
    },
    buttonTxt: {
        fontSize: 17
    },
    dateview: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5
    },
    shekeImg: {
        width: 35,
        height: 35,
        marginLeft: 15
    },
    dateTxt: {
        color: colors.puprble,
        fontSize: 15
    },
    Txt: {
        fontSize: 15,
        marginLeft: 20,
        color: colors.puprble
    },
    labelDateTxt: {
        fontSize: 15
    },
    IconView: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
})