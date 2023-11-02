import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React,{useContext} from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../store/SearchContext';
import { getUserData } from '../resources/API';

const UserProfile = (props) => {
    const { userId } = useContext(SearchContext);

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const getUserfromApi = () => {
        getUserData({ USER_ID: userId }).then(res => {
           // setEventInfo(res)
        })
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
            <View style={styles.body}>
                <View style={styles.nameView}>
                    <Image style={styles.profilImg} source={require('../assets/photos/user.png')} />
                    <Text style={styles.nameTxt}>اسماعيل كبها </Text>
                    <Text >مزود خدمة</Text>
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.infoView}>
                        <Text style={styles.nameTxt}> الموبايل: 0548596325</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.nameTxt}>Email : Exsample@gmail.com</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UserProfile

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
    body: {
        alignItems: 'center'
    },
    nameView: {
        width: '85%',
        height: 250,
        borderRadius: 10,
        backgroundColor: 'snow',
        elevation: 5,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    profilImg: {
        width: 120,
        height: 120,
        borderRadius: 50,
        borderWidth: 1,
    },
    nameTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    userInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: 20,
        //height: 300,
    },
    infoView: {
        width: '85%',
        height: 60,
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})