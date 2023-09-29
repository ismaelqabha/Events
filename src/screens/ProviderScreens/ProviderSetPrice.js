import React, { useState,useContext } from 'react';
import { View, StyleSheet, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';

const ProviderSetPrice = (props) => {
    const { ServiceDataInfo, setServiceDataInfo, ServId } = useContext(SearchContext);
    const [price, setPrice] = useState();

    let serviceIndex = ServiceDataInfo.findIndex(ser => ser.service_id === ServId)

    const onPublishPress = () => {
        let service = ServiceDataInfo;
        if (serviceIndex != -1) {
            service[serviceIndex].servicePice = price;
        }
        setServiceDataInfo([...service])
        console.log(ServiceDataInfo);
    }

    const onAddSerPress = () => {
        props.navigation.navigate(ScreenNames.ProviderAddServiceDetail, { data: { ...props } });
    }
    const onBackPress = () => {
        props.navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>ما هو السعر المبدئي؟</Text>
            </View>
            <View style={styles.body}>
                <TextInput
                    style={styles.titleInput}
                    keyboardType='numeric'
                    maxLength={5}
                    onChangeText={(value) => { setPrice(value) }}
                />
                <View  style={{ borderWidth:2, borderColor: '#dcdcdc', marginTop: 50, width: '90%',borderRadius: 15, }}>
                    <Text style={styles.descText}>اذا كان لديك عدة خدمات يتم تزويدها للزبائن واعتمادا عليها يتم تحديد السعر يمكنك اضافة هذة الخدمات والتفاصيل التي تحتويها كل خدمة تزودها </Text>

                    <TouchableOpacity style={styles.AddButton}
                    onPress={onAddSerPress}
                    //activeOpacity={0.2} underlayColor={supmeted ? 'white' : 'gray'}
                    >
                        <AntDesign
                            name='plussquareo'
                            style={{ fontSize: 30, alignSelf: 'center', marginRight: 30 }}
                        />
                        <Text style={styles.footText}>أضافة تفاصيل الخدمات</Text>
                        <FontAwesome5
                            name='less-than'
                            style={{ fontSize: 20, alignSelf: 'center', marginLeft: 30 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.back} onPress={onBackPress}>
                    <Text style={styles.backText}>رجوع</Text>
                </Pressable>
                <Pressable style={styles.next} onPress={onPublishPress}>
                    <Text style={styles.nextText}>حفظ ونشر</Text>
                </Pressable>

            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 40,
        marginBottom: 10,
    },
    headText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    body: {
        height: '75%',
        marginTop: 20,
        alignItems: 'center'
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
    },
    next: {
        width: 90,
        height: 40,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    backText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    titleInput: {
        textAlign: 'right',
        height: 50,
        width: '90%',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
    },
    AddButton: {
        flexDirection: 'row-reverse',
        width: '100%',
        height: 60,
        justifyContent: 'space-between',
        marginTop: 50,
    },
    footText: {
        fontSize: 18,
        color: 'black',
        alignSelf: 'center',
        marginLeft: 60,
    },
    descText: {
        marginTop: 10,
        fontSize: 20,
        color: 'black',
        marginLeft: 20,
        marginRight: 20,
    },
})

export default ProviderSetPrice;