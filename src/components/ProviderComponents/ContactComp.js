import React, { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { View, Text, Pressable } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5'
import strings from "../../assets/res/strings";
import { colors } from "../../assets/AppColors"
import { SelectList } from 'react-native-dropdown-select-list';
import { socialMediaList } from "../../resources/data";
import { emailVerification } from "../../resources/Regex";
import ServiceProviderContext from "../../../store/ServiceProviderContext";
import WebView from "react-native-webview";

const ContactComp = () => {

    const language = strings.arabic.ProviderComps.ProviderSocialMediaScreen
    const { socialMediaArray,
        setSocialMediaArray,
        phoneNumer,
        setPhoneNumer,
        email,
        setEmail } = useContext(ServiceProviderContext)

    const updateArray = (data, index) => {
        setSocialMediaArray(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = data;
            return newArray;
        });
    };



    const addSoialMediaContact = () => {
        if (socialMediaArray.length < 3) {
            setSocialMediaArray([...socialMediaArray, { empty: "empty" }])
        }
    }

    const renderSocialFeilds = () => {
        const fields = socialMediaArray?.map((val, index) =>
            <SocialMediaComp val={val} index={index} />
        )
        return fields
    }

    const iconColors = {
        facebook: "blue",
        instagram: 'purple',
        tiktok: 'black',
        youtube: 'red'
    }
    const webUri = {
        facebook: "https://www.facebook.com",
        instagram: "https://www.instagram.com",
        tiktok: "https://www.tiktok.com",
        youtube: "https://www.youtube.com"
    };

    const removeSocialComp = (index) => {
        const newArray = [...socialMediaArray];
        newArray.splice(index, 1);
        setSocialMediaArray(newArray);
    };
    const handleWebViewNavigationStateChange = (newNavState) => {
        // Extract relevant data from the web view's navigation state
        // You can check if the user has logged in and extract profile information here
        console.log("new state ->", newNavState);
    };

    const SocialMediaComp = (props) => {
        const [contactVal, setContactVal] = useState(null)
        const [contactType, setContactType] = useState(null)
        const [webViewVisible, setWebViewVisible] = useState(false);
        const index = props.index
        const handleLogin = () => {
            setWebViewVisible(true);
        };

        useEffect(() => {
            if (props.val) {
                setContactType(props?.val?.social)
                setContactVal(props?.val?.link)
            }
        }, [])

        return (
            <View key={props?.index} style={styles.mediaItem}>
                <View style={styles.mediaList}>
                    <Pressable onPress={() => removeSocialComp(index)} style={{ width: '10%', padding: 5, alignItems: 'center' }}>
                        <FontAwesome name="remove" size={15} />
                    </Pressable>
                    <SelectList
                        data={socialMediaList}
                        setSelected={val => {
                            setContactType(socialMediaList[val].value)
                            const data = {
                                social: socialMediaList[val].value,
                                link: contactVal,
                            }
                            updateArray(data, index)
                        }}

                        placeholder={contactType || language.socialType}
                        boxStyles={styles.dropdown}
                        inputStyles={styles.droptext}
                        dropdownTextStyles={styles.dropstyle}
                    />
                </View>
                <View style={styles.socialInput}>
                    <FontAwesome5Brands name={contactType} size={25} style={styles.socialIcon} color={iconColors[contactType]} />
                    <TextInput style={styles.TextInput}
                        keyboardType={'default'}
                        placeholder={'حمل رابط الشبكة'}
                        value={contactVal}
                        onChangeText={(val) => setContactVal(val)}
                        onFocus={() => {
                            handleLogin()
                        }}
                        onEndEditing={(event) => {
                            const text = event.nativeEvent.text
                            const data = {
                                social: contactType,
                                link: text,
                            }
                            updateArray(data, index)
                        }}
                    />
                </View>
                {webViewVisible && (
                    <WebView
                        source={{ uri: webUri[contactType] }} // Change URL to the social media platform's login page
                        onNavigationStateChange={handleWebViewNavigationStateChange}
                    />
                )}
            </View>
        )
    }

    const renderPhoneField = () => {

        return (
            <View style={styles.contactItem}>
                <FontAwesome name="phone" size={25} color={colors.puprble} />
                <TextInput style={styles.TextInput}
                    keyboardType={'phone-pad'}
                    placeholder={language.Phone}
                    value={phoneNumer}
                    onChangeText={(val) => setPhoneNumer(val)}
                />
            </View>
        )
    }
    const renderEmailField = () => {
        const [isWrong, setIsWrong] = useState(false)

        const verifyEmail = () => {
            if (email?.trim()?.length < 1) {
                setIsWrong(false)
            }
            else
                if (emailVerification.test(email)) {
                    setIsWrong(false)
                } else {
                    setIsWrong(true);
                }
        }

        return (
            <View>
                <View>
                    {isWrong &&
                        <Text style={styles.textRequired}>
                            {language.wrongEmail}
                        </Text>
                    }
                </View>
                <View style={styles.contactItem}>

                    <Entypo
                        style={styles.icon}
                        name={"email"}
                        color={colors.puprble}
                        size={25} />
                    <TextInput style={styles.TextInput}
                        keyboardType={'email-address'}
                        placeholder={language.mail}
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                        onSubmitEditing={(val) => verifyEmail()}
                    />
                </View>
            </View>

        )
    }

    const renderAddButton = () => {
        return (
            <Pressable style={styles.item} onPress={addSoialMediaContact}>
                <Text style={styles.basicInfo}>اضافة</Text>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"plus"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        )
    }
    return (
        <View>
            {renderPhoneField()}
            {renderEmailField()}
            <View style={styles.addMedia}>
                <Text style={styles.txt}>الشبكات الاجتماعية</Text>
                {renderAddButton()}
            </View>
            {renderSocialFeilds()}
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
        borderColor: 'gray',
        backgroundColor: 'white'
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
    mediaList: {
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
        width: 250,
        fontSize: 17,
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 10,
    },
    dropstyle: {
        textAlign: 'left',
        color: colors.darkGold,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'

    },
    socialInput: {
        borderWidth: 1,
        width: "95%",
        textAlign: 'right',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 18,
        marginVertical: 20,
        flexDirection: 'row'
    },
    textRequired: {
        fontSize: 14,
        marginRight: 5,
        color: 'red',
    },
    socialIcon: {
        alignSelf: 'center',
        marginLeft: 10
    },
})
export default ContactComp