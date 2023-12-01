import React from "react";
import HeaderComp from "../../components/ProviderComponents/HeaderComp";
import { StyleSheet, View } from "react-native";
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

    return (
        <View style={{ flex: 1 }} >
            <HeaderComp />
            <ScreenHeader ScreenHeader={params.ScreenHeader} />
            <ScrollView style={styles.body}>
                <ContactComp />
            </ScrollView>
            <View style={styles.footer}>
                <ScreenNext ScreenNext={params.ScreenNext} />
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
        position:'absolute',
        bottom:0
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
      },
})

export default ProviderSocialMediaScreen