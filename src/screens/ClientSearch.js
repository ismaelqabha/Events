import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, Image, Button } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { BackgroundImage } from 'react-native-elements/dist/config';

import Ionicons from "react-native-vector-icons/Ionicons";



const ClientSearch = (props) => {

    const { setCity } = useContext(SearchContext);
    const [searched, setSearched] = useState ('')

    const onPressHandler = () => {
        props.navigation.goBack();
    }


    // const onBtnPress = () => {
    //     props.navigation.navigate(ScreenNames.ClientResult, { data: { ...props } });
    // }


    return (
        <View style={styles.container} >
            <View style={styles.title}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>

            <View style={styles.textIn}>
                <TextInput
                    style={styles.searchinput}
                    keyboardType="default"
                    placeholder='بحث الخدمات'
                    onChangeText={(value) => setSearched(value)}
                />
                <Image style={styles.img} source={require('../assets/search.png')} />
            </View>
            <View style={styles.recentsView}><Text style={styles.recentText}>عمليات البحث الأخيرة</Text></View>



            {/* <SelectList
                    data={renderReigon()}
                    setSelected={(val => {
                        // let serObj = SerData.find(Service => Service.key == val);
                        setService(val)

                    })}
                    placeholder='اختر الخدمة'
                    boxStyles={styles.dropdown}
                    inputStyles={styles.droptext}
                    dropdownTextStyles={styles.dropstyle}
                />
                <SelectList
                    data={CitData}
                    setSelected={(val => {
                        let cityObj = CitData.find(city => city.key == val);
                        console.log('list: ', cityObj.value);
                        setCity(cityObj.value)
                    })}
                    placeholder='أختر المنطقة'
                    boxStyles={styles.dropdown}
                    inputStyles={styles.droptext}
                    dropdownTextStyles={styles.dropstyle}
                /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
       paddingRight:20,
       paddingLeft:20
    },
    searchinput: {
        alignContent: 'center',
        textAlign: 'right',
        height: 40,
        width: 250,
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    textIn: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        height: 50,
        width: 350,
        borderRadius: 8,
        marginTop: 30
    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 7,
        alignSelf: 'center'
    },

    title: {
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'flex-start',
    },
    recentsView: {
        marginTop: 30
    },
    recentText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        color:'black'
    }

})

export default ClientSearch;
