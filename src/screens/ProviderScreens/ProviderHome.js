import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect } from 'react'
import SearchContext from '../../../store/SearchContext';
import AntDesign from "react-native-vector-icons/AntDesign";
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { getServiceInfoById } from '../../resources/API';
import CalenderServiceCard from '../../components/ProviderComponents/CalenderServiceCard';
import { ScreenNames } from '../../../route/ScreenNames';
import strings from '../../assets/res/strings';

const ProviderHome = (props) => {
    const { userId } = useContext(SearchContext);
    const { serviceInfoAccorUser, setServiceInfoAccorUser } = useContext(ServiceProviderContext);
    const language = strings.arabic.ProviderScreens.ProviderCreateListing

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
        console.log("data", data);

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

    const renderCreateCard = () => {
        return (<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={styles.createCardtxt}>اٍنشاء خدمة جديدة</Text>
            <AntDesign
                style={styles.iconBack}
                name={"right"}
                color={"black"}
                size={25} />
        </View>)
    }

    const onCreatePress = () => {
        props.navigation.navigate(ScreenNames.ProviderCreateListing)
    }
    return (
        <View style={styles.container}>
            {headText()}
            <View style={styles.serviceView}>
                <ScrollView >{renderMyService()}</ScrollView>
            </View>
            <Pressable style={styles.createCard} onPress={() => onCreatePress()}>
                {renderCreateCard()}
            </Pressable>
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
    createCard: {
        width: '80%',
        height: 80,
        borderRadius: 35,
        backgroundColor: 'snow',
        elevation: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    createCardtxt: {
        fontSize: 15,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        color: 'black',
    }
})