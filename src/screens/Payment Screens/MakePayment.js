import { StyleSheet, Text, View, Alert, Pressable, ToastAndroid, TextInput, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import moment from "moment";
import { colors } from "../../assets/AppColors.js"
import { ScreenNames } from "../../../route/ScreenNames.js"
import { BorderRightOutlined } from '@ant-design/icons';
import UsersContext from '../../../store/UsersContext.js';
import { createNewPayment, updateRequest, updatebookingDate } from '../../resources/API.js';
import SearchContext from '../../../store/SearchContext.js';
import { showMessage } from '../../resources/Functions.js';


const MakePayment = (props) => {
  const { reqInfo, amount, fromclientDuePayment, fromProviderDuePay, ID, providerSide, clientSide } = props.route?.params || {}
  const { userId } = useContext(UsersContext);
  const { setRequestInfoAccUser, requestInfoAccUser } = useContext(SearchContext);

  //console.log("reqInfo", reqInfo);
  var countAllDates = 0

  const [paymentMethod, setpaymentMethod] = useState('Credit Card')
  const [cardHolderName, setCardHolderName] = useState()
  const [cardHolderID, setCardHolderID] = useState()
  const [cardHolderNumber, setCardHolderNumber] = useState()
  const [cardHolderCVV, setCardHolderCVV] = useState()
  const [paymentDate, setPaymentDate] = useState(new Date())


  const [reqID, setReqID] = useState()
  const [ServiceID, setServiceID] = useState()
  const [reqDetail, setReqDetail] = useState()
  const [maxAllowedRequest, setMaxAllowedRequest] = useState()
  const [reqPayment, setReqPayment] = useState()

  const [requestPayment, setRequestPayment] = useState()
  const [requestCost, setRequestCost] = useState()
  const [bookingDates, setBookingDates] = useState()
  const [serviceRequest, setServiceRequest] = useState()

  const [services, setServices] = useState()
  const [BookDates, setBookDates] = useState()
  const [realPayments, setRealPayments] = useState()
  const [serviceAllRequests, setServiceAllRequests] = useState()
  const [reqPayments, setReqPayments] = useState([])

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

    if (clientSide && fromclientDuePayment) {
      setServiceRequest(reqInfo.serviceRequest[0])
      setReqID(reqInfo.serviceRequest[0].RequestId)
      setReqPayment(reqInfo.serviceRequest[0])
      setRequestPayment(reqInfo.serviceRequest.paymentInfo)
      setRequestCost(reqInfo.serviceRequest[0].Cost)
      setBookingDates(reqInfo.BookDates[0].dates)
      setMaxAllowedRequest(reqInfo.services[0].maxNumberOFRequest)
      setReqDetail(reqInfo.serviceRequest[0].reservationDetail)
      setServiceID(reqInfo.services[0].service_id)
    }


    if (fromProviderDuePay) {
      setReqID(reqInfo[0].requestInfo.RequestId)
      setReqPayment(reqInfo[0].requestInfo.paymentInfo)
      // setRealPayments(reqInfo[0].userPayments)
      // setReqPayments(reqInfo[0].requestInfo.paymentInfo)

    }
    if (providerSide) {
      setReqID(reqInfo.requestInfo.RequestId)
      setReqPayment(reqInfo.requestInfo.paymentInfo)
      // setRealPayments(reqInfo.userPayments)
      // setReqPayments(reqInfo.requestInfo.paymentInfo)

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

//// when make payment Press functions
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
    const reqPayIndex = reqPayment.findIndex(elme => elme.id === ID)
    const reqPay = reqPayment

    if (reqPayIndex > -1) {
      reqPay[reqPayIndex].paymentStutes = 'paid'
    }
    setReqPayment(reqPay[reqPayIndex]);

    if (requestPayment.length === 0) { /// there is now any payments for this request
      const newRequestData = {
        RequestId: reqID,
        ReqStatus: 'partially paid',
        paymentInfo: reqPayment,
        Cost: requestCost,
        reservationDetail: reqDetail
      }

      createPayment(newRequestData, method)
      // checkIfReachedMaxNumOfReq()
    }

    if (requestPayment.length >= 1) {  /// if the client pay one time at the least for this request

      if (requestPayment.length + 1 === reqPayment.length) {  /// if the client pay the last payment for this request
        const newRequestData = {
          RequestId: reqID,
          ReqStatus: 'paid all',
          paymentInfo: reqPayment,
          Cost: requestCost,
          reservationDetail: reqDetail
        }
        createPayment(newRequestData, method)

      } else {
        const newRequestData = {
          RequestId: reqID,
          ReqStatus: 'partially paid',
          paymentInfo: reqPayment,
          Cost: requestCost,
          reservationDetail: reqDetail
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

      let fund = requestPayment || [];

      if (res.message === 'Payment Created') {

        fund.push(addNewPayment);
        setRequestPayment([...fund])

        ToastAndroid.showWithGravity(
          'تم الدفع بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );

        updateRequestInfo(newRequestData, requestPayment)
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
  const updateRequestInfo = (newwData, requestPayment) => {

    const requestInfoIndex = requestInfoAccUser?.findIndex(item => {
      return item.requestInfo.find(element => {
        return element.serviceRequest[0].RequestId === reqID
      })
    })

    const req = requestInfoAccUser || []
    const reqInfo = req[requestInfoIndex].requestInfo
    const reqInfoIndex = reqInfo?.findIndex(item => item.serviceRequest[0].RequestId === reqID)

    updateRequest(newwData).then(res => {
    
      if (res.message == 'Updated Sucessfuly') {

        const requestData = {
          serviceRequest: [newwData],
          requestPayment: requestPayment
        }
        if (reqInfoIndex > -1) {
          reqInfo[reqInfoIndex] = requestData
        }
        setRequestInfoAccUser([...req])

        ToastAndroid.showWithGravity(
          'تم التعديل بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    })

  }



  ////// for updating booking recived dates
  const countAllRequestDates = () => {
    return serviceAllRequests.map(item => {
      return item.reservationDetail.forEach(element => {
        if (element.reservationDate == reqDetail[0].reservationDate) {
          countAllDates += 1
        }
      });
    })
  }
  const checkIfReachedMaxNumOfReq = () => {
    const numOfReq = countAllRequestDates()
    const reqReserDate = reqDetail[0].reservationDate

    if (countAllDates < maxAllowedRequest) {
      const addNewDate = {
        status: 'open',
        time: reqReserDate
      }
      editingBookingDates(addNewDate)
    }

    if (countAllDates + 1 === maxAllowedRequest) {
      const addNewDate = {
        status: 'full',
        time: reqReserDate
      }
      editingBookingDates(addNewDate)
    }
  }
  const editingBookingDates = (addNewDate) => {
    const newRecord = bookingDates || [];

    newRecord.push(addNewDate)
    const newBookDates = {
      serviceID: ServiceID,
      datesToUpdate: [...newRecord]
    }

    updatebookingDate(newBookDates).then((res) => {
      if (res.message === 'Dates updated successfully') {
        showMessage("updated")
      } else {
        showMessage("failed to create request")
      }
    }).catch((E) => {
      console.error("error creating request E:", E);
    })

  }


  const selectWhoisMakePayment = () => {
    if (fromProviderDuePay) {
      return (
        <View>
          {creatPaymentProviderSide()}
          {renderPaymentMethod()}
        </View>
      )
    }
    if (providerSide) {
      return (
        <View>
          {creatPaymentProviderSide()}
          {renderPaymentMethod()}
        </View>
      )
    }
    if (fromclientDuePayment || clientSide) {
      return (
        <View>
          {renderCreditCardInfo()}
        </View>
      )
    }
  }
  const renderPaymentMethod = () => {
    if (paymentMethod === "Credit Card") {
      return (
        <View>
          {renderCreditCardInfo()}
        </View>
      )
    }
    if (paymentMethod === "Cash") {
      return (
        <View>
          {/* {renderChecksInfo()} */}
        </View>
      )
    }
    if (paymentMethod === "Checks") {
      return (
        <View>
          {renderChecksInfo()}
        </View>
      )
    }

  }

  return (
    <View style={styles.container}>
      {header()}
      <ScrollView>
        {renderPayAmount()}
        {selectWhoisMakePayment()}

        {renderPayButton()}

      </ScrollView>
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