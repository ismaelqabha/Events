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
  import {addNewRequest} from '../../resources/API';
  
  const ProviderSetPaymentForClient = ({
    paymentPolicy,
    totalPrice,
    date, // Event date (passed from props)
    serviceId,
    userId,
    resDetails,
  }) => {
    const [paymentDataArray, setPaymentDataArray] = useState([]);
    const [creditCard, setCreditCard] = useState(false);
    const [cash, setCash] = useState(false);
    const [checks, setChecks] = useState(false);
    const [initialPaymentAmount, setInitialPaymentAmount] = useState(0);
    const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false); 
    const [selectedMethod, setSelectedMethod] = useState(null); 
    const [continuePay, setContinuePay] = useState(false);
  
    // Convert the passed event date (string) into a Date object for accurate comparison
    const eventDateObj = new Date(date);
    eventDateObj.setHours(0, 0, 0, 0); // Normalize to midnight to avoid time discrepancies
  
    useEffect(() => {
      calculateInitialPaymentAmount();
    }, [paymentPolicy, totalPrice]);
  
    /** 
     * Determines the initial required payment amount based on the payment policy.
     */
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
  
    /**
     * Opens the payment modal to confirm payment method.
     */
    const togglePaymentStatus = () => {
      setShowPaymentModal(true);
    };
  
    /**
     * Adds a new payment data entry with a unique ID and default values.
     */
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
  
    /**
     * Renders the "Add Payment Detail" button.
     */
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
  
    /**
     * Renders all payment fields that have been added.
     */
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
  
    /**
     * Removes a payment entry by its index.
     */
    const removePaymentItem = (index) => {
      const newArray = [...paymentDataArray];
      newArray.splice(index, 1);
      setPaymentDataArray(newArray);
    };
  
    /**
     * Updates the payment data array at a given index.
     * @param {object} data - Payment data object.
     * @param {number} index - Index of the payment to update.
     */
    const updateArray = (data, index) => {
      setPaymentDataArray((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] = data;
        return newArray;
      });
    };
  
    /**
     * Component representing each payment's input fields and actions.
     * Handles date selection, amount/percentage calculation, and payment status.
     */
    const PaymentComponent = (props) => {
      const { val, index, updateArray } = props;
  
      const [paymentDate, setPaymentDate] = useState(val?.PayDate || null);
      const [persentage, setPersentage] = useState(val?.pers || null);
      const [amount, setAmount] = useState(val?.amount || null);
      const [paymentStatus, setPaymentStatus] = useState(val?.paymentStutes || 'not paid');
  
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [mode, setMode] = useState('date');
      const [show, setShow] = useState(false);
  
      // Using parent totalPrice for calculations
      const ReqPrice = totalPrice;
  
      /**
       * Sums up all percentages in the payment array.
       */
      const checkSumPersentage = () => {
        let sumPers = 0;
        paymentDataArray.forEach((element) => {
          const percentage = parseFloat(element.pers) || 0;
          sumPers += percentage;
        });
        return sumPers;
      };
  
      /**
       * Calculates the amount from a given percentage and updates state and parent array.
       */
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
  
      /**
       * Calculates the percentage from a given amount and updates state and parent array.
       */
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
  
      /**
       * Handler for the DateTimePicker change event.
       * Ensures the chosen date meets the payment policy conditions.
       */
      const onChange = (event, chosenDate) => {
        setShow(false);
        const newDate = chosenDate || selectedDate;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
  
        // Disallow past dates
        if (newDate < today) {
          showMessage('لا يمكن اختيار تاريخ في الماضي.');
          return;
        }
  
        // Compare using eventDateObj (a proper Date object)
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
  
      /**
       * Confirms payment with a selected method and updates status.
       */
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
  
      /**
       * Reverts the payment status to 'not paid'.
       */
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
  
      /**
       * Modal to select the payment method (Cash, Visa, Checks).
       */
      const renderPaymentMethodModal = () => (
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
      );
  
      useEffect(() => {
        if (val) {
          setPaymentDate(val?.PayDate);
          setPersentage(val?.pers);
          setPaymentStatus(val?.paymentStutes || 'not paid');
        }
      }, [val]);
  
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
            <TouchableOpacity style={styles.toggleButton} onPress={togglePaymentStatus}>
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
  
          {renderPaymentMethodModal()}
        </View>
      );
    };
  
    /**
     * Renders text related to the payment policy and event date.
     */
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
  
    /**
     * Renders request details and total price.
     */
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
  
    /**
     * Renders the section where multiple payments can be defined.
     */
    const determineNumOfPayment = () => {
      return (
        <View style={styles.paymentQuntView}>
          <View style={styles.titleItem}>{renderRequestDetail()}</View>
          {renderPaymentFeilds()}
          {renderAddButton()}
        </View>
      );
    };
  
    /**
     * Sums all percentages from paymentDataArray to ensure they reach 100%.
     */
    const checkSumPersentage = () => {
      let sumPers = 0;
      paymentDataArray.forEach((element) => {
        const percentage = parseFloat(element.pers) || 0;
        sumPers += percentage;
      });
      return sumPers;
    };
  
    /**
     * Handlers for payment method selection at the final payment confirmation stage.
     */
    const creditCardPress = () => {
      setCreditCard(true);
      setCash(false);
      setChecks(false);
    };
    const cashPress = () => {
      setCreditCard(false);
      setCash(true);
      setChecks(false);
    };
    const checksPress = () => {
      setCreditCard(false);
      setCash(false);
      setChecks(true);
    };
  
    /**
     * Shows the amount of the currently selected payment section (if any).
     */
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
  
    /**
     * Renders the final "Confirm Payment" button to create the request.
     */
    const renderPayButton = () => {
      return (
        <TouchableOpacity style={styles.payView} onPress={onPaymentPress}>
          <Text style={styles.buttonText}>تأكيد الدفع</Text>
        </TouchableOpacity>
      );
    };
  
    /**
     * Final payment confirmation logic.
     */
    const onPaymentPress = async () => {
      const totalPercentage = checkSumPersentage();
      const totalAmount = paymentDataArray.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  
      if (totalPercentage < 100 || totalAmount < totalPrice) {
        showMessage('الدفعات غير مكتملة. تأكد من أن النسبة الإجمالية تصل إلى 100%.');
        return;
      }
  
      try {
        const firstPaymentStatus = paymentDataArray[0]?.paymentStutes || 'not paid';
        const reqStatus = firstPaymentStatus === 'paid' ? 'partially paid' : 'waiting pay';
  
        const requestBody = {
          ReqServId: serviceId,
          ReqUserId: userId,
          ReqStatus: reqStatus,
          ReqDate: new Date().toISOString(),
          Cost: totalPrice,
          reservationDetail: resDetails,
          paymentInfo: paymentDataArray,
        };
  
        const requestResponse = await addNewRequest(requestBody);
  
        if (requestResponse?.message === 'Request Created') {
          showMessage('تم إنشاء الطلب بنجاح!');
        } else {
          showMessage('حدث خطأ أثناء إنشاء الطلب. الرجاء المحاولة مرة أخرى.');
        }
      } catch (error) {
        console.error('Error during payment process:', error);
        showMessage('حدث خطأ أثناء معالجة الدفع. الرجاء المحاولة مرة أخرى.');
      }
    };
  
    /**
     * Renders payment method selection buttons.
     */
    const creatPaymentProviderSide = () => {
      return (
        <View style={styles.payMethodView}>
          <TouchableOpacity
            style={[styles.methodItem, cash ? styles.methodItemPress : null]}
            onPress={cashPress}>
            <Text style={styles.methodText}>كاش</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodItem, checks ? styles.methodItemPress : null]}
            onPress={checksPress}>
            <Text style={styles.methodText}>شيكات</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodItem, creditCard ? styles.methodItemPress : null]}
            onPress={creditCardPress}>
            <Text style={styles.methodText}>بطاقة ائتمان</Text>
          </TouchableOpacity>
        </View>
      );
    };
  
    /**
     * Renders the final payment confirmation section if continuePay is true.
     */
    const makePayment = () => {
      return (
        <View style={styles.paymentQuntView}>
          {continuePay && renderPayAmount()}
          {continuePay && creatPaymentProviderSide()}
          {continuePay && renderPayButton()}
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
    amountView: {
      width: '80%',
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      borderWidth: 0.6,
      borderColor: colors.silver,
      borderRadius: 5,
      marginVertical: 20,
    },
    amountTxt: {
      fontSize: 20,
      color: colors.darkGold,
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
      alignItems: 'center',
    },
    methodItem: {
      marginVertical: 5,
      width: '31%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.gold,
      borderRadius: 10,
      elevation: 5,
    },
    methodItemPress: {
      borderWidth: 3,
      borderColor: colors.puprble,
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
      color: colors.puprble,
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
  });
  