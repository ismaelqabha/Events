import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import strings from "../../assets/res/strings";
const ContactComp = () => {

    const language = strings.arabic.ProviderComps.ProviderSocialMediaScreen
    const [contactVal , setContactVal]=useState(null)

    return (
        <View style={styles.container}>
            <FontAwesome name="phone" size={35} color={'black'} />
            <TextInput style={styles.TextInput}
                keyboardType={'phone-pad'}
                placeholder={language.Phone}
                value={contactVal}
                onChangeText={(val)=>setContactVal(val)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 60,
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1.5,

    },
    TextInput: {
        flex: 1,
        fontSize: 20,
        marginHorizontal: 5,

    }
})
export default ContactComp