import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, Platform, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DatePicker from 'react-native-date-picker';

const ClientSearch = () => {

    const [service, setService] = useState("");
    const [city, setCity] = useState("");


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
        { key: '0', value: 'ام الفحم' },
        { key: '1', value: 'الطيبة' },
        { key: '2', value: 'الناصرة' },
        { key: '3', value: 'حيفا ' },
        { key: '4', value: 'عكا' },
        { key: '5', value: 'عرعرة' },
        { key: '6', value: 'برطعة' },

    ];
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    return (
        <View style={styles.container}>
            <Text style={styles.text}> الرجاء اختيار تفاصيل البحث المطلوبة</Text>
            <View style={styles.textIn}>
               

                <Button title="أختر التاريخ" onPress={() => setOpen(true)} style={styles.date} />
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                    mode={'date'}
                />
                
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
        color: 'black',
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
    btnDate: {
        width: 200,
        height: 50,
        borderRadius: 15,
        marginTop: 50,
        marginLeft: 90,
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#1e90ff',
    },
    date:{
       
    },
})

export default ClientSearch;
