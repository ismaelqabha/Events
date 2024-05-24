import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { colors } from '../../assets/AppColors'
import Fontisto from "react-native-vector-icons/Fontisto"
import Entypo from "react-native-vector-icons/Entypo"
import SearchContext from '../../../store/SearchContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard'
import UsersContext from '../../../store/UsersContext'
import { showMessage } from '../../resources/Functions'


const ProviderWaitingReply = () => {
  const { requestInfoByService, userInfoBySpiceficId, setUserInfoBySpiceficId,
    selectMonthforSearch, yearforSearch } = useContext(SearchContext);
  const { } = useContext(UsersContext);

  const [fromWaitingScreen, setFromWaitingScreen] = useState(true)

  const [monthly, setMonthly] = useState(false)
  const [daily, setDaily] = useState(true)

  const [spacificDate, setspacificDate] = useState(false)
  const [clientName, setClientName] = useState(false)
  const [allRequests, setAllRequests] = useState(true)

  const [useDefultSearch, setUseDefultSearch] = useState(true)
  const [useSpacificDateToSearch, setUseSpacificDateToSearch] = useState(false)
  const [useClientToSearch, setUseClientToSearch] = useState(false)

  const [client, setClient] = useState(null)
  const [selectedSpacificDate, setSelectedSpacificDate] = useState("YYYY/MM/DD")

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
    setDaily(false)
    if (selectedSpacificDate === "YYYY/MM/DD") {
      showMessage('قم بأختيار تاريخ')
    } else {
      renderBookingCardAccorDate()
    }

  }
  const dailyPress = () => {
    setMonthly(false)
    setDaily(true)
    renderBookingCardAccorDate()
  }

  const spacificDatePress = () => {
    setspacificDate(true)
    setClientName(false)
    setAllRequests(false)
  }
  const clientNamePress = () => {
    setspacificDate(false)
    setClientName(true)
    setAllRequests(false)
  }
  const allReqPress = () => {
    setspacificDate(false)
    setClientName(false)
    setAllRequests(true)
    setUseDefultSearch(true)
    setUseClientToSearch(false)
    setUseSpacificDateToSearch(false)
  }
  const renderFilter = () => {
    if (requestInfoByService.message !== "no Request") {
      return (
        <View style={styles.choicesView}>
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

  useEffect(() => {
    setspacificDate(false)
    setClientName(false)
    setAllRequests(true)

    setUseDefultSearch(true)
    setUseClientToSearch(false)
    setUseSpacificDateToSearch(false)
  }, [])

  const checkDate = (d) => {
    const resDate = moment(d, "YYYY-MM-DD")

    const Day = resDate.format('D')
    const Month = resDate.format('M')
    const Year = resDate.format('YYYY')

    // console.log(Year, '>=', year, Year >= year, Month, '>=', month, Month >= month);
    if (Year >= year && Month >= month) {
      if (Year == year && Month == month) {

        if (Day > day) {
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
        return item.requestInfo.ReqStatus === 'waiting reply'
      })
      return reqInfo
    } else {
      return []
    }
  }

  const getRequestsAccDates = () => {
    const data = getBookingInfo()
    const reqInfo = data.filter(item => {
      if (item.requestInfo.reservationDetail.length > 1) {
        //if reservation detail has more than one date
        let result = item.requestInfo.reservationDetail.find(multiItem => {
          return checkDate(multiItem.reservationDate)
        })
        return result

      } else {

        //if reservation detail has one date
        return checkDate(item.requestInfo.reservationDetail[0].reservationDate)
      }
    })
    return reqInfo
  }


  /// searching all requests
  const getBookingInfoByDate = (resDate) => {
    const data = getRequestsAccDates()

    const reqInfo = data.filter(req => {
      if (req.requestInfo.reservationDetail.length > 1) {
        const multiReqInfo = req.requestInfo.reservationDetail.find(multiItem => {
          return multiItem.reservationDate.slice(0, 10) == resDate
        })
        return multiReqInfo
      } else {
        return req.requestInfo.reservationDetail[0].reservationDate.slice(0, 10) == resDate
      }
    })
    return reqInfo

  }
  const collectAllRequestDates = () => {
    const data = getRequestsAccDates()

    return data.map(item => {
      if (item.requestInfo.reservationDetail.length > 1) {
        //if reservation detail has more than one date
        return item.requestInfo.reservationDetail.map(multiItem => {

          if (!(allRequestingDates.includes(multiItem.reservationDate))) {
            allRequestingDates.push(multiItem.reservationDate)
          }
        })
      } else {
        //if reservation detail has one date

        requestBookingDate = item.requestInfo.reservationDetail[0].reservationDate
        if (!(allRequestingDates.includes(requestBookingDate))) {
          allRequestingDates.push(requestBookingDate)
        }
      }
      allRequestingDates.sort();
    })
  }
  const renderBookingCard = (resDate) => {
    const data = getBookingInfoByDate(resDate)
    //console.log("data", data);
    return data.map(item => {
      return (
        <ProviderReservationCard fromWaitingScreen={fromWaitingScreen}  {...item} resDate={resDate} />
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



  // seraching By Client Name
  const filterUsersAccName = () => {
    const data = getBookingInfo()

    const filterUsers = data.filter(item => {
      return item.userInfo.find(elem => {
        return elem.User_name.includes(client)
      })
    })
    return filterUsers
  }
  const manageDatesusingSearchbyName = () => {
    let requestBookingDate = ''
    const data = filterUsersAccName()
    return data.map(item => {

      if (item.requestInfo.reservationDetail.length > 1) {
        return item.requestInfo.reservationDetail.map(multiItem => {
          requestBookingDate = multiItem.reservationDate

          if (!(manageArrayDates.includes(requestBookingDate))) {
            manageArrayDates.push(requestBookingDate)
          }
        })
      } else {
        requestBookingDate = item.requestInfo.reservationDetail[0].reservationDate

        if (!(manageArrayDates.includes(requestBookingDate))) {
          manageArrayDates.push(requestBookingDate)
        }
      }
      manageArrayDates.sort();
    })

  }
  const filterReqAccUserId = (resDate) => {
    const data = filterUsersAccName()

    const reqInfo = data.filter(item => {
      if (item.requestInfo.reservationDetail.length > 1) {
        return item.requestInfo.reservationDetail.find(multiItem => {
          return multiItem.reservationDate === resDate
        })
      } else {
        return item.requestInfo.reservationDetail[0].reservationDate === resDate
      }

    })
    return reqInfo
  }
  const renderResCard = (resDate) => {
    const data = filterReqAccUserId(resDate)

    return data.map(item => {
      return (
        <ProviderReservationCard fromWaitingScreen={fromWaitingScreen}  {...item} resDate={resDate} />
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
  const inputClientName = () => {
    return (
      <View style={{ marginBottom: 30 }}>
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
  const onSearchPress = () => {
    setUseDefultSearch(false)
    setUseClientToSearch(true)
    setUseSpacificDateToSearch(false)
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
  const inputSpecificDate = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>

          <View style={styles.viewSelectTypeDate}>
            <Pressable style={[styles.datePeriodView, monthly ? styles.datePeriodViewPress : styles.datePeriodView]} onPress={monthlyPress}>
              <Text style={[styles.filtertxt, monthly ? styles.filtertxtPress : styles.filtertxt]}>لشهر</Text>
            </Pressable>
            <Pressable style={[styles.datePeriodView, daily ? styles.datePeriodViewPress : styles.datePeriodView]} onPress={dailyPress}>
              <Text style={[styles.filtertxt, daily ? styles.filtertxtPress : styles.filtertxt]}>ليوم</Text>
            </Pressable>

          </View>

          <Pressable onPress={() => showMode('date')} >
            <View style={styles.viewDate}>
              <Text style={styles.dateTxt}>{selectedSpacificDate || "YYYY/MM/DD"}</Text>
              <Entypo
                name='calendar'
                style={{ fontSize: 25, color: colors.puprble, paddingHorizontal: 20 }}
              />
            </View>
          </Pressable>
        </View>

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
  const getBookingInfoBymonth = (month, year) => {
    const data = getRequestsAccDates()

    var requestBookingDate = ''
    var requestMonth = ''
    var requestYear = ''

    const reqInfo = data.filter(req => {
      if (req.requestInfo.reservationDetail.length > 1) {
        const multiReqInfo = req.requestInfo.reservationDetail.find(multiItem => {

          requestBookingDate = moment(multiItem.reservationDate, "YYYY-MM-DD")
          requestMonth = requestBookingDate.format('M')
          requestYear = requestBookingDate.format('YYYY')

          return requestMonth === month && requestYear === year
        })
        return multiReqInfo
      } else {
        requestBookingDate = moment(req.requestInfo.reservationDetail[0].reservationDate, "YYYY-MM-DD")
        requestMonth = requestBookingDate.format('M')
        requestYear = requestBookingDate.format('YYYY')

        return requestMonth === month && requestYear === year
      }
    })
    return reqInfo

  }
  const manageDatesbySearchSpicficDate = () => {

    var requestBookingDate = ''
    var requestDay = ''
    var requestMonth = ''
    var requestYear = ''
    var completeDate = ''

    const selectedDateForSearch = moment(selectedSpacificDate, "YYYY-MM-DD")
    const month = selectedDateForSearch.format('M')
    const year = selectedDateForSearch.format('YYYY')

    /// searching request date according specfic date
    if (daily) {
      const data = getBookingInfoByDate(selectedSpacificDate)
      return data.map(item => {
        if (item.requestInfo.reservationDetail.length > 1) {
          return item.requestInfo.reservationDetail.find(multiItem => {

            requestBookingDate = moment(multiItem.reservationDate, "YYYY-MM-DD")
            requestDay = requestBookingDate.format('D')
            requestMonth = requestBookingDate.format('M')
            requestYear = requestBookingDate.format('YYYY')
            completeDate = requestYear + '-' + requestMonth + '-' + requestDay

            if (completeDate == selectedSpacificDate) {
              if (!(arrayUsingSpicifcDate.includes(completeDate))) {
                arrayUsingSpicifcDate.push(completeDate)
              }
            }
          })

        } else {

          requestBookingDate = moment(item.requestInfo.reservationDetail[0].reservationDate, "YYYY-MM-DD")
          requestDay = requestBookingDate.format('D')
          requestMonth = requestBookingDate.format('M')
          requestYear = requestBookingDate.format('YYYY')
          completeDate = requestYear + '-' + requestMonth + '-' + requestDay

          if (completeDate == selectedSpacificDate) {
            if (!(arrayUsingSpicifcDate.includes(completeDate))) {
              arrayUsingSpicifcDate.push(completeDate)
            }
          }

        }
        arrayUsingSpicifcDate.sort();
      })

    } else {
      /// search request dates according months
      const data = getBookingInfoBymonth(month, year)
      return data.map(item => {
        if (item.requestInfo.reservationDetail.length > 1) {
          return item.requestInfo.reservationDetail.find(multiItem => {

            requestBookingDate = moment(multiItem.reservationDate, "YYYY-MM-DD")
            requestDay = requestBookingDate.format('D')
            requestMonth = requestBookingDate.format('M')
            requestYear = requestBookingDate.format('YYYY')
            completeDate = requestYear + '-' + requestMonth + '-' + requestDay

            if (month === requestMonth && year === requestYear) {

              if (!(arrayUsingSpicifcDate.includes(completeDate))) {
                arrayUsingSpicifcDate.push(completeDate)
              }
            }
          })

        } else {

          requestBookingDate = moment(item.requestInfo.reservationDetail[0].reservationDate, "YYYY-MM-DD")
          requestDay = requestBookingDate.format('D')
          requestMonth = requestBookingDate.format('M')
          requestYear = requestBookingDate.format('YYYY')
          completeDate = requestYear + '-' + requestMonth + '-' + requestDay

          if (month === requestMonth && year === requestYear) {
            if (!(arrayUsingSpicifcDate.includes(completeDate))) {
              arrayUsingSpicifcDate.push(completeDate)
            }
          }

        }
        arrayUsingSpicifcDate.sort();
      })
    }

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
          {renderBookingCard(item)}
        </View>
      )
    })
  }
  const onSearchSpicaficDatePress = () => {
    setUseDefultSearch(false)
    setUseClientToSearch(false)
    setUseSpacificDateToSearch(true)
  }


  const renderFilterTools = () => {
    return (
      <View style={{ width: '90%', alignSelf: 'center' }}>
        {clientName && inputClientName()}
        {spacificDate && inputSpecificDate()}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderFilter()}
      {renderFilterTools()}
      <ScrollView>
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
    fontSize: 18
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
    borderRadius: 35,
    marginVertical: 20,

  },
  Dview: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    height: 50,
    backgroundColor: colors.puprble,
    borderRadius: 35,
    //elevation: 5,
    margin: 5
  },
  DviewPress: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    height: 50,
    backgroundColor: colors.darkGold,
    borderRadius: 35,
    elevation: 5,
    margin: 5
  },
  input: {
    alignSelf: 'center',
    textAlign: 'center',
    height: 40,
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
    height: 40,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },

  viewSelectTypeDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '30%',
    borderRadius: 10,
    backgroundColor: colors.puprble
  },
  datePeriodView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '50%',
    borderRadius: 10,
    backgroundColor: colors.puprble
  },
  datePeriodViewPress: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '50%',
    borderRadius: 10,
    backgroundColor: colors.darkGold
  }
})

