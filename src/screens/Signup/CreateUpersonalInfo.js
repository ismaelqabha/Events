import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, Image, Keyboard } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from '../../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScreenNames } from '../../../route/ScreenNames';
import { launchImageLibrary } from 'react-native-image-picker';
import SearchContext from '../../../store/SearchContext';
import ScrollWrapper from '../../components/ProviderComponents/ScrollView/ScrollWrapper';
import UsersContext from '../../../store/UsersContext';
import { emailVerification, phoneNumberRegex } from '../../resources/Regex';

const CreateUpersonalInfo = (props) => {
    const { userId } = useContext(SearchContext);
    const {
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userPhone,
        setUserPhone,
        userBD,
        setUserBD,
        setUserGender,
        setUserStatus,
        profilePhoto,
        setProfilePhoto
    } = useContext(UsersContext);

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

    const onPressBack = () => {
        props.navigation.goBack();
    }
    const onChange = (event, selectedDate) => {
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

    const onNextPress = () => {
        true
            ? props.navigation.navigate(ScreenNames.SetUserAddress, { data: { ...props } })
            : missingData();
    };
    /**
     * Checks the validity of a string based on the specified type.
     * 
     * @param {string} val - The value to be checked.
     * @param {'email' | 'BD' | 'name' | 'phone'} type - The type of verification.
     * @returns {boolean} - Returns true if the string is valid according to the specified type, otherwise false.
     */
    const checkStrings = (val, type) => {
        if (!val) {
            return false;
        } else if (val.trim().length <= 0) {
            return false;
        }

        switch (type) {
            case 'email':
                // Validates email using regex
                return emailVerification.test(val.trim());
            case 'BD': // birthDate
                return true
            case 'name':
                return true; // Example: No specific validation for name
            case 'phone':
                return phoneNumberRegex.test(val.trim()); // Example: Phone number must be 10 digits
            default:
                return true;
        }
    };

    const missingData = () => {
        checkStrings(userName, 'name') ? showMissingUserName() : null;
        checkStrings(userEmail, 'email') ? showMissingMail() : null;
        checkStrings(userPhone, 'phone') ? showMissingPhone() : null;
        checkStrings(userBD, 'BD') ? showMissingBirthDate() : null;
    };

    const showMissingUserName = () => { };

    const showMissingMail = () => { };

    const showMissingPhone = () => { };

    const showMissingBirthDate = () => { };

    useEffect(() => {
        setUserNameError(!checkStrings(userName, 'name'));
        setUserBDError(!checkStrings(userBD, 'BD'));
    }, [userName, userBD]);
    useEffect(() => {
        let isEmailFilled;
        let isPhoneFilled;

        userEmail && userEmail.trim().length > 0 ? isEmailFilled = true : isEmailFilled = false;
        userPhone && userPhone.trim().length > 0 ? isPhoneFilled = true : isPhoneFilled = false;

        if (isEmailFilled && !isPhoneFilled) {
            setEmailError(!checkStrings(userEmail, 'email'));
        } else if (isPhoneFilled && !isEmailFilled) {
            setUserPhoneError(!checkStrings(userPhone, 'phone'));
        } else if (isEmailFilled && isPhoneFilled) {
            setEmailError(!checkStrings(userEmail, 'email'));
            setUserPhoneError(!checkStrings(userPhone, 'phone'));
        } else {
            setEmailError(true);
            setUserPhoneError(true);
        }
    }, [userEmail, userPhone]);

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

    const renderTextInfo = () => {
        return personalInfoData.map((info) => personalInfoTextComp(info))
    }
    const personalInfoTextComp = ({ value, onChange, placeHolder, required }) => {
        return (
            <View style={styles.inputView}>
                {required && (
                    <Text style={styles.textRequired}>*</Text>
                )}
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder={placeHolder}
                    onChangeText={onChange}
                    value={value}
                />
            </View>
        )
    }

    const personalInfoData = [
        { value: userName, onChange: setUserName, placeHolder: 'الاسم', required: userNameError },
        { value: userEmail, onChange: setUserEmail, placeHolder: 'البريد الألكتروني', required: emailError },
        { value: userPhone, onChange: setUserPhone, placeHolder: 'الموبايل', required: userPhoneError }
    ];

    const renderDatePicker = () => {
        return (
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
        )
    }
    const renderGenderPicker = () => {
        return (
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
        )
    }
    const renderSocial = () => {
        return (
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
        )
    }
    const renderPersonalInfo = () => {
        return (
            <View>
                {renderTextInfo()}
                {renderDatePicker()}
                <Text style={{ fontSize: 20, marginRight: 20 }}>الجنس</Text>
                {renderGenderPicker()}
                <Text style={{ fontSize: 20, marginRight: 20 }}>الحالة الاجتماعية</Text>
                {renderSocial()}
            </View>)

    }
    const onAddImgPress = async () => {
        try {
            let options = {
                mediaType: 'photo',
                includeBase64: false,
            };
            launchImageLibrary(options, response => GalleryImageResponse(response));
        }
        catch (error) {
            console.error(error);
        }
    };

    const GalleryImageResponse = response => {
        if (response.didCancel) {
            console.log('User Cancelled');
        } else if (response.error) {
            console.log('Gallery Error : ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom Button ', response.customButton);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            SaveImg(imageUri);
        }
    };

    const SaveImg = source => {
        if (source) {
            setProfilePhoto(source);
        } else {
            console.log('error source isnt legable, source is :', source);
            console.log('error source isnt legable, source is :', source);
        }
    };
    const renderHeader = () => {
        return (
            <View style={styles.head}>
                <Pressable onPress={onPressBack}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={colors.puprble}
                        size={25} />
                </Pressable>
                <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
            </View>
        )
    }
    const renderProfilePhoto = () => {
        return (
            <View style={styles.userImg}>
                <Image style={styles.profilImg} source={profilePhoto ? { uri: profilePhoto } : require('../../assets/photos/user.png')} />
                <Pressable style={styles.editImg} onPress={onAddImgPress}>
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
            {renderHeader()}

            <ScrollWrapper
                onNextPress={onNextPress}
                onPressBack={onPressBack}
                dotPlace={0}
                amountDots={4}
            >
                {renderProfilePhoto()}
                <View style={styles.body}>
                    <Text style={styles.titleText}>المعلومات الشخصية</Text>
                    {renderPersonalInfo()}
                </View>
            </ScrollWrapper>
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
        right: 105,
        bottom: 55,
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