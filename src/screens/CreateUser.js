import { StyleSheet, Text, View, Pressable, TextInput,ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { addUser } from '../resources/API';
import SearchContext from '../../store/SearchContext';

const CreateUser = (props) => {
    const { userId, setuserId, userInfo, setUserInfo } = useContext(SearchContext);

    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [userPhone, setUserPhone] = useState()
    const [userAddress, setUserAddress] = useState()
    const [firstPassword, setFirstPassword] = useState()
    const [secondPassword, setSecondPassword] = useState()

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const chickIfExist = () => {
        const isChecked = userInfo.find(item => item.Email === email)
        return !!isChecked;
    }
    const addNewUser = () => {
        const AddNewUser = {
            User_name: userName,
            Email: email,
            UserAdress: userAddress,
            UserPhone: userPhone,
            Password: firstPassword
        }
        addUser(AddNewUser).then(res => {
            let UsersArr = userInfo || [];
            UsersArr.push(AddNewUser);
            setUserInfo([...UsersArr])
        })
    }
    const onCreateUser = () => {
        if (!chickIfExist()) {
            addNewUser()
            ToastAndroid.showWithGravity('تم اٍنشاء المستخدم بنجاح',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }else{
            ToastAndroid.showWithGravity('لديك حساب مسبقا',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
    }

    const renderTextInputs = () => {
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
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='العنوان'
                onChangeText={setUserAddress}
            />
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='كلمة المرور'
                onChangeText={setFirstPassword}
            />
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='تأكيد كلمة المرور'
                onChangeText={setSecondPassword}
            />

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
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>
            <View style={styles.title}>
                <Text style={styles.titleTxt}>اٍنشاء الحساب</Text>
            </View>
            <View style={styles.body}>
                {renderTextInputs()}
            </View>
            <Pressable style={styles.btnEnter}
                onPress={() => onCreateUser()}
            >
                <Text style={styles.txtُEnter}>انشاء ودخول</Text>
            </Pressable>
        </View>
    )
}

export default CreateUser

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
    title: {
        alignItems: 'center',
        marginTop: 20,
    },
    titleTxt: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    body: {
        marginTop: 50,
        marginBottom: 50,
    },
    input: {
        alignSelf: 'center',
        textAlign: 'center',
        height: 60,
        width: '80%',
        borderRadius: 30,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 10,
        color: 'black',
        backgroundColor: 'snow',
    },
    txtُEnter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    btnEnter: {
        width: '60%',
        height: 50,
        borderRadius: 20,
        //marginTop: 100,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#1e90ff',
        alignSelf: 'center',
        elevation: 5,
    },
})