import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { colors } from "../assets/AppColors"
import { ScreenNames } from '../../route/ScreenNames';

const ClientProfile = (props) => {
    const backPress = () => {
        props.navigation.goBack();
    }

    const seprator = () => {
        return (
            <View style={styles.seprater}></View>
        )
    }

    const renderSpecialEvents = () => {
        return (<View>

            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>اضافة</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <Entypo
                        name={"add-to-list"}
                        color={colors.puprble}
                        size={25} />
                </View>

            </View>
            <View style={styles.item}>
                <View><Text style={styles.basicInfo}>1/12/1996</Text>
                    <Text style={styles.basicInfoTitle}>عيد ميلادي</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        name={"event-note"}
                        color={colors.puprble}
                        size={25} />
                </View>

            </View>
            <View style={styles.item}>
                <View><Text style={styles.basicInfo}>1/12/1990</Text>
                    <Text style={styles.basicInfoTitle}>عيد زواج والداي</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        style={styles.icon}
                        name={"event-note"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </View>
            <Pressable style={styles.more}>
                <Text style={styles.moreTxt}>المزيد...</Text>
            </Pressable>
        </View>)
    }
    const renderRelations = () => {
        return (<View>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>اضافة علاقة</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"add-to-list"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </View>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>فادي</Text>
                    <Text style={styles.basicInfoTitle}>صديق</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <AntDesign
                        style={styles.icon}
                        name={"adduser"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </View>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>أحمد</Text>
                    <Text style={styles.basicInfoTitle}>أخ</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <AntDesign
                        style={styles.icon}
                        name={"adduser"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </View>
            <Pressable style={styles.more}>
                <Text style={styles.moreTxt}>المزيد...</Text>
            </Pressable>
        </View>)
    }
    const renderReservation = () => {
        return (<View>
            <Pressable style={styles.item}>
                <View><Text style={styles.basicInfo}>عيد ميلاد أحمد</Text>
                    <Text style={styles.basicInfoTitle}>عيد ميلاد</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"cake"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
            <Pressable style={styles.item}>
                <View><Text style={styles.basicInfo}>ذكرى زواجنا</Text>
                    <Text style={styles.basicInfoTitle}>عيد زواج</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"cake"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
            <Pressable style={styles.more}>
                <Text style={styles.moreTxt}>المزيد...</Text>
            </Pressable>
        </View>)
    }
    const renderFavorite = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => props.navigation.navigate(ScreenNames.FileFavorites)}>
                <View>
                    <Text style={styles.basicInfo}> المفضلة</Text>
                </View>
                <View style={styles.IconView}>
                    <Fontisto
                        style={styles.icon}
                        name={"favorite"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderFeedBack = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => props.navigation.navigate(ScreenNames.ReviewsScreen)}>
                <View>
                    <Text style={styles.basicInfo}>التغذية الراجعة (2)</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        style={styles.icon}
                        name={"notes"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderPayments = () => {
        return (<View>
            <Pressable style={styles.item}>
                <View>
                    <Text style={styles.basicInfo}>دفعاتي</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        style={styles.icon}
                        name={"payments"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
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
                <Text style={styles.titleTxt}>البروفايل</Text>
            </View>
            <ScrollView>
                <View style={styles.imgView}>
                    <Pressable onPress={() => props.navigation.navigate(ScreenNames.UserProfile)}>
                        <Text style={styles.userName}>اسماعيل كبها</Text>
                    </Pressable>
                    <Image style={styles.profilImg} source={require('../assets/photos/user.png')} />
                </View>
                {seprator()}

                <Text style={styles.txt}>العمليات</Text>
                <View style={styles.viewSet}>
                    {/* {renderFavorite()} */}
                    {renderPayments()}
                    {renderFeedBack()}
                </View>

                <Text style={styles.txt}>مناسبات خاصة</Text>
                <View style={styles.viewSet}>
                    {renderSpecialEvents()}
                </View>

                <Text style={styles.txt}>العلاقات (2)</Text>
                <View style={styles.viewSet}>
                    {renderRelations()}
                </View>

                <Text style={styles.txt}>المناسبات السابقة</Text>
                <View style={styles.viewSet}>
                    {renderReservation()}
                </View>
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
        // height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // elevation: 5,
        // shadowColor: colors.puprble,
        // backgroundColor: 'white',
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
    }
})