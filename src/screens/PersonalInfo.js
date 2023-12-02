import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import React, { useEffect, useContext } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../assets/AppColors"
import { getUserData } from '../resources/API';
import SearchContext from '../../store/SearchContext';

const PersonalInfo = (props) => {
    const { userId, userInfo, setUserInfo } = useContext(SearchContext);

    console.log(" userInfo", userInfo);
    console.log(" userId", userId);
    const backPress = () => {
        props.navigation.goBack();
    }

    const seprator = () => {
        return (
            <View style={styles.seprater}></View>
        )
    }
    const getUserfromApi = () => {
        getUserData({ USER_ID: userId }).then(res => {
            setUserInfo(res)
        })
    }
    useEffect(() => {
        getUserfromApi()
    }, [])
    const renderContactInfo = () => {
        const data = userInfo
        const userData = data?.map(user => {
            return (<View>
                <Text style={styles.txt}>معلومات التواصل </Text>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{user.UserPhone}</Text>
                        <Text style={styles.basicInfoTitle}>الموبايل</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Ionicons
                            style={styles.icon}
                            name={"call"}
                            color={colors.puprble}
                            size={25} />
                    </View>

                </View>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{user.Email}</Text>
                        <Text style={styles.basicInfoTitle}>Email</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Entypo
                            style={styles.icon}
                            name={"email"}
                            color={colors.puprble}
                            size={25} />
                    </View>

                </View>
            </View>)
        })
        return userData;
    }
    const renderBasicInfo = () => {
        const data = userInfo
        const userData = data?.map(user => {
            return (<View>
                <Text style={styles.txt}>المعلومات الاساسية</Text>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{user.Usergender}</Text>
                        <Text style={styles.basicInfoTitle}>الجنس</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Entypo
                            style={styles.icon}
                            name={"user"}
                            color={colors.puprble}
                            size={25} />
                    </View>

                </View>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{user.UserbirthDate}</Text>
                        <Text style={styles.basicInfoTitle}>تاريخ الميلاد</Text>
                    </View>
                    <View style={styles.IconView}>
                        <FontAwesome
                            style={styles.icon}
                            name={"birthday-cake"}
                            color={colors.puprble}
                            size={25} />
                    </View>

                </View>
            </View>)
        })
        return userData;
    }
    const renderAddressInfo = () => {
        const data = userInfo
        const userData = data?.map(user => {
            return (<View>
                <Text style={styles.txt}>العنوان</Text>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{user.UserRegion}</Text>
                        <Text style={styles.basicInfoTitle}>المنطقة</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Entypo
                            style={styles.icon}
                            name={"address"}
                            color={colors.puprble}
                            size={25} />
                    </View>

                </View>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{user.UserCity}</Text>
                        <Text style={styles.basicInfoTitle}>المدينة</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Entypo
                            style={styles.icon}
                            name={"address"}
                            color={colors.puprble}
                            size={25} />
                    </View>

                </View>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{user.UserLocation} </Text>
                        <Text style={styles.basicInfoTitle}>Location</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Entypo
                            style={styles.icon}
                            name={"location-pin"}
                            color={colors.puprble}
                            size={25} />
                    </View>

                </View>
            </View>)
        })
        return userData;
    }
    const renderSoialDetail = () => {
        const data = userInfo
        const userData = data?.map(user => {
            return (<View>
                <Text style={styles.txt}>التفاصيل الاجتماعية</Text>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{user.Userstatus}</Text>
                        <Text style={styles.basicInfoTitle}>الحالة الاجتماعية</Text>
                    </View>
                    <View style={styles.IconView}>
                        <Entypo
                            style={styles.icon}
                            name={"v-card"}
                            color={colors.puprble}
                            size={25} />
                    </View>
                </View>
            </View>)
        })
        return userData;
    }
    const renderUserName = () => {
        const data = userInfo
        const userData = data?.map(user => {
            return (
                <View style={styles.imgView}>

                    <Image style={styles.profilImg} source={user.UserPhoto ? {uri: user.UserPhoto} : require('../assets/photos/user.png')} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable style={styles.editName}>
                            <AntDesign
                                name={"edit"}
                                color={'white'}
                                size={20} />
                        </Pressable>
                        <Text style={styles.userName}>{user.User_name}</Text>
                    </View>
                    <Pressable style={styles.editImg}>
                        <Entypo
                            name={"camera"}
                            color={colors.puprble}
                            size={25} />
                    </Pressable>
                </View>
            )
        })
        return userData;
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Pressable onPress={backPress}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.titleTxt}>المعلومات الشخصية </Text>
            </View>
            <ScrollView>

                {renderUserName()}

                <View style={styles.content}>
                    {renderBasicInfo()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderContactInfo()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderAddressInfo()}
                </View>
                {seprator()}
                <View style={styles.content}>
                    {renderSoialDetail()}
                </View>

            </ScrollView>

        </View>
    )
}

export default PersonalInfo

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
    imgView: {
        width: "100%",
        height: 250,
        backgroundColor: colors.puprble,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    profilImg: {
        width: 150,
        height: 150,
        borderRadius: 50,
        backgroundColor: colors.BGScereen,
        borderWidth: 2,
        borderColor: colors.darkGold,
        marginBottom: 20
    },
    userName: {
        fontSize: 20,
        color: colors.BGScereen,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    editImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        right: 125,
        bottom: 70,
    },
    content: {
        margin: 15,
        marginBottom: 20
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
        marginLeft: 10,
        fontWeight: 'bold'
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
    seprater: {
        borderColor: colors.puprble,
        borderWidth: 0.2,
        width: '80%',
        alignSelf: 'center',
        marginTop: 10
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10
    },
})