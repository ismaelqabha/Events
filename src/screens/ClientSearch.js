import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import ServiceCard from '../components/ServiceCard';
import { servicesCategory } from '../resources/data';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import MonthCom from '../components/MonthCom';
import { SelectList } from 'react-native-dropdown-select-list'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { getCities } from '../resources/API';
import ClientCalender from '../components/ClientCalender';
import AddNewDates from '../components/AddNewDates';


const ClientSearch = (props) => {
    const { town, setTown, setcityselected, setregionselect, setselectMonthforSearch, setselectDateforSearch
        , Categorychozen, setCategorychozen } = useContext(SearchContext);
    const navigation = useNavigation();
    // Determine which view is open
    const [isPressed, setIsPressed] = useState(true);
    const [dateViewPressed, setdateViewIsPressed] = useState(false);
    const [placeViewPressed, setplaceViewIsPressed] = useState(false);
    // Determine the date

    const [monthly, setMonthly] = useState(true)
    const [spacificDate, setspacificDate] = useState(false)
    // Determine the place

    const [myriogen, setMyriogen] = useState(true)
    const [spacificPlace, setspacificPlace] = useState(false)

    const [selectServiceType, setSelectServiceType] = useState('');
    const [date, setDate] = useState(new Date());




    const onPressHandler = () => {
        setselectDateforSearch(null)
        setselectMonthforSearch(null)
        props.navigation.goBack();
    }
    // Functions for determine the Place

    const myriogenPress = () => {
        setMyriogen(true)
        setspacificPlace(false)
    }
    const spacificPlacePress = () => {
        setMyriogen(false)
        setspacificPlace(true)
    }
    // Functions for determine the date

    const monthlyPress = () => {
        setMonthly(true)
        setspacificDate(false)
        setselectDateforSearch(null)
    }
    const spacificDatePress = () => {
        // setAnytime(false)
        setMonthly(false)
        setspacificDate(true)
        setselectMonthforSearch(null)
    }

    const handlePress = () => {
        if (isPressed == true && dateViewPressed == false && placeViewPressed == false) {

            setIsPressed(!isPressed)
            setdateViewIsPressed(!dateViewPressed)
            setplaceViewIsPressed(false)

        } else if (isPressed == false && dateViewPressed == true && placeViewPressed == false) {
            setIsPressed(false)
            setdateViewIsPressed(!dateViewPressed)
            setplaceViewIsPressed(!placeViewPressed)
        }
        else if (isPressed == false && dateViewPressed == false && placeViewPressed == true) {
            setIsPressed(!isPressed)
            setdateViewIsPressed(false)
            setplaceViewIsPressed(!placeViewPressed)
        }
    };
    // Screen Views Content
    const categoryPress = () => {
        setIsPressed(true)
        setdateViewIsPressed(false)
        setplaceViewIsPressed(false)
    }
    const calenderPress = () => {
        if (selectServiceType == '') {
            alert("الرجاء اختيار نوع الخدمة")
        } else {
            setIsPressed(false)
            setdateViewIsPressed(true)
            setplaceViewIsPressed(false)
        }
    }
    const placePress = () => {
        setIsPressed(false)
        setdateViewIsPressed(false)
        setplaceViewIsPressed(true)
    }


    const Categoryquery = () => {
        return servicesCategory || [];
    }
    const renderCat = ({ item }) => {
        return (
            <ServiceCard
                {...item}
                isChecked={item.titleCategory === selectServiceType}
                onCatPress={(value) => setSelectServiceType(value)}
            />
        )
    };

    const onChangeDate = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate()
        let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();

        // setDateText(fDate);
        // setTimeText(fTime);
        console.log(fDate);

    }

    const getCityFromApi = () => {
        getCities().then(res => {
            setTown(res)
        })
    }



    useEffect(() => {
        getCityFromApi()
        setcityselected("")
        setregionselect("")

        if (selectServiceType == '') {
            setCategorychozen(false)
        } else {
            setCategorychozen(true)
        }
    }, [])

    const renderCity = () => {
        const data = town;

        const cityName = data.map(Cname => {
            return Cname.city;
        });
        return cityName;
    };
    const regionData = [
        { key: '2', value: 'الجليل' },
        { key: '3', value: 'النقب ' },
        { key: '5', value: 'الساحل' },
        { key: '0', value: 'المثلث الشمالي' },
        { key: '1', value: 'المثلث الجنوبي' },
        { key: '4', value: 'الضفة الغربية' },
    ]

    // Function for designing the screen
    const searchBar = () => {
        return (
            <View style={[styles.header, isPressed ? styles.header : styles.pressHeader]}>
                <TouchableOpacity onPress={categoryPress}>
                    <Text style={styles.headerText}>ما هي الخدمة ؟</Text>
                </TouchableOpacity>
                {isPressed &&
                    <View style={{ flex: 1 }}>
                        <Pressable
                            style={styles.search}
                            onPress={() => navigation.navigate(ScreenNames.SearchServcies)}
                        >
                            <Image style={styles.img} source={require('../assets/search1.png')} />
                            <Text style={styles.txt}>بحث الخدمات</Text>
                        </Pressable>
                        <FlatList
                            data={Categoryquery()}
                            renderItem={renderCat}
                            horizontal={true}
                        />

                        <TouchableOpacity onPress={handlePress} style={styles.nextView}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>التالي</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

        )
    }
    const calenderRender = () => {
        return (
            <View style={[styles.dateView, dateViewPressed ? styles.dateView : styles.pressDateView]}>
                <TouchableOpacity onPress={calenderPress}>
                    <Text style={styles.headerText}>في أي تاريخ ؟</Text>
                </TouchableOpacity>
                {dateViewPressed &&
                    <View style={{ flex: 1 }}>
                        <View style={styles.choicesView}>
                            <Pressable style={[styles.Dview, monthly ? styles.DviewPress : styles.Dview]} onPress={monthlyPress}>
                                <Text style={styles.te}>حسب الشهر</Text>
                            </Pressable>
                            <Pressable style={[styles.Dview, spacificDate ? styles.DviewPress : styles.Dview]} onPress={spacificDatePress}>
                                <Text style={styles.te}>تاريخ محدد</Text>

                            </Pressable>
                        </View>
                        {monthly &&
                            <View style={{ alignSelf: 'center', marginTop: 80 }}>
                                <MonthCom onMonthSelected={(num) => setselectMonthforSearch(num)} />
                            </View>}
                        {spacificDate &&
                            <View style={{ alignSelf: 'center' }}>
                                <ClientCalender />
                            </View>
                        }
                        <TouchableOpacity onPress={handlePress} style={styles.nextView}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>التالي</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
    const placeRender = () => {
        return (
            <View style={[styles.placeView, placeViewPressed ? styles.placeView : styles.pressplaceView]}>
                <TouchableOpacity onPress={placePress}>
                    <Text style={styles.headerText}>في أي مكان ؟</Text>
                </TouchableOpacity>
                {placeViewPressed &&
                    <View style={{ flex: 1 }}>
                        <View style={styles.choicesPView}>
                            <Pressable style={[styles.Dview, spacificPlace ? styles.PDviewPress : styles.Dview]} onPress={spacificPlacePress}>
                                <Text style={styles.te}>حسب المنطقة</Text></Pressable>
                            <Pressable style={[styles.Dview, myriogen ? styles.PDviewPress : styles.Dview]} onPress={myriogenPress}>
                                <Text style={styles.te}>حسب المدينة</Text></Pressable>
                        </View>
                        <View style={styles.insideView}>
                            {myriogen &&
                                <SelectList
                                    setSelected={(val) => setcityselected(val)}
                                    data={renderCity()}
                                    save="value"
                                    placeholder='اختر المدينة'
                                    boxStyles={styles.dropdown}
                                    inputStyles={styles.droptext}
                                    dropdownTextStyles={styles.dropstyle}
                                />
                            }
                            {spacificPlace &&
                                <SelectList
                                    setSelected={(val) =>
                                        setregionselect(val)
                                    }
                                    data={regionData}
                                    save="value"
                                    // onSelect={() => console.log(select)}
                                    placeholder='اختر المنطقة'
                                    boxStyles={styles.dropdown}
                                    inputStyles={styles.droptext}
                                    dropdownTextStyles={styles.dropstyle}
                                />
                            }
                        </View>
                    </View>
                }
            </View>
        )
    }


    const onBtnSearchPress = () => {

        if (Categorychozen) {
            props.navigation.navigate(ScreenNames.Results, { data: { ...props } });
        }
    }


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
            {searchBar()}

            {calenderRender()}

            {placeRender()}


            <View style={{ backgroundColor: 'snow', width: '100%', height: 60, position: 'absolute', bottom: 0 }}>
                <TouchableOpacity onPress={onBtnSearchPress}
                    disabled={Categorychozen ? false : true}
                    style={[styles.searchbutton, Categorychozen ? styles.searchbutton : styles.searchbuttonWithoutSelect]}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>أبحث</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        flexDirection: 'row',
        margin: 20,
    },
    icon: {
        justifyContent: 'flex-start'
    },
    header: {
        width: '90%',
        height: 350,
        backgroundColor: 'snow',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 8,
        alignSelf: 'center',

    },
    pressHeader: {
        width: 350,
        height: 60,
        backgroundColor: 'snow',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 8,
        alignSelf: 'center'
    },
    dateView: {
        width: '90%',
        height: 490,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center',
    },
    pressDateView: {
        width: 350,
        height: 60,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center',
    },
    placeView: {
        width: '90%',
        height: 350,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center'
    },
    pressplaceView: {
        width: 350,
        height: 60,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center'
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        alignSelf: 'flex-end'

    },

    search: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: 50,
        width: 310,
        fontSize: 18,
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 20,
        justifyContent: 'space-between',
        backgroundColor: '#ffff',
        elevation: 5,
        marginBottom: 20,
        marginRight: 15,

    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 7,
    },
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 15,
        color: 'gray'
    },
    nextView: {
        height: 30,
        width: 80,
        borderRadius: 5,
        backgroundColor: '#ffff',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    searchbutton: {
        height: 40,
        width: 100,
        borderRadius: 5,
        backgroundColor: '#ffff',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    searchbuttonWithoutSelect: {
        height: 40,
        width: 100,
        borderRadius: 5,
        backgroundColor: '#ffff',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.3
    },
    choicesView: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#d3d3d3',
        width: 220,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35
    },
    choicesPView: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#d3d3d3',
        width: 210,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35
    },
    Dview: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 50,
        backgroundColor: '#d3d3d3',
        borderRadius: 35,
        //elevation: 5,
        margin: 5
    },
    DviewPress: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 35,
        elevation: 5,
        margin: 5
    },
    PDviewPress: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 35,
        elevation: 5,
        margin: 5
    },
    te: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    insideView: {
        justifyContent: 'center',
        alignItems: 'center',
        //marginBottom: 50,
        //borderWidth: 1,
        //elevation : 5,
        padding: 10,
        borderRadius: 8,
        margin: 30,

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
        textAlign: 'center',

    },
    dropstyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,

    },

})

export default ClientSearch;
