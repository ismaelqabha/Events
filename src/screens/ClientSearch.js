import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, Platform } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';

const ClientSearch = () => {
    const { date, setDate } = React.useState(new date());
    const { mode, setMode } = React.useState('date');
    const { show, setShow } = React.useState(false);
    const { text, setText } = React.useState('Empty');

    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'android');
        setDate(currentDate);

        let tempDate = new date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

        setDate(fDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const { service, setService } = useState("");
    const { city, setCity } = useState("");
    const SerData = [
        { key: '00', value: 'قاعات' },
        { key: '1', value: 'تصوير' },
        { key: '2', value: 'فساتين' },
        { key: '3', value: 'صالون تلبيس عرائس ' },
        { key: '4', value: 'بدلات عرسان' },
        { key: '5', value: 'مطربين' },
        { key: '6', value: 'Dj' },

    ];
    const CitData = [
        { key: '0', value: 'ام الفحم' },
        { key: '1', value: 'الطيبة' },
        { key: '2', value: 'الناصرة' },
        { key: '3', value: 'حيفا ' },
        { key: '4', value: 'عكا' },
        { key: '5', value: 'عرعرة' },
        { key: '6', value: 'برطعة' },

    ];
    return (
        <View style={styles.container}>
            <Text style={styles.text}> الرجاء اختيار تفاصيل البحث المطلوبة</Text>
            <View style={styles.textIn}>
                <Pressable
                    style={styles.btnDate}
                    onPress={() => showMode('date')}
                >
                    <Text style={styles.txtُEnter}>اختر التاريخ</Text>
                </Pressable>
                <Text style={styles.txtُEnter}>{text}</Text>
                <SelectList
                    data={SerData}
                    setSelected={setCity}
                    placeholder='اختر الخدمة'
                    boxStyles={styles.dropdown}
                    inputStyles={styles.droptext}
                    dropdownTextStyles={styles.dropstyle}

                />
                <SelectList
                    data={CitData}
                    setSelected={setService}
                    placeholder='اختر المدينة'
                    boxStyles={styles.dropdown}
                    inputStyles={styles.droptext}
                    dropdownTextStyles={styles.dropstyle}

                />
            </View>
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display={'default'}
                    onChange={onchange}
                />)}
            <Pressable style={styles.btnEnter} >
                <Text style={styles.txtُEnter}>بحث</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1e90ff',
        marginTop: 20,
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
        borderColor: '#1e90ff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        marginTop: 10,
        Color: '#1e90ff',
    },
    textIn: {
        alignItems: 'center',
        marginTop: 50,

    },
    dropdown: {
        height: 50,
        width: 300,
        fontSize: 17,
        borderRadius: 15,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#1e90ff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        marginTop: 10,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        Color: '#1e90ff',

    },
    dropstyle: {
        textAlign: 'center'
    },
    txtُEnter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
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
    btnDate:{
        width: 80,
        height: 50,
        borderRadius: 20,
        marginTop: 100,
        marginLeft: 90,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white'
    },
})

export default ClientSearch;
