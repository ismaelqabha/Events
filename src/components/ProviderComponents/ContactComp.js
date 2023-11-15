import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { View, Text, Pressable } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import strings from "../../assets/res/strings";
import { colors } from "../../assets/AppColors"
import { SelectList } from 'react-native-dropdown-select-list';
import { socialMediaList } from "../../resources/data";
const ContactComp = () => {

    const language = strings.arabic.ProviderComps.ProviderSocialMediaScreen
    const [contactVal, setContactVal] = useState(null)

    const addSoialMediaContact = () => {
        return (
            <View style={styles.mediaItem}>
                 <View style={styles.mediaList}>
                <SelectList
                    data={socialMediaList}
                    setSelected={val => {}}

                    placeholder={language.socialType}
                    boxstyles={styles.dropdown}
                    inputstyles={styles.droptext}
                    dropdownTextstyles={styles.dropstyle}
                />
                </View>
                <TextInput style={styles.socialInput}
                    keyboardType={'phone-pad'}
                    placeholder={'حمل رابط الشبكة'}
                    value={contactVal}
                    onChangeText={(val) => setContactVal(val)}
                />
            </View>
        )
    }

    return (
        <View>
            <View style={styles.contactItem}>
                <FontAwesome name="phone" size={25} color={colors.puprble} />
                <TextInput style={styles.TextInput}
                    keyboardType={'phone-pad'}
                    placeholder={language.Phone}
                    value={contactVal}
                    onChangeText={(val) => setContactVal(val)}
                />
            </View>
            <View style={styles.contactItem}>
                <Entypo
                    style={styles.icon}
                    name={"email"}
                    color={colors.puprble}
                    size={25} />
                <TextInput style={styles.TextInput}
                    keyboardType={'phone-pad'}
                    placeholder={language.mail}
                    value={contactVal}
                    onChangeText={(val) => setContactVal(val)}
                />
            </View>

            <View style={styles.addMedia}>
                <Text style={styles.txt}>الشبكات الاجتماعية</Text>
                <Pressable style={styles.item} onPress={() => addSoialMediaContact()}>
                    <Text style={styles.basicInfo}>اضافة</Text>
                    <View style={styles.IconView}>
                        <Entypo
                            style={styles.icon}
                            name={"plus"}
                            color={colors.puprble}
                            size={25} />
                    </View>
                </Pressable>

            </View>
            {addSoialMediaContact()}
        </View>
    )
}
const styles = StyleSheet.create({
    contactItem: {
        width: '90%',
        height: 50,
        marginVertical: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray'
    },
    TextInput: {
        flex: 1,
        fontSize: 20,
        textAlign: 'right',
    },
    addMedia: {
        marginRight: 30,
        marginTop: 30
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    mediaItem: {
        width: "90%",
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        margin: 5
    },
    mediaList:{
        width: "70%",
        marginTop: 20
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.darkGold,
      },
      dropdown: {
        height: 50,
        width: 100,
        fontSize: 17,
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 30,
      },
      dropstyle: {
        textAlign: 'left',
        color: colors.darkGold,
        fontWeight: 'bold',
        fontSize: 20,
      },
      socialInput:{
        borderWidth: 1,
        width: "95%",
        textAlign: 'right',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 18,
        marginVertical: 20
      }
})
export default ContactComp