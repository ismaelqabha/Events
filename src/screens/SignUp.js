import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { CheckBox, Icon } from "react-native-elements";
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const SignUp = (props) => {
    let UI = uuidv4();

    const [checked, setChecked] = React.useState('first');
    const navigation = useNavigation()

    const [client, setClient] = React.useState(false);
    const [provider, setProvider] = React.useState(false);

    const { userId, setuserId, UserState, setUserState } = useContext(SearchContext);
    const [userName, setuserName] = useState()
    const [Password, setPassword] = useState()

    const chickIfExist = () => {
        const isChecked = UserState.find(item => item.USER_ID === UI)
        return !!isChecked;
    }

    const onCreateUser = () => {
        const AddNewUser = {
            USER_ID: UI,
            User_name: userName,
            Password: Password,
        }

        let UsersArr = UserState;
        if (!chickIfExist()) {
            UsersArr.push(AddNewUser);
            setUserState([...UsersArr])
            setuserId(UI)
        } 
        console.log('UI', UI);
    }

    return (
        <View>
            <Image
                source={require('../assets/photos/signIn.png')}
                style={styles.image1}
            />
            <Text style={styles.text}>مرحبا بك ونشكرك على التسجيل في التطبيق</Text>
            <View style={styles.textIn}>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder='الاسم'
                />
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder='البريد الالكتروني'
                    onChangeText={(value) => setuserName(value)}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="visible-password"
                    placeholder='كلمة المرور'
                    onChangeText={(value) => setPassword(value)}
                />
            </View>

            <View style={styles.radio}>
                <Text style={styles.text}>الرجاء اختيار مقصدك من التطبيق</Text>
                <CheckBox
                    right
                    title='مستخدم'
                    checked={client}
                    iconRight
                    // checkedIcon="check_circle"
                    uncheckedIcon="circle-o"
                    iconType='circle-o'
                    style={styles.check}
                    onPress={() => props.navigation.navigate(ScreenNames.ClientInfo)}
                />

                <CheckBox
                    right
                    title='مزود خدمة'
                    checked={provider}
                    iconRight
                    checkedIcon='check_circle'
                    uncheckedIcon='circle-o'
                />
            </View>
            <Pressable style={styles.btnEnter} onPress={() => onCreateUser()}>
                <Text style={styles.txtُEnter}>انشاء ودخول</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    image: {
        width: 150,
        height: 150,
        marginHorizontal: 120,
        marginVertical: 80,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1e90ff',


    },
    input: {
        alignContent: 'center',
        textAlign: 'center',
        height: 40,
        width: 300,
        fontSize: 17,
        borderRadius: 15,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#1e90ff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        marginTop: 10,
        Color: '#1e90ff'
    },
    txt: {
        color: 'black',
        fontSize: 15,
        //marginTop: 10,
        paddingRight: 45,
    },

    txtُEnter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    btnEnter: {
        width: 200,
        height: 40,
        borderRadius: 20,
        marginTop: 100,
        marginLeft: 90,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#1e90ff'

    },
    textIn: {
        alignItems: 'center',
        marginTop: 50,
    },
    radio: {
        marginTop: 50,
        width: 330,
        marginStart: 25,

        // marginLeft: 100,
        // paddingRight: 100
    },
    check: {
        width: '70%',
    },
    image1: {
        width: 100,
        height: 100,
        marginLeft: 125,
        marginTop: 20,
    },

})

export default SignUp;
