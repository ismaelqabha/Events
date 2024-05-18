import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../assets/AppColors'
import { emailVerification } from '../resources/Regex'

const ForgotPassword = () => {
    const [userEmail, setUserEmail] = useState(null)


    const onForgot = () => {
        if (!emailVerification.test(userEmail)) {
            showMessage("Enter a valid email");
            return;
        }
        requestForgotPassword()
    }

    const requestForgotPassword = () => {

    }
    return (
        <View style={styles.logInView}>
            <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder='البريد الالكتروني'
                onChangeText={(value) => setUserEmail(value)}
            />
            <Pressable style={styles.btnEnter} onPress={() => onForgot()}>
                <Text style={styles.txtُEnter}>forgot password</Text>
            </Pressable>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    logInView: {
        alignItems: 'center',
        width: 400,
        alignSelf: 'center',
        marginTop: '50%'
        //paddingVertical: 20
    },
    input: {
        textAlign: 'center',
        height: 40,
        width: '90%',
        fontSize: 15,
        borderRadius: 25,
        backgroundColor: 'lightgray',
        elevation: 5,
        marginBottom: 15,
    },
    txtُEnter: {
        fontSize: 15,
        //fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    btnEnter: {
        width: '90%',
        height: 50,
        borderRadius: 25,
        marginTop: 10,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: colors.puprble
    }
})