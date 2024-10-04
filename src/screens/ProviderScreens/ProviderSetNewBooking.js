import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import { SelectList } from 'react-native-dropdown-select-list';
import { getRegions } from '../../resources/API';
import UsersContext from '../../../store/UsersContext';
import { showMessage } from '../../resources/Functions';
import ProviderSetClientForBooking from '../../components/ProviderComponents/ProviderSetClientForBooking';
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';


const ProviderSetNewBooking = (props) => {

    const { userCity, setUserCity, setCreateUserRegion } = useContext(UsersContext);
    const { isFirst } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);

    const [clientStatus, setClientStatus] = useState(true)
    const [bookStatus, setBookStatus] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState(false)

    const [client, setClient] = useState(true)
    const [booking, setBooking] = useState(false)
    const [payment, setPayment] = useState(false)

    const [regionData, setRegionData] = useState([])
    const [regions, setRegions] = useState(null)
    const [serviceData, setServiceData] = useState([])

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const findProviderInfo = () => {
        const data = serviceInfoAccorUser.filter(item => {
            return item.service_id === isFirst
        })
        setServiceData(data)
        return data
    }

    useEffect(() => {
        getRegionsfromApi()
        findProviderInfo()
    }, [])

    
    const header = () => {
        return (
            <View style={styles.title}>
                <TouchableOpacity onPress={onPressHandler}>
                    <AntDesign
                        style={styles.iconback}
                        name={"left"}
                        color={"black"}
                        size={25} />
                </TouchableOpacity>
                <Text style={styles.titletxt}>اٍنشاء حجز</Text>
            </View>
        )
    }


    const renderHeadLines = () => {
        return (
            <View style={styles.head}>
                <View style={styles.headShape}>
                    <View style={[styles.circle, paymentStatus ? styles.circlePassed : styles.circle]}>
                        <Text style={[styles.numberTxt, paymentStatus ? styles.numberTxtPassed : styles.numberTxt]}>3</Text>
                    </View>

                    <View style={[styles.line, paymentStatus ? styles.linePassed : styles.line]}></View>
                    <View style={[styles.circle, bookStatus ? styles.circlePassed : styles.circle]}>
                        <Text style={[styles.numberTxt, bookStatus ? styles.numberTxtPassed : styles.numberTxt]}>2</Text>
                    </View>

                    <View style={[styles.line, bookStatus ? styles.linePassed : styles.line]}></View>
                    <View style={[styles.circle, clientStatus ? styles.circlePassed : styles.circle]}>
                        <Text style={[styles.numberTxt, clientStatus ? styles.numberTxtPassed : styles.numberTxt]}>1</Text>
                    </View>

                </View>
                <View style={styles.headTitle}>
                    <View style={styles.headItem}>
                        <Text style={[styles.headTxt, paymentStatus ? styles.headTxtSelected : styles.headTxt]}>الدفع</Text>
                    </View>
                    <View style={styles.headItem}>
                        <Text style={[styles.headTxt, bookStatus ? styles.headTxtSelected : styles.headTxt]}>تفاصيل الحجز</Text>
                    </View>
                    <View style={styles.headItem}>
                        <Text style={[styles.headTxt, clientStatus ? styles.headTxtSelected : styles.headTxt]}>معلومات الزبون</Text>
                    </View>
                </View>
            </View>
        )
    }
    const screenBody = () => {
        return (
            <View style={styles.body}>
                <View style={styles.bodyTitle}>
                    {client && <Text style={styles.nextText}>معلومات الزبون</Text>}
                    {booking && <Text style={styles.nextText}>تفاصيل الحجز</Text>}
                    {payment && <Text style={styles.nextText}>معلومات الدفع</Text>}
                </View>
                <View style={styles.bodyTaps}>
                    {client && renderClientInfo()}
                    {booking && renderBookingInfo()}
                    {payment && renderPaymentDetail()}
                </View>
            </View>
        )
    }

    const getRegionsfromApi = async () => {
        getRegions().then((res) => {
            res?.message ? showMessage(res.message) : updateData(res?.regions)
        }).catch((e) => {
            console.log("error fetching -> ", e);
        })

    }

    const updateData = (regions) => {
        setRegions(regions)
        const allData = []
        regions?.forEach(region => {
            allData.push(...region?.regionCities)
        });
        allData.sort()
        setRegionData(allData)
    }

    const searchRegion = (val) => {
        if (!regions) {
            return;
        } else {
            regions.forEach((region) => {
                var index = region?.regionCities?.findIndex(city => {
                    return city === val
                })
                if (!(index === -1)) {
                    setCreateUserRegion(region?.regionName)
                }
            })
        }
    }

    const renderClientInfo = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='اسم الزبون'
                    value={{}}
                    onChangeText={{}}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='رقم الهاتف'
                    value={{}}
                    onChangeText={{}} />

                <View style={styles.addressView}>
                    <SelectList
                        data={regionData}
                        setSelected={val => {
                            setUserCity(val);
                            searchRegion(val)
                        }}
                        placeholder={"أختر العنوان"}
                        boxStyles={styles.dropdown}
                        inputStyles={styles.droptext}
                        dropdownTextStyles={styles.dropstyle}
                    />
                </View>

            </View>
        )
    }
    const renderBookingInfo = () => {
        return (
            <ScrollView>
                  <ProviderSetClientForBooking serviceData={serviceData}/>
            </ScrollView>
        )
    }
    const renderPaymentDetail = () => {
        return (
            <View></View>
        )
    }

    const nextPress = () => {
        if (bookStatus) {
            setPaymentStatus(true)
            setClient(false)
            setBooking(false)
            setPayment(true)
        } else {
            setBookStatus(true)
            setClient(false)
            setBooking(true)
            setPayment(false)
        }
    }
    const backPress = () => {
        if (paymentStatus) {
            setPaymentStatus(false)
            setClient(false)
            setBooking(true)
            setPayment(false)
        } else {
            if (bookStatus) {
                setBookStatus(false)
                setClient(true)
                setBooking(false)
                setPayment(false)
            }
        }
    }

    const footer = () => {
        return (
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btnNext} onPress={nextPress}>
                    <Text style={styles.nextText}>التالي</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBack} onPress={backPress}>
                    <Text style={styles.backText}>رجوع</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {header()}
            {renderHeadLines()}
            {screenBody()}
            
            {footer()}
        </View>
    )
}

export default ProviderSetNewBooking

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    titletxt: {
        fontSize: 20,
        color: colors.puprble
    },
    headTitle: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-around',
        height: '50%',
        //   borderWidth: 1
    },
    headShape: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        // borderWidth: 1
    },
    head: {
        width: '90%',
        height: 100,
        alignSelf: 'center',
        marginVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.puprble,
    },
    body: {
        width: '100%',
        height: 500,
        alignSelf: 'center',
        // borderWidth: 1
    },
    bodyTitle: {
        width: '50%',
        height: 50,
        alignSelf: 'flex-end',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        marginRight: 20,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodyTaps: {
        width: '90%',
        // height: 450,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 5
    },
    headItem: {
        alignItems: 'center',
        width: '20%',
    },
    circle: {
        borderWidth: 2,
        width: '12%',
        height: '85%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.silver
    },
    circlePassed: {
        width: '12%',
        height: '85%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BGScereen
    },
    line: {
        borderWidth: 1,
        width: "22%",
        borderColor: colors.silver
    },
    linePassed: {
        borderWidth: 2,
        width: "22%",
        borderColor: colors.BGScereen
    },
    headTxt: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.silver
    },
    headTxtSelected: {
        fontSize: 15,
        color: colors.BGScereen,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    numberTxt: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.silver
    },
    numberTxtPassed: {
        fontSize: 15,
        textAlign: 'center',
        color: colors.puprble,
        fontWeight: 'bold',
    },
    btnView: {
        width: '90%',
        height: 60,
        alignSelf: 'center',
        // position: 'absolute',
        // bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //borderWidth: 1,
        // marginTop: 50
    },
    btnNext: {
        width: '50%',
        height: 40,
        backgroundColor: colors.silver,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    btnBack: {
        width: '20%',
        height: 40,
        backgroundColor: colors.silver,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    nextText: {
        fontSize: 18,
        color: colors.puprble
    },
    backText: {
        fontSize: 15,
        // color: colors.puprble,
        fontWeight: 'bold'
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1.5,
        borderColor: colors.silver,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    addressView: {
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    dropdown: {
       // height: 50,
        // maxWidth: '80%',
        // minWidth: '80%',
        // alignSelf: 'center',
        // backgroundColor: 'lightgray',
        // borderRadius: 10,
        textAlign: 'right',
        borderWidth: 1.5,
        borderColor: colors.silver,
    },
    dropstyle: {
        color: 'black',
        fontSize: 15,

    },
    droptext: {
        fontSize: 18,
        color: 'black',
    },
})