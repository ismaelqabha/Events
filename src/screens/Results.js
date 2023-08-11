import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Modal, Image, TextInput } from 'react-native';
import SearchContext from '../../store/SearchContext';
import HomeCards from '../components/HomeCards';
import Ionicons from "react-native-vector-icons/Ionicons";
import ModalFilterComp from '../components/ModalFilterComp';

import ProviderWorkRegionComp from '../components/ProviderWorkRegionComp';
import { regionData } from '../resources/data';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider'
import { SelectList } from 'react-native-dropdown-select-list'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { getCities } from '../resources/API';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';


const Results = (props) => {
    const { cat, ServiceDataInfo, showModal, setShowModal, town, setTown } = useContext(SearchContext);
    const [range, setRang] = useState('50');
    const [sliding, setSliding] = useState('Inactive');
    const [selected, setSelected] = useState("");
    const [select, setSelect] = useState([]);
    const [guestNum, setGuestNum] = useState()

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [DateText, setDateText] = useState('dd/mm/yyyy');
    const [TimeText, setTimeText] = useState('00:00');


    const data = [
        { key: '1', value: 'Mobiles' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers' },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]
    const regionData = [
        { key: '2', value: 'الجليل' },
        { key: '3', value: 'النقب ' },
        { key: '5', value: 'الساحل' },
        { key: '0', value: 'المثلث الشمالي' },
        { key: '1', value: 'المثلث الجنوبي' },
        { key: '4', value: 'الضفة الغربية' },
    ]

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
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const getCityFromApi = () => {
        getCities().then(res => {
            setTown(res)
        })
    }
    useEffect(() => {
        getCityFromApi()
    }, [])

    const renderCity = () => {
        const data = town;

        const cityName = data.map(Cname => {
            return Cname.city;
        });
        return cityName;
    };
    const renderRiegon = () => {
        const data = regionData;

        const regionName = data.map(Rname => {
            return Rname.city;
        });
        return regionName;
    };


    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const modalPress = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);;
    }

    const query = () => {
        if (!cat) {
            return ServiceDataInfo || [];
        }
        return ServiceDataInfo?.filter(nameItem => {
            return nameItem.serviceData.servType == cat;
        })
    }

    const renderCard = () => {
        const data = query();
        const cardsArray = data?.map(card => {
            return <HomeCards  {...card.serviceData}
                images={card?.serviceImages}
            />;
        });
        return cardsArray;
    };

    const query1 = () => {
        return regionData || [];
    }
    const renderCard1 = () => {
        const data = query1();
        const cardsArray = data.map(card => {
            return <ProviderWorkRegionComp  {...card} />;
        });
        return cardsArray;
    };



    const hallType = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* Num Of Guest */}
                <Text style={styles.bodyText}>كم عدد المدعوين المتوقع</Text>
                <View style={styles.insideView}>
                    <TextInput
                        style={styles.Capacityinput}
                        keyboardType="numeric"
                        placeholder='عدد المدعوين'
                        onChangeText={(value) => setGuestNum(value)}
                    />
                </View>
                {/* Hall Type */}
                <Text style={styles.bodyText}>ما هو نوع القاعة التي تبحث عنها </Text>
                <View style={styles.insideView}>
                    <View style={{ flexDirection: 'row', }}>
                        <Pressable style={styles.HallTypeView}><Text style={styles.TypeText}>قاعه خارجية</Text></Pressable>
                        <Pressable style={styles.HallTypeView}><Text style={styles.TypeText}>قاعه داخلية</Text></Pressable>
                        <Pressable style={styles.HallTypeView}><Text style={styles.TypeText}>مطعم</Text></Pressable>
                        <Pressable style={styles.HallTypeView}><Text style={styles.TypeText}>فندق</Text></Pressable>
                    </View>
                </View>
            </View>
        )
    }

    const priceComp = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.bodyText}>ما هو نطاق السعر المتوقع</Text>
                <View style={styles.insideView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{sliding}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{range}</Text>

                    </View>
                    <Slider
                        style={{ width: '100%', height: 40 }} s
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="tomato"
                        maximumTrackTintColor="#000000"
                        value={.5}
                        onValueChange={value => setRang(parseInt(value))}
                        onSlidingStart={() => setSliding('Slider')}
                        onSlidingComplete={() => setSliding('Inactive')}
                    />
                </View>
            </View>
        )
    }

    const addressComp = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.bodyText}>في أي مدينة او منطقة تبحث</Text>
                <View style={styles.insideView}>
                    <MultipleSelectList
                        setSelected={(val) => setSelected(val)}
                        data={renderCity()}
                        save="value"
                        placeholder='اختر المدينة'
                        boxStyles={styles.dropdown}
                        inputStyles={styles.droptext}
                        dropdownTextStyles={styles.dropstyle}
                    />
                    <SelectList
                        setSelected={(val) => setSelect(val)}
                        data={regionData}
                        save="value"
                        // onSelect={() => console.log(select)}
                        label="المناطق المختارة"
                        placeholder='اختر المنطقة'
                        boxStyles={styles.dropdown}
                        inputStyles={styles.droptext}
                        dropdownTextStyles={styles.dropstyle}
                    />
                </View>
            </View>
        )
    }

    const datePicker = () => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.bodyText}>ما هو تاريخ المناسبة المتوقع   </Text>
                <View style={styles.insideView}>
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
                                style={styles.icoon}
                                source={require('../assets/time.png')}
                            />
                        </View>
                    </Pressable>
                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                        />
                    )}
                </View>
            </View>
        )
    }

    const object = {
        قاعات: hallType(),
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}>
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Pressable onPress={() => modalPress()}>
                    <Image source={require('../assets/filter.png')} />
                </Pressable>
            </View>
            {renderCard()}

            <Modal
                transparent
                visible={showModal}
                animationType='slide'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.AllModal}>
                    <View style={styles.dModal}>
                        <View style={styles.Modaltitle}>
                            <Text style={styles.text}>...</Text>
                        </View>
                        <View style={styles.body}>
                            <ScrollView contentContainerStyle={styles.home}>
                                {/* Date & Time */}
                                {datePicker()}
                                {/* Price */}
                                {priceComp()}
                                {/* Address */}
                                {addressComp()}
                                {/* capacity */}

                                {/* Hall Type */}
                                {object[cat]}
                                {/* end pf hall type */}
                                <View style={styles.insideView}>

                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.searchButtonView}>
                            <Pressable onPress={() => closeModal()} style={styles.searchButton} >
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>مشاهدة النتائج</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '90%',
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 10
    },

    Ftext: {
        fontSize: 20,
    },
    bodyText: {
        fontSize: 18,
        color: 'black',
        marginBottom: 20
    },
    dModal: {
        width: "100%",
        height: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    AllModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Modaltitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        width: '100%',
        padding: 20,
    },
    insideView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        //elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    dropdown: {
        fontSize: 17,
        borderRadius: 8,
        width: 300,
        marginBottom: 20,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dropstyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    searchButtonView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        borderTopWidth: 1,
        borderColor: 'lightslategrey',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        backgroundColor: 'snow'
    },
    searchButton: {
        width: 150,
        height: 40,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    viewDate: {
        flexDirection: 'row',
        borderColor: '#808080',
        width: 300,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: 'mintcream',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
    },
    icoon: {
        width: 35,
        height: 35,
        marginLeft: 50
    },
    Capacityinput: {
        alignContent: 'center',
        textAlign: 'center',
        height: 50,
        width: 200,
        fontSize: 17,
        borderRadius: 8,
        fontWeight: 'bold',
        borderWidth: 1,
    },
    HallTypeView: {
        width: 50,
        height: 50,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5
    },
    TypeText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default Results;
