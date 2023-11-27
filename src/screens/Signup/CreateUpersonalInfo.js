import { StyleSheet, Text, View, Pressable, TextInput, ToastAndroid, ScrollView, Image } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { addUser } from '../../resources/API';
import { colors } from '../../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScreenNames } from '../../../route/ScreenNames';

import SearchContext from '../../../store/SearchContext';
import { AppStyles } from '../../assets/res/AppStyles';


const CreateUpersonalInfo = (props) => {
    const {
        userId,
        setuserId,
        userInfo,
        setUserInfo,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userPhone,
        setUserPhone,
        userBD,
        setUserBD,
        userGender,
        setUserGender,
        userStatus,
        setUserStatus
    } = useContext(SearchContext);

    const [userNameError, setUserNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [userPhoneError, setUserPhoneError] = useState(false)
    const [userBDError, setUserBDError] = useState(false)

    const [femalePress, setFemalePress] = useState(false)
    const [malePress, setMalePress] = useState(false)

    const [singlePress, setSinglePress] = useState(false)
    const [engagedPress, setEngagedPress] = useState(false)
    const [marridPress, setMarridPress] = useState(false)

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const onChange = (event,selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

        setUserBD(fDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    // const chickIfExist = () => {
    //     const isChecked = userInfo.find(item => item.Email === email)
    //     return !!isChecked;
    // }
    // const addNewUser = () => {
    //     const AddNewUser = {
    //         User_name: userName,
    //         Email: email,
    //         UserAdress: userAddress,
    //         UserPhone: userPhone,
    //         Password: firstPassword,
    //         UserType: 'client'
    //     }
    //     addUser(AddNewUser).then(res => {
    //         let UsersArr = userInfo || [];
    //         UsersArr.push(AddNewUser);
    //         setUserInfo([...UsersArr])
    //     })
    // }
    // const onCreateUser = () => {
    //     if (!chickIfExist()) {
    //         addNewUser()
    //         ToastAndroid.showWithGravity('تم اٍنشاء المستخدم بنجاح',
    //             ToastAndroid.SHORT,
    //             ToastAndroid.BOTTOM
    //         )
    //     } else {
    //         ToastAndroid.showWithGravity('لديك حساب مسبقا',
    //             ToastAndroid.SHORT,
    //             ToastAndroid.BOTTOM
    //         )
    //     }
    // }

    const RenderFooter = () => {
        return <View style={styles.footer}>
            {renderDots()}
            {RenderNextButton()}
        </View>;
    };
    const RenderNextButton = () => {
        return (
            <Pressable
                style={AppStyles.createUserNext}
                onPress={() => onNextPress()}>
                <Text style={AppStyles.createUserNextTxt}>التالي</Text>
            </Pressable>
        );
    };

    const renderDots = () => {
        return (
            <View style={AppStyles.createuserDots}>
                <View style={AppStyles.pressDot}></View>
                <View style={AppStyles.dots}></View>
                <View style={AppStyles.dots}></View>
                <View style={AppStyles.dots}></View>
            </View>
        )
    }

    const onNextPress = () => {
        true
            ? props.navigation.navigate(ScreenNames.SetUserAddress
                , {
                    data: { ...props },
                })
            : missingData();
    };

    const checkStrings = val => {
        if (!val) {
            return false;
        } else if (val.trim().length <= 0) {
            return false;
        }
        return true;
    };

    const missingData = () => {
        checkStrings(userName) ? showMissingUserName() : null;
        checkStrings(userEmail) ? showMissingMail() : null;
        checkStrings(userPhone) ? showMissingPhone() : null;
        checkStrings(userBD) ? showMissingBirthDate() : null;
    };

    const showMissingUserName = () => { };

    const showMissingMail = () => { };

    const showMissingPhone = () => { };

    const showMissingBirthDate = () => { };

    useEffect(() => {
        setUserNameError(!checkStrings(userName));
        setEmailError(!checkStrings(userEmail));
        setUserPhoneError(!checkStrings(userPhone));
        setUserBDError(!checkStrings(userBD));
    }, [userName, userEmail, userPhone, userBD]);

    const onMalePress = () => {
        setMalePress(true)
        setFemalePress(false)
        setUserGender('ذكر')
    }
    const onFemalePress = () => {
        setMalePress(false)
        setFemalePress(true)
        setUserGender('أنثى')
    }
    const onSinglePress = () => {
        setSinglePress(true)
        setEngagedPress(false)
        setMarridPress(false)
        setUserStatus('أعزب')
    }
    const onEngagedPress = () => {
        setSinglePress(false)
        setEngagedPress(true)
        setMarridPress(false)
        setUserStatus('خاطب')
    }
    const onMarridPress = () => {
        setSinglePress(false)
        setEngagedPress(false)
        setMarridPress(true)
        setUserStatus('متزوج')
    }

    const renderPersonalInfo = () => {
        return (<View>
            <View style={styles.inputView}>
                {userNameError && (
                    <Text style={styles.textRequired}>*</Text>
                )}
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='الاسم'
                    onChangeText={setUserName}
                />
            </View>
            <View style={styles.inputView}>
                {emailError && (
                    <Text style={styles.textRequired}>*</Text>
                )}
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='البريد الألكتروني'
                    onChangeText={setUserEmail}
                />
            </View>
            <View style={styles.inputView}>
                {userPhoneError && (
                    <Text style={styles.textRequired}>*</Text>
                )}
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='الموبايل'
                    onChangeText={setUserPhone}
                />
            </View>
            <View style={styles.inputView}>
                {userBDError && (
                    <Text style={styles.textRequired}>*</Text>
                )}
                <Pressable onPress={() => showMode('date')} >
                    <View style={styles.Bdate}>
                        <Text>{userBD}</Text>
                        <Entypo
                            style={styles.logoDate}
                            name={"calendar"}
                            color={"black"}
                            size={30} />
                    </View>
                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='spinner'
                            onChange={onChange}
                        />
                    )}
                </Pressable>
            </View>
            <Text style={{ fontSize: 20, marginRight: 20 }}>الجنس</Text>
            <View style={styles.gender}>
                <Pressable style={[malePress ? styles.genderPress : styles.genderNotPres]}
                    onPress={() => onMalePress()}>
                    <FontAwesome
                        name={"male"}
                        color={colors.puprble}
                        size={50} />
                </Pressable>
                <Pressable style={[femalePress ? styles.genderPress : styles.genderNotPres]}
                    onPress={() => onFemalePress()}>
                    <FontAwesome
                        name={"female"}
                        color={colors.puprble}
                        size={50} />
                </Pressable>
            </View>
            <Text style={{ fontSize: 20, marginRight: 20 }}>الحالة الاجتماعية</Text>
            <View style={styles.status}>
                <Pressable style={[singlePress ? styles.statusPress : styles.statusNotPres]}
                    onPress={() => onSinglePress()}>
                    <Text style={styles.statustxt}>أعزب</Text>
                </Pressable>
                <Pressable style={[engagedPress ? styles.statusPress : styles.statusNotPres]}
                    onPress={() => onEngagedPress()}>
                    <Text style={styles.statustxt}>خاطب</Text>
                </Pressable>
                <Pressable style={[marridPress ? styles.statusPress : styles.statusNotPres]}
                    onPress={() => onMarridPress()}>
                    <Text style={styles.statustxt}>متزوج</Text>
                </Pressable>
            </View>
        </View>)

    }

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={colors.puprble}
                        size={25} />
                </Pressable>
                <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
            </View>

            <ScrollView>
                <View style={styles.userImg}>
                    <Image style={styles.profilImg} source={require('../../assets/photos/user.png')} />
                    <Pressable style={styles.editImg}>
                        <Entypo
                            name={"camera"}
                            color={colors.puprble}
                            size={25} />
                    </Pressable>
                </View>
                <View style={styles.body}>
                    <Text style={styles.titleText}>المعلومات الشخصية</Text>
                    {renderPersonalInfo()}
                </View>
                <Text>Hi</Text>
            </ScrollView>
            {RenderFooter()}
        </View>
    )
}

export default CreateUpersonalInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        backgroundColor: colors.gold,
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    titleTxt: {
        fontSize: 20,
        color: colors.puprble,
        fontWeight: 'bold',
        marginRight: 20
    },
    titleText: {
        textAlign: 'center',
        fontSize: 17,
        backgroundColor: colors.BGScereen,
        width: 123,
        position: 'absolute',
        top: -13,
        right: 10
    },
    footer: {
        width: '100%',
        marginVertical: 20,
        marginRight: 20,
    },
    profilImg: {
        width: 170,
        height: 170,
        borderRadius: 50,
        backgroundColor: colors.BGScereen,
        borderWidth: 2,
        borderColor: colors.darkGold,
        marginBottom: 20
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
        right: 115,
        bottom: 30,
    },

    logoDate: {
        marginHorizontal: 30,
        marginLeft: 20
    },
    userImg: {
        width: '100%',
        backgroundColor: colors.gold,
        height: '25%',
        marginBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        marginVertical: 30,
        borderWidth: 1,
        borderColor: 'lightgray',
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 20,
        height: 850
    },
    inputView: {
        alignItems: 'flex-end',
        marginVertical: 20,
    },
    input: {
        alignSelf: 'center',
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderRadius: 30,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'lightgray',
    },
    Bdate: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderRadius: 30,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'lightgray',
        marginRight: 20
    },

    gender: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    status: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    genderPress: {
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: colors.puprble,
        borderRadius: 50,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    genderNotPres: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    statusPress: {
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: colors.puprble,
        borderRadius: 30,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    statusNotPres: {
        width: 100,
        height: 100,
        borderRadius: 30,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    statustxt: {
        fontSize: 25,
        color: colors.puprble
    },
    textRequired: {
        fontSize: 14,
        marginRight: 40,
        color: 'red',
    },

})