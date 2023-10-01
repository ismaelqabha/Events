import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Platform, Pressable, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SearchContext from '../../store/SearchContext';

const DateTPicker = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const { DateText, setDateText, TimeText, setTimeText, AddResToEventFile, setisDateAvailable, ServId } = useContext(SearchContext);

    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
       
        setDateText(fDate);
        setTimeText(fTime);
      
    }
    const checkIfAvailable = () => {
        const isAvailable = AddResToEventFile.find(ReqAvail => ReqAvail.reservationDate == DateText && ReqAvail.reservationTime == TimeText && ReqAvail.ReqServId == ServId);
        return !!isAvailable; 
    }
    const availablity = () => {
        setisDateAvailable(checkIfAvailable())
        if (checkIfAvailable()) {
            return <View style={styles.ResView}><Text style={styles.text}>تم اختيار موعد محجوز</Text></View>;
        } else {
            if (DateText == 'dd/mm/yyyy' && TimeText == '00:00') {
                return <View><Text style={styles.text}> الرجاء تحديد التاريخ والوقت</Text></View>;
            } else {
                return <View><Text style={styles.text}>لايوجد حجز في هدا التاريخ</Text></View>;
            }
        }
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={() => showMode('date')} >
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{DateText || "dd/mm/yyyy"}</Text>

                    <Fontisto
                        name='date'
                        style={{ fontSize: 30, color: 'black' }}
                    />
                </View>
            </Pressable>
            <Pressable onPress={() => showMode('time')} >
                <View style={styles.viewDate}>
                    <Text style={styles.text}>{TimeText || "00:00"}</Text>

                    <Image
                        style={styles.icon}
                        source={require('../assets/photos/time.png')}
                    />
                </View>
            </Pressable>
            <View>
                {availablity()}
            </View>
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='clock'
                    onChange={onChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewDate: {
        flexDirection: 'row',
        borderColor: '#808080',
        width: 250,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#e0ffff',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    ResView: {
        alignItems: 'center',
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 50
    },
    text: {
        fontSize: 20,
    },
})

export default DateTPicker;
