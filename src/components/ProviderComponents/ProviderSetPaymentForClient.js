import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from "react-native-vector-icons/Entypo"
import { colors } from '../../assets/AppColors'
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { v4 as uuidv4 } from 'uuid';


const ProviderSetPaymentForClient = ({ paymentPolicy, totalPrice, date }) => {

    const [paymentDataArray, setPaymentDataArray] = useState([])
    const [creditCard, setCreditCard] = useState(false)
    const [cash, setCash] = useState(false)
    const [checks, setChecks] = useState(false)
    const [initialPaymentAmount, setInitialPaymentAmount] = useState(0);
    const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);

    var payId = uuidv4();

    const [continuePay, setContinuePay] = useState(false)

    useEffect(() => {
        calculateInitialPaymentAmount();
    }, [paymentPolicy, totalPrice]);

    const calculateInitialPaymentAmount = () => {
        let initialAmount = 0;
        switch (paymentPolicy) {
            case 'pre':
                initialAmount = totalPrice;
                break;
            case 'prePost':
                initialAmount = totalPrice;
                break;
            case 'post':
                initialAmount = 0;
                break;
            default:
                initialAmount = 0;
        }
        setInitialPaymentAmount(initialAmount);
    };

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
        return paymentDataArray.map((val, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    setSelectedPaymentIndex(index)
                    setContinuePay(true)
                }}
                style={selectedPaymentIndex === index ? styles.selectedMediaItem : styles.mediaItem}>
                <PaymentComponent
                    val={val}
                    index={index}
                    updateArray={updateArray}
                />
            </TouchableOpacity>
        ));
    };
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


        const [paymentDate, setPaymentDate] = useState(props?.val?.PayDate || null)
        const [persentage, setPersentage] = useState(props?.val?.pers || null)
        const [amount, setAmount] = useState(props?.val?.amount || null)

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
            const ReqPrice = totalPrice;
            const currentTotal = checkSumPersentage() - paymentDataArray[index]?.pers;

            const maxAllowed = 100 - currentTotal;

            let adjustedPers = pers;

            if (currentTotal + parseFloat(pers) > 100) {
                adjustedPers = maxAllowed;
            }

            const fact = ReqPrice * adjustedPers;
            const realAmount = fact / 100;
            const newPersentage = parseInt(adjustedPers)?.toFixed(1).toString() || '0';
            const newAmount = realAmount?.toFixed(1).toString() || '0';

            setPersentage(newPersentage);
            setAmount(newAmount);

            updateArray(
                {
                    id: payId,
                    PayDate: paymentDate,
                    pers: newPersentage,
                    paymentStutes: 'not paid',
                    amount: newAmount
                },
                index
            );
        };
        const calculatePersentageFromAmount = (amou) => {
            const ReqPrice = totalPrice;
            const currentTotalPercentage = checkSumPersentage() - parseFloat(paymentDataArray[index]?.pers || 0);

            const maxAllowedPercentage = 100 - currentTotalPercentage;
            const maxAllowedAmount = (ReqPrice * maxAllowedPercentage) / 100;

            let adjustedAmount = amou;

            if (amou > maxAllowedAmount) {
                adjustedAmount = maxAllowedAmount;
            }

            const value = adjustedAmount / ReqPrice;
            const pers = value * 100;
            const newAmount = parseInt(adjustedAmount)?.toFixed(1).toString() || '0';
            const newPersentage = pers?.toFixed(1).toString() || '0';

            setAmount(newAmount);
            setPersentage(newPersentage);

            updateArray(
                {
                    id: payId,
                    PayDate: paymentDate,
                    pers: newPersentage,
                    paymentStutes: 'not paid',
                    amount: newAmount
                },
                index
            );
        };

        const onChange = (event, selectedDate) => {
            setShow(false);
            const chosenDate = selectedDate || date;

            // Check the policy conditions
            if (paymentPolicy === 'pre' && chosenDate >= eventDate) {
                showMessage('التاريخ يجب ان يكون قبل تاريخ الحدث نظرا لسياسة الدفع المسبق');
                return;
            }
            // Set the valid date
            setDate(chosenDate);
            setPaymentDate(chosenDate.toISOString().split('T')[0]);

            const data = {
                id: payId,
                PayDate: chosenDate.toISOString().split('T')[0],
                pers: persentage,
                amount: amount,
                paymentStutes: 'not paid'
            };
            updateArray(data, index);
        };
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
                            onChangeText={setPersentage}
                            onEndEditing={(val) => calculateAmountFromPersentage(val.nativeEvent.text)}
                        />
                        <Text style={styles.text}>%</Text>
                    </View>

                </View>
            </View>
        )
    }

    const renderPaymentPolicyText = () => {
        switch (paymentPolicy) {
            case 'pre':
                return <Text style={styles.policyText}>الدفعة الكاملة مطلوبة قبل الخدمة.</Text>;
            case 'prePost':
                return <Text style={styles.policyText}>دفعة أولى مطلوبة قبل الخدمة، مع دفعة نهائية بعد الخدمة.</Text>;
            case 'post':
                return <Text style={styles.policyText}>الدفع مطلوب بالكامل بعد الخدمة.</Text>;
            default:
                return null;
        }
    };
    const renderRequestDetail = () => {

        return (
            <View style={styles.reqInfoView}>
                <View style={{ height: '50%' }}>
                    <Text style={styles.addTxt}>{"الدفعةالاولى قبل تاريخ  " + date}</Text>
                </View>
                <View style={styles.amount}>
                    <Text style={styles.addTxt}>{"₪" + (totalPrice)}</Text>
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

    const checkSumPersentage = () => {
        let sumPers = 0;

        paymentDataArray.forEach((element, index) => {
            const percentage = parseFloat(element.pers);
            if (!isNaN(percentage)) {
                console.log(index + 1, "percentage", percentage);

                sumPers += percentage;
            }
        });

        return sumPers;
    };

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
        if (selectedPaymentIndex !== null) {
            const selectedPayment = paymentDataArray[selectedPaymentIndex];
            return (
                <View style={styles.amountView}>
                    <Text style={styles.amountTxt}>{selectedPayment.amount || 0}</Text>
                </View>
            );
        }
        return null;
    };
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
                {continuePay && renderPayAmount()}
                {continuePay && creatPaymentProviderSide()}
                {continuePay && renderPayButton()}
            </View>
        )
    }

    return (
        <View>
            <ScrollView>
                {renderPaymentPolicyText()}
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
    selectedMediaItem: {
        borderWidth: 2,
        borderColor: colors.puprble,
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
    },
    methodText: {
        fontSize: 18,
        color: colors.puprble
    }

})