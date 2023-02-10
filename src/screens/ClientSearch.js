import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, Image, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { servicesCategory } from '../resources/data';



const ClientSearch = (props) => {
   
    const {  setCity, setService,  city, Service } = useContext(SearchContext);
   
    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const onBtnPress = () => {
        props.navigation.navigate(ScreenNames.ClientResult, { data: { ...props } });
        console.log(city, Service);
    }
    const query = () => {
        return servicesCategory || [];
    }
    const renderReigon = () => {
        const data = query();

        const eventName = data.map(Ename => {
            return Ename.titleCategory;
        });
        return eventName;
    };

    const SerData = [
        { key: '001', value: 'قاعات' },
        { key: '1', value: 'تصوير' },
        { key: '2', value: 'فساتين' },
        { key: '3', value: 'صالون تلبيس عرائس ' },
        { key: '4', value: 'بدلات عرسان' },
        { key: '5', value: 'مطربين' },
        { key: '6', value: 'Dj' },
    ];
    const CitData = [
        { key: '2', value: 'الجليل' },
        { key: '3', value: 'النقب ' },
        { key: '5', value: 'الساحل' },
        { key: '0', value: 'المثلث الشمالي' },
        { key: '1', value: 'المثلث الجنوبي' },
        { key: '4', value: 'الضفة الغربية' },   
    ];

    return (
        <BackgroundImage style={styles.container} source={require('../assets/Bground.png')}>
            <View style={styles.headerImg}>
                <Pressable onPress={onBtnPress}>
                    <Image
                        source={require('../assets/done.png')}
                        style={styles.img}
                    />
                </Pressable>
                <Pressable onPress={onPressHandler}
                >
                    <Image
                        source={require('../assets/back.png')}
                        style={styles.img}
                    />
                </Pressable>
            </View>
           
            <View style={styles.textIn}>
                <SelectList
                    data={renderReigon()}
                    setSelected={(val => {
                        // let serObj = SerData.find(Service => Service.key == val);
                        setService(val)
                        // console.log('list: ', serObj.value);

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
                />
            </View>
           
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe4e1',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',

    },
    headerText: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#87ceeb',
        marginTop: 20,
    },
    textIn: {
        alignItems: 'center',
        marginVertical: 90,
    },
    dropdown: {
        height: 50,
        width: 350,
        fontSize: 17,
        borderRadius: 15,
        fontWeight: 'bold',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        marginTop: 10,
        backgroundColor: '#87ceeb',
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'

    },
    dropstyle: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
   
    headerImg: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#87ceeb',
    },
    img: {
        width: 40,
        height: 40,
        marginLeft: 130,
        marginRight:130,
        marginTop:5,
        
    },
})

export default ClientSearch;
