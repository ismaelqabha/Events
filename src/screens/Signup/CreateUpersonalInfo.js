import { StyleSheet, Text, View, Pressable, TextInput, ToastAndroid, ScrollView, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { addUser } from '../../resources/API';
import { colors } from '../../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SelectList } from 'react-native-dropdown-select-list';
import { ScreenNames } from '../../../route/ScreenNames';
import { regionData } from '../../resources/data';
import SearchContext from '../../../store/SearchContext';
import { AppStyles } from '../../assets/res/AppStyles';

//import Entypo from "react-native-vector-icons/Entypo";

const CreateUpersonalInfo = (props) => {
    const { userId, setuserId, userInfo, setUserInfo } = useContext(SearchContext);
    const [titleError, setTitleError] = useState(false);

    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [userPhone, setUserPhone] = useState()
    // const [userAddress, setUserAddress] = useState()
    // const [firstPassword, setFirstPassword] = useState()
    // const [secondPassword, setSecondPassword] = useState()

    const onPressHandler = () => {
        props.navigation.goBack();
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

    const onNextPress = () => {
        true
            ? props.navigation.navigate(ScreenNames.SetUserAddress
                , {data: { ...props },
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
        checkStrings() ? showMissingTitle() : null;
        checkStrings() ? showMissingSubTitle() : null;
        checkStrings() ? showMissingDescription() : null;
    };

    const showMissingTitle = () => { };

    const showMissingSubTitle = () => { };

    const showMissingDescription = () => { };

    const renderPersonalInfo = () => {
        return (<View>
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='الاسم'
                onChangeText={setUserName}
            />
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='البريد الألكتروني'
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='الموبايل'
                onChangeText={setUserPhone}
            />
            <View style={styles.Bdate}>
                <Text>DD/MM/YYYY</Text>
                <Pressable>
                    <Entypo
                        style={styles.logoDate}
                        name={"calendar"}
                        color={"black"}
                        size={30} />
                </Pressable>
            </View>
            <View style={styles.gender}>
                <Pressable style={styles.genderPress}>
                    <FontAwesome
                        name={"male"}
                        color={colors.puprble}
                        size={50} />
                </Pressable>
                <Pressable style={styles.genderPress}>
                    <FontAwesome
                        name={"female"}
                        color={colors.puprble}
                        size={50} />
                </Pressable>
            </View>
            <Text style={{fontSize: 20, marginRight: 20}}>الحالة الاجتماعية</Text>
            <View style={styles.status}>
                <Pressable style={styles.statusPress}>
                    <Text style={styles.statustxt}>أعزب</Text>
                </Pressable>
                <Pressable style={styles.statusPress}>
                    <Text style={styles.statustxt}>خاطب</Text>
                </Pressable>
                <Pressable style={styles.statusPress}>
                    <Text style={styles.statustxt}>متزوج</Text>
                </Pressable>
            </View>
        </View>)

    }
    // const renderPassword = () => {
    //     return (<View>
    //         <TextInput
    //             style={styles.input}
    //             keyboardType='default'
    //             placeholder='كلمة المرور'
    //             onChangeText={setFirstPassword}
    //         />
    //         <TextInput
    //             style={styles.input}
    //             keyboardType='default'
    //             placeholder='تأكيد كلمة المرور'
    //             onChangeText={setSecondPassword}
    //         />

    //     </View>)

    // }
    // const RenderLocationDetails = () => {
    //     return (
    //         <View>
    //             <View style={styles.region}>
    //                 <Text>المنطقة</Text>
    //             </View>

    //             {titleError && (
    //                 <Text style={{ color: 'red', marginLeft: 100 }}>*</Text>
    //             )}
    //             <SelectList
    //                 data={regionData}
    //                 setSelected={val => {
    //                     let cityObj = regionData.find(city => city.key == val);
    //                     //setserviceRegion(cityObj.value);
    //                 }}
    //                 placeholder={'المدينة'}
    //                 boxStyles={styles.dropdown}
    //                 inputStyles={styles.droptext}
    //                 dropdownTextStyles={styles.dropstyle}
    //             />

    //             <Pressable style={styles.location}>
    //                 <Text style={styles.locationTitle}>أضف موقع</Text>
    //                 <View style={styles.IconView}>
    //                     <Entypo
    //                         name={"location-pin"}
    //                         color={colors.puprble}
    //                         size={25} />
    //                 </View>
    //             </Pressable>
    //         </View>
    //     );
    // };


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

                {/* <View style={styles.body}>
                    <Text style={styles.titleText}>العنوان</Text>
                    {RenderLocationDetails()}
                </View> */}

                {/* <View style={styles.body}>
                    <Text style={styles.titleText}>الحالة الاجتماعية</Text>
                    {renderPersonalInfo()}
                </View> */}

                {/* <View style={styles.body}>
                    <Text style={styles.titleText}>كلمة المرور</Text>
                    {renderPassword()}
                </View> */}

                {/* <Pressable style={styles.btnEnter}
                    onPress={() => onCreateUser()}
                >
                    <Text style={styles.txtُEnter}>انشاء ودخول</Text>
                </Pressable> */}
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
        //color: colors.TitleFont,
        // fontFamily: 'Cairo-VariableFont_slnt,wght',
        backgroundColor: colors.BGScereen,
        width: 123,
        position: 'absolute',
        top: -13,
        right: 10
    },
    footer: {
        width: '100%',
        marginVertical: 20,
        //flexDirection: 'row',
        // justifyContent: 'space-between',
        marginRight: 20,
        //marginLeft: 20,
        //alignSelf: 'center',
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
        marginVertical: 20,
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
        marginVertical: 10,
        color: 'black',
        backgroundColor: 'lightgray',
    },
   
    txtُEnter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    btnEnter: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        //marginVertical: 40,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: colors.puprble,
        alignSelf: 'center',
        elevation: 5,
        marginBottom: 100
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
    statustxt: {
        fontSize: 25,
        color: colors.puprble
    },
    region: {
        textAlign: 'right',
        height: 50,
        width: '80%',
        fontSize: 16,
        borderRadius: 25,
        // borderWidth: 1,
        // borderColor: 'darkgray',
        alignSelf: 'center',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    },
    dropdown: {
        height: 50,
        maxWidth: '70%',
        minWidth: '70%',
        fontSize: 17,
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 25,
    },
    dropstyle: {
        textAlign: 'right',
        color: 'black',
        fontSize: 15,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'right'
    },
    location: {
        flexDirection: 'row',
        marginVertical: 20,
        alignSelf: 'center',
        alignItems: 'center'
    },
    locationTitle: {
        fontSize: 15,
        textAlign: 'right',
        color: colors.puprble
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