import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import Entypo from 'react-native-vector-icons/Entypo';
  import {colors} from '../../assets/AppColors';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import {v4 as uuidv4} from 'uuid';
  import {showMessage} from '../../resources/Functions';
  
  const ProviderSetPaymentForClient = ({
    paymentPolicy,
    totalPrice,
    date,
    serviceId,
    userId,
    resDetails,
    onPaymentDataChange // New callback prop
  }) => {
    const [paymentDataArray, setPaymentDataArray] = useState([]);
    const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false); 
    const [selectedMethod, setSelectedMethod] = useState(null); 
    const [continuePay, setContinuePay] = useState(false);
  
    // Convert the passed event date (string) into a Date object
    const eventDateObj = new Date(date);
    eventDateObj.setHours(0, 0, 0, 0);
  
    useEffect(() => {
      // Whenever paymentDataArray changes, check if it meets the conditions
      validatePaymentData();
    }, [paymentDataArray]);
  
    const validatePaymentData = () => {
      // Check if totalPercentage = 100%
      const totalPercentage = checkSumPersentage();
      if (paymentPolicy === 'post') {
        // For post, no need to ensure first payment is paid or totalPercentage == 100%, 
        // but let's say we still require 100% plan defined.
        const isValid = totalPercentage === 100;
        onPaymentDataChange(paymentDataArray, isValid);
        return;
      }
  
      // For pre or prePost:
      // Ensure totalPercentage = 100
      // If pre: full amount must be paid (first payment 'paid')
      // If prePost: at least first payment is 'paid', and totalPercentage = 100
      const isFullPercentage = totalPercentage === 100;
  
      let isFirstPaymentPaid = true;
      if (paymentDataArray.length > 0) {
        const firstPaymentStatus = paymentDataArray[0]?.paymentStutes || 'not paid';
        if (firstPaymentStatus !== 'paid') {
          isFirstPaymentPaid = false;
        }
      } else {
        isFirstPaymentPaid = false; // No payments defined
      }
  
      let isValid = false;
      if (paymentPolicy === 'pre') {
        // Must be fully paid before event: firstPaymentPaid and 100%
        isValid = isFullPercentage && isFirstPaymentPaid;
      } else if (paymentPolicy === 'prePost') {
        // At least first payment is paid before event, 100% defined
        // The rest can be after event, but we still require a full plan of 100%
        isValid = isFullPercentage && isFirstPaymentPaid;
      }
  
      onPaymentDataChange(paymentDataArray, isValid);
    };
  
    const addPaymentData = () => {
      const newPaymentItem = {
        id: uuidv4(),
        PayDate: null,
        pers: null,
        paymentStutes: 'not paid',
        amount: null,
        paymentMethod: null,
      };
      setPaymentDataArray([...paymentDataArray, newPaymentItem]);
    };
  
    const renderAddButton = () => {
      return (
        <TouchableOpacity style={styles.item} onPress={addPaymentData}>
          <Text style={styles.addTxt}>اضافة تفاصيل دفعة</Text>
          <View style={styles.IconView}>
            <Entypo name={'plus'} color={colors.puprble} size={25} />
          </View>
        </TouchableOpacity>
      );
    };
  
    const renderPaymentFeilds = () => {
      return paymentDataArray.map((val, index) => (
        <TouchableOpacity
          key={val.id}
          onPress={() => {
            setSelectedPaymentIndex(index);
            setContinuePay(true);
          }}
          style={
            selectedPaymentIndex === index
              ? styles.selectedMediaItem
              : styles.mediaItem
          }>
          <PaymentComponent val={val} index={index} updateArray={updateArray} />
        </TouchableOpacity>
      ));
    };
  
    const removePaymentItem = (index) => {
      const newArray = [...paymentDataArray];
      newArray.splice(index, 1);
      setPaymentDataArray(newArray);
    };
  
    const updateArray = (data, index) => {
      setPaymentDataArray((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] = data;
        return newArray;
      });
    };
  
    const PaymentComponent = (props) => {
      const { val, index, updateArray } = props;
  
      const [paymentDate, setPaymentDate] = useState(val?.PayDate || null);
      const [persentage, setPersentage] = useState(val?.pers || null);
      const [amount, setAmount] = useState(val?.amount || null);
      const [paymentStatus, setPaymentStatus] = useState(val?.paymentStutes || 'not paid');
  
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [mode, setMode] = useState('date');
      const [show, setShow] = useState(false);
  
      const ReqPrice = totalPrice;
  
      const checkSumPersentage = () => {
        let sumPers = 0;
        paymentDataArray.forEach((element) => {
          const percentage = parseFloat(element.pers) || 0;
          sumPers += percentage;
        });
        return sumPers;
      };
  
      const calculateAmountFromPersentage = (pers) => {
        const currentTotal = checkSumPersentage() - parseFloat(paymentDataArray[index]?.pers || 0);
        const maxAllowed = 100 - currentTotal;
        let adjustedPers = parseFloat(pers);
  
        if (currentTotal + adjustedPers > 100) {
          adjustedPers = maxAllowed;
        }
  
        const fact = ReqPrice * adjustedPers;
        const realAmount = fact / 100;
  
        const newPersentage = adjustedPers.toFixed(1).toString() || '0';
        const newAmount = realAmount.toFixed(1).toString() || '0';
  
        setPersentage(newPersentage);
        setAmount(newAmount);
  
        updateArray(
          {
            ...val,
            PayDate: paymentDate,
            pers: newPersentage,
            paymentStutes: paymentStatus,
            amount: newAmount,
          },
          index
        );
      };
  
      const calculatePersentageFromAmount = (amou) => {
        const inputAmount = parseFloat(amou) || 0;
        const currentTotalPercentage = checkSumPersentage() - parseFloat(paymentDataArray[index]?.pers || 0);
        const maxAllowedPercentage = 100 - currentTotalPercentage;
        const maxAllowedAmount = (ReqPrice * maxAllowedPercentage) / 100;
  
        let adjustedAmount = inputAmount;
        if (inputAmount > maxAllowedAmount) {
          adjustedAmount = maxAllowedAmount;
        }
  
        const value = adjustedAmount / ReqPrice;
        const pers = value * 100;
        const newAmount = adjustedAmount.toFixed(1).toString() || '0';
        const newPersentage = pers.toFixed(1).toString() || '0';
  
        setAmount(newAmount);
        setPersentage(newPersentage);
  
        updateArray(
          {
            ...val,
            PayDate: paymentDate,
            pers: newPersentage,
            paymentStutes: paymentStatus,
            amount: newAmount,
          },
          index
        );
      };
  
      const onChange = (event, chosenDate) => {
        setShow(false);
        const newDate = chosenDate || selectedDate;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
  
        if (newDate < today) {
          showMessage('لا يمكن اختيار تاريخ في الماضي.');
          return;
        }
  
        if (paymentPolicy === 'pre' && newDate >= eventDateObj) {
          showMessage('التاريخ يجب أن يكون قبل تاريخ الحدث وفقًا لسياسة الدفع المسبق.');
          return;
        } else if (paymentPolicy === 'prePost' && index === 0 && newDate >= eventDateObj) {
          showMessage('الدفعة الأولى يجب أن تكون قبل تاريخ الحدث.');
          return;
        }
  
        setSelectedDate(newDate);
        setPaymentDate(newDate.toISOString().split('T')[0]);
  
        updateArray(
          {
            ...val,
            PayDate: newDate.toISOString().split('T')[0],
            pers: persentage,
            amount: amount,
            paymentStutes: paymentStatus,
          },
          index
        );
      };
  
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
  
      const confirmPaymentWithMethod = (method) => {
        const newStatus = 'paid';
        setPaymentStatus(newStatus);
        setSelectedMethod(method);
        setShowPaymentModal(false);
  
        updateArray(
          {
            ...val,
            PayDate: paymentDate,
            pers: persentage,
            paymentStutes: newStatus,
            amount: amount,
            paymentMethod: method,
          },
          index
        );
      };
  
      const revertPayment = () => {
        setPaymentStatus('not paid');
        setSelectedMethod(null);
        setShowPaymentModal(false);
  
        updateArray(
          {
            ...val,
            PayDate: paymentDate,
            pers: persentage,
            paymentStutes: 'not paid',
            amount: amount,
            paymentMethod: null,
          },
          index
        );
      };
  
      useEffect(() => {
        if (val) {
          setPaymentDate(val?.PayDate);
          setPersentage(val?.pers);
          setPaymentStatus(val?.paymentStutes || 'not paid');
        }
      }, [val]);
  
      // Removed modal step logic here since it's now handled in the parent
      // This component only manages payment data.
  
      return (
        <View key={index} style={styles.mediaItem}>
          <View style={styles.mediaList}>
            <TouchableOpacity
              onPress={() => removePaymentItem(index)}
              style={{width: '10%', padding: 5, alignItems: 'center'}}>
              <FontAwesome name="remove" size={15} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => showMode('date')}>
              <View style={styles.viewDate}>
                <View style={{width: '80%', alignItems: 'center'}}>
                  <Text style={styles.datetxt}>
                    {paymentDate || 'تاريخ الدفعة'}
                  </Text>
                </View>
                <Entypo
                  name="calendar"
                  style={{fontSize: 30, color: colors.puprble, paddingRight: 10}}
                />
              </View>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={selectedDate}
                mode={mode}
                is24Hour={true}
                display="spinner"
                onChange={onChange}
              />
            )}
          </View>
  
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              keyboardType={'numeric'}
              placeholder={'الدفعة'}
              value={amount}
              onChangeText={setAmount}
              onEndEditing={(val) =>
                calculatePersentageFromAmount(val.nativeEvent.text)
              }
            />
  
            <View style={styles.inputPersentageView}>
              <TextInput
                style={{fontSize: 18}}
                keyboardType={'numeric'}
                placeholder={'النسبة'}
                value={persentage}
                onChangeText={setPersentage}
                onEndEditing={(val) =>
                  calculateAmountFromPersentage(val.nativeEvent.text)
                }
              />
              <Text style={styles.text}>%</Text>
            </View>
          </View>
          {index === 0 && (
            <TouchableOpacity style={styles.toggleButton} onPress={() => setShowPaymentModal(true)}>
              <Text
                style={[
                  styles.toggleButtonText,
                  {color: paymentStatus === 'not paid' ? 'white' : colors.gold},
                ]}>
                {paymentStatus === 'not paid'
                  ? 'Confirm Payment'
                  : `Paid (${selectedMethod || ''})`}
              </Text>
            </TouchableOpacity>
          )}
  
          {/* Payment Method Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPaymentModal}
            onRequestClose={() => setShowPaymentModal(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Payment Method</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => confirmPaymentWithMethod('Cash')}>
                  <Text style={styles.modalButtonText}>Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => confirmPaymentWithMethod('Visa')}>
                  <Text style={styles.modalButtonText}>Visa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => confirmPaymentWithMethod('Checks')}>
                  <Text style={styles.modalButtonText}>Checks</Text>
                </TouchableOpacity>
  
                {paymentStatus === 'paid' && (
                  <TouchableOpacity
                    style={[styles.modalButton, {backgroundColor: 'red'}]}
                    onPress={revertPayment}>
                    <Text style={styles.modalButtonText}>Revert Payment</Text>
                  </TouchableOpacity>
                )}
  
                <TouchableOpacity
                  style={[styles.modalButton, {backgroundColor: 'grey'}]}
                  onPress={() => setShowPaymentModal(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
  
        </View>
      );
    };
  
    const renderPaymentPolicyText = () => {
      switch (paymentPolicy) {
        case 'pre':
          return ' يجب دفع كامل المبلغ قبل هذا التاريخ.';
        case 'prePost':
          return ' دفعة أولى مطلوبة قبل ';
        case 'post':
          return null;
        default:
          return null;
      }
    };
  
    const renderRequestDetail = () => {
      const paymentPolicyText = renderPaymentPolicyText();
      return (
        <View style={styles.reqInfoView}>
          <View style={{height: '50%'}}>
            <Text style={styles.addTxt}>
              {paymentPolicyText || ''} {date}
            </Text>
          </View>
          <View style={styles.amount}>
            <Text style={styles.addTxt}>{'₪' + totalPrice}</Text>
          </View>
        </View>
      );
    };
  
    const determineNumOfPayment = () => {
      return (
        <View style={styles.paymentQuntView}>
          <View style={styles.titleItem}>{renderRequestDetail()}</View>
          {renderPaymentFeilds()}
          {renderAddButton()}
        </View>
      );
    };
  
    const checkSumPersentage = () => {
      let sumPers = 0;
      paymentDataArray.forEach((element) => {
        const percentage = parseFloat(element.pers) || 0;
        sumPers += percentage;
      });
      return sumPers;
    };
  
    const makePayment = () => {
      return (
        <View style={styles.paymentQuntView}>
          {/* Removed the old code that displayed payment method selection here
              since we now finalize everything in the parent */}
        </View>
      );
    };
  
    return (
      <View>
        <ScrollView>
          {determineNumOfPayment()}
          {makePayment()}
        </ScrollView>
      </View>
    );
  };
  
  export default ProviderSetPaymentForClient;
  
  const styles = StyleSheet.create({
    paymentQuntView: {
      width: '100%',
      marginVertical: 20,
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
      borderRadius: 20,
    },
    titleItem: {
      alignSelf: 'center',
      marginVertical: 5,
      width: '90%',
    },
    addTxt: {
      fontSize: 18,
      color: colors.puprble,
      fontWeight: 'bold',
    },
    IconView: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      marginLeft: 15,
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
      marginBottom: 20,
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
      textAlign: 'center',
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
      alignSelf: 'center',
    },
    reqInfoView: {
      borderWidth: 2,
      borderColor: colors.silver,
      width: '100%',
      height: 100,
      padding: 10,
      marginVertical: 10,
    },
    amount: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '50%',
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButton: {
      width: '100%',
      padding: 10,
      marginVertical: 5,
      backgroundColor: colors.puprble,
      alignItems: 'center',
      borderRadius: 5,
    },
    modalButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    toggleButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: colors.puprble,
      borderRadius: 5,
      alignItems: 'center',
    },
    toggleButtonText: {
      fontWeight: 'bold',
    },
  });
  