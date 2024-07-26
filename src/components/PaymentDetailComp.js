import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../assets/AppColors';
import { updateRequest } from '../resources/API';
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


const PaymentDetailComp = (props) => {

    const { setRequestInfoByService, requestInfoByService } = useContext(SearchContext);
    const [paymentDataArray, setPaymentDataArray] = useState([])
    const { reqInfo, setShowPaymentModal } = props

    var payId = uuidv4();

    // console.log("requestInfoByService", requestInfoByService);
    // console.log("reqInfo", reqInfo);



    const updateData = () => {
        const requestInfoAccServiceIndex = requestInfoByService?.findIndex(item => item.requestInfo.RequestId === reqInfo.requestInfo.RequestId)

        const newData = {
            RequestId: reqInfo.requestInfo.RequestId,
            ReqStatus: 'waiting pay',
            paymentInfo: paymentDataArray
        }
        const result = checkSumPersentage()
        console.log("result", result);
        if (result < 100) {
            updateRequest(newData).then(res => {

                if (res.message == "Updated Sucessfuly") {
                    const data = requestInfoByService || [];
                    if (requestInfoAccServiceIndex > -1) {
                        data[requestInfoAccServiceIndex] = { ...data[requestInfoAccServiceIndex], ...newData };
                    }
                    setRequestInfoByService([...data])

                    ToastAndroid.showWithGravity(
                        'تم التعديل بنجاح',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                    setShowPaymentModal(false)
                }
            })
        } else {
            ToastAndroid.showWithGravity(
                'مجموع نسب الدفعات اكثر من 100',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
        }

    }


    const addPaymentData = () => {
        setPaymentDataArray([...paymentDataArray, { empty: "empty" }])
    }

    const renderAddButton = () => {
        return (
            <Pressable style={styles.item} onPress={addPaymentData}
            >
                <Text style={styles.basicInfo}>اضافة تفاصيل دفعة</Text>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"plus"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        )
    }


    const checkSumPersentage = () => {
        var sumPers = 0
        console.log("paymentDataArray", paymentDataArray);
        paymentDataArray.forEach(element => {
            sumPers += element.pers
        });
        return sumPers
    }

    const renderPaymentFeilds = () => {
        const fields = paymentDataArray?.map((val, index) =>
            <PaymentComponent val={val} index={index} />
        )
        return fields
    }


    const updateArray = (data, index) => {
        setPaymentDataArray(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = data;
            return newArray;
        });
    };

    const removePaymentItem = (index) => {
        const newArray = [...paymentDataArray];
        newArray.splice(index, 1);
        setPaymentDataArray(newArray);
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

        useEffect(() => {
            if (props.val) {
                setPaymentDate(props?.val?.PayDate)
                setPersentage(props?.val?.pers)
            }
        }, [])

        return (
            <View key={props?.index} style={styles.mediaItem}>

                <View style={styles.mediaList}>
                    <Pressable onPress={() => removePaymentItem(index)} style={{ width: '10%', padding: 5, alignItems: 'center' }}
                    >
                        <FontAwesome name="remove" size={15} />
                    </Pressable>

                </View>
                <View>
                    <Pressable onPress={() => showMode('date')} >
                        <View style={styles.viewDate}>
                            <View style={{ width: '80%', alignItems: 'center' }}>
                                <Text style={styles.datetxt}>{paymentDate || "تاريخ الدفعة"}</Text>
                            </View>
                            <Entypo
                                name='calendar'
                                style={{ fontSize: 30, color: colors.puprble, paddingRight: 10 }}
                            />
                        </View>
                    </Pressable>
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
                        // onChangeText={(val) => setAmount(val)}
                        // onEndEditing={(val) => calculatePersentageFromAmount(val.nativeEvent.text)}
                    />

                    <View style={styles.inputPersentageView}>
                        <TextInput style={{ fontSize: 18 }}
                            keyboardType={'numeric'}
                            placeholder={'النسبة'}
                            value={persentage}
                            //onChangeText={setPersentage}

                             onChangeText={(val) => setPersentage(parseInt(val))}

                            onEndEditing={(val) => {
                                //  calculateAmountFromPersentage(val.nativeEvent.text)
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

    const renderSaveButton = () => {
        return (
            <Pressable style={styles.footer} onPress={updateData}>
                <Text style={styles.text}>حفظ</Text>
            </Pressable>
        )
    }
    const seperator = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: colors.silver, marginTop: 10 }}></View>
        )
    }

    const renderRequestDetail = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.text}>{"حتى تاريخ  " + reqInfo.requestInfo.reservationDetail[0].reservationDate}</Text>
                <Text style={styles.text}>{"المبلغ  " + reqInfo.requestInfo.Cost}</Text>
            </View>
        )
    }

    return (
        <View style={styles.comp}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {renderSaveButton()}
                <Text style={styles.text}>تحديد عدد الدفعات </Text>
            </View>
            {seperator()}
            {renderRequestDetail()}
            {renderAddButton()}

            <ScrollView>
                {renderPaymentFeilds()}
            </ScrollView>

        </View>
    )
}

export default PaymentDetailComp

const styles = StyleSheet.create({
    comp: {
        padding: 20
        // backgroundColor: 'red'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 20
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    mediaItem: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 8,
        borderColor: colors.silver,
        marginVertical: 10
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
        height: 50,
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
    text: {
        fontSize: 18,
        color: colors.puprble
    },
    footer: {
        borderWidth: 1,
        borderColor: colors.puprble,
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    }
})