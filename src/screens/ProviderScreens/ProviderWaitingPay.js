import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../../assets/AppColors'
import moment from "moment";
import Fontisto from "react-native-vector-icons/Fontisto"
import Entypo from "react-native-vector-icons/Entypo"
import SearchContext from '../../../store/SearchContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import MonthCom from '../../components/MonthCom'
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard'

const ProviderWaitingPay = () => {

  const { requestInfoByService } = useContext(SearchContext);
  const [fromWaitingPayScreen, setFromWaitingPayScreen] = useState(true)
  const [monthly, setMonthly] = useState(false)
  const [spacificDate, setspacificDate] = useState(false)
  const [clientName, setClientName] = useState(true)

  const [useDefultSearch, setUseDefultSearch] = useState(true)
  const [useMonthToSearch, setuseMonthToSearch] = useState(false)
  const [useSpacificDateToSearch, setUseSpacificDateToSearch] = useState(false)
  const [useClientToSearch, setUseClientToSearch] = useState(false)

  const [client, setClient] = useState(null)
  const [selectedSpacificDate, setSelectedSpacificDate] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const allRequestingDates = []

  const monthlyPress = () => {
    setMonthly(true)
    setspacificDate(false)
    setClientName(false)
  }
  const spacificDatePress = () => {
    setMonthly(false)
    setspacificDate(true)
    setClientName(false)
  }
  const clientNamePress = () => {
    setMonthly(false)
    setspacificDate(false)
    setClientName(true)
  }

  const getBookingInfo = () => {
    const reqInfo = requestInfoByService.filter(item => {
      return item.ReqStatus === 'waiting pay'
    })
    return reqInfo
  }

  const getBookingInfoByDate = (rseDate) => {
    const data = getBookingInfo()
    console.log("data", data);
    const reqInfo = data.filter(item => {
      console.log("rseDate", rseDate);
      return item.ReqStatus === 'waiting pay' && item.reservationDetail[0].reservationDate === rseDate
    })
    //console.log("reqInfo", reqInfo);
    return reqInfo
  }

  const collectAllRequestDates = () => {
    const data = getBookingInfo()
    return data.map(item => {
      const requestBookingDate = moment(item.reservationDetail[0].reservationDate, "YYYY-MM-DD")
      let startingDay = requestBookingDate.format('D')
      let month = requestBookingDate.format('M')
      let year = requestBookingDate.format('YYYY')
      let completeDate = year + '-' + month + '-' + startingDay


      if (!(allRequestingDates.includes(completeDate))) {
        if (useMonthToSearch) {
          if (month === selectedMonth && year === selectedYear) {
            allRequestingDates.push(completeDate)
          }
        } else {
          allRequestingDates.push(completeDate)
        }
      }
      allRequestingDates.sort();
    })
  }

  const renderBookingCard = (rseDate) => {
    const data = getBookingInfoByDate(rseDate)

    return data.map(item => {
      return (
        <ProviderReservationCard fromWaitingPayScreen={fromWaitingPayScreen}  {...item} />
      )
    })
  }

  const renderBookingDates = () => {
    collectAllRequestDates()
    return allRequestingDates.map(item => {
      return (
        <View>
          <View style={styles.dateView}>
            <Text style={styles.dateTxt}>{moment(item).format('dddd')}</Text>
            <Text style={styles.dateTxt}>{moment(item).format('L')}</Text>
          </View>
          {renderBookingCard(item)}
        </View>
      )
    })
  }

  const renderFilter = () => {
    return (
      <View style={styles.choicesView}>
        <Pressable style={[styles.Dview, monthly ? styles.DviewPress : styles.Dview]} onPress={monthlyPress}>
          <Text style={[styles.filtertxt, monthly ? styles.filtertxtPress : styles.filtertxt]}>حسب الشهر</Text>
        </Pressable>
        <Pressable style={[styles.Dview, spacificDate ? styles.DviewPress : styles.Dview]} onPress={spacificDatePress}>
          <Text style={[styles.filtertxt, spacificDate ? styles.filtertxtPress : styles.filtertxt]}>تاريخ محدد</Text>
        </Pressable>
        <Pressable style={[styles.Dview, clientName ? styles.DviewPress : styles.Dview]} onPress={clientNamePress}>
          <Text style={[styles.filtertxt, clientName ? styles.filtertxtPress : styles.filtertxt]}>اسم زبون</Text>
        </Pressable>
      </View>)
  }
  const inputClientName = () => {
    return (
      <View>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='ادخل اسم الزبون'
          onChangeText={setClient}
        />
      </View>
    )
  }

  const onChange = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate();
    setSelectedSpacificDate(fDate);
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  const inputSpecificDate = () => {
    return (
      <View>
        <Pressable onPress={() => showMode('date')} >
          <View style={styles.viewDate}>
            <Text style={styles.dateTxt}>{selectedSpacificDate || "YYYY/MM/DD"}</Text>
            <Entypo
              name='calendar'
              style={{ fontSize: 30, color: colors.puprble, paddingHorizontal: 20 }}
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
    )
  }
  const renderBookingCardAccorDate = () => {
    const data = getBookingInfoByDate(selectedSpacificDate)
    return data.map(item => {
      return (
        <ProviderReservationCard fromWaitingScreen={fromWaitingScreen}  {...item} />
      )
    })
  }

  const inputMonth = () => {
    return (
      <View>
        <MonthCom />
      </View>
    )
  }

  const renderFilterTools = () => {
    return (
      <View style={{ width: '90%', alignSelf: 'center' }}>
        {clientName && inputClientName()}
        {monthly && inputMonth()}
        {spacificDate && inputSpecificDate()}
      </View>
    )
  }


  return (
    <View style={styles.container}>
      {renderFilter()}
      {renderFilterTools()}
      <ScrollView>
        {useMonthToSearch && renderBookingDates()}
        {useDefultSearch && renderBookingDates()}
        {useSpacificDateToSearch && renderBookingCardAccorDate()}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  )
}

export default ProviderWaitingPay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'white'
  },
  dateTxt: {
    color: colors.puprble,
    fontSize: 20
  },
  dateView: {
    backgroundColor: colors.silver,
    width: '100%',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    marginVertical: 20
  },
  filtertxt: {
    color: colors.silver,
    fontSize: 20
  },
  filtertxtPress: {
    color: colors.puprble,
    fontSize: 20
  },
  choicesView: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.puprble,
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    //borderRadius: 35,
    marginVertical: 20
  },
  Dview: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 40,
    backgroundColor: colors.puprble,
    borderRadius: 35,
    //elevation: 5,
    margin: 5
  },
  DviewPress: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 40,
    backgroundColor: colors.darkGold,
    borderRadius: 35,
    elevation: 5,
    margin: 5
  },
  input: {
    alignSelf: 'center',
    textAlign: 'center',
    height: 50,
    width: '100%',
    borderRadius: 10,
    borderColor: 'gray',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'lightgray',
    borderWidth: 0.5
  },
  viewDate: {
    flexDirection: 'row',
    height: 50,
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
})