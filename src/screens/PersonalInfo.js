import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../assets/AppColors"
import { getRegions, getUserData } from '../resources/API';
import SearchContext from '../../store/SearchContext';
import UsersContext from '../../store/UsersContext';
import { SelectList } from 'react-native-dropdown-select-list';

const PersonalInfo = (props) => {

    const { userInfo, setUserInfo, userId } = useContext(UsersContext);

    const [userGender, setUserGender] = useState()
    const [userPhone, setUserPhone] = useState()
    const [userMail, setUserMail] = useState()
    const [userAddress, setUserAddress] = useState()

    const [editGender, setEditGender] = useState(false)
    const [editPhone, setEditPhone] = useState(false)
    const [editMail, setEditMail] = useState(false)
    const [editAddress, setEditAddress] = useState(false)

    const [femalePress, setFemalePress] = useState(false)
    const [malePress, setMalePress] = useState(false)

    const [singlePress, setSinglePress] = useState(false)
    const [engagedPress, setEngagedPress] = useState(false)
    const [marridPress, setMarridPress] = useState(false)

    const [regionData, setRegionData] = useState([])
    const [regions, setRegions] = useState(null)
    const [address, setAddress] = useState(null)


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
        getRegionsfromApi()
        const userData = userInfo.user
        if(userData[0].Usergender == 'ذكر'){
            setMalePress(true)
        }else{
            setFemalePress(true)
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
                    setserviceRegion(region?.regionName)
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

    // Update Functions
    const updateGender = () => {
        setEditGender(false)
        // const newData = {
        //     CampId: data.CampId,
        //     campTitle: Title
        // }
        // uodateCampaignsById(newData).then(res => {
        //     const data = campInfo || [];
        //     if (selectedOfferIndex > -1) {
        //         data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
        //     }
        //     if (res.message === 'Updated Sucessfuly') {
        //         setCampInfo([...data])
        //         setEditTitle(false)
        //         ToastAndroid.showWithGravity(
        //             'تم التعديل بنجاح',
        //             ToastAndroid.SHORT,
        //             ToastAndroid.BOTTOM,
        //         );
        //     }
        // })
    }
    const updatePhone = () => {
        setEditPhone(false)
        // const newData = {
        //     CampId: data.CampId,
        //     campTitle: Title
        // }
        // uodateCampaignsById(newData).then(res => {
        //     const data = campInfo || [];
        //     if (selectedOfferIndex > -1) {
        //         data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
        //     }
        //     if (res.message === 'Updated Sucessfuly') {
        //         setCampInfo([...data])
        //         setEditTitle(false)
        //         ToastAndroid.showWithGravity(
        //             'تم التعديل بنجاح',
        //             ToastAndroid.SHORT,
        //             ToastAndroid.BOTTOM,
        //         );
        //     }
        // })
    }
    const updateMail = () => {
        setEditMail(false)
        // const newData = {
        //     CampId: data.CampId,
        //     campTitle: Title
        // }
        // uodateCampaignsById(newData).then(res => {
        //     const data = campInfo || [];
        //     if (selectedOfferIndex > -1) {
        //         data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
        //     }
        //     if (res.message === 'Updated Sucessfuly') {
        //         setCampInfo([...data])
        //         setEditTitle(false)
        //         ToastAndroid.showWithGravity(
        //             'تم التعديل بنجاح',
        //             ToastAndroid.SHORT,
        //             ToastAndroid.BOTTOM,
        //         );
        //     }
        // })
    }
    const updateAddress = () => {
        setEditAddress(false)
        // const newData = {
        //     CampId: data.CampId,
        //     campTitle: Title
        // }
        // uodateCampaignsById(newData).then(res => {
        //     const data = campInfo || [];
        //     if (selectedOfferIndex > -1) {
        //         data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
        //     }
        //     if (res.message === 'Updated Sucessfuly') {
        //         setCampInfo([...data])
        //         setEditTitle(false)
        //         ToastAndroid.showWithGravity(
        //             'تم التعديل بنجاح',
        //             ToastAndroid.SHORT,
        //             ToastAndroid.BOTTOM,
        //         );
        //     }
        // })
    }
    

    ////
    const renderContactInfo = () => {
        const userData = userInfo.user
        return (<View>
            <Text style={styles.txt}>معلومات التواصل </Text>
            {editPhone ? editItem(userData[0].UserPhone, setUserPhone, updatePhone) :
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
                        <View><Text style={styles.basicInfo}>{userData[0].UserPhone}</Text>
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
            {editMail ? editItem(userData[0].Email, setUserMail, updateMail) :
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
                        <View><Text style={styles.basicInfo}>{userData[0].Email}</Text>
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
        const userData = userInfo.user
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
                        <View><Text style={styles.basicInfo}>{userData[0].Usergender}</Text>
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
                    <View><Text style={styles.basicInfo}>{userData[0].UserbirthDate}</Text>
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
            </View>
        </View>)
    }
    const renderAddressInfo = () => {
        const userData = userInfo.user
        return (<View>
            <Text style={styles.txt}>العنوان</Text>

            <View style={styles.item}>
                <View><Text style={styles.basicInfo}>{userData[0].UserRegion}</Text>
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
                        <View><Text style={styles.basicInfo}>{userData[0].UserCity}</Text>
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
                    <View><Text style={styles.basicInfo}>{userData[0].UserLocation} </Text>
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
        const userData = userInfo.user
        return (<View>
            <Text style={styles.txt}>التفاصيل الاجتماعية</Text>
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
                    <View><Text style={styles.basicInfo}>{userData[0].Userstatus}</Text>
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
            </View>
        </View>)
    }
    const renderUserName = () => {
        const userData = userInfo.user
        return (
            <View style={styles.imgView}>

                <Image style={styles.profilImg} source={userData[0].UserPhoto ? { uri: userData[0].UserPhoto } : require('../assets/photos/user.png')} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable style={styles.editName}>
                        <AntDesign
                            name={"edit"}
                            color={'white'}
                            size={20} />
                    </Pressable>
                    <Text style={styles.userName}>{userData[0].User_name}</Text>
                </View>
                <Pressable style={styles.editImg}>
                    <Entypo
                        name={"camera"}
                        color={colors.puprble}
                        size={25} />
                </Pressable>
            </View>
        )
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
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemFooter: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
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
})