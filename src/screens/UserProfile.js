import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import { addFriend } from '../resources/API';
import UsersContext from '../../store/UsersContext';
import { showMessage } from '../resources/Functions';

const UserProfile = (props) => {
    const { userId } = useContext(UsersContext);
    const { data } = props.route?.params || {}
    const getStatus = (relationStatus) => {
        if (!relationStatus) {
            return 'طلب انشاء علاقة';
        }
        switch (relationStatus) {
            case 'pending':
                return 'Cancel request';
            case 'accepted':
                return 'Cancel relation';
            default:
                return 'طلب انشاء علاقة';
        }
    };

    const [status, setStatus] = useState(() => getStatus(data?.relationStatus));

    const onPressHandler = () => {
        props.navigation.goBack();
    }


    useEffect(() => {
    }, [])

    const header = () => {
        return (
            <View style={styles.head}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>)
    }
    const renderUserName = () => {
        return (
            <View style={styles.mainView}>
                <View style={styles.nameView}>
                    <View style={styles.profilImg}><Image style={styles.userImg} source={{ uri: data?.UserPhoto }} /></View>
                    <Text style={styles.nameTxt}>{data?.User_name}</Text>
                </View>
                <View style={styles.reviewView}>
                    <View style={{}}><Text style={styles.txt}>3 شهور في مناسباتي</Text></View>
                    <View style={{}}><Text>|</Text></View>
                    <View style={{}}><Text style={styles.txt}>3 مراجعات</Text></View>
                </View>
            </View>
        )
    }
    const renderReviews = () => {
        return (
            <View style={styles.reView}>
                <View style={styles.messageView}>
                    <Text style={styles.ReviewTxt}>زبون محترم وخلوق جدا كان ملتزم في كل الشروط والتعليمات كل الاحترام والتقدير</Text>
                    <View style={styles.reviewClientInfo}>
                        <View>
                            <Text style={styles.servicenameTxt}>قاعة الامير</Text>
                            <Text>منذ 3 شهور</Text>
                        </View>
                        <View style={styles.clientImgView}><Image style={styles.clientImg} source={require('../assets/photos/ameer.png')} /></View>
                    </View>
                </View>

                <View style={styles.messageView}>
                    <Text style={styles.ReviewTxt}>زبون محترم وخلوق جدا كان ملتزم في كل الشروط والتعليمات كل الاحترام والتقدير</Text>
                    <View style={styles.reviewClientInfo}>
                        <View>
                            <Text style={styles.servicenameTxt}>قاعة الماسة</Text>
                            <Text>منذ 4 سنوات </Text>
                        </View>
                        <View style={styles.clientImgView}><Image style={styles.clientImg} source={require('../assets/photos/almasa.png')} /></View>
                    </View>
                </View>
            </View>

        )
    }
    const renderUserContacts = () => {
        return (
            <View style={styles.userContacts}>
                <View style={styles.contactItem}>
                    <View><Text style={styles.basicInfo}>{data?.UserPhone}</Text>
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
                <View style={styles.contactItem}>
                    <View><Text style={styles.basicInfo}>{data?.Email}</Text>
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
            </View>
        )
    }

    const renderUser = () => {

        const data = userInfo
        const cardsArray = data?.map(card => {
            return (<View style={styles.body}>

                <View style={styles.userInfo}>
                    <View style={styles.infoView}>
                        <Text style={styles.nameTxt}>{card.UserPhone + 'الموبايل:'}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.nameTxt}>{card.Email + 'Email :'}</Text>
                    </View>
                </View>
            </View>

            )
        });
        return cardsArray;
    }

    const createRelation = () => {
        return (
            <View>
                <Pressable onPress={onAddPress} style={styles.createrelation}>
                    <Text style={styles.relationTxt}>{status}</Text>
                </Pressable>
            </View>
        )
    }
    const onAddPress = () => {
            const remove = status === 'Cancel request' || status === 'Cancel relation';
            console.log("rempve ", remove);
            addFriend({
                userId1: userId,
                userId2: data?.USER_ID,
                remove: remove
            }).then((res) => {
                console.log("res ", res);
                if (res) {
                    if (res?.error) {
                        showMessage(res?.error || "");
                    } else {
                        showMessage(res?.message || "");
                        setStatus(getStatus(res?.user?.status || null) || 'طلب انشاء علاقة');
                    }
                }
            }).catch((e) => {
                console.log("error ", e);
                showMessage("there has been an error!");
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {header()}
                {renderUserName()}
                {createRelation()}
                {renderUserContacts()}
                <Text style={styles.titleRevTxt}>{' ماذا قالوا عن  ' + data?.User_name}</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >{renderReviews()}</ScrollView>

            </ScrollView>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    body: {
        alignItems: 'center'
    },
    mainView: {
        width: '90%',
        height: 270,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 5,
        marginTop: 20,
        padding: 20,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    userContacts: {
        marginVertical: 10,
        padding: 20
    },

    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10
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
    nameView: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: colors.puprble
    },
    userImg: {
        width: 95,
        height: 95,
        borderRadius: 50,
    },
    nameTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 30
        // marginRight: 20
    },
    reviewView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        //borderWidth: 1
    },
    txt: {
        fontSize: 15,
        color: 'black',
    },

    reView: {
        flexDirection: 'row',
        // width: '90%',
        //borderWidth: 1,
        alignSelf: 'center',
        margin: 10
    },
    titleRevTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
        marginRight: 20
    },
    messageView: {
        width: 300,
        height: 200,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: 30,
        justifyContent: 'space-between',
        padding: 10,
        margin: 10
    },
    reviewClientInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    servicenameTxt: {
        fontSize: 15,
        color: 'black',
    },
    ReviewTxt: {
        fontSize: 15,
        color: 'black',
    },
    clientImgView: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginLeft: 30
    },
    clientImg: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },


    userInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: 20,
        //height: 300,
    },
    infoView: {
        width: '85%',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createrelation: {
        height: 50,
        width: "90%",
        backgroundColor: colors.puprble,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    relationTxt: {
        fontSize: 20,
        color: colors.BGScereen
    }
})