import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, Image } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import DatePicker from 'react-native-date-picker';
import SearchContext from '../../store/SearchContext';
import { BackgroundImage } from '@rneui/base';



const ClientInfo = (props) => {
   
    const { date, setDate } = useContext(SearchContext);
    const [open, setOpen] = useState(false);

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    return (
        <BackgroundImage style={styles.container} source={require('../assets/Bground.png')}>
            <View style={styles.headerImg}>
                <Pressable 
                //onPress={() => props.navigation.navigate(ScreenNames.ClientSearch)}
                >
                    <Image
                        source={require('../assets/done.png')}
                        style={styles.img}
                    />
                </Pressable>
                <Pressable onPress={onPressHandler}>
                    <Image
                        source={require('../assets/back.png')}
                        style={styles.img}
                    />
                </Pressable>
            </View>
            <Text style={styles.text}> نشكرك على اختيارك لنا لتنظيم حفلك</Text>
            <View style={styles.textIn}>
                <Text style={styles.txt}>أسم الحدث</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder='أسم الحدث'
                />
                
              
                <Text style={styles.txt}>التاريخ</Text>
                <View style={styles.viewDate}>
                    <Text>{date?.toLocaleDateString() || "dd/mm/yyyy"}</Text>
                    <Pressable onPress={() => setOpen(true)}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/calendar-3.png')}
                        />
                    </Pressable>
                    <DatePicker
                        modal
                        open={open}
                        date={date || new Date()}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                        mode={'date'}
                    />
                </View>
            </View>
           
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#e0ffff',
        marginTop: 20,
    },
    txt: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold',
        marginTop: 15,
        color:'#e0ffff'
    },
    input: {
        textAlign: 'right',
        height: 50,
        width: 350,
        fontSize: 18,
        borderRadius: 15,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#808080',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        backgroundColor:'#e0ffff',

    },
    txtُEnter: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
   
    textIn: {
        marginTop: 50,
    },
    viewDate: {

        flexDirection: 'row',
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#808080',
        width: 300,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor:'#e0ffff'
    },
    icon: {
        width: 40,
        height: 40,
        marginLeft: 180
    },
    img: {
        width: 40,
        height: 40,
        marginLeft: 130,
        marginRight:130
    },
    headerImg: {
        flexDirection: 'row-reverse', 
        backgroundColor: '#e0ffff' 
    },
})

export default ClientInfo;
