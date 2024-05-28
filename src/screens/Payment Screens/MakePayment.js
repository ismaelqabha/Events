import { StyleSheet, Text, View, Alert, Pressable, ToastAndroid, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import moment from "moment";
import { colors } from "../../assets/AppColors.js"
import { ScreenNames } from "../../../route/ScreenNames.js"
import { BorderRightOutlined } from '@ant-design/icons';
import UsersContext from '../../../store/UsersContext.js';
import { createNewPayment } from '../../resources/API.js';


const MakePayment = (props) => {
  const { amount, reqID } = props.route?.params || {}
  const { userId } = useContext(UsersContext);


  const [cardHolderName, setCardHolderName] = useState()
  const [cardHolderID, setCardHolderID] = useState()
  const [cardHolderNumber, setCardHolderNumber] = useState()
  const [cardHolderCVV, setCardHolderCVV] = useState()
  const [paymentDate, setPaymentDate] = useState(new Date())

  const [paymentInfo, setPaymentInfo] = useState([])

  const today = moment(new Date(), "YYYY-MM-DD")
  const day = today.format('D')
  const month = today.format('M')
  const year = today.format('YYYY')
  const todayDate = year + '-' + month + '-' + day

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

  const renderPayButton = () => {
    return (
      <Pressable style={styles.payView} onPress={onPaymentPress}>
        <Text style={styles.buttonText}>تحرير الدفعة</Text>
      </Pressable>
    )
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
              onPress: () => createPayment(),
              style: 'destructive', // Use 'destructive' for a red-colored button
          },
      ],
      { cancelable: false } // Prevent closing the alert by tapping outside
  );
  }

  const createPayment = () => {
    const addNewPayment = {
      ReqId: reqID,
      PaymentAmount: amount,
      PaymentDate: moment(paymentDate).format('YYYY-MM-DD, h:mm a'),
      userPay: userId,
      PaymentMethod: 'Credit Card',
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

      console.log("res.message", res.message);
      if (res.message === 'Payment Created') {

        fund.push(addNewPayment);
        ToastAndroid.showWithGravity(
          'تم الدفع بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
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

  return (
    <View style={styles.container}>
      {header()}
      {renderPayAmount()}
      {renderCreditCardInfo()}
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
    // position: 'absolute',
    // bottom: 5
  }

})