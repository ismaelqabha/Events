import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import ServiceCard from '../components/ServiceCard';
import { servicesCategory } from '../resources/data';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import MonthCom from '../components/MonthCom';
import { SelectList } from 'react-native-dropdown-select-list'
import AntDesign from "react-native-vector-icons/AntDesign";
import { getCities, getRegions } from '../resources/API';
import ClientCalender from '../components/ClientCalender';
import AddNewDates from '../components/AddNewDates';
import { colors } from '../assets/AppColors';


const ClientSearch = (props) => {
    const { isFromSearchServiceClick } = props.route?.params || {};
    const navigation = useNavigation();

    const {
        cityselected, setcityselected,
        regionselect, setregionselect,
        // setselectMonthforSearch, selectMonthforSearch,
        setselectDateforSearch, selectDateforSearch,
        Categorychozen, setCategorychozen,
        regionData, setRegionData
    } = useContext(SearchContext);

    // Determine which view is open
    const [isPressed, setIsPressed] = useState(true);
    const [dateViewPressed, setdateViewIsPressed] = useState(false);
    const [placeViewPressed, setplaceViewIsPressed] = useState(false);
    // Determine the date

    const [monthly, setMonthly] = useState(false)
    const [spacificDate, setspacificDate] = useState(true)
    // Determine the place

    const [citiesNames, setCitiesNames] = useState([])
    const [myriogen, setMyriogen] = useState(true)
    const [spacificPlace, setspacificPlace] = useState(false)

    const [selectServiceType, setSelectServiceType] = useState('');
    const [date, setDate] = useState(new Date());




    const onPressHandler = () => {
        setselectDateforSearch(null)
        // setselectMonthforSearch(null)
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
    const getRegionsfromApi = async () => {
        getRegions().then((res) => {
            setRegionData(res?.regions)
            fillCities(res?.regions)
            // console.log("res", res?.regions);
        }).catch((e) => {
            console.log("error fetching -> ", e);
        })
    }
    const fillCities = (regions) => {
        const allData = []
        regions?.forEach(region => {
            allData.push(...region.regionCities)
        });
        allData.sort()
        setCitiesNames(allData)
    }
    const renderRegion = () => {
        const region = regionData.map(item => {
            return item.regionName
        })
        return region.sort()
    }

    // Functions for determine the date

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
        setIsPressed(false)
        setdateViewIsPressed(true)
        setplaceViewIsPressed(false)
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
                isFromSearchServiceClick={isFromSearchServiceClick}
            />
        )
    };

    useEffect(() => {
        getRegionsfromApi()
        setcityselected("")
        setregionselect("")

        if (selectServiceType == '') {
            setCategorychozen(false)
        } else {
            setCategorychozen(true)
        }
    }, [])


    const showDate = () => {
        if (spacificDate) {
            return selectDateforSearch
        }
    }
    const showLocation = () => {

        if (myriogen) {
            return regionselect
        }
        if (spacificPlace) {
            return cityselected
        }
    }
    // Function for designing the screen
    const searchBar = () => {
        return (
            <View style={[styles.header, isPressed ? styles.header : styles.pressHeader]}>
                <TouchableOpacity onPress={categoryPress}>
                    <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                        {!isPressed && <Text style={styles.headerTextL}>{selectServiceType}</Text>}
                        <Text style={styles.headerTextR}>ما هي الخدمة ؟</Text>
                    </View>
                </TouchableOpacity>
                {isPressed &&
                    <View style={{ flex: 1 }}>
                        <Pressable
                            style={styles.search}
                            onPress={() => navigation.navigate(ScreenNames.SearchServcies)}
                        >
                            <View>
                                <Text style={styles.txt}>بحث </Text>
                            </View>
                            <AntDesign
                                style={styles.icon}
                                name={"search1"}
                                color={"gray"}
                                size={25} />
                        </Pressable>
                        <FlatList
                            data={Categoryquery()}
                            renderItem={renderCat}
                            horizontal={true}
                        />

                        <TouchableOpacity onPress={handlePress} style={styles.nextView}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.puprble }}>التالي</Text>
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
                    <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                        {!dateViewPressed &&
                            <Text style={styles.headerTextL}>{showDate()}</Text>}
                        <Text style={styles.headerTextR}>في أي تاريخ ؟</Text>
                    </View>
                </TouchableOpacity>
                {dateViewPressed &&
                    <View style={{ flex: 1 }}>
                        <View style={{ alignSelf: 'center' }}>
                            <ClientCalender />
                        </View>
                        <TouchableOpacity onPress={handlePress} style={styles.nextView}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.puprble }}>التالي</Text>
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
                    <View style={{ flexDirection: 'row', marginBottom: 50 }}>
                        {!placeViewPressed && <Text style={styles.headerTextL}>{showLocation()}</Text>}
                        <Text style={styles.headerTextR}>في أي مكان ؟</Text>
                    </View>
                </TouchableOpacity>
                {placeViewPressed &&
                    <View style={{ flex: 1 }}>
                        <View style={styles.choicesPView}>
                            <Pressable style={[styles.Dview, spacificPlace ? styles.PDviewPress : styles.Dview]} onPress={spacificPlacePress}>
                                <Text style={styles.te}>حسب المدينة</Text></Pressable>
                            <Pressable style={[styles.Dview, myriogen ? styles.PDviewPress : styles.Dview]} onPress={myriogenPress}>
                                <Text style={styles.te}>حسب المنطقة</Text></Pressable>
                        </View>
                        <View style={styles.insideView}>
                            {myriogen &&
                                <SelectList
                                    setSelected={(val) => setregionselect(val)}
                                    data={renderRegion()}
                                    save="value"
                                    placeholder='اختر المنطقة'
                                    boxStyles={styles.dropdown}
                                    inputStyles={styles.droptext}
                                    dropdownTextStyles={styles.dropstyle}
                                />
                            }
                            {spacificPlace &&
                                <SelectList
                                    setSelected={(val) =>
                                        setcityselected(val)
                                    }
                                    data={citiesNames}
                                    save="value"
                                    // onSelect={() => console.log(select)}
                                    placeholder='اختر المدينة'
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
                <Pressable onPress={onPressHandler}>
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


            <View style={{ backgroundColor: 'transparent', width: '100%', height: 60, position: 'absolute', bottom: 0 }}>
                <TouchableOpacity onPress={onBtnSearchPress}
                    disabled={Categorychozen ? false : true}
                    style={[styles.searchbutton, Categorychozen ? styles.searchbutton : styles.searchbuttonWithoutSelect]}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.puprble }}>أبحث</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BGScereen,
    },
    title: {
        flexDirection: 'row',
        marginLeft: 20,
        height: 40,
        alignItems: 'center'
    },
    icon: {
        justifyContent: 'flex-start'
    },
    header: {
        width: '90%',
        height: 350,
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 8,

    },
    pressHeader: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 8,
    },
    dateView: {
        width: '90%',
        height: 550,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8,
        margin: 5,
        alignSelf: 'center',
    },
    pressDateView: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
        alignSelf: 'center',
    },
    placeView: {
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8,
        margin: 5,
        alignSelf: 'center'
    },
    pressplaceView: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8,
        margin: 5,
        alignSelf: 'center'
    },
    icon: {
        marginRight: 10
    },
    headerText: {

    },
    headerTextR: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        color: colors.TitleFont
    },
    headerTextL: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        color: colors.puprble,
        height: 25,
    },


    search: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: 50,
        width: '90%',
        fontSize: 18,
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 20,
        justifyContent: 'flex-end',
        backgroundColor: '#ffff',
        elevation: 5,
        marginBottom: 20,
    },
    // img: {
    //     width: 30,
    //     height: 30,
    //     marginLeft: 7,
    // },
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 20,
        color: 'gray'
    },
    nextView: {
        height: 30,
        width: 80,
        borderRadius: 5,
        //backgroundColor: colors.puprble,
        borderWidth: 2,
        borderColor: colors.puprble,
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
        borderWidth: 2,
        borderColor: colors.puprble,
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
        backgroundColor: colors.puprble,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        opacity: 0.3
    },
    // choicesView: {
    //     flexDirection: 'row',
    //     alignSelf: 'center',
    //     backgroundColor: colors.puprble,
    //     width: 220,
    //     height: 40,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: 35
    // },
    choicesPView: {
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: colors.puprble,
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35
    },
    Dview: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 40,
        backgroundColor: colors.puprble,
        borderRadius: 35,
        //elevation: 5,
        margin: 5
    },
    DviewPress: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 40,
        backgroundColor: colors.gold,
        borderRadius: 35,
        elevation: 5,
        margin: 5
    },
    PDviewPress: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 40,
        backgroundColor: colors.gold,
        borderRadius: 35,
        elevation: 5,
        margin: 5
    },
    te: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    insideView: {
        justifyContent: 'center',
        alignItems: 'center',
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
