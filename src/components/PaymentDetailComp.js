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
    
    const { setRequestInfoByService } = useContext(SearchContext);
    const [paymentDataArray, setPaymentDataArray] = useState([])
    const { reqInfo, setShowPaymentModal } = props

    var payId = uuidv4();

    const updateData = () => {
        const newData = {
            RequestId: reqInfo.requestInfo.RequestId,
            ReqStatus: 'waiting pay',
            paymentInfo: paymentDataArray
        }
        updateRequest(newData).then(res => {
            //console.log("res.message", res.message);
            if (res.message == "Updated Sucessfuly") {
                setRequestInfoByService([...newData])

                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
                setShowPaymentModal(false)
            }
        })
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

        
        const index = props.index

        const [date, setDate] = useState(new Date());
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);

        const onChange = (event, selectedDate) => {
            setShow(false)
            const currentDate = selectedDate || date;
            setDate(currentDate);

            let tempDate = new Date(currentDate);
            let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();

            const data = {
                id : payId,
                PayDate: fDate,
                pers: persentage,
                paymentStutes: 'not paid'
            }
            updateArray(data, index)

            setPaymentDate(fDate);
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
                        keyboardType={'default'}
                        placeholder={'النسبة'}
                        value={persentage}
                        onChangeText={(val) => setPersentage(val)}
                        onEndEditing={() => {
                            const data = {
                                id : payId,
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
        )
    }

    const renderSaveButton = () => {
        return (
            <Pressable style={styles.footer} onPress={updateData}
            >
                <Text style={styles.text}>حفظ</Text>
            </Pressable>
        )
    }
    const seperator = () => {
        return (
            <View style={{ borderBottomWidth: 1, borderColor: colors.silver, marginTop: 10 }}></View>
        )
    }

    return (
        <View style={styles.comp}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center' }}>
                {renderSaveButton()}
                <Text style={styles.text}>تحديد عدد الدفعات </Text>
            </View>
            {seperator()}
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
    input: {
        fontSize: 18
    },
    inputView: {
        flexDirection: 'row',
        height: 50,
        width: '95%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: colors.silver,
        justifyContent: 'center',
        alignSelf: 'center',
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