import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../assets/AppColors"
import { getRegions, updateUserData } from '../resources/API';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';
import { SelectList } from 'react-native-dropdown-select-list';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const PersonalInfo = (props) => {

    const { userInfo, setUserInfo, userId } = useContext(UsersContext);

    const [userGender, setUserGender] = useState()
    const [userPhone, setUserPhone] = useState()
    const [userMail, setUserMail] = useState()
    const [userAddress, setUserAddress] = useState()
    const [userStatus, setUserStatus] = useState()
    const [userBD, setUserBD] = useState()
    const [userName, setUserName] = useState()

    const [editGender, setEditGender] = useState(false)
    const [editUserName, setEditUserName] = useState(false)
    const [editPhone, setEditPhone] = useState(false)
    const [editMail, setEditMail] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    const [editStutes, setEditStatus] = useState(false)
    const [editBD, setEditBD] = useState(false)

    const [femalePress, setFemalePress] = useState(false)
    const [malePress, setMalePress] = useState(false)

    const [singlePress, setSinglePress] = useState(false)
    const [engagedPress, setEngagedPress] = useState(false)
    const [marridPress, setMarridPress] = useState(false)

    const [regionData, setRegionData] = useState([])
    const [regions, setRegions] = useState(null)
    const [address, setAddress] = useState(null)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const userData = userInfo
    console.log("userData", userData.UserPhoto);

    // const selectedUserIndex = userData?.findIndex(item => item.USER_ID === userId)
    // const selectedUserIndex = userData[0].USER_ID

    const today = moment(date, "YYYY-MM-DD")
    let day = today.format('D')
    let month = today.format('M')
    let year = today.format('YYYY')
    let completeDate = year + '-' + month + '-' + day

    const backPress = () => {
        props.navigation.goBack();
    }

    const seprator = () => {
        return (
            <View style={styles.seprater}></View>
        )
    }

    useEffect(() => {
        getRegionsfromApi()

        if (userData.Usergender == 'ذكر') {
            setMalePress(true)
            setFemalePress(false)
        } else {
            setFemalePress(true)
            setMalePress(false)
        }
        if (userData.Userstatus == 'أعزب') {
            setSinglePress(true)
            setMarridPress(false)
            setEngagedPress(false)
        } else if (userData.Userstatus == 'متزوج') {
            setMarridPress(true)
            setEngagedPress(false)
            setSinglePress(false)
        } else {
            setEngagedPress(true)
            setMarridPress(false)
            setSinglePress(false)
        }
    }, [])

    const genderEditPress = () => {
        setEditGender(true)
    }
    const phoneEditPress = () => {
        setEditPhone(true)
    }
    const mailEditPress = () => {
        setEditMail(true)
    }
    const addressEditPress = () => {
        setEditAddress(true)
    }
    const stutesEditPress = () => {
        setEditStatus(true)
    }
    const BDEditPress = () => {
        setEditBD(true)
        showMode('date')
    }
    const userNameEditPress = () => {
        setEditUserName(true)
    }
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

    // Edit Forms
    const editItem = (item, setState, update) => {
        if (Number.isInteger(item)) {
            item = item.toString()
        }
        return (
            <View style={styles.itemView}>
                <View style={styles.editView}>
                    <Pressable onPress={update} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={'lightgray'}
                            size={20} />
                    </Pressable>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        //value={item}
                        placeholder={item || ''}
                        onChangeText={setState}
                    />
                </View>
            </View>)
    }
    const editUsername = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editUNameView}>
                    <Pressable onPress={updateUserName} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={'lightgray'}
                            size={20} />
                    </Pressable>
                    <TextInput
                        style={styles.inputUserName}
                        keyboardType='default'
                        //value={item}
                        placeholder={userData[0].User_name || ''}
                        onChangeText={setUserName}
                    />
                </View>
            </View>)
    }
    const getRegionsfromApi = async () => {
        getRegions().then((res) => {
            res?.message ? showMessage(res.message) : updateData(res?.regions)
        }).catch((e) => {
            console.log("error fetching -> ", e);
        })

    }
    const updateData = (regions) => {
        setRegions(regions)
        const allData = []
        regions?.forEach(region => {
            allData.push(...region?.regionCities)
        });
        allData.sort()
        setRegionData(allData)
    }
    const searchRegion = (val) => {
        if (!regions) {
            return;
        } else {
            regions.forEach((region) => {
                var index = region?.regionCities?.findIndex(city => {
                    return city === val
                })
                if (!(index === -1)) {
                    setAddress(region?.regionName)
                    //setserviceRegion(region?.regionName)
                }
            })
        }
    }
    const editingAddress = () => {
        const userData = userInfo.user
        return (
            <View style={styles.itemView}>
                <View style={styles.editAddressView}>
                    <Pressable onPress={updateAddress} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={'lightgray'}
                            size={20} />
                    </Pressable>
                    <View>
                        <View style={styles.region}>
                            <Text> {address || userData[0].UserRegion}</Text>
                        </View>
                        <SelectList
                            data={regionData}
                            setSelected={val => {
                                setUserAddress(val)
                                searchRegion(val)
                            }}
                            placeholder={userAddress || userData[0].UserCity}
                            boxStyles={styles.dropdown}
                            inputstyles={styles.droptext}
                            dropdownTextstyles={styles.dropstyle}
                        />
                    </View>
                </View>
            </View>)
    }
    const editingUserGender = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editView}>
                    <Pressable onPress={updateGender} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={'lightgray'}
                            size={20} />
                    </Pressable>
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
                </View>
            </View>)
    }
    const editingUserStutes = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editView}>
                    <Pressable onPress={updateStatus} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={'lightgray'}
                            size={20} />
                    </Pressable>
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
                </View>
            </View>)
    }
    const editBirthDate = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editView}>
                    <Pressable onPress={updateBirthDate} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={'lightgray'}
                            size={20} />
                    </Pressable>
                    <View style={styles.editBDView}>
                        <Text style={styles.basicInfo}>{userBD}</Text>
                        <Pressable onPress={BDEditPress}>
                            <Feather
                                style={{ marginLeft: 20 }}
                                name={'calendar'}
                                color={colors.puprble}
                                size={30} />
                        </Pressable>
                    </View>
                </View>
                {show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        display='calendar'
                        onChange={onChange}
                    />
                )}
            </View>)
    }


    // Update Functions
    const updateInfo = (infoData, setstate) => {
        updateUserData(infoData).then(res => {
            var data = userInfo || [];
            data = { ...data, ...infoData };
            // if (selectedUserIndex > -1) {
            //     data[selectedUserIndex] = { ...data[selectedUserIndex], ...infoData };
            // }

            if (res.message === 'Updated Sucessfuly') {
                setUserInfo([...data])
                setstate(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        }).catch((E) => {
            console.error("error creating request E:", E);
        })
    }
    const updateGender = () => {
        const newData = {
            USER_ID: userId,
            Usergender: userGender
        }
        updateInfo(newData, setEditGender)
    }
    const updatePhone = () => {
        const newData = {
            USER_ID: userId,
            UserPhone: userPhone
        }
        updateInfo(newData, setEditPhone)
    }
    const updateMail = () => {
        const newData = {
            USER_ID: userId,
            Email: userMail
        }
        updateInfo(newData, setEditMail)
    }
    const updateAddress = () => {
        const newData = {
            USER_ID: userId,
            UserCity: userAddress,
            UserRegion: address
        }
        updateInfo(newData, setEditAddress)
    }
    const updateStatus = () => {
        const newData = {
            USER_ID: userId,
            Userstatus: userStatus
        }
        updateInfo(newData, setEditStatus)
    }
    const updateBirthDate = () => {
        const newData = {
            USER_ID: userId,
            UserbirthDate: userBD
        }
        updateInfo(newData, setEditBD)
    }
    const updateUserName = () => {
        const newData = {
            USER_ID: userId,
            User_name: userName
        }
        updateInfo(newData, setEditUserName)
    }


    ////
    const renderContactInfo = () => {
        return (<View>
            <Text style={styles.txt}>معلومات التواصل </Text>
            {editPhone ? editItem(userData.UserPhone, setUserPhone, updatePhone) :
                <View style={styles.userItem}>
                    <Pressable onPress={phoneEditPress}
                    >
                        <Feather
                            style={styles.menuIcon}
                            name={'edit'}
                            color={'lightgray'}
                            size={25} />
                    </Pressable>
                    <View style={styles.item}>
                        <View><Text style={styles.basicInfo}>{userData.UserPhone}</Text>
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
                </View>}
            {editMail ? editItem(userData.Email, setUserMail, updateMail) :
                <View style={styles.userItem}>
                    <Pressable onPress={mailEditPress}
                    >
                        <Feather
                            style={styles.menuIcon}
                            name={'edit'}
                            color={'lightgray'}
                            size={25} />
                    </Pressable>
                    <View style={styles.item}>
                        <View><Text style={styles.basicInfo}>{userData.Email}</Text>
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
                </View>}
        </View>)
    }
    const renderBasicInfo = () => {
        return (<View>
            <Text style={styles.txt}>المعلومات الاساسية</Text>
            {editGender ? editingUserGender() :
                <View style={styles.userItem}>
                    <Pressable onPress={genderEditPress}>
                        <Feather
                            style={styles.menuIcon}
                            name={'edit'}
                            color={'lightgray'}
                            size={25} />
                    </Pressable>
                    <View style={styles.item}>
                        <View><Text style={styles.basicInfo}>{userData.Usergender}</Text>
                            <Text style={styles.basicInfoTitle}>الجنس</Text>
                        </View>
                        <View style={styles.IconView}>
                            <Entypo
                                name={"user"}
                                color={colors.puprble}
                                size={25} />
                        </View>
                    </View>
                </View>}
            {editBD ? editBirthDate() :
                <View style={styles.userItem}>
                    <Pressable onPress={BDEditPress}>
                        <Feather
                            style={styles.menuIcon}
                            name={'edit'}
                            color={'lightgray'}
                            size={25} />
                    </Pressable>
                    <View style={styles.item}>
                        <View><Text style={styles.basicInfo}>{userData.UserbirthDate}</Text>
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
                </View>}
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    display='calendar'
                    onChange={onChange}
                />
            )}
        </View>)
    }
    const renderAddressInfo = () => {
        return (<View>
            <Text style={styles.txt}>العنوان</Text>

            <View style={styles.item}>
                <View><Text style={styles.basicInfo}>{userData.UserRegion}</Text>
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
            {editAddress ? editingAddress() :
                <View style={styles.userItem}>
                    <Pressable onPress={addressEditPress}
                    >
                        <Feather
                            style={styles.menuIcon}
                            name={'edit'}
                            color={'lightgray'}
                            size={25} />
                    </Pressable>
                    <View style={styles.item}>
                        <View><Text style={styles.basicInfo}>{userData.UserCity}</Text>
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
                </View>}
            <View style={styles.userItem}>
                <Pressable //onPress={titleEditPress}
                >
                    <Feather
                        style={styles.menuIcon}
                        name={'edit'}
                        color={'lightgray'}
                        size={25} />
                </Pressable>
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{userData.UserLocation} </Text>
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
            </View>
        </View>)
    }
    const renderSoialDetail = () => {
        return (<View>
            <Text style={styles.txt}>التفاصيل الاجتماعية</Text>
            {editStutes ? editingUserStutes() :
                <View style={styles.userItem}>
                    <Pressable onPress={stutesEditPress}>
                        <Feather
                            style={styles.menuIcon}
                            name={'edit'}
                            color={'lightgray'}
                            size={25} />
                    </Pressable>
                    <View style={styles.item}>
                        <View><Text style={styles.basicInfo}>{userData.Userstatus}</Text>
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
                </View>}
        </View>)
    }
    const renderUserName = () => {
        return (
            <View style={styles.imgView}>
                <Image style={styles.profilImg} source={userData.UserPhoto ? { uri: userData.UserPhoto } : require('../assets/photos/user.png')} />
                {editUserName ? editUsername() :
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Pressable style={styles.editName} onPress={userNameEditPress}>
                            <AntDesign
                                name={"edit"}
                                color={'white'}
                                size={20} />
                        </Pressable>
                        <Text style={styles.userName}>{userData.User_name}</Text>
                    </View>}
                <Pressable style={styles.editImg}>
                    <Entypo
                        name={"camera"}
                        color={colors.puprble}
                        size={25} />
                </Pressable>
            </View>
        )
    }
    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate();

        if (completeDate > fDate) {
            setUserBD(fDate);
        }
        // else {
        //     setUserBD(userData[0].UserbirthDate);
        // }
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
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
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
        //borderWidth: 1
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    itemView: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    editView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editUNameView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    itemFooter: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editBDView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray',
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        marginVertical: 5
    },
    inputUserName: {
        textAlign: 'center',
        height: 50,
        width: '60%',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray',
        fontSize: 15,
        color: 'white',
        alignSelf: 'center',
        marginVertical: 5
    },
    editAddressView: {
        //backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        marginVertical: 10
    },
    region: {
        height: 50,
        width: '90%',
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdown: {
        height: 50,
        maxWidth: '90%',
        minWidth: '90%',
        fontSize: 17,
        borderColor: 'white',
        alignSelf: 'center',
    },
    dropstyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.puprble,
        textAlign: 'right'
    },
    gender: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    genderPress: {
        width: 60,
        height: 60,
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
        width: 60,
        height: 60,
        borderRadius: 50,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    status: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    statusPress: {
        width: 90,
        height: 50,
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
        width: 90,
        height: 50,
        borderRadius: 30,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    statustxt: {
        fontSize: 20,
        color: colors.puprble
    },
})