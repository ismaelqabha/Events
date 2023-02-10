import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable, Text, TextInput, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';
import { regionData } from '../../resources/data';

const ProviderAddInfo = (props) => {
    const { ServiceDataInfo, setServiceDataInfo, ServId } = useContext(SearchContext);
    const [serviceAddress, setserviceAddress] = useState('')
    const [serviceRegion, setserviceRegion] = useState('')
    const [title, setTitle] = useState();
    const [SuTitle, setSuTitle] = useState();
    const [description, setDescription] = useState();

    let serviceIndex = ServiceDataInfo.findIndex(ser => ser.service_id === ServId)
    let serviceObj = ServiceDataInfo[serviceIndex];

    const onBackPress = () => {
        props.navigation.goBack()
    }
    const onNextPress = () => {
        let service = ServiceDataInfo;

        if (serviceIndex != -1) {
            service[serviceIndex].region = serviceRegion;
            service[serviceIndex].address = serviceAddress;
            service[serviceIndex].title = title;
            service[serviceIndex].subTitle = SuTitle;
            service[serviceIndex].desc = description;
        }

        setServiceDataInfo([...service])
        console.log(ServiceDataInfo);
        props.navigation.navigate(ScreenNames.ProviderSetPhotos, { data: { ...props } });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>املئ التفاصيل التالية:</Text>
            </View>
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.borderTitleView}>
                        <Text style={styles.headText}> عنوان الخدمة خاصتك؟</Text>
                        <Text style={styles.text}>العنوان</Text>
                        <TextInput
                            style={styles.titleInput}
                            keyboardType='default'
                            maxLength={60}
                            onChangeText={(value) => { setTitle(value) }}
                        />
                        <Text style={styles.text}>العنوان الفرعي</Text>
                        <TextInput
                            style={styles.subtitleInput}
                            keyboardType='default'
                            maxLength={150}
                            multiline
                            onChangeText={(value) => { setSuTitle(value) }}
                        />
                        <Text style={styles.text}> الوصف </Text>
                        <TextInput
                            style={styles.descInput}
                            keyboardType='default'
                            maxLength={300}
                            multiline
                            onChangeText={(value) => { setDescription(value) }}
                        />
                    </View>
                    <View style={styles.borderAddressView}>
                        <Text style={styles.headText}>قم بأضافة تفاصيل الموقع :</Text>
                        <SelectList
                            data={regionData}
                            setSelected={(val => {
                                let cityObj = regionData.find(city => city.key == val);
                                setserviceRegion(cityObj.value)
                            })}
                            placeholder={serviceRegion || 'أختر المنطقة'}
                            boxStyles={styles.dropdown}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                        <TextInput
                            style={styles.input}
                            keyboardType='default'
                            placeholder='المدينة'
                            onChangeText={(value) => setserviceAddress(value)}
                        //value={serviceObj.address}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.back} onPress={onBackPress}>
                    <Text style={styles.backText}>رجوع</Text>
                </Pressable>
                <Pressable style={styles.next} onPress={onNextPress}>
                    <Text style={styles.nextText}>التالي</Text>
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
        marginTop: 20,
        marginBottom: 10,
    },
    headText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    body: {
        height: '75%',
        marginTop: 30,
        alignItems: 'center',
    },
    borderTitleView:{
        height: 500,
        width: 340,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 15,
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
    },
    borderAddressView: {
        height: 250,
        width: 340,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 15,
        marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
    },
    next: {
        width: 70,
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
    dropdown: {
        height: 50,
        width: 300,
        fontSize: 17,
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 30,
    },
    dropstyle: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: '90%',
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#dcdcdc',
        marginTop: 30,
        marginBottom: 30,

    },
    text: {
        textAlign: 'right',
        fontSize: 16,
        marginTop: 20,
        marginRight: 20,
        color: 'black'
    },
    titleInput: {
        textAlign: 'right',
        height: 50,
        width: 315,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
    },
    subtitleInput: {
        textAlign: 'right',
        height: 100,
        width: 315,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
    },
    descInput: {
        textAlign: 'right',
        height: 150,
        width: 315,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
    },
})

export default ProviderAddInfo;
