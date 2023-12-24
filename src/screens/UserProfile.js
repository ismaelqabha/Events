import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../store/SearchContext';
import { getUserData } from '../resources/API';
import { colors } from '../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";

const UserProfile = (props) => {
    const { userId, userInfo, setUserInfo } = useContext(SearchContext);

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    //console.log("userId", userId);

    const getUserfromApi = () => {
        getUserData({ USER_ID: userId }).then(res => {
            setUserInfo(res)
            //console.log("setUserInfo", res);
        })
    }
    useEffect(() => {
        getUserfromApi()
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
                    <View style={styles.profilImg}><Image source={require('../assets/photos/user.png')} /></View>
                    <Text style={styles.nameTxt}>اسماعيل كبها</Text>
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
                <Text style={styles.titleRevTxt}>ماذا قالوا عن اسماعيل كبها </Text>
                <ScrollView
                //horizontal={true} 
                //showsHorizontalScrollIndicator={false}
                >

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


                </ScrollView>
            </View>
        )
    }

    const renderUserContacts = () => {
        return (
            <View style={styles.userContacts}>
                <View style={styles.contactItem}>
                    <View><Text style={styles.basicInfo}>0546126692</Text>
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
                    <View><Text style={styles.basicInfo}>exsample@gmail.com</Text>
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

    return (
        <View style={styles.container}>
            <ScrollView>
                {header()}
                {renderUserName()}
                {renderUserContacts()}
                {renderReviews()}
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
        borderWidth: 3
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
        width: '90%',
        //borderWidth: 1,
        alignSelf: 'center',
        marginVertical: 20
    },
    titleRevTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
    },
    messageView: {
        width: '90%',
        height: 200,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginTop: 30,
        justifyContent: 'space-between',
        padding: 10
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
    }
})