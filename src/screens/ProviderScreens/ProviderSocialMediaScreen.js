import React, { useEffect, useRef } from "react";
import HeaderComp from "../../components/ProviderComponents/HeaderComp";
import { Animated, Keyboard, StyleSheet, View } from "react-native";
import { AppStyles } from "../../assets/res/AppStyles";
import ScreenNext from "../../components/ProviderComponents/ScreenNext";
import { ScreenNames } from "../../../route/ScreenNames";
import strings from "../../assets/res/strings";
import ScreenHeader from "../../components/ProviderComponents/ScreenHeader";
import ContactComp from "../../components/ProviderComponents/ContactComp";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../assets/AppColors";

const ProviderSocialMediaScreen = (props) => {

    const langauge = strings.arabic.ProviderScreens.ProviderSocialMediaScreen;

    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {  // Keyboard Listeners 
        const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, () => {
            Animated.timing(translateY, {
                toValue: 100, // Adjust slide distance as needed
                duration: 200, // Adjust duration as needed
                useNativeDriver: true,
            }).start();
        });

        const keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, () => {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 200, // Adjust duration as needed
                useNativeDriver: true,
            }).start();
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const params = {
        ScreenHeader: {
            HeaderStyle: styles.header,
            HeaderTextStyle: styles.headText,
            Text: langauge.Header,
        },
        ScreenNext: {
            nextStyle: AppStyles.next,
            nextTextStyle: AppStyles.nextText,
            Text: langauge.Next,
            onPress: () => onNextPress(),
        },
    };

    const onNextPress = () => {
        props.navigation.navigate(ScreenNames.ProviderSetPrice, { data: { ...props } });
    };

    const RenderFooter = () => {
        return (
            <Animated.View style={[styles.footer, { transform: [{ translateY: translateY }] }]}>
                <ScreenNext ScreenNext={params.ScreenNext} />
            </Animated.View>
        )
    };

    return (
        <View style={{ flex: 1 }} >
            <HeaderComp />
            <ScreenHeader ScreenHeader={params.ScreenHeader} />
            <ScrollView style={styles.body}>
                <ContactComp />
            </ScrollView>
            <View style={{width:'100%',height:'10%'}}>
                {RenderFooter()}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        height: 50,
        paddingHorizontal: '10%',
        position: 'absolute',
        bottom: 0
    },
    header: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    headText: {
        fontSize: 20,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        fontWeight: 'bold'
    },
    body: {
        height: '70%',
        marginTop: 10,
        // marginLeft: '18%',
    },
})

export default ProviderSocialMediaScreen