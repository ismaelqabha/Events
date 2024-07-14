import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, Image, Keyboard, Alert } from 'react-native'
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
import { images } from '../../assets/photos/images';
import { asyncFunctions, getProfileImageSource } from '../../resources/Functions';

const CreateUpersonalInfo = (props) => {
    const { userId } = useContext(SearchContext);
    const {
        userName, setUserName, userEmail, setUserEmail, userPhone, setUserPhone,
        userBD, setUserBD, setUserGender, setUserStatus, profilePhoto, setProfilePhoto,
        userGender, userInfo, setUserInfo, setUserCity, setCreateUserRegion, setUserSpecialDate,
        setPassword, setconfirmPassword
    } = useContext(UsersContext);

    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userPhoneError, setUserPhoneError] = useState(false);
    const [userBDError, setUserBDError] = useState(false);
    const [femalePress, setFemalePress] = useState(false);
    const [malePress, setMalePress] = useState(false);
    const [singlePress, setSinglePress] = useState(false);
    const [engagedPress, setEngagedPress] = useState(false);
    const [marridPress, setMarridPress] = useState(false);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());

    const [isNameEditable, setIsNameEditable] = useState(true);
    const [isEmailEditable, setIsEmailEditable] = useState(true);
    const [isPhotoEditable, setIsPhotoEditable] = useState(true);

    const { isFromGoogleUser } = props.route?.params || false;

    useEffect(() => {
        setUserNameError(!checkStrings(userName, 'name'));
        setUserBDError(!checkStrings(userBD, 'BD'));
    }, [userName, userBD]);

    useEffect(() => {
        validateEmailAndPhone();
    }, [userEmail, userPhone]);

    useEffect(() => {
        if (isFromGoogleUser) {
            setUserName(userInfo?.User_name);
            setUserEmail(userInfo?.Email);
            setProfilePhoto(userInfo?.UserPhoto);
            setIsNameEditable(false);
            setIsEmailEditable(false);
            setIsPhotoEditable(false);
        } else {
            setUserName(null);
            setUserEmail(null);
            setProfilePhoto(null);
            setIsNameEditable(true);
            setIsEmailEditable(true);
            setIsPhotoEditable(true);
        }
    }, [isFromGoogleUser, userInfo, setUserName, setUserEmail, setProfilePhoto]);

    const onPressBack = () => {
        if (isFromGoogleUser) {
            Alert.alert(
                'Incomplete Profile Setup',
                'You need to finish setting up your profile before proceeding. If you leave now, you will need to sign in again.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Leave',
                        onPress: async () => {
                            try {
                                clearStates()
                                await asyncFunctions.removeItem('userInfo')
                                props.navigation.replace(ScreenNames.SignIn);
                            } catch (e) {
                                console.error('Failed to clear the async storage.', e);
                            }
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            clearStates()
            props.navigation.goBack();

        }
    };

    const clearStates = () => {
        setUserInfo([]);
        setUserName('');
        setUserEmail('');
        setUserPhone('');
        setUserBD('');
        setUserGender(null);
        setUserStatus(null);
        setUserCity(null);
        setCreateUserRegion(null);
        setUserSpecialDate([]);
        setPassword(null);
        setconfirmPassword(null);
        setProfilePhoto(null);
    };

    const onChange = (event, selectedDate) => {
        setShow(false);
        const currentDate = selectedDate || date;
        setDate(currentDate);

        const tempDate = new Date(currentDate);
        const formattedDate = `${tempDate.getDate()}/${tempDate.getMonth() + 1}/${tempDate.getFullYear()}`;
        setUserBD(formattedDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onNextPress = () => {
        props.navigation.navigate(ScreenNames.SetUserAddress, { isFromGoogleUser });
    };

    const checkStrings = (val, type) => {
        if (!val || val.trim().length <= 0) return false;

        switch (type) {
            case 'email':
                return emailVerification.test(val.trim());
            case 'BD':
                return true;
            case 'name':
                return true;
            case 'phone':
                return phoneNumberRegex.test(val.trim());
            default:
                return true;
        }
    };

    const validateEmailAndPhone = () => {
        const isEmailFilled = userEmail && userEmail.trim().length > 0;
        const isPhoneFilled = userPhone && userPhone.trim().length > 0;

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
    };

    const handleGenderPress = (gender) => {
        setMalePress(gender === 'male');
        setFemalePress(gender === 'female');
        setUserGender(gender === 'male' ? 'ذكر' : 'أنثى');
    };

    const handleStatusPress = (status) => {
        setSinglePress(status === 'single');
        setEngagedPress(status === 'engaged');
        setMarridPress(status === 'marrid');
        setUserStatus(status === 'single' ? 'أعزب' : status === 'engaged' ? 'خاطب' : 'متزوج');
    };

    const personalInfoData = [
        { value: userName, onChange: setUserName, placeHolder: 'الاسم', required: userNameError, editable: isNameEditable },
        { value: userEmail, onChange: setUserEmail, placeHolder: 'البريد الألكتروني', required: emailError, editable: isEmailEditable },
        { value: userPhone, onChange: setUserPhone, placeHolder: 'الموبايل', required: userPhoneError, editable: true }
    ];

    const onAddImgPress = async () => {
        try {
            const options = { mediaType: 'photo', includeBase64: false };
            launchImageLibrary(options, response => handleImageResponse(response));
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageResponse = (response) => {
        if (response.didCancel) {
            console.log('User Cancelled');
        } else if (response.error) {
            console.log('Gallery Error:', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button:', response.customButton);
        } else {
            const imageUri = response.uri || response.assets?.[0]?.uri;
            setProfilePhoto(imageUri);
        }
    };

    const renderTextInfo = () => (
        personalInfoData.map(info => personalInfoTextComp({ ...info }))
    );

    const personalInfoTextComp = ({ value, onChange, placeHolder, required, editable }) => {
        return (
            <View style={styles.inputView}>
                {required && <Text style={styles.textRequired}>*</Text>}
                <TextInput
                    style={[
                        styles.input,
                        !editable && styles.nonEditableInput,
                    ]}
                    keyboardType='default'
                    placeholder={placeHolder}
                    onChangeText={onChange}
                    value={value}
                    editable={editable}
                />
            </View>
        );
    };

    const renderDatePicker = () => (
        <View style={styles.inputView}>
            {userBDError && <Text style={styles.textRequired}>*</Text>}
            <Pressable onPress={() => showMode('date')}>
                <View style={styles.Bdate}>
                    <Text>{userBD}</Text>
                    <Entypo style={styles.logoDate} name="calendar" color="black" size={30} />
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
    );

    const renderGenderPicker = () => (
        <View style={styles.gender}>
            <Pressable
                style={malePress ? styles.genderPress : styles.genderNotPres}
                onPress={() => handleGenderPress('male')}
            >
                <FontAwesome name="male" color={colors.puprble} size={50} />
            </Pressable>
            <Pressable
                style={femalePress ? styles.genderPress : styles.genderNotPres}
                onPress={() => handleGenderPress('female')}
            >
                <FontAwesome name="female" color={colors.puprble} size={50} />
            </Pressable>
        </View>
    );

    const renderSocialStatus = () => (
        <View style={styles.status}>
            <Pressable
                style={singlePress ? styles.statusPress : styles.statusNotPres}
                onPress={() => handleStatusPress('single')}
            >
                <Text style={styles.statustxt}>أعزب</Text>
            </Pressable>
            <Pressable
                style={engagedPress ? styles.statusPress : styles.statusNotPres}
                onPress={() => handleStatusPress('engaged')}
            >
                <Text style={styles.statustxt}>خاطب</Text>
            </Pressable>
            <Pressable
                style={marridPress ? styles.statusPress : styles.statusNotPres}
                onPress={() => handleStatusPress('marrid')}
            >
                <Text style={styles.statustxt}>متزوج</Text>
            </Pressable>
        </View>
    );

    const renderPersonalInfo = () => (
        <View>
            {renderTextInfo()}
            {renderDatePicker()}
            <Text style={{ fontSize: 20, marginRight: 20 }}>الجنس</Text>
            {renderGenderPicker()}
            <Text style={{ fontSize: 20, marginRight: 20 }}>الحالة الاجتماعية</Text>
            {renderSocialStatus()}
        </View>
    );

    const renderHeader = () => (
        <View style={styles.head}>
            <Pressable onPress={onPressBack}>
                <Ionicons style={styles.icon} name="arrow-back" color={colors.puprble} size={25} />
            </Pressable>
            <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
        </View>
    );

    const renderProfilePhoto = () => (
        <View style={styles.userImg}>
            <Image style={styles.profilImg} source={getProfileImageSource(profilePhoto, userGender)} />
            {isPhotoEditable && (
                <Pressable style={styles.editImg} onPress={onAddImgPress}>
                    <Entypo name={"camera"} color={colors.puprble} size={25} />
                </Pressable>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollWrapper
                onNextPress={onNextPress}
                onPressBack={onPressBack}
                dotPlace={0}
                amountDots={isFromGoogleUser ? 3 : 4}
            >
                {renderProfilePhoto()}
                <View style={styles.body}>
                    <Text style={styles.titleText}>المعلومات الشخصية</Text>
                    {renderPersonalInfo()}
                </View>
            </ScrollWrapper>
        </View>
    );
};

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
    nonEditableInput: {
        color: '#888',
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