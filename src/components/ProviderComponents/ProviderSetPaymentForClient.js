import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import { colors } from '../../assets/AppColors'
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import moment from "moment";

const ProviderSetPaymentForClient = () => {

    const [paymentDataArray, setPaymentDataArray] = useState([])
    const [creditCard, setCreditCard] = useState(false)
    const [cash, setCash] = useState(false)
    const [checks, setChecks] = useState(false)

    const [continuePay, setContinuePay] = useState(false)

    const renderAddButton = () => {
        return (
            <TouchableOpacity style={styles.item} onPress={addPaymentData}
            >
                <Text style={styles.addTxt}>اضافة تفاصيل دفعة</Text>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"plus"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </TouchableOpacity>
        )
    }

    /// determine number of payment section
    
    const addPaymentData = () => {
        setPaymentDataArray([...paymentDataArray, { empty: "empty" }])
    }
    const renderPaymentFeilds = () => {
        const fields = paymentDataArray?.map((val, index) =>
            <PaymentComponent val={val} index={index} />
        )
        return fields
    }
    const removePaymentItem = (index) => {
        const newArray = [...paymentDataArray];
        newArray.splice(index, 1);
        setPaymentDataArray(newArray);
    };
    const updateArray = (data, index) => {
        setPaymentDataArray(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = data;
            return newArray;
        });
    };
    const PaymentComponent = (props) => {
        const [paymentDate, setPaymentDate] = useState(null)
        const [persentage, setPersentage] = useState(null)
        const [amount, setAmount] = useState(null)


        const index = props.index

        const [date, setDate] = useState(new Date());
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);

        var payDate
        var todayDate = new Date();

        todayDate.setHours(0);
        todayDate.setMinutes(0);
        todayDate.setSeconds(0);
        todayDate.setMilliseconds(0);


        const calculateAmountFromPersentage = (pers) => {
            const ReqPrice = reqInfo.requestInfo.Cost
            // console.log(">>", pers);
            if (pers < 100) {

                const fact = ReqPrice * pers
                const realAmount = fact / 100
                setAmount(realAmount?.toFixed(1).toString() || '0')
                setPersentage(parseInt(pers)?.toFixed(1).toString() || '0')
            } else {
                console.log("persentage is more than 100%");
            }
        }
        const calculatePersentageFromAmount = (amou) => {
            const ReqPrice = reqInfo.requestInfo.Cost
            if (amou < ReqPrice) {
                const value = amou / ReqPrice
                const pers = value * 100
                setAmount(parseInt(amou)?.toFixed(1).toString() || '0')
                setPersentage(pers?.toFixed(1).toString() || '0')
            } else {
                console.log("amount is more than Total Cost");
            }

        }

        const onChange = (event, selectedDate) => {
            setShow(false)
            const currentDate = selectedDate || date;
            setDate(currentDate);

            let tempDate = new Date(currentDate);
            let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
            let cuurentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            payDate = new Date(fDate)

            if (payDate > todayDate) {
                const data = {
                    id: payId,
                    PayDate: fDate,
                    pers: persentage,
                    paymentStutes: 'not paid'
                }
                updateArray(data, index)

                setPaymentDate(fDate);
            } else {
                console.log("date not coorect");
                setPaymentDate(cuurentDate);
            }


        }
        const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
        }
        // console.log("props.val", props.val);
        useEffect(() => {
            if (props.val) {
                setPaymentDate(props?.val?.PayDate)
                setPersentage(props?.val?.pers)
            }
        }, [])

        return (
            <View key={props?.index} style={styles.mediaItem}>

                <View style={styles.mediaList}>
                    <TouchableOpacity onPress={() => removePaymentItem(index)} style={{ width: '10%', padding: 5, alignItems: 'center' }}
                    >
                        <FontAwesome name="remove" size={15} />
                    </TouchableOpacity>

                </View>
                <View>
                    <TouchableOpacity onPress={() => showMode('date')} >
                        <View style={styles.viewDate}>
                            <View style={{ width: '80%', alignItems: 'center' }}>
                                <Text style={styles.datetxt}>{paymentDate || "تاريخ الدفعة"}</Text>
                            </View>
                            <Entypo
                                name='calendar'
                                style={{ fontSize: 30, color: colors.puprble, paddingRight: 10 }}
                            />
                        </View>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='spinner'
                            onChange={onChange}
                        />
                    )}
                </View>

                <View style={styles.inputView}>

                    <TextInput style={styles.input}
                        keyboardType={'numeric'}
                        placeholder={'الدفعة'}
                        value={amount}
                        onChangeText={setAmount}
                        //onChangeText={(val) => setAmount(val)}
                        onEndEditing={(val) => calculatePersentageFromAmount(val.nativeEvent.text)}
                    />

                    <View style={styles.inputPersentageView}>
                        <TextInput style={{ fontSize: 18 }}
                            keyboardType={'numeric'}
                            placeholder={'النسبة'}
                            value={persentage}
                            //onChangeText={setPersentage}

                            onChangeText={(val) => setPersentage(parseInt(val))}

                            onEndEditing={(val) => {
                                calculateAmountFromPersentage(val.nativeEvent.text)
                                const data = {
                                    id: payId,
                                    PayDate: paymentDate,
                                    pers: persentage,
                                    paymentStutes: 'not paid'
                                }
                                updateArray(data, index)

                            }}
                        />
                        <Text style={styles.text}>%</Text>
                    </View>

                </View>
            </View>
        )
    }
    const renderRequestDetail = () => {

        return (
            <View style={styles.reqInfoView}>
                <View style={{ height: '50%' }}>
                    <Text style={styles.addTxt}>{"الدفعةالاولى قبل تاريخ  " + '2025/8/20'}</Text>
                </View>
                <View style={styles.amount}>
                    <Text style={styles.addTxt}>{"₪" + "10000"}</Text>
                </View>
            </View>
        )
    }

    const determineNumOfPayment = () => {
        return (
            <View style={styles.paymentQuntView}>
                <View style={styles.titleItem}>
                    {renderRequestDetail()}
                </View>

                {renderPaymentFeilds()}
                {renderAddButton()}
            </View>
        )
    }
    /// make payment section

    const creditCardPress = () => {
        setCreditCard(true)
        setCash(false)
        setChecks(false)
        // setpaymentMethod('Credit Card')

    }
    const cashPress = () => {
        setCreditCard(false)
        setCash(true)
        setChecks(false)
        // setpaymentMethod('Cash')
    }
    const checksPress = () => {
        setCreditCard(false)
        setCash(false)
        setChecks(true)
        // setpaymentMethod('Checks')
    }

    const renderPayAmount = () => {
        return (
            <View style={styles.amountView}>
                <Text style={styles.amountTxt}>15000</Text>
            </View>
        )
    }
    const renderContinueButton = () => {
        return (
            <TouchableOpacity style={styles.continueButton} onPress={() => setContinuePay(true)}
            >
                <Text style={styles.buttonText}>تحرير الدفعة</Text>
            </TouchableOpacity>
        )
    }
    const renderPayButton = () => {
        return (
            <TouchableOpacity style={styles.payView} //onPress={onPaymentPress}
            >
                <Text style={styles.buttonText}>تأكيد الدفع</Text>
            </TouchableOpacity>
        )
    }
    const creatPaymentProviderSide = () => {
        return (

            <View style={styles.payMethodView}>
                <TouchableOpacity style={[styles.methodItem, cash ? styles.methodItemPress : styles.methodItem]} onPress={cashPress}>
                    <Text style={styles.methodText}>كاش</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.methodItem, checks ? styles.methodItemPress : styles.methodItem]} onPress={checksPress}>
                    <Text style={styles.methodText}>شيكات</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.methodItem, creditCard ? styles.methodItemPress : styles.methodItem]} onPress={creditCardPress}>
                    <Text style={styles.methodText}>بطاقة ائتمان</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const makePayment = () => {
        return (
            <View style={styles.paymentQuntView}>
                {!continuePay && renderContinueButton()}
                {continuePay && renderPayAmount()}
                {continuePay && creatPaymentProviderSide()}
                {continuePay && renderPayButton()}
            </View>
        )
    }

    return (
        <View>
            <ScrollView>
                {determineNumOfPayment()}
                {makePayment()}
            </ScrollView>

        </View>
    )
}

export default ProviderSetPaymentForClient

const styles = StyleSheet.create({

    paymentQuntView: {
        width: '100%',
        marginVertical: 20,
        // borderWidth: 1
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginVertical: 5,
        borderWidth: 2,
        borderColor: colors.silver,
        width: '90%',
        borderRadius: 20
    },
    titleItem: {
        alignSelf: 'center',
        marginVertical: 5,
        width: '90%',
    },
    addTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    viewDate: {
        flexDirection: 'row',
        height: 50,
        width: '95%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: colors.silver,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginBottom: 20
    },
    datetxt: {
        fontSize: 18,
    },
    inputView: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    input: {
        height: 40,
        width: '45%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: colors.silver,
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center'
    },
    inputPersentageView: {
        flexDirection: 'row',
        height: 50,
        width: '45%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: colors.silver,
        justifyContent: 'center',
    },
    mediaItem: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 8,
        borderColor: colors.silver,
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center'
    },
    reqInfoView: {
        borderWidth: 2,
        borderColor: colors.silver,
        width: '100%',
        height: 100,
        padding: 10,
        marginVertical: 10
    },
    amount: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '50%',
    },
    amountView: {
        width: '80%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 0.6,
        borderColor: colors.silver,
        borderRadius: 5,
        marginVertical: 20
    },
    amountTxt: {
        fontSize: 20,
        color: colors.darkGold,
    },
    continueButton: {
        width: '90%',
        alignSelf: 'center',
        //  borderWidth:1,
    },
    payView: {
        width: '60%',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderColor: colors.silver,
        borderWidth: 3,
    },
    buttonText: {
        fontSize: 20,
        color: colors.puprble,
    },

    payMethodView: {
        width: '90%',
        height: 100,
        alignSelf: 'center',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    methodItem: {
        marginVertical: 5,
        width: '31%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gold,
        borderRadius: 10,
        elevation: 5
    },
    methodItemPress: {
        marginVertical: 5,
        width: '31%',
        height: 60,
        borderWidth: 3,
        borderColor: colors.puprble,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gold,
        borderRadius: 10,
        elevation: 5
    },
    methodText: {
        fontSize: 18,
        color: colors.puprble
    }

})