import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import ProviderSetClientForBooking from '../../components/ProviderComponents/ProviderSetClientForBooking';
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import ProviderSetPaymentForClient from '../../components/ProviderComponents/ProviderSetPaymentForClient';
import ProviderSetClientInfo from './ProviderSetClientInfo';


const ProviderSetNewBooking = (props) => {
    const { fulDate } = props.route?.params || {}
    const { isFirst } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);

    const [clientStatus, setClientStatus] = useState(true)
    const [bookStatus, setBookStatus] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState(false)

    const [client, setClient] = useState(true)
    const [booking, setBooking] = useState(false)
    const [payment, setPayment] = useState(false)



    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const findProviderInfo = () => {
        const data = serviceInfoAccorUser.filter(item => {
            return item.service_id === isFirst
        })
        return data
    }

    useEffect(() => {
       
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

 
    const renderClientInfo = () => {
        const data =  findProviderInfo()
        const providerClients = data[0].clients
        return (
            <View>
                <ProviderSetClientInfo providerClients={providerClients}/>
            </View>
        )
    }
    const renderBookingInfo = () => {
        const serviceData =  findProviderInfo()
        return (
            <ScrollView>
                <ProviderSetClientForBooking serviceData={serviceData} fulDate={fulDate} />
            </ScrollView>
        )
    }
    const renderPaymentDetail = () => {
        return (
            <View>
                <ProviderSetPaymentForClient />
            </View>
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
                {!payment && <TouchableOpacity style={styles.btnNext} onPress={nextPress}>
                    <Text style={styles.nextText}>التالي</Text>
                </TouchableOpacity>}
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
        </View >
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
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',

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
  
   
})