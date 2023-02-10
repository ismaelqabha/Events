import React,{useContext,useState} from 'react';
import { View, StyleSheet, Text, Image, TextInput, Pressable, ImageBackground } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';

const SignIn = (props) => {
    const { userId, setuserId,UserState, setUserState } = useContext(SearchContext);
    const [userName, setuserName] = useState()
    const [Password, setPassword] = useState()

    const CheckUser = () => {
        const isUser = UserState.find(item => item.User_name === userName && item.Password === Password)
        return !!isUser;
    }
    const onEnterPress = () => {
        if(!CheckUser()){
            renderUserId();
            props.navigation.navigate(ScreenNames.ClientHomeAds);
        }
        console.log('LogIn',userId);
    }
    const query = () => {
        return UserState.filter(use => {
            return use.Password === Password;
        })
    }

    const renderUserId = () => { 
        const data = query();
        const UserArray = data.map(id => {
            return setuserId(id.USER_ID)
        });
        return UserArray;
    };

    return (
        <ImageBackground style={styles.container} source={require('../../assets/bg.png')}>
            {/* <View style={styles.container}> */}
            {/* <Text onPress={() => props.navigation.navigate(ScreenNames.SignUp)}>In</Text> */}
            {/* <Text onPress={()=> props.navigation.navigate('Tabs' , {screen:ScreenNames.ClientInfo}) }>In</Text> */}
            <Image
                source={require('../../src/assets/signIn.png')}
                style={styles.image}
            />

            <Text style={styles.text}>مرحبا بك</Text>
            <View style={styles.textIn}>
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
            <Pressable>
                <Text style={styles.txt}>نسيت كلمةالمرور?</Text>
            </Pressable>

            <Pressable style={styles.btnEnter} onPress={() => onEnterPress()}>
                <Text style={styles.txtُEnter}>دخول</Text>
            </Pressable>

            
        </ImageBackground>
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
        color:'#1e90ff'

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
        borderColor:'#1e90ff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        marginTop: 10,
        Color: '#1e90ff'
    },
    txt: {
        color: 'black',
        fontSize: 15,
        marginTop: 10,
        paddingRight: 45,
    },

    txtُEnter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'white',
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
    textIn:{
        alignItems: 'center',
    },

})

export default SignIn;
