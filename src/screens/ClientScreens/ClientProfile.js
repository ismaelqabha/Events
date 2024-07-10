import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import UsersContext from '../../../store/UsersContext';
import { colors } from '../../assets/AppColors';
import { ScreenNames } from '../../../route/ScreenNames';
import { getRelations } from '../../resources/API';



const ClientProfile = (props) => {
    const { userInfo, userId } = useContext(UsersContext);
    const userData = userInfo
    const [relations, setRelations] = useState([])
    const [loading, setLoading] = useState(true)
    const [displayCount, setDisplayCount] = useState(5);
    const clientReview = true


    const backPress = () => {
        props.navigation.goBack();
    }

    const seprator = () => {
        return (
            <View style={styles.seprater}></View>
        )
    }

    useEffect(() => {
        setLoading(true)
        getRelations({ userId }).then((relations) => {

            if (relations && relations.error) {
                showMessage("there has been an error")
            } else {
                setLoading(false)
                setRelations(relations)
            }
        })
    }, [])
    ///
    const renderOldEvents = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => props.navigation.navigate(ScreenNames.ClientOldEvents)}>
                <View>
                    <Text style={styles.basicInfo}>المناسبات السابقة</Text>
                </View>
                <View style={styles.IconView}>
                    <Fontisto
                        name={"favorite"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderFeedBack = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => props.navigation.navigate(ScreenNames.ReviewsScreen, { clientReview })}>
                <View>
                    <Text style={styles.basicInfo}>التغذية الراجعة (2)</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        name={"notes"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderRelations = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => props.navigation.navigate(ScreenNames.ClientRelations, { relations, loading })}>
                <View style={styles.relationLabel}>
                    <Text style={styles.basicInfo}>{relations?.length > 0 && "(" + relations?.length + ")"}</Text>
                    <Text style={styles.basicInfo}>علاقاتي</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        name={"users"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const header = () => {
        return (
            <View style={styles.title}>
                <Pressable onPress={backPress}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.titleTxt}>البروفايل</Text>
            </View>)
    }
    const renderUserNameImag = () => {
        return (
            <View style={styles.imgView}>
                <Pressable onPress={() => props.navigation.navigate(ScreenNames.UserProfile)}>
                    <Text style={styles.userName}>{userData.User_name}</Text>
                </Pressable>
                <Image style={styles.profilImg} source={userData.UserPhoto ? { uri: userData.UserPhoto } : require('../../assets/photos/user.png')} />
            </View>
        )
    }
    const renderDuePayment = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() =>
                props.navigation.navigate(ScreenNames.ClientDuePayments)}>
                <View>
                    <Text style={styles.basicInfo}>دفعات الحجوزات المستحقة</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        name={"payments"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const specialDatesItem = () => {
        const specailEv = userData.SpecialDates || []
        return specailEv.slice(0, displayCount).map(item => {
            return (
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{item.eventDate}</Text>
                        <Text style={styles.basicInfoTitle}>{item.eventName}</Text>
                    </View>
                    <View style={styles.IconView}>
                        <MaterialIcons
                            name={"event-note"}
                            color={colors.puprble}
                            size={25} />
                    </View>
                </View>
            )
        })
    }
    const renderSpecialEvents = () => {
        return (<View>
            {specialDatesItem()}
            <Pressable style={styles.more} onPress={() => props.navigation.navigate(ScreenNames.ClientSpecialDates)}>
                <Text style={styles.moreTxt}>المزيد...</Text>
            </Pressable>
        </View>)
    }
    const renderInvitations = () => {
        return (<View>
            <Pressable style={styles.item} //onPress={() =>props.navigation.navigate(ScreenNames.ClientDuePayments)}
            >
                <View>
                    <Text style={styles.basicInfo}>بطاقات الدعوة الواردة</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        name={"mail"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }


    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderUserNameImag()}
                {seprator()}

                <Text style={styles.txt}>العمليات</Text>
                <View style={styles.viewSet}>
                    {renderInvitations()}
                    {renderDuePayment()}
                    {renderRelations()}
                    {renderOldEvents()}
                    {renderFeedBack()}
                </View>
                {userData.SpecialDates && <View>
                    <Text style={styles.txt}>مناسبات خاصة</Text>
                    <View style={styles.viewSet}>
                        {renderSpecialEvents()}
                    </View>
                </View>}
                <View style={{ height: 110 }}></View>
            </ScrollView>
        </View>
    )
}

export default ClientProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BGScereen,
        marginBottom: 70
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },
    titleTxt: {
        fontSize: 18,
        color: colors.puprble,
    },
    seprater: {
        borderColor: colors.puprble,
        borderWidth: 0.2,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    imgView: {
        width: "95%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        margin: 5
    },
    profilImg: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: colors.BGScereen,
        borderWidth: 3,
        borderColor: colors.puprble,
    },
    userName: {
        fontSize: 20,
        color: colors.puprble,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    content: {
        marginRight: 20,
    },
    viewSet: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
        fontWeight: 'bold',
        marginVertical: 10,
        marginRight: 20
    },
    basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    basicInfoTitle: {
        fontSize: 12,
        textAlign: 'right'
    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10
    },
    more: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    moreTxt: {
        fontSize: 15
    },
    relationLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 90
    }

})