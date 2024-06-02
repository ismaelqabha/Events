import { StyleSheet, Text, View, Alert, Pressable, ToastAndroid, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import moment from "moment";
import { colors } from "../../assets/AppColors.js"
import { ScreenNames } from "../../../route/ScreenNames.js"
import { BorderRightOutlined } from '@ant-design/icons';
import UsersContext from '../../../store/UsersContext.js';
import { createNewPayment, updateRequest } from '../../resources/API.js';
import SearchContext from '../../../store/SearchContext.js';
import { color } from '@rneui/base';


const MakePayment = (props) => {
  const { reqInfo, amount, fromclientDuePayment, fromProviderDuePay, fromReqDuePaymentShow, ID } = props.route?.params || {}
  const { userId } = useContext(UsersContext);
  const {setRequestInfoAccUser, requestInfoAccUser } = useContext(SearchContext);


  // console.log("requestInfoAccUser", requestInfoAccUser);
  // console.log("payments", requestInfoAccUser[0].payments);
  // console.log("reqInfo", reqInfo.RequestId);



  const [paymentMethod, setpaymentMethod] = useState('Credit Card')

  const [cardHolderName, setCardHolderName] = useState()
  const [cardHolderID, setCardHolderID] = useState()
  const [cardHolderNumber, setCardHolderNumber] = useState()
  const [cardHolderCVV, setCardHolderCVV] = useState()
  const [paymentDate, setPaymentDate] = useState(new Date())

  const [paymentInfo, setPaymentInfo] = useState([])
  const [reqPayments, setReqPayments] = useState([])

  const [reqID, setReqID] = useState()
  const [reqPayment, setReqPayment] = useState()
  const [realPayments, setRealPayments] = useState()

  const [creditCard, setCreditCard] = useState(false)
  const [cash, setCash] = useState(false)
  const [checks, setChecks] = useState(false)



  const onBackHandler = () => {
    props.navigation.goBack();
  }
  const header = () => {
    return (
      <View style={styles.header}>
        <Pressable onPress={onBackHandler}
        >
          <AntDesign
            style={styles.icon}
            name={"left"}
            color={"black"}
            size={20} />

        </Pressable>
        <Text style={styles.headerTxt}> اِجراء دفعة</Text>
      </View>
    )
  }

  useEffect(() => {
    checkSource()
  }, [])

  const creditCardPress = () => {
    setCreditCard(true)
    setCash(false)
    setChecks(false)
    setpaymentMethod('Credit Card')
    renderCreditCardInfo()
  }
  const cashPress = () => {
    setCreditCard(false)
    setCash(true)
    setChecks(false)
    setpaymentMethod('Cash')
  }
  const checksPress = () => {
    setCreditCard(false)
    setCash(false)
    setChecks(true)
    setpaymentMethod('Checks')
  }

  const checkSource = () => {

    if (fromclientDuePayment || fromProviderDuePay) {
      setReqID(reqInfo[0].requestInfo.RequestId)
      setReqPayment(reqInfo[0].requestInfo.paymentInfo)
      setRealPayments(reqInfo[0].payments)
      setReqPayments(reqInfo[0].requestInfo.paymentInfo)
    }
    if (fromReqDuePaymentShow) {
      setReqID(reqInfo.RequestId)
      setReqPayment(reqInfo.paymentInfo)
      setRealPayments(reqInfo.realPayments)
      setReqPayments(reqInfo.paymentInfo)
    }
    if (fromProviderDuePay) {
      setReqID(reqInfo[0].requestInfo.RequestId)
      setReqPayment(reqInfo[0].requestInfo.paymentInfo)
      setRealPayments(reqInfo[0].userPayments)
      setReqPayments(reqInfo[0].requestInfo.paymentInfo)
    }
  }

  const renderPayAmount = () => {
    return (
      <View style={styles.amountView}>
        <Text style={styles.amountTxt}>{amount}</Text>
      </View>
    )
  }
  const renderCreditCardInfo = () => {
    return (
      <View>
        <View style={styles.creditItem}>
          <Text style={styles.labelText}>اسم صاحب البطاقة</Text>
          <TextInput style={styles.input}
            keyboardType={'default'}
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
        </View>

        <View style={styles.creditItem}>
          <Text style={styles.labelText}>رقم هوية صاحب البطاقة</Text>
          <TextInput style={styles.input}
            keyboardType={'default'}
            value={cardHolderID}
            onChangeText={setCardHolderID}
          />
        </View>

        <View style={styles.creditItem}>
          <Text style={styles.labelText}>رقم البطاقة</Text>
          <TextInput style={styles.input}
            keyboardType={'default'}
            value={cardHolderNumber}
            onChangeText={setCardHolderNumber}
          />
        </View>

        <View style={styles.creditItem}>
          <Text style={styles.labelText}>رمز التحقق CVV</Text>
          <TextInput style={styles.input}
            keyboardType={'default'}
            value={cardHolderCVV}
            onChangeText={setCardHolderCVV}
          />
        </View>


      </View>
    )
  }
  const renderChecksInfo = () => {
    return (
      <View>
        <View style={styles.creditItem}>
          <Text style={styles.labelText}>اسم صاحب البطاقة</Text>
          <TextInput style={styles.input}
            keyboardType={'default'}
            value={cardHolderName}
            onChangeText={setCardHolderName}
          />
        </View>

        <View style={styles.creditItem}>
          <Text style={styles.labelText}>رقم هوية صاحب البطاقة</Text>
          <TextInput style={styles.input}
            keyboardType={'default'}
            value={cardHolderID}
            onChangeText={setCardHolderID}
          />
        </View>

        <View style={styles.creditItem}>
          <Text style={styles.labelText}>رقم البطاقة</Text>
          <TextInput style={styles.input}
            keyboardType={'default'}
            value={cardHolderNumber}
            onChangeText={setCardHolderNumber}
          />
        </View>

        <View style={styles.creditItem}>
          <Text style={styles.labelText}>رمز التحقق CVV</Text>
          <TextInput style={styles.input}
            keyboardType={'default'}
            value={cardHolderCVV}
            onChangeText={setCardHolderCVV}
          />
        </View>


      </View>
    )
  }
  const renderPayButton = () => {
    return (
      <Pressable style={styles.payView} onPress={onPaymentPress}>
        <Text style={styles.buttonText}>تحرير الدفعة</Text>
      </Pressable>
    )
  }
  const creatPaymentProviderSide = () => {
    return (
      <View>
        <Text style={styles.titleMethodText}>طريقة الدفع</Text>
        <View style={styles.payMethodView}>
          <Pressable style={[styles.methodItem, cash ? styles.methodItemPress : styles.methodItem]} onPress={cashPress}>
            <Text style={styles.methodText}>كاش</Text>
          </Pressable>
          <Pressable style={[styles.methodItem, checks ? styles.methodItemPress : styles.methodItem]} onPress={checksPress}>
            <Text style={styles.methodText}>شيكات</Text>
          </Pressable>
          <Pressable style={[styles.methodItem, creditCard ? styles.methodItemPress : styles.methodItem]} onPress={creditCardPress}>
            <Text style={styles.methodText}>بطاقة ائتمان</Text>
          </Pressable>
        </View>
      </View>
    )
  }


  //// functions for create payment
  const selectPayment = () => {
    if (paymentMethod === 'Cash') {
      console.log(paymentMethod);
      payCashInfo()
    }
    if (paymentMethod === 'Checks') {
      payChecks()
    }
    if (paymentMethod === 'Credit Card') {
      payCreditCard()
    }
  }
  const payCashInfo = () => {
    makePayment(paymentMethod)
  }
  const payCreditCard = () => {
    makePayment(paymentMethod)
  }
  const payChecks = () => {
    makePayment(paymentMethod)
  }

  const onPaymentPress = () => {
    Alert.alert(
      'تأكيد',
      'هل انت متأكد من اتمام عملية الدفع ؟ ',
      [
        {
          text: 'لا',
          style: 'cancel',
        },
        {
          text: 'نعم',
          onPress: () => selectPayment(),
          style: 'destructive', // Use 'destructive' for a red-colored button
        },
      ],
      { cancelable: false } // Prevent closing the alert by tapping outside
    );
  }
  const makePayment = (method) => {

    const reqPayIndex = reqPayments.findIndex(elme => elme.id === ID)
    const reqPay = reqPayments
    if (reqPayIndex > -1) {
      reqPay[reqPayIndex].paymentStutes = 'paid'
    }
    setReqPayments(reqPay[reqPayIndex]);


    if (realPayments.length === 0) { /// there is now any payments for this request
      const newRequestData = {
        RequestId: reqID,
        ReqStatus: 'partially paid',
        paymentInfo: reqPayments
      }
      createPayment(newRequestData, method)
    }

    if (realPayments.length >= 1) {  /// if the client pay one time at the least for this request

      if (realPayments.length + 1 === reqPayment.length) {  /// if the client pay the last payment for this request
        const newRequestData = {
          RequestId: reqID,
          ReqStatus: 'paid all',
          paymentInfo: reqPayments
        }
        createPayment(newRequestData, method)
      } else {
        const newRequestData = {
          RequestId: reqID,
          paymentInfo: reqPayments
        }
        createPayment(newRequestData, method)
      }
    }
  }
  const createPayment = (newRequestData, method) => {
    const addNewPayment = {
      ReqId: reqID,
      PaymentAmount: amount,
      PaymentDate: moment(paymentDate).format('YYYY-MM-DD, h:mm a'),
      userPay: userId,
      PaymentMethod: method,
      discountPercentage: 0,
      cardHolderName: cardHolderName,
      cardHolderId: cardHolderID,
      creditCardNum: cardHolderNumber,
      verfiyCode: cardHolderCVV,
      expirMonth: '',
      expirYear: ''
    }

    createNewPayment(addNewPayment).then(res => {
      let fund = paymentInfo || [];
      setPaymentInfo([...fund])

      if (res.message === 'Payment Created') {

        fund.push(addNewPayment);
        ToastAndroid.showWithGravity(
          'تم الدفع بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        updateRequestInfo(newRequestData)
        // props.navigation.navigate(ScreenNames.ProviderProfile);
      } else {
        ToastAndroid.showWithGravity(
          'there has been an error' + res.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    })
  }
  /// update request info 
  const updateRequestInfo = (newwData) => {
    const requestInfoAccUserIndex = requestInfoAccUser?.findIndex(item => item.requestInfo.RequestId === reqInfo.RequestId)
    const lastPayments = requestInfoAccUser[requestInfoAccUserIndex].payments

    // console.log("lastPayments", lastPayments);
    // console.log("paymentInfo", paymentInfo);

    
    updateRequest(newwData).then(res => {
      if (res.message == 'Updated Sucessfuly') {

        const data = requestInfoAccUser || [];
        if (requestInfoAccUserIndex > -1) {
          data[requestInfoAccUserIndex].payments = {...lastPayments, ...paymentInfo}

          data[requestInfoAccUserIndex] = { ...data[requestInfoAccUserIndex], ...newwData };
        }
        setRequestInfoAccUser([...data])

        ToastAndroid.showWithGravity(
          'تم التعديل بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    })
   
  }



  return (
    <View style={styles.container}>
      {header()}
      {renderPayAmount()}

      {fromProviderDuePay ? creatPaymentProviderSide() : renderCreditCardInfo()}

      {renderPayButton()}
    </View>
  )
}

export default MakePayment

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  headerTxt: {
    fontSize: 18,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
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
  creditItem: {
    marginVertical: 20
  },
  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 20
  },
  input: {
    height: 40,
    width: '90%',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: colors.silver,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BGScereen,
  },
  payView: {
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.puprble,
    borderRadius: 5,
    marginTop: 100
    // position: 'absolute',
    // bottom: 5
  },
  payMethodView: {
    width: '90%',
    height: 100,
    //borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  methodItem: {
    marginVertical: 5,
    width: '31%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
    borderRadius: 10,
    elevation: 5
  },
  methodItemPress: {
    marginVertical: 5,
    width: '31%',
    height: 100,
    borderWidth: 3,
    borderColor: colors.puprble,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
    borderRadius: 10,
    elevation: 5
  },
  titleMethodText: {
    fontSize: 18,
    color: colors.puprble,
    margin: 20
  },
  methodText: {
    fontSize: 18,
    color: colors.puprble
  }

})