import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import Fontisto from "react-native-vector-icons/Fontisto"
import Entypo from "react-native-vector-icons/Entypo"
import SearchContext from '../../../store/SearchContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard'
import MonthCom from '../../components/MonthCom'
import UsersContext from '../../../store/UsersContext'


const ProviderWaitingReply = () => {
  const { requestInfoByService, userInfoBySpiceficId, setUserInfoBySpiceficId,
    selectMonthforSearch, yearforSearch } = useContext(SearchContext);
  const { allUserData } = useContext(UsersContext);

  const [fromWaitingScreen, setFromWaitingScreen] = useState(true)

  const [monthly, setMonthly] = useState(false)
  const [spacificDate, setspacificDate] = useState(false)
  const [clientName, setClientName] = useState(false)
  const [allRequests, setAllRequests] = useState(true)

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

  const today = moment(new Date(), "YYYY-MM-DD")
  const day = today.format('D')
  const month = today.format('M')
  const year = today.format('YYYY')
  const todayDate = year + '-' + month + '-' + day


  const allRequestingDates = []
  const manageArrayDates = []
  const arrayUsingSpicifcDate = []

  const monthlyPress = () => {
    setMonthly(true)
    setuseMonthToSearch(true)
    setspacificDate(false)
    setClientName(false)
    setAllRequests(false)
  }
  const spacificDatePress = () => {
    setMonthly(false)
    setspacificDate(true)
    setClientName(false)
    setAllRequests(false)
    setuseMonthToSearch(false)
  }
  const clientNamePress = () => {
    setMonthly(false)
    setspacificDate(false)
    setClientName(true)
    setAllRequests(false)
    setuseMonthToSearch(false)
  }
  const allReqPress = () => {
    setMonthly(false)
    setspacificDate(false)
    setClientName(false)
    setAllRequests(true)
    setUseDefultSearch(true)
    setUseClientToSearch(false)
    setUseSpacificDateToSearch(false)
    setuseMonthToSearch(false)
  }

  const checkDate = (d) => {
    const resDate = moment(d, "YYYY-MM-DD")
    const Day = resDate.format('D')
    const Month = resDate.format('M')
    const Year = resDate.format('YYYY')

    if (Year >= year && Month >= month) {
      //console.log(Year, '>=', year, Year >= year, Month, '>=', month, Month >= month);

      if (Year == year && Month == month) {
        if (Day > day) {
         // console.log(Day, '>', day, Day > day);
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    } else {
      return false
    }
  }

  const getBookingInfo = () => {

    if (requestInfoByService.message !== "no Request") {
      const reqInfo = requestInfoByService.filter(item => {
        return item.ReqStatus === 'waiting reply'
      })
      return reqInfo
    } else {
      return []
    }
  }

  const getRequestsAccDates = () => {

    const data = getBookingInfo()
    const reqInfo = data.filter(item => {
      if (item.reservationDetail.length > 1) {
        //if reservation detail has more than one date
        let result = item.reservationDetail.find(multiItem => {
          // console.log(multiItem.reservationDate.slice(0, 10) , todayDate, multiItem.reservationDate.slice(0, 10) > todayDate);
          return checkDate(multiItem.reservationDate)
        })
        return result

      } else {

        //if reservation detail has one date
        //console.log(item.reservationDetail[0].reservationDate.slice(0, 10) , todayDate, item.reservationDetail[0].reservationDate.slice(0, 10) > todayDate);
        return checkDate(item.reservationDetail[0].reservationDate)
      }
    })

    return reqInfo
  }


  /// searching all requests
  const getBookingInfoByDate = (rseDate) => {
    const data = getRequestsAccDates()
    //console.log("data>>", data);

    const reqInfo = data.filter(req => {
      if (req.reservationDetail.length > 1) {
        const multiReqInfo = req.reservationDetail.find(multiItem => {
          return multiItem.reservationDate.slice(0, 10) == rseDate
        })
        //console.log("multiReqInfo", multiReqInfo);
        return multiReqInfo
      } else {
        return req.reservationDetail[0].reservationDate.slice(0, 10) == rseDate
      }
    })
    //console.log("reqInfo>>", reqInfo);
    return reqInfo







    // const reqInfo = data.filter(item => {

    //   if (item.reservationDetail.length > 1) {
    //     //if reservation detail has more than one date
    //     let result = item.reservationDetail.find(multiItem => {
    //       console.log(multiItem.reservationDate.slice(0, 10), rseDate, multiItem.reservationDate.slice(0, 10) == rseDate);
    //       return multiItem.reservationDate.slice(0, 10) == rseDate
    //     })
    //     console.log("result", result);
    //     return result

    //   } else {

    //     //if reservation detail has one date
    //     return item.reservationDetail[0].reservationDate.slice(0, 10) == rseDate
    //   }
    // })
    // return reqInfo
  }



  const collectAllRequestDates = () => {
    let startingDay = ''
    let month = ''
    let year = ''
    let completeDate = ''
    let requestBookingDate = ''
    const data = getRequestsAccDates()

    return data.map(item => {
      if (item.reservationDetail.length > 1) {
        //if reservation detail has more than one date
        return item.reservationDetail.map(multiItem => {
          requestBookingDate = moment(multiItem.reservationDate, "YYYY-MM-DD")
          startingDay = requestBookingDate.format('D')
          month = requestBookingDate.format('M')
          year = requestBookingDate.format('YYYY')
          completeDate = year + '-' + month + '-' + startingDay


          if (!(allRequestingDates.includes(completeDate))) {
            if (useMonthToSearch) {
              if (month == selectMonthforSearch && year == yearforSearch) {
                allRequestingDates.push(completeDate)
              }
            } else {
              allRequestingDates.push(completeDate)
            }
          }
        })
      } else {
        //if reservation detail has one date
        requestBookingDate = moment(item.reservationDetail[0].reservationDate, "YYYY-MM-DD")
        startingDay = requestBookingDate.format('D')
        month = requestBookingDate.format('M')
        year = requestBookingDate.format('YYYY')
        completeDate = year + '-' + month + '-' + startingDay

        if (!(allRequestingDates.includes(completeDate))) {
          if (useMonthToSearch) {
            if (month == selectMonthforSearch && year == yearforSearch) {
              allRequestingDates.push(completeDate)
            }
          } else {
            allRequestingDates.push(completeDate)
          }
        }
      }
      allRequestingDates.sort();
    })
  }

  const renderBookingCard = (rseDate) => {
    const data = getBookingInfoByDate(rseDate)

    return data.map(item => {
      return (
        <ProviderReservationCard fromWaitingScreen={fromWaitingScreen}  {...item} rseDate={rseDate} />
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
    if (requestInfoByService.message !== "no Request") {
      return (
        <View style={styles.choicesView}>
          <Pressable style={[styles.Dview, monthly ? styles.DviewPress : styles.Dview]} onPress={monthlyPress}>
            <Text style={[styles.filtertxt, monthly ? styles.filtertxtPress : styles.filtertxt]}>شهر</Text>
          </Pressable>
          <Pressable style={[styles.Dview, spacificDate ? styles.DviewPress : styles.Dview]} onPress={spacificDatePress}>
            <Text style={[styles.filtertxt, spacificDate ? styles.filtertxtPress : styles.filtertxt]}>تاريخ</Text>
          </Pressable>
          <Pressable style={[styles.Dview, clientName ? styles.DviewPress : styles.Dview]} onPress={clientNamePress}>
            <Text style={[styles.filtertxt, clientName ? styles.filtertxtPress : styles.filtertxt]}>زبون</Text>
          </Pressable>
          <Pressable style={[styles.Dview, allRequests ? styles.DviewPress : styles.Dview]} onPress={allReqPress}>
            <Text style={[styles.filtertxt, allRequests ? styles.filtertxtPress : styles.filtertxt]}>الكل</Text>
          </Pressable>
        </View>)
    }
  }

  // seraching By Client Name
  const filterUsersAccName = () => {
    const filterUsers = allUserData.user.filter(item => {
      return item.User_name.includes(client)
    })
    return filterUsers
  }

  const getRequestsAccUserId = () => {
    let userid = '0'
    const data = filterUsersAccName()

    if (data.length > 0) {
      userid = data[0].USER_ID
    }
    const reqInfo = requestInfoByService.filter(item => {
      if (item.reservationDetail.length > 1) {
        //if reservation detail has more than one date
        let result = item.reservationDetail.find(multiItem => {
          return multiItem.reservationDate > todayDate && item.ReqStatus === 'waiting reply' && item.ReqUserId === userid
        })
        return result

      } else {

        //if reservation detail has one date
        return item.reservationDetail[0].reservationDate > todayDate && item.ReqStatus === 'waiting reply' && item.ReqUserId === userid
      }
    })
    return reqInfo
  }

  const manageDatesusingSearchbyName = () => {
    let requestBookingDate = ''
    const data = getRequestsAccUserId()
    return data.map(item => {

      if (item.reservationDetail.length > 1) {
        return item.reservationDetail.map(multiItem => {
          requestBookingDate = multiItem.reservationDate

          if (!(manageArrayDates.includes(requestBookingDate))) {
            manageArrayDates.push(requestBookingDate)
          }
        })
      } else {
        requestBookingDate = item.reservationDetail[0].reservationDate

        if (!(manageArrayDates.includes(requestBookingDate))) {
          manageArrayDates.push(requestBookingDate)
        }
      }

      manageArrayDates.sort();
    })

  }
  const filterReqAccUserId = (resDate) => {
    const data = filterUsersAccName()
    const userid = data[0].USER_ID
    const reqInfo = requestInfoByService.filter(item => {
      if (item.reservationDetail.length > 1) {
        return item.reservationDetail.find(multiItem => {
          return item.ReqStatus === 'waiting reply' && item.ReqUserId === userid && multiItem.reservationDate === resDate
        })
      } else {
        return item.ReqStatus === 'waiting reply' && item.ReqUserId === userid && item.reservationDetail[0].reservationDate === resDate
      }

    })
    return reqInfo
  }

  const renderResCard = (resDate) => {
    const data = filterReqAccUserId(resDate)

    return data.map(item => {
      return (
        <ProviderReservationCard fromWaitingScreen={fromWaitingScreen}  {...item} />
      )
    })
  }

  const renderRequestAccUserName = () => {
    manageDatesusingSearchbyName()
    return manageArrayDates.map(item => {
      return (
        <View>
          <View style={styles.dateView}>
            <Text style={styles.dateTxt}>{moment(item).format('dddd')}</Text>
            <Text style={styles.dateTxt}>{moment(item).format('L')}</Text>
          </View>
          {renderResCard(item)}
        </View>
      )
    })
  }
  const onSearchPress = () => {
    setUseDefultSearch(false)
    setUseClientToSearch(true)
    setUseSpacificDateToSearch(false)
    setuseMonthToSearch(false)
  }

  const inputClientName = () => {
    return (
      <View>
        <TextInput
          style={styles.input}
          keyboardType='default'
          placeholder='ادخل اسم الزبون'
          onChangeText={setClient}
          onEndEditing={onSearchPress}
        />
      </View>
    )
  }


  // searching By sepecific Date
  const onChange = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    setSelectedSpacificDate(fDate);
    onSearchSpicaficDatePress()
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  const onSearchSpicaficDatePress = () => {
    setUseDefultSearch(false)
    setUseClientToSearch(false)
    setUseSpacificDateToSearch(true)
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
  const manageDatesbySearchSpicficDate = () => {
    let requestBookingDate = ''

    const data = getBookingInfoByDate(selectedSpacificDate)
    return data.map(item => {
      if (item.reservationDetail.length > 1) {
        return item.reservationDetail.find(multiItem => {
          requestBookingDate = multiItem.reservationDate
          if (requestBookingDate == selectedSpacificDate) {
            if (!(arrayUsingSpicifcDate.includes(requestBookingDate))) {
              arrayUsingSpicifcDate.push(requestBookingDate)
            }
          }
        })

      } else {
        requestBookingDate = item.reservationDetail[0].reservationDate
        if (requestBookingDate == selectedSpacificDate) {
          if (!(arrayUsingSpicifcDate.includes(requestBookingDate))) {
            arrayUsingSpicifcDate.push(requestBookingDate)
          }
        }
      }

      arrayUsingSpicifcDate.sort();
    })

  }

  const renderBookingCardAccorDate = () => {
    manageDatesbySearchSpicficDate()
    return arrayUsingSpicifcDate.map(item => {
      return (
        <View>
          <View style={styles.dateView}>
            <Text style={styles.dateTxt}>{moment(item).format('dddd')}</Text>
            <Text style={styles.dateTxt}>{moment(item).format('L')}</Text>
          </View>
          {renderBookingCard(selectedSpacificDate)}
        </View>
      )
    })
  }
  /// searching by month
  const inputMonth = () => {
    return (
      <View>
        <MonthCom onMonthSelected={(num) => setselectMonthforSearch(num)}
          isChecked={selectedMonth && selectedYear}
          onCatPress={(m, y) => {
            setSelectedMonth(m)
            setSelectedYear(y)
          }}
        />
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
        {useClientToSearch && renderRequestAccUserName()}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  )
}

export default ProviderWaitingReply

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white'
  },

  dateTxt: {
    color: colors.puprble,
    fontSize: 20
  },
  filtertxt: {
    color: colors.silver,
    fontSize: 20
  },
  filtertxtPress: {
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
    marginVertical: 20,

  },
  choicesView: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.puprble,
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    //borderRadius: 35,
    marginVertical: 20
  },
  Dview: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 50,
    backgroundColor: colors.puprble,
    borderRadius: 35,
    //elevation: 5,
    margin: 5
  },
  DviewPress: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 50,
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

