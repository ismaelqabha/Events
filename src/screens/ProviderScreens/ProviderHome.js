import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import SearchContext from '../../../store/SearchContext';
import AntDesign from "react-native-vector-icons/AntDesign";
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { getServiceInfoById } from '../../resources/API';
import CalenderServiceCard from '../../components/ProviderComponents/CalenderServiceCard';
import { ScreenNames } from '../../../route/ScreenNames';
import strings from '../../assets/res/strings';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assets/AppColors';
import Entypo from "react-native-vector-icons/Entypo";

const ProviderHome = (props) => {
    const { userId } = useContext(SearchContext);
    const { serviceInfoAccorUser, setServiceInfoAccorUser } = useContext(ServiceProviderContext);
    const language = strings.arabic.ProviderScreens.ProviderCreateListing
    const navigation = useNavigation();

    const getServiceInfofromApi = () => {
        getServiceInfoById({ userID: userId }).then(res => {
            setServiceInfoAccorUser(res)
        })
    }
    useEffect(() => {
        getServiceInfofromApi()
    }, [])

    const renderMyService = () => {
        const data = serviceInfoAccorUser || [];

        if (data.length > 0) {
            const cardsArray = data.map(card => {
                return <CalenderServiceCard {...card} />;
            });
            return cardsArray;
        } else {
            return (<View style={styles.ifNoView}>
                <Text style={styles.ifNoText}>نرحب بكم للانضمام الى عائلة تطبيق مناسباتي الذي يتيح لكم الفرصة لترويج واشهار خدمتكم وضمان وصولها الى اكبر عدد من المستخدمين</Text>
            </View>)
        }
    };

    const headText = () => {
        return (
            <View style={styles.headView}>
                <Text style={styles.headtext}>{language.HeadText}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>خدماتي</Text>
                <Pressable
                    style={styles.drawer}
                    onPress={() => navigation.openDrawer()}
                >
                    <Entypo
                        name={"menu"}
                        color={colors.puprble}
                        size={30} />
                </Pressable>
            </View>
            
            <View style={styles.serviceView}>
                {/* <ScrollView >{renderMyService()}</ScrollView> */}
            </View>
            
        </View>
    )
}

export default ProviderHome

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headView: {
        marginTop: 20,
        marginRight: 20
    },
    headtext: {
        fontSize: 26,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    serviceView: {
        height: '48%',
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgray',
        margin: 5
    },
    ifNoText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'right'
    },
    ifNoView: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 30
    },
    
    
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    drwaerImg: {
        width: 30,
        height: 30,
    },
    drawer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    headerTxt: {
        fontSize: 18,
        marginLeft: 20,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
})